import { ValidationError } from "../error.js";
import { checkIsValidUrl } from "./check.js";
export interface CompanyFormData {
    logo: string,
    name: string,
    status: "Active" | "Inactive"
}

export const validateCompany = (formData: CompanyFormData) => {
    if (!formData.logo || !checkIsValidUrl(formData.logo)) {
        throw new ValidationError("Invalid Url");
    }
    if (!formData.name || formData.name.length < 1) {
      throw new ValidationError('First name is required');
    }
    if(formData.status !== "Active" && formData.status !== "Inactive"){
      throw new ValidationError("Status should be active or inactive")
    }
}