import {Schema, model } from "mongoose";
import {IResource} from "../types/resource.type";

const resourceSchema = new Schema<IResource>({
    
    name: {type: String, required: true, trim: true, index: true},
    category: {type: String, required: true, trim: true, index: true},
    quantity: {type: Number, required: true, min: 0, index: true},
    unit: {type: String, required: true},
    reorderLevel: {type: Number, required: true, default: 10},
    supplier: {type: Schema.Types.ObjectId, ref: "Supplier", required: true},
    barcode: {type: String},
    isActive: {type: Boolean, default: true},  
},

{timestamps: true}

);

// Compound index for optimized queries
resourceSchema.index({ name: 1, category: 1 });

export const Resource = model<IResource>("Resource", resourceSchema);