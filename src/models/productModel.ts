import mongoose from 'mongoose';
import { IProduct } from '../interfaces/productInterface';

const productSchema = new mongoose.Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        quantity: {
            type: Number,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
           
        },
    
    },
    {
        timestamps: true,
    },
);


productSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const productModel = mongoose.model('product', productSchema);
export default productModel;
