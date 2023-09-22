import mongoose from 'mongoose';

export interface ICart extends mongoose.Document {
    id: string;
    _id: string;
    userId?: mongoose.Schema.Types.ObjectId;
    state?: string;
    delivery_status: string;
    products:[{
        productId: mongoose.Schema.Types.ObjectId | string,
        name: string,
        image: string,
        quantity: number,
        price: number,
        createdAt?: Date;
    }],
    totalprice: number,
}

export default ICart;