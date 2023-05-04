import { Schema, model } from 'mongoose';
const CompanySchema = new Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    status: { type: String, enum: ['Active', 'Inactive'], required: true },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
const CompanyModel = model('Company', CompanySchema);
export default CompanyModel;
//# sourceMappingURL=company.model.js.map