import { Document, Types } from "mongoose";

export type TransactionType = "ADD" | "REMOVE" | "TRANSFER";

export interface IInventoryTransaction extends Document {

    product: Types.ObjectId;
    type: TransactionType;
    quantity: number;
    user: Types.ObjectId;
    reason: string;
    date: Date;

}