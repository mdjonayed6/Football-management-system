import express from 'express'
import { matchController } from './match.controller'

const router = express.Router()

router.post('/', matchController.createMatch)
router.get('/', matchController.getAllMatches)
router.get('/:id', matchController.getMatchInformation)
router.get('/next/matches', matchController.getNextMatch)
router.delete('/:id', matchController.deleteMatch)
router.put('/', matchController.updateMatchInformation)


export const matchRoutes = router;