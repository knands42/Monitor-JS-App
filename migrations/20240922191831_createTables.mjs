/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.createTable('courses', function (table) {
        table.increments('id').primary();
        table.string('name');
    });

    knex.schema
        .createTable('students', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.integer('courseId');

            table
                .foreign('courseId')
                .references('courses.id')
                .withKeyName('fk_fkey_courses');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    knex.schema.dropTable('students');
    knex.schema.dropTable('courses');
};
