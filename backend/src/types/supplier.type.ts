import {Document, Types} from "mongoose";

export interface ISupplier extends Document {

    name: string;
    contact:{
        email?: string;
        phone?: string;
        address?: string;
    };
    productsSupplied: Types.ObjectId[];
    reliabilityRating: number;
    createdAt?: Date;
    updatedAt?: Date;
    

}