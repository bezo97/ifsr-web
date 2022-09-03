module.exports = async () => {
    const buildYear = new Date().getFullYear();
    return {
        year: buildYear
    };
};
