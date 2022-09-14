import mongoose, { Document, Schema } from 'mongoose';

export interface IFavouriteItems {
  dogid: string;
  toy: string;
  food: string;
  space: number;
  internationalDay: Date;
  person: string;
};

export interface IFavouriteItemsModel extends IFavouriteItems, Document {

};

const FavouriteItemsSchema: Schema = new Schema(
  {
    dogid: { type: String, required: true},
    toy: { type: String, required: true },
    food: { type: String, required: true },
    space: { type: Number, required: true},
    internationalDay: { type: Date, required: true },
    person: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<IFavouriteItemsModel>('FavouriteItems', FavouriteItemsSchema);