import { IUser } from "src/models/user.model.js";
import { hashPassword } from "../auth.js"
import { RegistrationFormData } from "../validation/validateUser.js"

export const parseFormData = async (formData: RegistrationFormData): Promise<IUser> =>{
    const hashedPassword = await hashPassword(formData.password);
    return {
        email: formData.email,
        firstname: formData.firstName,
        lastname: formData.lastName,
        password: hashedPassword,
        type: formData.type,
        status: formData.status
    }
}