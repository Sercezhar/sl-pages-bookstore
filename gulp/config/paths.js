const buildFolder = `./dist`;
const srcFolder = `./src`;

const paths = {
  build: {
    data: `${buildFolder}/data/`,
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    data: `${srcFolder}/data/`,
    html: `${srcFolder}/templates/*.twig`,
    css: `${srcFolder}/scss/*.scss`,
    js: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    fonts: `${srcFolder}/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
  },
  watch: {
    data: `${srcFolder}/data/**/*.json`,
    html: `${srcFolder}/templates/**/*.twig`,
    css: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    fonts: `${srcFolder}/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
  },
  clean: buildFolder,
  buildFolder,
  srcFolder,
};

module.exports = paths;
