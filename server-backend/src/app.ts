import express, { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import cors from 'cors'
import { userRoutes } from './app/modules/user/user.route'
import { rolesRoutes } from './app/modules/roles/roles.route'
import { teamsRouter } from './app/modules/teams/teams.router'
import { playerRoutes } from './app/modules/players/players.route'
import { matchRoutes } from './app/modules/matches/match.route'
import { lineupsRoutes } from './app/modules/lineups/lineups.route'
import { resultRoutes } from './app/modules/results/result.route'
import { refereeRoutes } from './app/modules/referee/referee.route'
import { dashboardRoutes } from './app/modules/dashboard/dashboard.route'
import { noticeRoutes } from './app/modules/notices/notices.route'
import { blogsRoutes } from './app/modules/blogs/blogs.route'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

// Route handlings;
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/roles', rolesRoutes)
app.use('/api/v1/teams', teamsRouter)
app.use('/api/v1/players', playerRoutes)
app.use('/api/v1/matches', matchRoutes)
app.use('/api/v1/lineups', lineupsRoutes)
app.use('/api/v1/results', resultRoutes)
app.use('/api/v1/referees', refereeRoutes)
app.use('/api/v1/total', dashboardRoutes)
app.use('/api/v1/notices', noticeRoutes)
app.use('/api/v1/blogs', blogsRoutes)

// SSL Commerze or any redirect routes will be Here, from controller with functions

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Node.js Server',
        author: 'Md. Jonayed',
        github: 'https://github.com/mdjonayed6',
        linkedin: 'https://www.linkedin.com/in/md-jonayed/',
    })
})

// Route Error
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({
        status: 404,
        message: 'Not Found'
    })
})

// Global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
})

export default app;