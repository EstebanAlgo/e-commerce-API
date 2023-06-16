import { Request, Response } from "express";
import ProductModel from "../models/products.model";

/** Obtenemos todos loos productos */
export const GetProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.findAll({ where: { active: true } });
        return res.status(200).json(products)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Contact the administrator' })
    }
};

/** Obtenemos un producto por ID */
export const GetProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product: any = await ProductModel.findOne({ where: { id }, attributes: { exclude: ['createdAt', 'updatedAt'] } });

        if (!product) return res.status(404).json({ msg: 'Product not found' })


        let response = { ...product.dataValues, id: `${product.id}` };

        return res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Contact the administrator' })
    }
}

/** Creamos un producto */
export const PostProduct = async (req: Request, res: Response) => {

    const { name,
        handle,
        description,
        categories,
        tags,
        priceTaxExcl,
        priceTaxIncl,
        taxRate,
        comparedPrice,
        quantity,
        sku,
        width,
        height,
        depth,
        weight,
        extraShippingFee } = req.body;

    try {

        const images = [{ "id": "0", "url": "assets/images/apps/ecommerce/a-walk-amongst-friends.jpg", "type": "image" }, { "id": "1", "url": "assets/images/apps/ecommerce/braies-lake.jpg", "type": "image" }, { "id": "2", "url": "assets/images/apps/ecommerce/fall-glow.jpg", "type": "image" }, { "id": "3", "url": "assets/images/apps/ecommerce/first-snow.jpg", "type": "image" }, { "id": "4", "url": "assets/images/apps/ecommerce/lago-di-braies.jpg", "type": "image" }, { "id": "5", "url": "assets/images/apps/ecommerce/lago-di-sorapis.jpg", "type": "image" }, { "id": "6", "url": "assets/images/apps/ecommerce/never-stop-changing.jpg", "type": "image" }, { "id": "7", "url": "assets/images/apps/ecommerce/reaching.jpg", "type": "image" }, { "id": "8", "url": "assets/images/apps/ecommerce/morain-lake.jpg", "type": "image" }, { "id": "9", "url": "assets/images/apps/ecommerce/yosemite.jpg", "type": "image" }];

        //generamos un numero aleatorio entero de 1-10
        const featuredImageId = Math.floor(Math.random() * 10) + 1;
        const newProduct = await ProductModel.build({
            name,
            handle,
            description,
            categories,
            tags,
            featuredImageId,
            images,
            priceTaxExcl,
            priceTaxIncl,
            taxRate,
            comparedPrice,
            quantity,
            sku,
            width,
            height,
            depth,
            weight,
            extraShippingFee
        }).save();

        if (!newProduct) return res.status(400).json({ msg: 'Error creating product' })

        return res.status(201).json(newProduct);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Contact the administrator' })
    }
}

/** Actualizamos un producto */
export const PutProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { name,
        handle,
        description,
        categories,
        tags,
        featuredImageId,
        images,
        priceTaxExcl,
        priceTaxIncl,
        taxRate,
        comparedPrice,
        quantity,
        sku,
        width,
        height,
        depth,
        weight,
        extraShippingFee } = req.body;

    try {

        const product = await ProductModel.findByPk(id);

        if (!product) return res.status(404).json({ msg: 'Product not found' })

        await product.update({ name, handle, description, categories, tags, featuredImageId, images, priceTaxExcl, priceTaxIncl, taxRate, comparedPrice, quantity, sku, width, height, depth, weight, extraShippingFee });

        const products = await ProductModel.findAll({ where: { active: true } });
        return res.status(200).json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Contact the administrator' })
    }
}

/** Eliminamos un producto */
export const DeleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    try {

        const product = await ProductModel.findByPk(id);

        if (!product) return res.status(404).json({ msg: 'Product not found' })

        await product.update({ active: false });

        return res.status(200).json({ msg: 'Product deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Contact the administrator' })
    }
}

/** Eliminamos varios articulos */

export const DeleteProducts = async (req: Request, res: Response) => {

    const { data } = req.body;

    try {
        for (const product of data) {
            const productDelete = await ProductModel.findByPk(product);
            if (productDelete) await productDelete.update({ active: false });
        }
        return res.status(200).json({ msg: 'Products deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Contact the administrator' })
    }
}