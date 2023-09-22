import { Request, Response, NextFunction } from 'express';
import { ICart } from '../interfaces/cartInterface';
import cartService from '../services/cartService';
import { HttpException } from '../middlewares/HttpException';
import accountService from '../services/accountService';


class cartsController {
    public cartService = new cartService();
    private accountService: accountService;

    constructor() {
        this.accountService = new accountService();
    }


    public getCarts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cart = await this.cartService.findAllCart()
            res.status(201).json(cart);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }



    public getcartById = async (req: Request, res: Response, next: NextFunction) => {
        const cartId: string = req.params.cartId
        try {
            const findOnecartData: any = await this.cartService.findCartById(cartId);
            res.status(201).json(findOnecartData);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }


    public createCart = async (req: Request, res: Response, next: NextFunction) => {
        const accountId = req.user
        const productId: string = req.params.productId
        const account = await this.accountService.getAccountById(accountId);
        if (!account) {
            res.status(404).json({ message: 'account not found' });
        }
        const cartData: any = req.body;
        try {
            const createcartData: any = await this.cartService.createCart(accountId, productId);
            res.status(201).json(createcartData);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

    public pushToCart = async (req: Request, res: Response, next: NextFunction) => {
        const accountId = req.user
        const productId: string = req.params.productId
        const account = await this.accountService.getAccountById(accountId);
        if (!account) {
            res.status(404).json({ message: 'account not found' });
        }
        const cartId: string = req.params.cartId;
        const cartData: any = req.body;
        try {
            const updatecartData: any = await this.cartService.pushToCart(cartId, cartData, accountId, productId);
            res.status(201).json(updatecartData);
        } catch (error) {
            if (error instanceof HttpException) {
                const { statusCode, message } = error;
                res.status(statusCode).json({ message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }


    //   public deletecart = async (req: Request, res: Response, next: NextFunction) => {
    //     const accountId = req.user
    //             const account = await this.accountService.getAccountById(accountId);
    //             if (!account) {
    //                 res.status(404).json({ message: 'account not found' });
    //             }
    //     const cartId: string = req.params.cartId;
    //     try {
    //       const deletecartData: Icart = await this.cartService.deletecartData(cartId);
    //       res.status(201).json(deletecartData);
    //     }  catch (error) {
    //         if (error instanceof HttpException) {
    //             const { statusCode, message } = error;
    //             res.status(statusCode).json({ message });
    //         } else {
    //             res.status(500).json({ message: 'Internal Server Error' });
    //         }
    //     }
    //   }
}


export default cartsController;