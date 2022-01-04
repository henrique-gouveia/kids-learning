const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const authSecret = process.env.AUTH_SECRET

    const signin = async (req, res) => {
        const { existsOrError } = app.assertions

        const credentials = { ...req.body }
        try {
            existsOrError(credentials.email, 'E-mail não informado')
            existsOrError(credentials.password, 'password não informada')

            const usuario = await app.db('usuarios')
                .where({ email: credentials.email })
                .first()
            existsOrError(usuario, 'Usuário não encontrado')

            const isMatch = bcrypt.compareSync(credentials.password, usuario.password)
            if (!isMatch) return res.status(400).send('E-mail e/ou Senha inválido(s)')

            const now = Math.floor(Date.now() / 1000)

            const payload = {
                id: usuario.id,
                name: usuario.nome,
                email: usuario.email,
                admin: usuario.admin,
                iat: now, // issued at
                exp: now + (60 * 60 * 24 * 7) // expire 7d
            }
            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })

        } catch (err) {
            return res.status(400).send(err)
        }
    }

    const validateToken = (req, res) => {
        const authData = req.body || null
        try {
            if (authData) {
                const token = jwt.decode(authData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (err) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}
