import { Schema, model, Document, Types } from 'mongoose';

// Define the ICompany schema
export interface ICompany {
  logo: string;
  name: string;
  status: 'Active' | 'Inactive';
}

interface ICompanyDocument extends Document, ICompany {}

const CompanySchema = new Schema<ICompanyDocument>({
  logo: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true },
}, {
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

const CompanyModel = model<ICompanyDocument>('Company', CompanySchema);

export default CompanyModel;