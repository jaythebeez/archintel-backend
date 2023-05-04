import { ValidationError } from "../error.js";

export interface RegistrationFormData {
  email: string;
  firstName: string;
  lastName: string;
  type: 'Writer' | 'Editor';
  status: 'Active' | 'Inactive';
  password: string
}

export function validateFormData (formData: RegistrationFormData): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email || typeof formData.email !== "string" || !emailRegex.test(formData.email)) {
      throw new ValidationError("Invalid email");
  }
  if (!formData.firstName) {
    throw new ValidationError('First name is required');
  }
  if (!formData.lastName) {
    throw new ValidationError('Last name is required');
  }
  if(formData.status !== "Active" && formData.status !== "Inactive"){
    throw new ValidationError("Status should be active or inactive")
  }
  if(formData.type !== "Writer" && formData.type !== "Editor"){
    throw new ValidationError("Status should be active or inactive")
  }
  if(!formData.password || formData.password.length < 1){
    throw new ValidationError("Password is invalid")
  }
}


