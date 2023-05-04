import { Schema, model, Types } from 'mongoose';
const ArticleSchema = new Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String, required: true },
    date: { type: Date, required: true, default: new Date() },
    content: { type: String, required: true },
    status: { type: String, enum: ['For Edit', 'Published'], default: "For Edit" },
    writer: { type: Types.ObjectId, ref: 'User', required: true },
    editor: { type: Types.ObjectId, ref: 'User', default: null },
    company: { type: Types.ObjectId, ref: 'Company', required: true },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});
const ArticleModel = model('iarticle', ArticleSchema);
export default ArticleModel;
//# sourceMappingURL=article.model.js.map