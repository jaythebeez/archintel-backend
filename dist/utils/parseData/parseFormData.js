import { hashPassword } from "../auth.js";
export const parseFormData = async (formData) => {
    const hashedPassword = await hashPassword(formData.password);
    return {
        email: formData.email,
        firstname: formData.firstName,
        lastname: formData.lastName,
        password: hashedPassword,
        type: formData.type,
        status: formData.status
    };
};
//# sourceMappingURL=parseFormData.js.map