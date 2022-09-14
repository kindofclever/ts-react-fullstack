"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const puppyController_1 = __importDefault(require("../controllers/puppyController"));
const router = express_1.default.Router();
router.post('/', puppyController_1.default.createPuppy);
router.get('/', puppyController_1.default.readAllPuppies);
router.get('/:puppyId', puppyController_1.default.readPuppy);
router.patch('/:puppyId', puppyController_1.default.updatePuppy);
router.delete('/:puppyId', puppyController_1.default.deletePuppy);
module.exports = router;
