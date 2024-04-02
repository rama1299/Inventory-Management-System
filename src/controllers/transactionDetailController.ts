import { Request, Response, NextFunction } from "express";
import { TransactionDetail, TransactionDetailModel } from "../models/transactionDetailModel";
import { Transaction } from "../models/transactionModel";

export class TransactionDetailController {
    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const transactionDetail = await TransactionDetailModel.findAll()

            if (transactionDetail.length == 0) {
                throw { name: 'ErrorNotFound' }
            }

            res.status(200).json(transactionDetail)
        } catch (error) {
            next(error)
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction) {
        const id = parseFloat(req.params.id)

        try {

            if (!id) {
                return res.status(400).json({ message: 'ID must be provided and must be a number' });
            }

            const transactionDetail = await TransactionDetailModel.findById(id)

            if (!transactionDetail) {
                throw { name: 'ErrorNotFound' }
            }

            res.status(200).json(transactionDetail)
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const id = parseFloat(req.params.id)
        const { product_id, quantity, price_unit, total_price } = req.body

        try {

            if (!id) {
                return res.status(400).json({ message: 'ID must be provided and must be a number' });
            }

            if (!product_id || !quantity || !price_unit || !total_price) {
                throw { name: 'InvalidCredentials' }
            }

            const existTransactonDetail = await TransactionDetailModel.existTransactionById(id)

            if (!existTransactonDetail) {
                throw { name: 'ErrorNotFound' }
            }

            const newDataTransactionDet: TransactionDetail = {
                id,
                product_id,
                quantity,
                price_unit,
                total_price
            }

            const updateTransactionDetail = await TransactionDetailModel.update(newDataTransactionDet)

            if (updateTransactionDetail.affectedRows == 0) {
                return res.status(500).json({ message: 'Update transaction detail failed!' })
            }

            res.status(200).json({ message: 'update transaction detail successfully!' })
        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const id = parseFloat(req.params.id)

        try {
            if (!id) {
                return res.status(400).json({ message: 'ID must be provided and must be a number' });
            }

            const deleteTransaction = await TransactionDetailModel.delete(id)

            if (deleteTransaction.affectedRows == 0) {
                return res.status(500).json({ message: 'Delete transaction detail failed!' })
            }

            res.status(200).json({ message: 'Delete transaction detail successfully!' })

        } catch (error) {
            next(error)
        }
    }
}