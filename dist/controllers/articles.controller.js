import ArticleModel from "../models/article.model.js";
import { validateArticle } from "../utils/validation/validateArticle.js";
import { parseArticleData } from "../utils/parseData/parseArticleData.js";
import UserModel from "../models/user.model.js";
export const getAllArticles = async (req, res, next) => {
    try {
        const userId = req.userId;
        const user = await UserModel.findById(userId);
        if (user.type === "Editor") {
            const articles = await ArticleModel.find({}).populate({ path: "writer" }).populate({ path: "editor" }).populate({ path: "company" });
            res.status(200).json([...articles]);
        }
        else if (user.type === "Writer") {
            const articles = await ArticleModel.find({ $or: [{ writer: userId }, { editor: userId }] }).populate({ path: "writer" }).populate({ path: "editor" }).populate({ path: "company" });
            res.status(200).json([...articles]);
        }
    }
    catch (e) {
        next(e);
    }
};
export const addArticle = async (req, res, next) => {
    try {
        const userId = req.userId;
        const companyId = req.params.companyId;
        const formData = req.body;
        validateArticle(formData);
        const parsedData = parseArticleData(formData);
        const newArticle = new ArticleModel({ ...parsedData, writer: userId, company: companyId });
        await newArticle.save();
        res.status(201).json({ ok: true });
    }
    catch (e) {
        next(e);
    }
};
export const editArticle = async (req, res, next) => {
    try {
        const userId = req.userId;
        const articleId = req.params.articleId;
        const formData = req.body;
        validateArticle(formData);
        const parsedData = parseArticleData(formData);
        const newArticle = await ArticleModel.findByIdAndUpdate(articleId, { ...formData });
        await newArticle.save();
        res.status(200).json({ ok: true });
    }
    catch (e) {
        next(e);
    }
};
export const deleteArticle = async (req, res, next) => {
    try {
        const userId = req.userId;
        const articleId = req.params.articleId;
        console.log(articleId);
        const newArticle = await ArticleModel.findByIdAndDelete(articleId);
        res.status(200).json({ ok: true });
    }
    catch (e) {
        next(e);
    }
};
export const publishArticle = async (req, res, next) => {
    try {
        const userId = req.userId;
        const articleId = req.params.articleId;
        const formData = req.body;
        validateArticle(formData);
        const user = await UserModel.findById(userId);
        if (user.type !== "Editor")
            res.status(400).json("You must be an editor to publish");
        const newArticle = await ArticleModel.findByIdAndUpdate(articleId, { ...formData, status: "Published", editor: user });
        newArticle.editor = user;
        await newArticle.save();
        res.status(200).json({ ok: true });
    }
    catch (e) {
        next(e);
    }
};
//# sourceMappingURL=articles.controller.js.map