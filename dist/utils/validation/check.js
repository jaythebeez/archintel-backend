export const checkIsValidUrl = (url) => {
    try {
        const newUrl = new URL(url);
        return true;
    }
    catch {
        return false;
    }
};
//# sourceMappingURL=check.js.map