module.exports = app => {
    app.route('/usuarios')
        .post(app.resources.usuario.save)
        .get(app.resources.usuario.get)

    app.route('/usuarios/:id')
        .put(app.resources.usuario.save)
        .get(app.resources.usuario.getById)

    app.route('/turmas')
        .post(app.resources.turma.save)
        .get(app.resources.turma.get)

    app.route('/turmas/:id')
        .get(app.resources.turma.getById)
        .put(app.resources.turma.save)
        .delete(app.resources.turma.remove)

    app.route('/alunos')
        .get(app.resources.aluno.get)
        .post(app.resources.aluno.save)

    app.route('/alunos/:id')
        .get(app.resources.aluno.getById)
        .put(app.resources.aluno.save)
        .delete(app.resources.aluno.remove)

    app.route('/questoes')
        .get(app.resources.questao.get)
        .post(app.resources.questao.save)

    app.route('/questoes/:id')
        .get(app.resources.questao.getById)
        .put(app.resources.questao.save)
        .delete(app.resources.questao.remove)

    app.route('/questionarios')
        .get(app.resources.questionario.get)
        .post(app.resources.questionario.save)

    app.route('/questionarios/:id')
        .get(app.resources.questionario.getById)
        .put(app.resources.questionario.save)
        .delete(app.resources.questionario.remove)
}
