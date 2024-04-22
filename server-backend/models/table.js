// app.js
const createTable = require('./function/create_table');
const dropTable = require('./function/drop_table');
const { usersSchema, rolesSchema, teamsSchema, playersSchema, matchesSchema, lineupsSchema, matchResultsSchema, refereesSchema } = require('./schema/userSchema');

// Drop table if it exists
// dropTable('users')

// Function to create a table
// createTable('users', usersSchema);
// createTable('roles', rolesSchema);
// createTable('teams', teamsSchema);
// createTable('players', playersSchema);
// createTable('matches', matchesSchema);
// createTable('lineups', lineupsSchema);
// createTable('match_results', matchResultsSchema);
// createTable('referees', refereesSchema);