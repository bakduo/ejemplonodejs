exports.up = function (knex) {
    return knex.schema.createTableIfNotExists('users', function (table) {
      table.increments();
      table.string('username');
      table.string('email');
      table.string('password');
      table.timestamps();
    });
};
  
  exports.down = function (knex) {
    return knex.schema.alterTable('users', (table) => {
      table.dropForeign('status');
    });
  };
  