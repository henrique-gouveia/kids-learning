const uuid = require('uuid')

module.exports = app => {
    const { existsOrError, greaterOrEqualThanOrError } = app.assertions

    const save = async (req, res) => {
        const questionario = { ...req.body }
        if (req.params.id) questionario.id = req.params.id

        try {
            existsOrError(questionario.turmaId, 'Turma não informada')
            existsOrError(questionario.dataInicio, 'Data Início não informado')
            existsOrError(questionario.dataFim, 'Data Fim não informada')
            existsOrError(questionario.quantidadeQuestoes, 'Quantidade de Questões não informada')
        } catch (err) {
            return res.status(400).send(err)
        }

        try {
            if (questionario.id) {
                await updateQuestionario(questionario)
            } else {
                await insertQuestionario(questionario)
            }
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const updateQuestionario = async (questionario) => {
        await app.db('questionarios').update(questionario).where({ id: questionario.id })
    }

    const insertQuestionario = async (questionario) => {
        questionario.id = uuid.v4()

        const questoes = await raffleQuestoes(questionario.quantidadeQuestoes)
        const questionarioQuestoes = questoes.map(q => ({
            questionarioId: questionario.id,
            questaoId: q.id
        }))

        await app.db('questionarios').insert(questionario)
        await app.db('questionario_questoes').insert(questionarioQuestoes)
    }

    const raffleQuestoes = async (count) => {
        let questoes = await app.db('questoes').select('id')

        existsOrError(questoes, 'Não há questões cadastradas')
        greaterOrEqualThanOrError(questoes.length, count, `Não há questões suficiente, apenas ${questoes.length}`)

        let maxCount = count
        if (questoes.length < count) maxCount = questoes.length

        const raffle = () => {
            const idx = Math.floor(Math.random() * questoes.length);
            const questao = questoes[idx]

            questoes = questoes.filter(q => q.id !== questao.id)

            return questao
        }

        const raffledQuestoes = [];
        for (let i = 0; i < maxCount; i++) {
            raffledQuestoes.push(raffle())
        }

        return raffledQuestoes
    }

    const remove = async (req, res) => {
        try {
            const questionarioId = req.params.id
            existsOrError(questionarioId, 'Código do questionário não informado')

            await app.db('questionario_questoes').where({ questionarioId }).del()
            const rowsDeleted = await app.db('questionarios').where({ id: questionarioId }).del()

            existsOrError(rowsDeleted, 'Questionário não foi encontrado')

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const limit = 5

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('questionarios').count('id').first()
        const count = parseInt(result.count)

        app.db({ q: 'questionarios', t: 'turmas' })
            .select('q.id', { turmaId: 't.id' }, { turma: 't.nome' }, 'q.dataInicio', 'q.dataFim', 'q.quantidadeQuestoes')
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['t.id', 'q.turmaId'])
            .then(questionarios => res.json({ data: questionarios, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        try {
            const questionarios = await app.db('questionarios')
                .select('id', 'dataInicio', 'dataFim', 'quantidadeQuestoes')
                .where({ id: req.params.id })
                .first()

            res.json(questionarios)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const getQuestoesByQuestionarioId = async (req, res) => {
        try {
            const questionarioId = req.params.id
            existsOrError(questionarioId, 'Código do questionário não informado')

            let questoes = await app.db({ qq: 'questionario_questoes' })
                .innerJoin({ q: 'questoes' }, 'qq.questaoId', 'q.id')
                .leftJoin({ a: 'arquivos' }, 'q.arquivoId', 'a.id')
                .select(
                    'qq.questionarioId', 'q.id', 'q.tipo', 'q.enunciado', 'q.texto', 'q.arquivoId',
                    {
                        arquivoNomeOriginal: 'a.nomeOriginal',
                        arquivoNome: 'a.nome',
                        arquivoTipo: 'a.tipo',
                        arquivoTamanho: 'a.tamanho',
                        arquivoUrl: 'a.url'
                    })
                .where({ 'qq.questionarioId': questionarioId })
            existsOrError(questoes, 'Não foram econtradas questões para esse questionário')

            questoes = await Promise.all(questoes.map(async (q) => {
                const respostas = await app.db('questao_respostas')
                    .select('questaoId', 'alternativa', 'descricao', 'correta')
                    .where({ questaoId: q.id })

                let arquivo = null
                if (q.arquivoId) {
                    arquivo = {
                        id: q.arquivoId,
                        nomeOriginal: q.arquivoNomeOriginal,
                        nome: q.arquivoNome,
                        tipo: q.arquivoTipo,
                        tamanho: q.arquivoTamanho,
                        url: q.arquivoUrl
                    }
                }

                return {
                    questionarioId: q.questionarioId,
                    id: q.id,
                    tipo: q.tipo,
                    enunciado: q.enunciado,
                    texto: (q.texto || '').toString(),
                    arquivo,
                    respostas
                }
            }))

            res.json(questoes)
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const getAlunoByQuestionarioIdAndAlunoMatricula = async (req, res) => {
        try {
            const { id = '', matricula = '' } = req.params

            const aluno = await app.db({ q: 'questionarios' })
                .innerJoin({ a: 'alunos' }, 'q.turmaId', 'a.turmaId')
                .select('a.id', 'a.turmaId', 'a.matricula', 'a.nome')
                .where({ 'q.id': id })
                .andWhere({ 'a.matricula': matricula })
                .first()
            existsOrError(aluno, 'Aluno não associado a esse questionário')

            res.json(aluno)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    return {
        save,
        remove,
        get,
        getById,
        getQuestoesByQuestionarioId,
        getAlunoByQuestionarioIdAndAlunoMatricula
    }
}
