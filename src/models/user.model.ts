import { Schema, model, Document, Types } from 'mongoose';

// Define the IUser schema
export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    type: 'Writer' | 'Editor';
    status: 'Active' | 'Inactive';
    password: string
}

interface IUserDocument extends IUser, Document {}
  
const UserSchema = new Schema<IUserDocument>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    type: { type: String, enum: ['Writer', 'Editor'], required: true },
    status: { type: String, enum: ['Active', 'Inactive'], required: true },
    password: {type: String, required: true, minlength: 6}
}, {
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
});

const UserModel = model<IUserDocument>('User', UserSchema);
export default UserModel;