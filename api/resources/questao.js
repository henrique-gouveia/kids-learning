module.exports = app => {
    const { existsOrError } = app.assertions

    const save = async (req, res) => {
        const questao = { ...req.body }
        if (req.params.id) questao.id = req.params.id

        try {
            existsOrError(questao.tipo, 'Tipo não informada')
            existsOrError(questao.enunciado, 'Enunciado não informado')
            existsOrError(questao.respostas, 'Respostas não informadas')
        } catch (err) {
            return res.status(400).send(err)
        }

        try {
            if (questao.id) {
                await updateQuestao(questao)
            } else {
                await insertQuestao(questao)
            }
            res.status(204).send()
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const insertQuestao = async (questao) => {
        const { respostas } = questao
        delete questao.id
        delete questao.respostas

        const questaoId = await app.db('questoes').insert(questao).returning('id')
        await saveRespostas(questaoId[0], respostas)
    }

    const updateQuestao = async (questao) => {
        const { respostas } = questao
        delete questao.respostas

        await app.db('questoes').update(questao).where({ id: questao.id })
        await saveRespostas(questao.id, respostas)
    }

    const saveRespostas = async (questaoId, respostas) => {
        respostas = respostas.map(r => ({ ...r, questaoId }))

        await app.db('questao_respostas').where({ questaoId }).del()
        await app.db('questao_respostas').insert(respostas)
    }

    const remove = async (req, res) => {
        try {
            const questaoId = req.params.id
            existsOrError(questaoId, 'Código da Questão não informada')

            const questao = await app.db({ q: 'questoes' })
                .leftJoin({ a: 'arquivos' }, 'q.arquivoId', 'a.id')
                .select('q.id', 'q.arquivoId', { nomeArquivo: 'a.nome' })
                .where({ 'q.id': questaoId })
                .first()
            existsOrError(questao, 'Questão não encontrada')

            if (questao.nomeArquivo) await app.storage.del(questao.nomeArquivo)
            await app.db('arquivos').where({ id: questao.arquivoId }).del()
            await app.db('questao_respostas').where({ questaoId: questao.id }).del()
            await app.db('questoes').where({ id: questao.id }).del()

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const limit = 5

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('questoes').count('id').first()
        const count = parseInt(result.count)

        app.db('questoes')
            .select('id', 'tipo', 'enunciado')
            .limit(limit).offset(page * limit - limit)
            .then(questoes => res.json({ data: questoes, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        try {
            const questao = await app.db('questoes')
                .select('id', 'arquivoId', 'tipo', 'enunciado', 'texto')
                .where({ id: req.params.id })
                .first()

            if (questao.arquivoId)
            {
                const arquivo = await app.db('arquivos')
                    .select('id', 'nomeOriginal', 'tipo', 'tamanho', 'url')
                    .where({ id: questao.arquivoId })
                    .first();

                questao.arquivo = arquivo;
            }

            const respostas = await app.db('questao_respostas')
                .select('questaoId', 'alternativa', 'descricao', 'correta')
                .where({ questaoId: questao.id })

            questao.texto = (questao.texto || '').toString()
            questao.respostas = respostas

            res.json(questao)
        } catch (err) {
            res.status(500).send(err)
        }
    }

    return { save, remove, get, getById }
}
