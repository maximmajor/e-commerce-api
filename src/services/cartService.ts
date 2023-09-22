import productModel from '../models/productModel';
import { ICart } from '../interfaces/cartInterface';
import cartRepository from '../repositories/cartRepository';
import productRepository from '../repositories/productRepository';
import { HttpException } from '../middlewares/HttpException';

class cartService {
    private cartRepo = new cartRepository;
    private userRepo = new cartRepository;
    private productRepo = new productRepository;

    public async findAllCart(): Promise<ICart> {
        const cart = await this.cartRepo.getAllUserCart();
        return cart;
    }

    public async findCartById(cartId: string): Promise<ICart> {
        const product = await this.cartRepo.getCartById(cartId);
        if (product) return product;
        throw new HttpException(409, "Product do not exist")
    }

    public async createCart( userId: string, productId: string): Promise<any> {
        const findProduct = await this.cartRepo.getCartByUserId(userId)
        const findItems = await this.productRepo.findProductById(productId);
        if (!findProduct) {
            const addCart: any = {
                userId: userId,
                products: [{
                    productId: productId,
                    name: findItems.name,
                    image: findItems.image,
                    quantity: findItems.quantity,
                    price: findItems.price,
                }],
            }
            const product: any = await this.cartRepo.createCart(addCart);
            return product;
        }
        const pushingData: any = {
            products: [{
                productId: productId,
                name: findItems.name,
                image: findItems.image,
                quantity: findItems.quantity,
                price: findItems.price,
            }],
        }
        const updateProduct = await this.cartRepo.pushProductToCart(findProduct._id, pushingData);
        return updateProduct!

    }

    public async pushToCart(cartId: string, cartData: any, userId: string, productId: string): Promise<ICart> {
        const findProduct = await this.cartRepo.getCartById(cartId)
        if (!findProduct) {
            throw new HttpException(409, "cart do not exist");
        }
        const updateProduct = await this.cartRepo.pushProductToCart(cartId, cartData);
        return updateProduct!
    }



    // public async deleteProductData(productId: string): Promise<ICart> {
    //     const product = await this.cartRepo.deleteProduct(productId);
    //     if (product) return product;
    //     throw new HttpException(409, "Product do not exist");
    // }


}

export default cartService;

