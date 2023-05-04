import CompanyModel from "../models/company.model.js";
import { validateCompany } from "../utils/validation/validateCompany.js";
export const addCompany = async (req, res, next) => {
    try {
        const formData = req.body;
        validateCompany(formData);
        const newCompany = new CompanyModel({ ...formData });
        await newCompany.save();
        res.status(200).json({ ok: true });
    }
    catch (e) {
        next(e);
    }
};
export const getAllCompanies = async (req, res, next) => {
    try {
        const companies = await CompanyModel.find();
        const companiesData = companies.map(item => { return { id: item.id, status: item.status, logo: item.logo, name: item.name }; });
        res.status(200).json([companiesData]);
    }
    catch (e) {
        next(e);
    }
};
export const getCompanyById = async (req, res, next) => {
    try {
        const companyId = req.params.id;
        const company = await CompanyModel.findById(companyId);
        res.status(200).json({ ...company });
    }
    catch (e) {
        next(e);
    }
};
//# sourceMappingURL=company.controller.js.map