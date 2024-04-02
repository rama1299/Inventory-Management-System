import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';
import { authentication } from '../middlewares/authentication';
import { authorization } from '../middlewares/authorization';

const router = Router();

router.get('/transaction', authentication, authorization(['admin', 'staff']), TransactionController.findAll);
router.get('/transaction/:id', authentication, authorization(['admin', 'staff']), TransactionController.findById);
router.post('/transaction', authentication, authorization(['admin']), TransactionController.createTransaction);
router.put('/transaction/:id', authentication, authorization(['admin']), TransactionController.update);
router.delete('/transaction/:id', authentication, authorization(['admin']), TransactionController.delete);

export default router;