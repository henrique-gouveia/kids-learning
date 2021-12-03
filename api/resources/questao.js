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

        await app.db('respostas').where({ questaoId }).del()
        await app.db('respostas').insert(respostas)
    }

    const remove = async (req, res) => {
        try {
            const questaoId = req.params.id
            existsOrError(questaoId, 'Código da Questão não informada')

            await app.db('respostas').where({ questaoId }).del()
            const rowsDeleted = await app.db('questoes').where({ id: questaoId }).del()

            existsOrError(rowsDeleted, 'Questão não foi encontrada')

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const limit = 10

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('questoes').count('id').first()
        const count = parseInt(result)

        app.db('questoes')
            .select('id', 'tipo', 'enunciado')
            .limit(limit).offset(page * limit - limit)
            .then(questoes => res.json({ data: questoes, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        try {
            const questao = await app.db('questoes')
                .select('id', 'tipo', 'enunciado', 'texto', 'imagemUrl', 'audioUrl')
                .where({ id: req.params.id })
                .first()
                
            const respostas = await app.db('respostas')
                .select('questaoId', 'alternativa', 'descricao')
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