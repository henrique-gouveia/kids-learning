const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.assertions

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const usuario = { ...req.body }
        if (req.params.id) usuario.id = req.params.id

        if (!req.originalUrl.startsWith('/users')) usuario.admin = false
        if (!req.user || !req.user.admin) usuario.admin = false

        try {
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.email, 'E-mail não informado')
            existsOrError(usuario.password, 'Senha não informada')
            existsOrError(usuario.confirmPassword, 'Confirmação de Senha inválida')
            equalsOrError(usuario.password, usuario.confirmPassword, 'Senhas não conferem')

            const existentUser = await app.db('usuarios')
                .where({ email: usuario.email }).first()

            if (!usuario.id) {
                notExistsOrError(existentUser, 'Usuário já cadastrado')
            }
        } catch (message) {
            return res.status(400).send(message)
        }

        usuario.password = encryptPassword(usuario.password)
        delete usuario.confirmPassword

        if (usuario.id) {
            app.db('usuarios')
                .update(usuario)
                .where({ id: usuario.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            delete usuario.id

            app.db('usuarios')
                .insert(usuario)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Código do Usuário não informado')

            const rowsUpdated = await app.db('usuarios')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado')

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const limit = 5

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('usuarios').count('id').first()
        const count = parseInt(result.count)

        app.db('usuarios')
            .select('id', 'nome', 'email', 'admin')
            .whereNull('deletedAt')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('usuarios')
            .select('id', 'nome', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }
}
