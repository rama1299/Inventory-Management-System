import { Request, Response, NextFunction } from "express";
import { Product, ProductCreate, ProductModel, ProductUpdate, ProductUpdateImage } from "../models/productModel";
import dotenv from 'dotenv';

dotenv.config();

export class ProductController {
    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductModel.findAll()

            if (product.length == 0) {
                throw { name: 'ErrorNotFound' }
            }

            res.status(200).json(product)
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

            const product = await ProductModel.findById(id)

            if (!product) {
                throw { name: 'ErrorNotFound' }
            }

            res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            let { name, description, price, stock_quantity } = req.body

            if (!name || !price || !stock_quantity) {
                throw { name: 'InvalidCredentials' }
            }

            if (description == undefined) {
                description = null
            }

            const dataNewProduct: ProductCreate = {
                name,
                description,
                price,
                stock_quantity
            }

            const createProduct = await ProductModel.create(dataNewProduct)

            if (createProduct.affectedRows == 0) {
                return res.status(500).json({ message: 'Create product failed!' })
            }

            const newProduct = {
                id: createProduct.insertId,
                name,
                description,
                price,
                stock_quantity
            } as Product

            res.status(201).json(newProduct)

        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {

        const id = parseFloat(req.params.id)

        let { name, description, price, stock_quantity } = req.body

        try {

            if (!id) {
                return res.status(400).json({ message: 'ID must be provided and must be a number' });
            }

            if (!name || !price || !stock_quantity) {
                throw { name: 'InvalidCredentials' }
            }

            if (description == undefined) {
                description = null
            }

            const dataUpdateProduct: ProductUpdate = {
                id,
                name,
                description,
                price,
                stock_quantity
            }

            const updateProduct = await ProductModel.update(dataUpdateProduct)

            if (updateProduct.affectedRows == 0) {
                return res.status(500).json({ message: 'Update product failed!' })
            }

            res.status(200).json(dataUpdateProduct)

        } catch (error) {
            next(error)
        }
    }

    static async updateImage(req: Request, res: Response, next: NextFunction) {
        const id = parseFloat(req.params.id)

        try {

            if (!id) {
                return res.status(400).json({ message: 'ID must be provided and must be a number' });
            }

            const existProduct = await ProductModel.findById(id)

            if (!existProduct) {
                return res.status(404).json({ message: 'Product not found' })
            }

            const fileName = req.file?.filename

            const image_url = `http://localhost:${process.env.PORT}/uploads/${fileName}`

            const dataUpdate: ProductUpdateImage = {
                id,
                image_url
            }

            const updateImageProduct = await ProductModel.updateImageUrl(dataUpdate)

            if (updateImageProduct.affectedRows == 0) {
                return res.status(500).json({ message: 'Update product failed!' })
            }

            res.status(200).json({ message: 'Update image product successfully!' })
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

            const deleteProduct = await ProductModel.delete(id)

            if (deleteProduct.affectedRows == 0) {
                return res.status(500).json({ message: 'Delete product failed!' })
            }

            res.status(200).json({ message: 'Delete product successfully!' })
        } catch (error) {
            next(error)
        }
    }
}