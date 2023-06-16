import { Router } from "express";
import { check } from "express-validator";
import { DeleteProduct, DeleteProducts, GetProductById, GetProducts, PostProduct, PutProduct } from "../controllers/products.controller";
import ValidateRequest from "../middlewares/validateRequest";


const ProductsRouter = Router();
ProductsRouter.get('/', GetProducts);
ProductsRouter.get('/:id',
    [
        check('id', 'ID is required').not().isEmpty(),
        ValidateRequest
    ]
    , GetProductById);
ProductsRouter.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    ValidateRequest
],
    PostProduct);


ProductsRouter.put('/deleteItems',
    [
        check('data', 'Data is required').not().isEmpty(),
        ValidateRequest
    ]
    , DeleteProducts);


ProductsRouter.put('/:id',
    [
        check('id', 'ID is required').not().isEmpty(),
        ValidateRequest
    ]
    , PutProduct);



ProductsRouter.delete('/:id',
    [
        check('id', 'ID is required').not().isEmpty(),
        ValidateRequest
    ]
    , DeleteProduct);




export default ProductsRouter;