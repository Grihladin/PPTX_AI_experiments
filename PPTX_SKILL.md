# Presentation Generator -- Exyte Corporate Blue

Generate a PowerPoint presentation from a Markdown content file using `pptxgenjs` and the design system in `theme.js`.

**Input:** `$ARGUMENTS` (path to a .md file containing slide content)

## Design Rules

- Design clean, readable slides. Use cards, bullet points, tables, and shapes/graphics where they fit.
- Vary the layout across slides so the deck does not feel repetitive.
- Use pptxgenjs shapes to build simple diagrams, flowcharts, or visual elements when they communicate an idea better than text alone.
- No emoji.
- Do not use vertical accent bars (left-side colored bars) on callout boxes or cards. Use background color and rounded corners instead.

## Workflow

1. Read the provided .md file for content.
2. Create a task/TODO for each slide before starting.
3. Build one slide at a time.
4. Create/update `build.js` after all slides are done, then run `node build.js` to verify.

## Slide File Pattern

One file per slide in `slides/`. Each exports `function(pptx, theme)`:

```javascript
module.exports = function (pptx, theme) {
  const slide = pptx.addSlide();
  theme.applySlideBase(slide);        // bg, logo, footer (required)
  // theme.addTitle(slide, "Title");   // optional -- skip for statement/quote slides
  // ... free content below
};
```

## Free Content Box

All custom content goes inside this safe area (inches):

```
x: 0.8   y: 1.15   w: 8.4   h: 3.85
```

Available via `theme.LAYOUT.FREE_X/Y/W/H`.

## API Quick Reference

Read `node_modules/pptxgenjs/types/index.d.ts` for the full API.

**Theme helpers** (use or skip -- your choice):
- `addTitle(slide, text)` -- cyan header top-left
- `addSubtitle(slide, text)` -- italic below title
- `addBody(slide, textOrArray, overrides?)` -- body text block
- `addStyledTable(slide, headers, rows, opts?)` -- themed table
- `makeTextRun(text, opts?)` -- styled text run
- `addCalloutBox(slide, textRuns, opts?)` -- accent box

**Colors**: `COLORS.ACCENT` = `009CDE` (Exyte cyan), `COLORS.TEXT_BODY` = `3C3C3C`, `COLORS.BG_CARD` = `F0F7FB`, `COLORS.BG_SURFACE` = `E3EFF6`, `COLORS.BORDER` = `C4D9E8`

**Fonts**: Arial everywhere. Mono: Consolas.

## Slide Naming

Name each slide file `slideNN_DescriptiveName.js` where `NN` is the zero-padded number and `DescriptiveName` is a short PascalCase name based on the slide content (e.g. `slide01_TitleSlide.js`, `slide04_MarketOverview.js`).

## build.js Pattern

- **Title**: Choose a concise, descriptive presentation title based on the .md file content.
- **Date**: Use today's date in `MM/DD/YYYY` format.
- **Logo**: Always `"./assets/Exyte_RGB.svg.png"`.

```javascript
const pptxgen = require("pptxgenjs");
const theme = require("./theme.js");
const pptx = new pptxgen();

theme.updatePresentationSettings("<title from content>", "<today MM/DD/YYYY>", "./assets/Exyte_RGB.svg.png");
theme.resetSlideCounter(0);

const slides = [
  "./slides/slide01_TitleSlide.js",
  // ... all slides
];

theme.TOTAL_SLIDES = slides.length;
slides.forEach((path) => require(path)(pptx, theme));
pptx.writeFile({ fileName: "output.pptx" });
```
