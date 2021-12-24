module.exports = app => {
    const { existsOrError } = app.assertions

    const save = async (req, res) => {
        const {
            originalname: nomeOriginal,
            key: nome,
            mimetype: tipo,
            size: tamanho,
            location: url = ''
        } = req.file

        try {
            const arquivo = { nomeOriginal, nome, tipo, tamanho, url }
            const arquivoId = await app.db('arquivos').insert(arquivo).returning('id')

            res.json({ id: arquivoId[0], ...arquivo, })
        } catch (err) {
            res.status(500).send(err)
        }
    }

    const remove = async (req, res) => {
        try {
            const arquivoId = req.params.id
            existsOrError(arquivoId, 'Código do Arquivo não informado')

            const arquivo = await app.db('arquivos')
                .select('id', 'nome')
                .where({ id: arquivoId })
                .first()
            existsOrError(arquivo, 'Arquivo não encontrado')

            await app.storage.del(arquivo.nome)
            await app.db('arquivos').where({ id: arquivoId }).del()

            res.status(204).send()
        } catch (err) {
            return res.status(400).send(err)
        }
    }

    return { save, remove }
}
