import express, { Router } from 'express';
import cartController from '../controllers/cartController';
import authenticate from '../middlewares/authentication';
import authorization from '../middlewares/authorization';

const router: Router = express.Router();
const CartController = new cartController();


router.post('/:productId', authenticate,  CartController.createCart);
router.get('/:cartId', authenticate, CartController.getcartById);
router.get('/get/all', authenticate, CartController.getCarts);
router.put('/update/:cartId/:productId', authenticate, CartController.pushToCart);

//router.delete('/remove/:productId', authenticate, ProductController.deleteProduct);

export default router;
