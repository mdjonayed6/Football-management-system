import express from 'express'
import { rolesController } from './roles.controller';

const router = express.Router();

router.post('/', rolesController.createRoles)
router.get('/', rolesController.getRoles)

export const rolesRoutes = router;