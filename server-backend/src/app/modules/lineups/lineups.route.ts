import express from 'express';
import { lineupsController } from './lineups.controller';

const router = express.Router();

router.post('/', lineupsController.createLineups)
router.get('/', lineupsController.getAllLineUps)
router.get('/:id', lineupsController.getLineupsInformation)
router.put('/', lineupsController.updateLineupInformation)
router.delete('/:id', lineupsController.deleteLineupInformation)

export const lineupsRoutes = router;