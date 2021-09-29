exports.up = function (knex) {
    return knex.schema.createTableIfNotExists('productos', function (table) {
      table.increments();
      table.string('name');
      table.string('thumbail');
      table.integer('price');
      table.timestamps();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('productos', (table) => {
      table.dropForeign('status');
    });
  };
  