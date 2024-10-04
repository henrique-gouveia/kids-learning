module.exports = app => {
    const get = async (req, res) => {
        try {
            const turmasCount = await app.db('turmas').count('id').first()
            const alunosCount = await app.db('alunos').count('id').first()
            const questoesCount = await app.db('questoes').count('id').first()
            const questionariosCount = await app.db('questionarios').count('id').first()

            res.json({
                turmas: turmasCount.count,
                alunos: alunosCount.count,
                questoes: questoesCount.count,
                questionarios: questionariosCount.count
            })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    return { get }
}
