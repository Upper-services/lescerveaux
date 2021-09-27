const withTM = require("next-transpile-modules")([
  "@cloudinary/react",
  "@cloudinary/url-gen",
]);

module.exports = withTM({
  images: {
    domains: ["res.cloudinary.com", "fiverr-res.cloudinary.com"],
  },
  poweredByHeader: false,
});
