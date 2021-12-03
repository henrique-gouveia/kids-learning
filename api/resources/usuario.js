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

        try {
            existsOrError(usuario.nome, 'Nome não informado')
            existsOrError(usuario.email, 'E-mail não informado')
            existsOrError(usuario.password, 'Senha não informado')
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
                .update(user)
                .where({ id: usuario.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            delete usuario.id

            app.db('usuarios')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10

    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('usuarios').count('id').first()
        const count = parseInt(result)

        app.db('usuarios')
            .select('id', 'nome', 'email', 'admin')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('usuarios')
            .select('id', 'nome', 'email', 'admin')
            .where({ id: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}