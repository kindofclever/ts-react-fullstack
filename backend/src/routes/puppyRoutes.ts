import express from 'express';
import controller from '../controllers/puppyController'; 

const router = express.Router();

router.post('/', controller.createPuppy);
router.get('/', controller.readAllPuppies);
router.get('/:puppyId', controller.readPuppy);
router.patch('/:puppyId', controller.updatePuppy);
router.delete('/:puppyId', controller.deletePuppy);

export = router; 