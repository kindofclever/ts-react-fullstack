export interface IPuppiesData {
  puppies: {  _id?: string;
    name?: string | undefined;
    breed?: string;
    dob?: Date;
    size?: number;
    img?: string;}[] 
}