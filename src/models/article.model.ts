import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from './user.model.js';
import { ICompany } from './company.model.js';

// Define the IArticle schema
export interface IArticle {
    image: string;
    title: string;
    link: string;
    date: Date;
    content: string;
    status: 'For Edit' | 'Published';
    writer: Types.ObjectId | IUser;
    editor: Types.ObjectId | IUser;
    company: Types.ObjectId | ICompany;
}

interface IArticleDocument  extends Document, IArticle {}
  
const ArticleSchema = new Schema<IArticleDocument>({
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
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
});

  
const ArticleModel = model<IArticleDocument>('iarticle', ArticleSchema);
export default ArticleModel;
  