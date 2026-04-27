const pptxgen = require("pptxgenjs");
const theme = require("./theme.js");
const pptx = new pptxgen();

theme.updatePresentationSettings(
  "AI-Powered PPTX Generation",
  "04/14/2026",
  "./assets/Exyte_RGB.svg.png"
);
theme.resetSlideCounter(0);

const slides = [
  "./slides/slide01_Introduction.js",
  "./slides/slide02_TheProblem.js",
  "./slides/slide03_PythonPptx.js",
  "./slides/slide04_PptxGenJS.js",
  "./slides/slide05_ProofOfConcept.js",
];

theme.TOTAL_SLIDES = slides.length;
slides.forEach((path) => require(path)(pptx, theme));
pptx.writeFile({ fileName: "output.pptx" });
