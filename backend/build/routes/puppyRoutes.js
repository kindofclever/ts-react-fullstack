"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const puppyController_1 = __importDefault(require("../controllers/puppyController"));
const validateSchema_1 = require("../middleware/validateSchema");
const router = express_1.default.Router();
router.post('/', (0, validateSchema_1.ValidateSchema)(validateSchema_1.Schemas.puppy.create), puppyController_1.default.createPuppy);
router.get('/', puppyController_1.default.readAllPuppies);
router.get('/:puppyId', puppyController_1.default.readPuppy);
router.patch('/:puppyId', (0, validateSchema_1.ValidateSchema)(validateSchema_1.Schemas.puppy.update), puppyController_1.default.updatePuppy);
router.delete('/:puppyId', puppyController_1.default.deletePuppy);
module.exports = router;
