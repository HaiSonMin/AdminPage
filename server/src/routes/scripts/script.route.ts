import express from 'express';
import { ScriptController } from '../../controllers';
const router = express.Router();

router.route('').post(ScriptController.createScript);
router.route('/search').get(ScriptController.searchScript);
router.route('/:id').get(ScriptController.getScript);
router.route('').get(ScriptController.getAllScripts);
router.route('/:id').patch(ScriptController.updateScript);
router.route('/:id').delete(ScriptController.deleteScript);

export { router };
