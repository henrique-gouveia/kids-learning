
exports.up = function(knex) {
    return knex('usuarios').insert({
        nome: 'admin',
        email: "admin@kidslearning.com.br",
        password: "$2a$10$2MH0O/nY/JEUAdHv34rVFujGJQCIEbkrSTT7keoffx2uTTBsO4b0i",
        admin: true
    })
};

exports.down = function(knex) {
    return knex('usuarios').where({ email:  "admin@kidslearning.com.br" }).del()
};
