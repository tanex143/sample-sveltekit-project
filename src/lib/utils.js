export const generateRandomId = () => {
    const randomId =
        Math.random().toString(36).substr(2, 9) +
        Math.random().toString(36).substr(2, 9);
    return randomId;
};
