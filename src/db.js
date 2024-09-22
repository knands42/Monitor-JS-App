import knex from 'knex'

/**
 * Connects to the database and returns a Knex instance
 * @returns {Promise<import('knex').Knex>}
 */
export async function connect() {
    const db = knex({
        client: 'pg',
        connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        searchPath: ['knex', 'public'],
    })

    await db.raw('SELECT 1 as result')
    return db
}

/**
 * Seeds the database with initial schema
 * @param {import('knex').Knex} db - The Knex instance
 * @returns {Promise<void>}
 */
export async function seedDb(db) {
    await db.schema.dropTableIfExists('students');
    await db.schema.dropTableIfExists('courses');

    await db.schema.createTable('courses', function (table) {
        table.increments('id').primary();
        table.string('name');
    });

    await db.schema
        .createTable('students', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.integer('courseId');

            table
                .foreign('courseId')
                .references('courses.id')
                .withKeyName('fk_fkey_courses');
        })
    
    await db('courses')
        .insert([
            {name: 'NodeJS Streams'},
            {name: 'NodeJS Async'},
            {name: 'NodeJS HTTP'},
            {name: 'NodeJS REST API'},
            {name: 'NodeJS GraphQL'},
            {name: 'NodeJS WebSockets'},
            {name: 'NodeJS Security'},
            {name: 'NodeJS Performance'},
            {name: 'NodeJS Deployment'},
            {name: 'NodeJS Monitoring'},        
        ]);
    
    await db('students')
        .insert([
            {name: 'John Doe', courseId: 1},
            {name: 'Jane Doe', courseId: 1},
            {name: 'John Smith', courseId: 2},
            {name: 'Jane Smith', courseId: 2},
            {name: 'John Doe', courseId: 3},
            {name: 'Jane Doe', courseId: 3},
            {name: 'John Smith', courseId: 4},
            {name: 'Jane Smith', courseId: 4},
            {name: 'John Doe', courseId: 5},
            {name: 'Jane Doe', courseId: 5},
            {name: 'John Smith', courseId: 6},
            {name: 'Jane Smith', courseId: 6},
            {name: 'John Doe', courseId: 7},        
        ]);
    
    const [courses, students] = await Promise.all(
        [
            db('courses').select('*'),
            db('students').select('*'),
        ]
    )

    console.log({ courses, students })
}