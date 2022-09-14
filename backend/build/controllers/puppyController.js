"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const puppy_1 = __importDefault(require("../models/puppy"));
const createPuppy = (req, res, next) => {
    const { breed, name, dob, size, img } = req.body;
    const puppy = new puppy_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        breed,
        name,
        dob,
        size,
        img
    });
    return puppy
        .save()
        .then(puppy => res.status(200).json({ puppy }))
        .catch(error => res.status(500).json({ error }));
};
const readPuppy = (req, res, next) => {
    const puppyId = req.params.puppyId;
    return puppy_1.default
        .findById(puppyId)
        .then(puppy => puppy ? res.status(200).json({ puppy }) : res.status(404).json({ message: `Puppy ${puppyId} not found in Database` }))
        .catch(error => res.status(500).json({ error }));
};
const readAllPuppies = (req, res, next) => {
    return puppy_1.default
        .find()
        .then(puppies => res.status(200).json({ puppies }))
        .catch(error => res.status(500).json({ error }));
};
const updatePuppy = (req, res, next) => {
    const puppyId = req.params.puppyId;
    return puppy_1.default
        .findById(puppyId)
        .then(puppy => {
        if (puppy) {
            puppy.set(req.body);
            return puppy
                .save()
                .then(puppy => res.status(200).json({ puppy }))
                .catch(error => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: `Puppy ${puppyId} not found in Database...` });
        }
    })
        .catch(error => res.status(500).json({ error }));
};
const deletePuppy = (req, res, next) => {
    const puppyId = req.params.puppyId;
    return puppy_1.default
        .findByIdAndDelete(puppyId)
        .then(puppy => puppy ? res.status(201).json({ message: `Puppy ${puppyId} deleted from Database` }) : res.status(404).json({ message: `Puppy ${puppyId} not found in Database...` }))
        .catch(error => res.status(500).json({ error }));
};
exports.default = {
    createPuppy,
    readPuppy,
    readAllPuppies,
    updatePuppy,
    deletePuppy
};
