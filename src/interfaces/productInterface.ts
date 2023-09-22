import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
    id: string;
    _id: string;
    userId?: mongoose.Schema.Types.ObjectId,
    name: string;
    description: string;
    brand: string;
    image: string;
    price: number;
    quantity: number;
    status: string;
  }



  export default IProduct