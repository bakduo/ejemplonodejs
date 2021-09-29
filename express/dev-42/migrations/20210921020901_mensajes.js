exports.up = function (knex) {
    return knex.schema.createTableIfNotExists('mensajes', function (table) {
      table.increments();
      table.string('nombre');
      table.string('apellido');
      table.string('email');
      table.string('alias');
      table.string('avatar');
      table.integer('edad');
      table.integer('comment');
      table.integer('tiempo');
      table.timestamps();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('mensajes', (table) => {
      table.dropForeign('status');
    });
  };
  