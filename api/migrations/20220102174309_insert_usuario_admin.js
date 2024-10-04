
exports.up = function(knex) {
    return knex('usuarios').insert({
        nome: 'admin',
        email: "admin@kidslearning.com.br",
        password: "$2a$10$gLG2VKY8TiImFdqxL/EE/Oafv9pQ443FU86LIcVq.oI.xeeJZyC82", // Adm@KL123
        admin: true
    })
};

exports.down = function(knex) {
    return knex('usuarios').where({ email:  "admin@kidslearning.com.br" }).del()
};
