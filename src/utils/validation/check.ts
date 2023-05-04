export const checkIsValidUrl = (url: string) => {
    try {
        const newUrl = new URL(url);
        return true;
      } catch {
        return false;
    }
}