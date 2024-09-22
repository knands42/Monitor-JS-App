/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('courses').del()
  await knex('courses').insert([
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

  await knex('students').del()
  await knex('students').insert([
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

  const [courses, students] = await Promise.all([
    knex('courses').select('*'),
    knex('students').select('*'),
  ])

  console.log({courses, students})
};
