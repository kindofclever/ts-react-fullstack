"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favouriteItemsModel_1 = __importDefault(require("../models/favouriteItemsModel"));
const createFavItems = (req, res, next) => {
    const { toy, food, space: { longitude, latitude }, internationalDay, person } = req.body;
    if (!toy || !food || !longitude || !latitude || !internationalDay || !person)
        return res.status(404).json({ message: `Please provide all the infos` });
    const favItems = new favouriteItemsModel_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        toy,
        food,
        longitude,
        latitude,
        internationalDay,
        person
    });
    return favItems
        .save()
        .then(itemList => res.status(200).json({ itemList }))
        .catch(error => res.status(500).json({ error }));
};
const readFavItems = (req, res, next) => {
    const favItemsId = req.params.favItemsId;
    return favouriteItemsModel_1.default
        .findById(favItemsId)
        .then(itemList => itemList ? res.status(200).json({ itemList }) : res.status(404).json({ message: `Favourite items ${favItemsId}} not found in Database` }))
        .catch(error => res.status(500).json({ error }));
};
const readAllFavItems = (req, res, next) => {
    return favouriteItemsModel_1.default
        .find()
        .then(items => res.status(200).json({ items }))
        .catch(error => res.status(500).json({ error }));
};
const updateFavItems = (req, res, next) => {
    const favItemsId = req.params.favItemsId;
    return favouriteItemsModel_1.default
        .findById(favItemsId)
        .then(itemList => {
        if (itemList) {
            itemList.set(req.body);
            return itemList
                .save()
                .then(itemList => res.status(200).json({ itemList }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: `Favourite items ${favItemsId}} not found in Database` });
        }
    })
        .catch(error => res.status(500).json({ error }));
};
const deleteFavItems = (req, res, next) => {
    const favItemsId = req.params.favItemsId;
    return favouriteItemsModel_1.default
        .findByIdAndDelete(favItemsId)
        .then(itemList => itemList ? res.status(200).json({ itemList }) : res.status(404).json({ message: `Favourite items ${favItemsId}} not found in Database` }))
        .catch(error => res.status(500).json({ error }));
};
exports.default = {
    createFavItems,
    readFavItems,
    readAllFavItems,
    updateFavItems,
    deleteFavItems
};
