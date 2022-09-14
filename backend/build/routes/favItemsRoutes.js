"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const favouriteItemsController_1 = __importDefault(require("../controllers/favouriteItemsController"));
const router = express_1.default.Router();
router.post('/', favouriteItemsController_1.default.createFavItems);
router.get('/', favouriteItemsController_1.default.readAllFavItems);
router.get('/:favItemsId', favouriteItemsController_1.default.readFavItems);
router.patch('/:favItemsId', favouriteItemsController_1.default.updateFavItems);
router.delete('/:favItemsId', favouriteItemsController_1.default.deleteFavItems);
module.exports = router;
