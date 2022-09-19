import express from 'express';
import controller from '../controllers/puppyController'; 
import { Schemas, ValidateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.puppy.create), controller.createPuppy);
router.get('/', controller.readAllPuppies);
router.get('/:puppyId', controller.readPuppy);
router.patch('/:puppyId', controller.updatePuppy);
router.delete('/:puppyId', controller.deletePuppy);

export = router; 