import express from "express";
import accountsRouter from "./acounts.route.js";
import companyRouter from "./company.route.js";
import articlesRouter from "./articles.route.js";


const indexRouter = express.Router();
indexRouter.get("/check", (req, res)=>res.status(200).send({ok: true}))

indexRouter.use("/accounts", accountsRouter)
indexRouter.use("/company", companyRouter);
indexRouter.use("/articles", articlesRouter);

export default indexRouter;