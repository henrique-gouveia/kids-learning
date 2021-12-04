module.exports = app => {
    const { existsOrError } = app.assertions

    const save = async (req, res) => {
        const aluno = { ...req.body }
        if (req.params.id) aluno.id = req.params.id

        try {
            existsOrError(aluno.turmaId, 'Turma não informada')
            existsOrError(aluno.nome, 'Nome não informado')
            existsOrError(aluno.matricula, 'Matricula não informada')
        } catch (err) {
            return res.status(400).send(err)
        }

        if (aluno.id) {
            app.db('alunos')
                .update(aluno)
                .where({ id: aluno.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            delete aluno.id

            app.db('alunos')
                .insert(aluno)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do Aluno não informado')

            const rowsDeleted = await app.db('alunos').where({ id: req.params.id }).del()
            existsOrError(rowsDeleted, 'Aluno não foi encontrado')

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const limit = 10

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('alunos').count('id').first()
        const count = parseInt(result)

        app.db({ a: 'alunos', t: 'turmas' })
            .select('a.id', { turmaId: 't.id' }, { turma: 't.nome' }, 'a.matricula', 'a.nome')
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['t.id', 'a.turmaId'])
            .orderBy('a.id')
            .then(alunos => res.json({ data: alunos, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('alunos')
            .select('id', 'turmaId', 'matricula', 'nome')
            .where({ id: req.params.id })
            .first()
            .then(aluno => res.json(aluno))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}