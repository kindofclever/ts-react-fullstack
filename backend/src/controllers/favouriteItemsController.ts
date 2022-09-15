import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import FavouriteItems from '../models/favouriteItemsModel';

const createFavItems = (req: Request, res: Response, next: NextFunction) => {
  const { dogid, toy, food, space, internationalDay, person } = req.body;

  if (!toy || !food || !space || !internationalDay || !person) return res.status(404).json({ message: `Please provide all the infos` })

  const favItems = new FavouriteItems ({
    _id: new mongoose.Types.ObjectId(),
    dogid,
    toy,
    food,
    space,
    internationalDay,
    person
  });
  return favItems
    .save()
    .then(itemList => res.status(200).json({ itemList }))
    .catch(error => res.status(500).json({ error }))
};

const readFavItems = (req: Request, res: Response, next: NextFunction) => {
  const favItemsId = req.params.favItemsId;
  return FavouriteItems
    .findById(favItemsId)
    .populate('puppy')
    .select('-__v')
    .then(itemList => itemList ? res.status(200).json({ itemList }) : res.status(404).json({ message: `Favourite items ${favItemsId}} not found in Database` }))
    .catch(error => res.status(500).json({ error }));
};

const readAllFavItems = (req: Request, res: Response, next: NextFunction) => {
  return FavouriteItems
    .find()
    .populate('puppy')
    .select('-__v')
    .then(items => res.status(200).json({ items }))
    .catch(error => res.status(500).json({ error }));
};

const updateFavItems = (req: Request, res: Response, next: NextFunction) => {
  const favItemsId = req.params.favItemsId;
  return FavouriteItems
    .findById(favItemsId)
    .then(itemList => {
      if (itemList) {
        itemList.set(req.body)
        return itemList
        .save()
        .then(itemList => res.status(200).json({ itemList }))
        .catch(error => res.status(500).json({ error }))
      } else {
        return res.status(404).json({ message: `Favourite items ${favItemsId}} not found in Database` })
      }
    })
    .catch(error => res.status(500).json({ error }));
};

const deleteFavItems = (req: Request, res: Response, next: NextFunction) => {
  const favItemsId = req.params.favItemsId;
  return FavouriteItems
  .findByIdAndDelete(favItemsId)
  .then(itemList => itemList ? res.status(200).json({ itemList }) : res.status(404).json({ message: `Favourite items ${favItemsId}} not found in Database` }))
  .catch(error => res.status(500).json({ error }));
};

export default {
  createFavItems,
  readFavItems,
  readAllFavItems,
  updateFavItems,
  deleteFavItems
};
