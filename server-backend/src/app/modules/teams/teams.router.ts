import express from 'express';
import { teamsController } from './teams.controller';

const router = express.Router();

router.post('/', teamsController.createTeam)
router.get('/', teamsController.getTeams)
router.get('/:id', teamsController.getTeamById)
router.put('/', teamsController.updateTeam)
router.delete('/:id', teamsController.deleteTeam)

export const teamsRouter = router;