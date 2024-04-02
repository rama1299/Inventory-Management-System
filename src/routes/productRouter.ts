import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { authentication } from '../middlewares/authentication';
import { authorization } from '../middlewares/authorization';
import { imageUpload } from '../middlewares/multerImage';

const router = Router();

router.get('/product', authentication, authorization(['staff', 'admin']), ProductController.findAll);
router.get('/product/:id', authentication, authorization(['staff', 'admin']), ProductController.findById);
router.post('/product', authentication, authorization(['admin']), ProductController.create);
router.put('/product/:id', authentication, authorization(['admin']), ProductController.update)
router.put('/product/:id/image', authentication, authorization(['admin']), imageUpload.single('image'), ProductController.updateImage)
router.delete('/product/:id', authentication, authorization(['admin']), ProductController.delete)


export default router;