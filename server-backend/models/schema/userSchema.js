const usersSchema = {
    user_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    username: 'VARCHAR(255) NULL',
    password: 'VARCHAR(255) NULL',
    email: 'VARCHAR(255) NULL',
    photo: 'VARCHAR(255) NULL',
    role_id: 'INT DEFAULT 1',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const rolesSchema = {
    role_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    role_name: 'VARCHAR(255)'
};

const teamsSchema = {
    team_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    team_name: 'VARCHAR(255)',
    coach_id: 'INT',
    logo: 'VARCHAR(255)',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const playersSchema = {
    player_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    team_id: 'INT',
    user_id: 'INT',
    position: 'VARCHAR(255)',
    jersey_number: 'INT',
    date_of_birth: 'DATE',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const matchesSchema = {
    match_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    home_team_id: 'INT',
    away_team_id: 'INT',
    match_date: 'DATE',
    match_time: 'TIME',
    venue: 'VARCHAR(255)',
    referee_id: 'INT',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const lineupsSchema = {
    lineup_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    match_id: 'INT',
    team_id: 'INT',
    player_id: 'INT',
    is_starting: 'BOOLEAN',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const matchResultsSchema = {
    result_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    match_id: 'INT',
    home_team_score: 'INT',
    away_team_score: 'INT',
    winner_team_id: 'INT',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

const refereesSchema = {
    referee_id: 'INT AUTO_INCREMENT PRIMARY KEY',
    user_id: 'INT',
    certification_level: 'VARCHAR(255)',
    created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    updated_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
};

module.exports = {
    usersSchema,
    rolesSchema,
    teamsSchema,
    playersSchema,
    matchesSchema,
    lineupsSchema,
    matchResultsSchema,
    refereesSchema
};
