import express from 'express';
import { getIdFromJWT, requireSignin } from '../middleware/auth.middleware.js';
import { addCompany, deleteCompany, editCompany, getAllCompanies, getCompanyById } from '../controllers/company.controller.js';
const router = express.Router();
router.get("/getAll", requireSignin, getAllCompanies);
router.get("/get/:companyId", requireSignin, getCompanyById);
router.post('/add', requireSignin, addCompany);
router.delete('/delete/:companyId', requireSignin, getIdFromJWT, deleteCompany);
router.put('/edit/:companyId', requireSignin, getIdFromJWT, editCompany);
export default router;
//# sourceMappingURL=company.route.js.map