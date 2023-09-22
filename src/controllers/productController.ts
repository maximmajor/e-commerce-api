import { Request, Response, NextFunction } from 'express';
import { IProduct } from '../interfaces/productInterface';
import productService from '../services/productService';
import { HttpException } from '../middlewares/HttpException';
import accountService from '../services/accountService';


class ProductsController {
  public productService = new productService();
  private accountService: accountService;

  constructor() {
      this.accountService = new accountService();
  }


  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await this.productService.findAllProduct()
        res.status(201).json(product);
    } catch (error) {
        if (error instanceof HttpException) {
            const { statusCode, message } = error;
            res.status(statusCode).json({ message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
  }



  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId: string = req.params.productId
    try {
      const findOneProductData: IProduct = await this.productService.findProductById(productId);
      res.status(201).json(findOneProductData);
    } catch (error) {
        if (error instanceof HttpException) {
            const { statusCode, message } = error;
            res.status(statusCode).json({ message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
  }


  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.user
            const account = await this.accountService.getAccountById(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            }
    const productData: any = req.body;
    try {
      const createProductData: IProduct = await this.productService.createProduct(productData);
      res.status(201).json(createProductData);
    }  catch (error) {
        if (error instanceof HttpException) {
            const { statusCode, message } = error;
            res.status(statusCode).json({ message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
  }

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.user
            const account = await this.accountService.getAccountById(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            }
    const productId: string = req.params.productId;
    const productData: any = req.body;
    try {
      const updateProductData: IProduct = await this.productService.updateProduct(productId, productData);
      res.status(201).json(updateProductData);
    }  catch (error) {
        if (error instanceof HttpException) {
            const { statusCode, message } = error;
            res.status(statusCode).json({ message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
  }


  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const accountId = req.user
            const account = await this.accountService.getAccountById(accountId);
            if (!account) {
                res.status(404).json({ message: 'account not found' });
            }
    const productId: string = req.params.productId;
    try {
      const deleteProductData: IProduct = await this.productService.deleteProductData(productId);
      res.status(201).json(deleteProductData);
    }  catch (error) {
        if (error instanceof HttpException) {
            const { statusCode, message } = error;
            res.status(statusCode).json({ message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
  }
}


export default ProductsController;