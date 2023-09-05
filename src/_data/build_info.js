module.exports = async () => {
  const buildYear = new Date().getFullYear();
  return {
    year: buildYear,
    domain: "ifsrenderer.z97.io",
  };
};
