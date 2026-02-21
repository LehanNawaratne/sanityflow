import {Schema , model } from "mongoose";
import {ISupplier} from "../types/supplier.type";

const supplierSchema = new Schema<ISupplier>({

    name: {type: String, required: true, trim: true, unique: true}, 
    contact: {
        email: {type: String},
        phone: {type: String},
        address: {type: String},
    },
    productsSupplied: [
        {   
            type: Schema.Types.ObjectId, 
            ref: "Resource",
        }, ],


    reliabilityRating: 
    {type: Number, min: 1, max: 5, default: 3},

}, {timestamps: true}

);

export const Supplier = model<ISupplier>("Supplier", supplierSchema);
