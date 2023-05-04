const errorHandler = (error, req, res, next) => {
    res.status(400).json({ message: error.message, name: error.name });
};
export default errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map