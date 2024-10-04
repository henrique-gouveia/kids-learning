const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const authSecret = process.env.AUTH_SECRET

    const strategyOpts = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    const strategy = new Strategy(strategyOpts, (payload, done) => {
        const { id } = payload
        app.db('usuarios')
            .where({ id })
            .first()
            .then(usuario => done(null, usuario ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}
