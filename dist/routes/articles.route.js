import express from 'express';
import { requireSignin, getIdFromJWT } from '../middleware/auth.middleware.js';
import { addArticle, getAllArticles, editArticle, deleteArticle, publishArticle } from '../controllers/articles.controller.js';
const router = express.Router();
router.get("/getAll", requireSignin, getIdFromJWT, getAllArticles);
router.post("/add/:companyId", requireSignin, getIdFromJWT, addArticle);
router.put("/edit/:articleId", requireSignin, getIdFromJWT, editArticle);
router.delete("/delete/:articleId", requireSignin, getIdFromJWT, deleteArticle);
router.put("/publish/:articleId", requireSignin, getIdFromJWT, publishArticle);
export default router;
//# sourceMappingURL=articles.route.js.map