import express from 'express'
import { refereeController } from './referee.controller'
const router = express.Router()

router.post('/', refereeController.createReferee)
router.get('/', refereeController.getAllReferee)
router.get('/:id', refereeController.getRefereeInformation)
router.get('/match/:id', refereeController.refereeMatch)
router.put('/', refereeController.updateRefereeInformation)
router.delete('/:id', refereeController.deleteRefereeInformation)


export const refereeRoutes = router;