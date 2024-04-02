import { Router } from 'express';
import authRouter from './authRouter'
import productRouter from './productRouter'
import transactionRouter from './transactionRouter'
import transactionDetailRouter from './transactionDetailRouter'

const router = Router()

router.use(authRouter)
router.use(productRouter)
router.use(transactionRouter)
router.use(transactionDetailRouter)

export default router