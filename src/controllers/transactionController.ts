import { Request, Response, NextFunction } from "express";
import { connection } from "../config/database";
import { Transaction, TransactionCreate, TransactionModel } from "../models/transactionModel";
import { TransactionDetailCreate, TransactionDetailModel } from "../models/transactionDetailModel";

export class TransactionController {

    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const transactions = await TransactionModel.findAll()

            if (transactions.length == 0) {
                throw { name: 'ErrorNotFound' }
            }

            res.status(200).json(transactions)
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

            const transaction = await TransactionModel.findById(id)

            if (!transaction) {
                throw { name: 'ErrorNotFound' }
            }

            res.status(200).json(transaction)
        } catch (error) {
            next(error)
        }
    }

    static async createTransaction(req: Request, res: Response, next: NextFunction) {

        let customer_id = parseFloat(req.body.customer_id)
        let product_id = parseFloat(req.body.product_id)
        let price_unit = parseFloat(req.body.price_unit)
        let quantity = parseFloat(req.body.quantity)
        let total_price = parseFloat(req.body.total_price)

        try {
            await connection.beginTransaction()

            if (!customer_id || !product_id || !price_unit || !quantity || !total_price) {
                return res.status(400).json({ message: 'Must be provided and must be a number' });
            }

            const dataTransaction: TransactionCreate = {
                customer_id,
                transaction_date: new Date(),
            }

            const createTransaction = await TransactionModel.create(dataTransaction)

            if (createTransaction.affectedRows == 0) {
                return res.status(500).json({ message: 'Create transaction failed!' })
            }

            const dataTransactionDetail: TransactionDetailCreate = {
                transaction_id: createTransaction.insertId,
                product_id,
                quantity,
                price_unit,
                total_price
            }

            const createTransactionDetail = await TransactionDetailModel.create(dataTransactionDetail)

            if (createTransactionDetail.affectedRows == 0) {
                return res.status(500).json({ message: 'Create transaction detail failed!' })
            }

            await connection.commit()

            res.status(201).json({ message: 'Create transaction successfully!' })
        } catch (error) {
            await connection.rollback()
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const id = parseFloat(req.params.id)
        const newCustomer_id = parseFloat(req.body.customer_id)

        try {

            if (!id || !newCustomer_id) {
                return res.status(400).json({ message: 'must be provided and must be a number' });
            }

            const existTransaction = await TransactionModel.findById(id)

            if (!existTransaction) {
                throw { name: 'ErrorNotFound' }
            }

            const updateTransaction = await TransactionModel.update(id, newCustomer_id)

            if (updateTransaction.affectedRows == 0) {
                return res.status(500).json({ message: 'Update product failed!' })
            }

            res.status(200).json({ message: 'Update transaction successfully!' })
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

            const deleteTransaction = await TransactionModel.delete(id)

            if (deleteTransaction.affectedRows == 0) {
                return res.status(500).json({ message: 'Delete transaction failed!' })
            }

            res.status(200).json({ message: 'Delete transaction successfully!' })

        } catch (error) {
            next(error)
        }
    }
}