import {Schema, model} from "mongoose";
import type {IInventoryTransaction} from "../types/inventoryTransaction.type.js";

const inventoryTransactionSchema =  new Schema<IInventoryTransaction>(
{
    product: { type: Schema.Types.ObjectId, ref: "Resource", required: true, index: true },
    type: {type: String, enum: ["ADD", "REMOVE", "TRANSFER"], required: true, },
    quantity: {type: Number, required: true, min: 1},
    user: {type:Schema.Types.ObjectId, ref: "User", required: true},
    reason: {type: String, required: true},
    date: {type: Date, default: Date.now},
}, 

{timestamps :true}

);

export const InventoryTransaction = model<IInventoryTransaction>(
    "InventoryTransaction", inventoryTransactionSchema);