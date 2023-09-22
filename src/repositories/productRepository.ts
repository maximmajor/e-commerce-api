import productModel from '../models/productModel';
import { IProduct } from '../interfaces/productInterface';


class ProductRepository {
    public products = productModel;

    public async findAllProduct(): Promise<IProduct[]> {
        const products = await this.products.find().sort({ createdAt: -1 });
        return products;
    }


    public async findProductById(productId: string): Promise<IProduct> {
        const product = await this.products.findById(productId);
        return product!;
    }


    public async createProduct(productData: any): Promise<IProduct> {
        const createProduct = await this.products.create(productData);
        return createProduct
    }
 

    public async updateProduct(productId: string, productData: any): Promise<IProduct> {
        const updateProduct: any = await this.products.findByIdAndUpdate(productId, productData, { new: true }).exec();
        return updateProduct;

    }

    public async deleteProduct(productId: string): Promise<IProduct> {
        const product = await this.products.findByIdAndDelete(productId);
        return product!;
    }

   

}
export default ProductRepository

