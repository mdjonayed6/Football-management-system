"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const roles_route_1 = require("./app/modules/roles/roles.route");
const teams_router_1 = require("./app/modules/teams/teams.router");
const players_route_1 = require("./app/modules/players/players.route");
const match_route_1 = require("./app/modules/matches/match.route");
const lineups_route_1 = require("./app/modules/lineups/lineups.route");
const result_route_1 = require("./app/modules/results/result.route");
const referee_route_1 = require("./app/modules/referee/referee.route");
const dashboard_route_1 = require("./app/modules/dashboard/dashboard.route");
const notices_route_1 = require("./app/modules/notices/notices.route");
const blogs_route_1 = require("./app/modules/blogs/blogs.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/uploads', express_1.default.static('uploads'));
// Route handlings;
app.use('/api/v1/users', user_route_1.userRoutes);
app.use('/api/v1/roles', roles_route_1.rolesRoutes);
app.use('/api/v1/teams', teams_router_1.teamsRouter);
app.use('/api/v1/players', players_route_1.playerRoutes);
app.use('/api/v1/matches', match_route_1.matchRoutes);
app.use('/api/v1/lineups', lineups_route_1.lineupsRoutes);
app.use('/api/v1/results', result_route_1.resultRoutes);
app.use('/api/v1/referees', referee_route_1.refereeRoutes);
app.use('/api/v1/total', dashboard_route_1.dashboardRoutes);
app.use('/api/v1/notices', notices_route_1.noticeRoutes);
app.use('/api/v1/blogs', blogs_route_1.blogsRoutes);
// SSL Commerze or any redirect routes will be Here, from controller with functions
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Minhazul Abedin Munna',
        github: 'https://github.com/smmunna',
        linkedin: 'https://www.linkedin.com/in/minhazulabedinmunna/',
    });
});
// Route Error
app.all('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
});
exports.default = app;
