import { Router } from "express";
import { TransactionDetailController } from "../controllers/transactionDetailController";
import { authentication } from '../middlewares/authentication';
import { authorization } from '../middlewares/authorization';

const router = Router();

router.get('/transaction-detail', authentication, authorization(['admin', 'staff']), TransactionDetailController.findAll)
router.get('/transaction-detail/:id', authentication, authorization(['admin', 'staff']), TransactionDetailController.findById)
router.put('/transaction-detail/:id', authentication, authorization(['admin']), TransactionDetailController.update)
router.delete('/transaction-detail/:id', authentication, authorization(['admin']), TransactionDetailController.delete)

export default router;