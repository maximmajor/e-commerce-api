import mongoose from 'mongoose';
import { ICart } from '../interfaces/cartInterface';

const CartSchema = new mongoose.Schema<ICart>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        state: {
            type: String,
            default: "active",
        },
        delivery_status: {
            type: String,
            default: "pending",
        },
        products:[{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            },
            name: {
                type: String,
                trim: true,
            },
            image: {
                type: String,
                trim: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
                default: 0,
            }, 
        }], 
        totalprice: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);


CartSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
const Cart = mongoose.model('cart', CartSchema);
export default Cart;