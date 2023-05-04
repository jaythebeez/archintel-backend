import { ArticleFormData } from "../validation/validateArticle.js";

export const parseArticleData = (formData: ArticleFormData) => {
    return {
        image: formData.image,
        link: formData.link,
        title: formData.title,
        content: formData.content,
        date: formData.date
    }
}