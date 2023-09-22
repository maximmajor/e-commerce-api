import { IProduct } from '../interfaces/productInterface';
import ProductRepository from '../repositories/productRepository';
import { HttpException } from '../middlewares/HttpException';

class ProductService {
    private productRepo = new ProductRepository;
    private userRepo = new ProductRepository;

    public async findAllProduct(): Promise<IProduct[]> {
        const products = await this.productRepo.findAllProduct();
        return products;
    }
  
    public async findProductById(productId: string): Promise<IProduct> {
        const product = await this.productRepo.findProductById(productId);
        if (product) return product;
        throw new HttpException(409, "Product do not exist")
    }

    public async createProduct(productData: any): Promise<IProduct> {
        const product = await this.productRepo.createProduct(productData);
        return product;
    }

    public async updateProduct(productId: string, productData: any): Promise<IProduct> {
        const findProduct = await this.productRepo.findProductById(productId)
        if (!findProduct) {
            throw new HttpException(409, "Product do not exist");
        }
        const updateProduct = await this.productRepo.updateProduct(productId, productData);
        return updateProduct!
    }

   

    public async deleteProductData(productId: string): Promise<IProduct> {
        const product = await this.productRepo.deleteProduct(productId);
        if (product) return product;
        throw new HttpException(409, "Product do not exist");
    }

  
}

export default ProductService;