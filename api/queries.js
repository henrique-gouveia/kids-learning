module.exports = {
    questionarioRealizadoRespostasById: `
        SELECT
            al.id,
            al.matricula,
            al.nome,
            q.id "questionarioId",
            CASE WHEN qr.id IS NULL THEN false ELSE true END AS respondeu,
            CAST(
            (
                SELECT COUNT(1) FROM questionarios_realizados_respostas qrr2
                JOIN questoes q2 ON qrr2."questaoId" = q2.id
                WHERE qrr2."questionarioRealizadoId" = qr.id
                AND q2.tipo = 'Audição'
                AND qrr2.acertou = true
            ) AS INTEGER)  "acertosAudicao",
            CAST(
            (
                SELECT COUNT(1) FROM questionarios_realizados_respostas qrr2
                JOIN questoes q2 ON qrr2."questaoId" = q2.id
                WHERE qrr2."questionarioRealizadoId" = qr.id
                AND q2.tipo = 'Audição'
                AND qrr2.acertou = false
            ) AS INTEGER)"errosAudicao",
            CAST(
            (
                SELECT COUNT(1) FROM questionarios_realizados_respostas qrr2
                JOIN questoes q2 ON qrr2."questaoId" = q2.id
                WHERE qrr2."questionarioRealizadoId" = qr.id
                AND q2.tipo = 'Leitura'
                AND qrr2.acertou = true
            ) AS INTEGER) "acertosLeitura",
            CAST(
            (
                SELECT COUNT(1) FROM questionarios_realizados_respostas qrr2
                JOIN questoes q2 ON qrr2."questaoId" = q2.id
                WHERE qrr2."questionarioRealizadoId" = qr.id
                AND q2.tipo = 'Leitura'
                AND qrr2.acertou = false
            ) AS INTEGER) "errosLeitura",
            CAST(
            (
                SELECT COUNT(1) FROM questionarios_realizados_respostas qrr2
                JOIN questoes q2 ON qrr2."questaoId" = q2.id
                WHERE qrr2."questionarioRealizadoId" = qr.id
                AND q2.tipo = 'Vocabulário'
                AND qrr2.acertou = true
            ) AS INTEGER) "acertosVocabulario",
            CAST(
            (
                SELECT COUNT(1) FROM questionarios_realizados_respostas qrr2
                JOIN questoes q2 ON qrr2."questaoId" = q2.id
                WHERE qrr2."questionarioRealizadoId" = qr.id
                AND q2.tipo = 'Vocabulário'
                AND qrr2.acertou = false
            ) AS INTEGER) "errosVocabulario"
        FROM questionarios q
        JOIN alunos al ON al."turmaId" = q."turmaId"
        LEFT JOIN questionarios_realizados qr ON qr."questionarioId" = q.id AND al.id = qr."alunoId"
        WHERE q.id = ?
    `
}
