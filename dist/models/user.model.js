import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    type: { type: String, enum: ['Writer', 'Editor'], required: true },
    status: { type: String, enum: ['Active', 'Inactive'], required: true },
    password: { type: String, required: true, minlength: 6 }
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
const UserModel = model('User', UserSchema);
export default UserModel;
//# sourceMappingURL=user.model.js.map