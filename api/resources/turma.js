module.exports = app => {
    const { existsOrError, notExistsOrError } = app.assertions

    const save = (req, res) => {
        const turma = { ...req.body }
        if (req.params.id) turma.id = req.params.id

        try {
            existsOrError(turma.nome, 'Nome não informado')
        } catch (err) {
            return res.status(400).send(err)
        }

        if (turma.id) {
            app.db('turmas')
                .update(turma)
                .where({ id: turma.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            delete turma.id

            app.db('turmas')
                .insert(turma)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código da Turma não informado')

            const alunos = await app.db('alunos').where({ turmaId: req.params.id })
            notExistsOrError(alunos, 'Turma possui alunos associados')

            const rowsDeleted = await app.db('turmas').where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Turma não foi encontrada')

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const get = async (req, res) => {
        app.db('turmas')
            .select('id', 'nome')
            .orderBy('id')
            .then(turmas => res.json(turmas))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('turmas')
            .select('id', 'nome')
            .where({ id: req.params.id })
            .first()
            .then(turma => res.json(turma))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}
