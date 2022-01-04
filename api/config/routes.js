const admin = require('./admin')

module.exports = app => {
    app.get('/', (req, res) => res.send('Kids Learning Api is Running...'))

    app.post('/signup', app.resources.usuario.save)
    app.post('/signin', app.resources.auth.signin)
    app.post('/validateToken', app.resources.auth.validateToken)

    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .post(admin(app.resources.usuario.save))
        .get(app.resources.usuario.get)

    app.route('/usuarios/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.resources.usuario.save))
        .get(app.resources.usuario.getById)
        .delete(admin(app.resources.usuario.remove))

    app.route('/turmas')
        .all(app.config.passport.authenticate())
        .post(app.resources.turma.save)
        .get(app.resources.turma.get)

    app.route('/turmas/:id')
        .all(app.config.passport.authenticate())
        .get(app.resources.turma.getById)
        .put(app.resources.turma.save)
        .delete(app.resources.turma.remove)

    app.route('/alunos')
        .all(app.config.passport.authenticate())
        .get(app.resources.aluno.get)
        .post(app.resources.aluno.save)

    app.route('/alunos/:id')
        .all(app.config.passport.authenticate())
        .get(app.resources.aluno.getById)
        .put(app.resources.aluno.save)
        .delete(app.resources.aluno.remove)

    app.route('/questoes')
        .all(app.config.passport.authenticate())
        .get(app.resources.questao.get)
        .post(app.resources.questao.save)

    app.route('/questoes/:id')
        .all(app.config.passport.authenticate())
        .get(app.resources.questao.getById)
        .put(app.resources.questao.save)
        .delete(app.resources.questao.remove)

    app.route('/questionarios')
        .all(app.config.passport.authenticate())
        .get(app.resources.questionario.get)
        .post(app.resources.questionario.save)

    app.route('/questionarios/:id')
        .all(app.config.passport.authenticate())
        .get(app.resources.questionario.getById)
        .put(app.resources.questionario.save)
        .delete(app.resources.questionario.remove)

    app.route('/arquivos')
        .all(app.config.passport.authenticate())
        .post(app.multer.single('file'), app.resources.arquivo.save)

    app.route('/arquivos/:id')
        .all(app.config.passport.authenticate())
        .delete(app.resources.arquivo.remove)
}
