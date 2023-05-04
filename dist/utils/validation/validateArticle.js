import { ValidationError } from "../error.js";
import { checkIsValidUrl } from "./check.js";
export const validateArticle = (formData) => {
    // Validate image URL
    if (!checkIsValidUrl(formData.image)) {
        throw new ValidationError('Image URL is not valid.');
    }
    // Validate title
    if (formData.title.trim().length === 0) {
        throw new ValidationError('Title is required.');
    }
    // Validate link URL
    if (!checkIsValidUrl(formData.link)) {
        throw new ValidationError('Link URL is not valid.');
    }
    // Validate content
    if (formData.content.trim().length === 0) {
        throw new ValidationError('Content is required.');
    }
    // validate date
    if (!formData.date) {
        throw new ValidationError("Date is required");
    }
};
//# sourceMappingURL=validateArticle.js.map