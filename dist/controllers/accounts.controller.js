import jwt from 'jsonwebtoken';
import { AuthenticationError, ValidationError } from "../utils/error.js";
import { comparePassword } from "../utils/auth.js";
import UserModel from "../models/user.model.js";
// Validation
import { parseFormData } from '../utils/parseData/parseFormData.js';
import { validateFormData } from '../utils/validation/validateUser.js';
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res, next) => {
    try {
        const formData = req.body;
        // validate the user from the form 
        validateFormData(formData);
        // parse the data
        const parseData = await parseFormData(formData);
        // create new user and save
        const newUser = new UserModel({ ...parseData });
        await newUser.save();
        res.status(201).json({ status: "ok" });
    }
    catch (e) {
        next(e);
    }
};
export const login = async (req, res, next) => {
    try {
        // get login details from request
        const { email, password } = req.body;
        if (email.length < 1 || password.length < 4) {
            throw new ValidationError("Email and password are required");
        }
        // check to see if user is in system and return with error message
        const user = await UserModel.findOne({ email });
        if (!user)
            throw new AuthenticationError("User not Found");
        const match = await comparePassword(password, user.password);
        if (!match)
            throw new AuthenticationError("Password is not a match");
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, { secure: true, sameSite: "lax", httpOnly: false });
        const { status, email: emailData, id, type, firstname, lastname } = user;
        res.status(200).json({ status, email: emailData, type, firstname, lastname, id, token });
    }
    catch (e) {
        next(e);
    }
};
export const logout = async (req, res) => {
    try {
        // clear cookie from user seystem
        res.clearCookie('token');
        // response to determine logout was successful
        res.status(200).json({ msg: 'Logged out Successful' });
    }
    catch (err) {
        res.status(400).send('Error Logging out');
    }
};
//# sourceMappingURL=accounts.controller.js.map