import cartModel from '../models/cartModel';
import { ICart } from '../interfaces/cartInterface';

class CartRepository {
    public cart = cartModel;

    public async getCartByUserId(userId: string): Promise<any> {
        const cart = await this.cart.findOne({ userId: userId, state: { "$in": ["active", "pending"] } });
        if (!cart) {
            return null;
        }
        return cart
    }

    public async pushProductToCart(cartId: string, updateData: any): Promise<ICart | null> {
        const updateCart = await this.cart.findByIdAndUpdate(
            { _id: cartId },
            { $push: { products: updateData } },
        );
        return updateCart;
    }

    public async getCartById(_id: string): Promise<ICart | null> {
        const updateCart = await this.cart.findById(_id);
        return updateCart;
    }



    public async createCart(updateData: any): Promise<ICart | null> {
        const createProduct = await this.cart.create(updateData);
        return createProduct
    }

    public async getUserActiveCart(userId: string): Promise<ICart> {
        const cart: any = await this.cart.find({ userId: userId, state: "active" }).populate('userId').sort({ createdAt: -1 })
        return cart
    }


    public async getAllUserCart(): Promise<ICart> {
        const cart: any = await this.cart.find().populate('userId').sort({ createdAt: -1 })
        return cart
    }

    
    public async delete(cart_id: string): Promise<ICart> {
        const cart = await this.cart.findByIdAndDelete(cart_id);
        return cart!;
    }

}

export default CartRepository