import express from 'express'
import { matchResultController } from './result.controller'

const router = express.Router()

router.post('/', matchResultController.createMatchResult)
router.get('/', matchResultController.getAllResults)
router.get('/:id', matchResultController.getResultsInformation)
router.get('/rank/results', matchResultController.matchResultRanking)
router.put('/', matchResultController.updateResultInformation)
router.delete('/:id', matchResultController.deleteResultInformation)

export const resultRoutes = router;
