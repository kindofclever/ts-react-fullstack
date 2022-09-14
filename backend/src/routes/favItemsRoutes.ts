import express from 'express';
import controller from '../controllers/favouriteItemsController'; 

const router = express.Router();

router.post('/', controller.createFavItems);
router.get('/', controller.readAllFavItems);
router.get('/:favItemsId', controller.readFavItems);
router.patch('/:favItemsId', controller.updateFavItems);
router.delete('/:favItemsId', controller.deleteFavItems);

export = router; 