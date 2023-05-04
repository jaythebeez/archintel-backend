import { Response, NextFunction } from "express";
import CompanyModel from "../models/company.model.js";
import { AuthenticatedRequest } from "../types/request.js";
import { CompanyFormData, validateCompany } from "../utils/validation/validateCompany.js";

export const addCompany = async (req: AuthenticatedRequest, res:Response, next: NextFunction) => {
    try{
        const formData: CompanyFormData = req.body;
        validateCompany(formData);
        const newCompany = new CompanyModel({...formData});
        await newCompany.save();
        res.status(200).json({ok: true});
    }
    catch(e){
        next(e)
    }
}

export const getAllCompanies = async (req: AuthenticatedRequest, res:Response, next: NextFunction) => {
    try{
        const companies = await CompanyModel.find();
        const companiesData = companies.map(item=>{return{ id: item.id, status: item.status, logo: item.logo, name: item.name}})
        res.status(200).json([companiesData]);
    }
    catch(e){
        next(e)
    }
}

export const getCompanyById = async (req: AuthenticatedRequest, res:Response, next: NextFunction) => {
    try{
        const companyId = req.params.id;

        const company = await CompanyModel.findById(companyId);

        res.status(200).json({...company});
    }
    catch(e){
        next(e)
    }
}