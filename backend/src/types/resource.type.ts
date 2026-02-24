import { Document , Types} from 'mongoose';

export interface IResource extends Document{
    name: string;
    category: string;
    quantity: number;
    unit: string;
    reorderLevel: number;
    supplier: Types.ObjectId;
    barcode?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}