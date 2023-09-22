import express, { Router } from 'express';
import productController from '../controllers/productController';
import authenticate from '../middlewares/authentication';
import authorization from '../middlewares/authorization';

const router: Router = express.Router();
const ProductController = new productController();


router.post('/', authenticate, authorization, ProductController.createProduct);

router.get('/:productId', ProductController.getProductById);

router.get('/get/all', ProductController.getProducts);
router.put('/update/:productId', authenticate,authorization,  ProductController.updateProduct);

router.delete('/remove/:productId', authenticate, authorization, ProductController.deleteProduct);

export default router;
