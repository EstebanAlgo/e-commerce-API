import { DataTypes, Model } from "sequelize";
import DbCVRConnection from "../db/connection";
interface ProductInstance extends Model {
    id: number;
    name: string;
    handle: string;
    description: string;
    categories: any;
    tags: any;
    featuredImageId: string;
    images: any;
    priceTaxExcl: number;
    priceTaxIncl: number;
    taxRate: number;
    comparedPrice: number;
    quantity: number;
    sku: string;
    width: string;
    height: string;
    depth: string;
    weight: string;
    extraShippingFee: number;
    active: boolean;
}

const ProductModel = DbCVRConnection.define<ProductInstance>('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    handle: DataTypes.STRING,
    description: DataTypes.STRING,
    categories: DataTypes.JSON,
    tags: DataTypes.JSON,
    featuredImageId: DataTypes.STRING,
    images: DataTypes.JSON,
    priceTaxExcl: DataTypes.NUMBER,
    priceTaxIncl: DataTypes.NUMBER,
    taxRate: DataTypes.NUMBER,
    comparedPrice: DataTypes.NUMBER,
    quantity: DataTypes.NUMBER,
    sku: DataTypes.STRING,
    width: DataTypes.STRING,
    height: DataTypes.STRING,
    depth: DataTypes.STRING,
    weight: DataTypes.STRING,
    extraShippingFee: DataTypes.NUMBER,
    active: DataTypes.BOOLEAN
});
export default ProductModel;