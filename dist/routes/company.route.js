import express from 'express';
import { requireSignin } from '../middleware/auth.middleware.js';
import { addCompany, getAllCompanies, getCompanyById } from '../controllers/company.controller.js';
const router = express.Router();
router.get("/getAll", requireSignin, getAllCompanies);
router.get("/get/:companyId", requireSignin, getCompanyById);
router.post('/add', requireSignin, addCompany);
export default router;
//# sourceMappingURL=company.route.js.map