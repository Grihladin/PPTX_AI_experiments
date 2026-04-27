# pptx-slide-generator

A prototype for AI-driven PowerPoint generation using [pptxgenjs](https://github.com/gitbrent/PptxGenJS) with a corporate theme system.

I built this during coffee breaks because I have never used PowerPoint and have no intention of ever learning it. Write your presentation content in Markdown, point an AI coding assistant at it, and get a branded `.pptx` file out -- no PowerPoint required.

## The Idea

Every slide has a hardcoded header (with the corporate logo) and a hardcoded footer (with the title, date, and page number). These are applied automatically by `theme.applySlideBase()` -- the AI never touches them. Everything in between is a free content area where the AI model builds the actual slide content: text, cards, tables, diagrams, whatever fits.

You control the look and feel through `theme.js`. It defines the brand colors, fonts, and size presets in one place. When the AI generates a slide, it reads these values instead of inventing its own -- so every slide stays on-brand without manual cleanup. Change a color in `theme.js` and it propagates to every slide on the next build.

```
+------------------------------------------+
|  [Logo]                          header   |  <- hardcoded by theme
|------------------------------------------|
|                                          |
|         free content area                |
|         (AI builds here)                 |
|                                          |
|------------------------------------------|
|  (c) Exyte | Title       date | page     |  <- hardcoded by theme
+------------------------------------------+
```

## How It Works

```
Markdown file  -->  AI reads content  -->  slide01.js, slide02.js, ...  -->  build.js  -->  output.pptx
```

1. **Content** lives in a Markdown file (see `content/Presentation_plan_example.md`).
2. **Slide files** in `slides/` each export a function that receives a `pptxgenjs` instance and the theme. One file per slide.
3. **`theme.js`** provides the Exyte Corporate Blue design system -- colors, fonts, layout constants, and helper functions (title, body text, tables, callout boxes).
4. **`build.js`** wires everything together: configures the presentation metadata, runs each slide function, and writes `output.pptx`.

## Quick Start

The repo ships with 5 example slides in `slides/` so you can see the output immediately:

```bash
npm install
npm run build        # runs node build.js --> output.pptx
```

Open `output.pptx` in PowerPoint, LibreOffice Impress, or Google Slides to see the generated presentation.

## Recommended AI Coding Tool

This project works with any AI coding assistant, but the recommended one is [OpenCode](https://github.com/opencode-ai/opencode). It is the best place to experiment with different models -- you can compare output from Claude, GPT, Gemini, and others to decide which suits your needs best. It is open-source and transparent.

The author currently uses Claude Code only because it is free for him at the moment.

To generate a presentation, point your AI coding assistant at `PPTX_SKILL.md` and a content Markdown file, and let it build the slides.

## Project Structure

```
.
├── assets/
│   └── Exyte_RGB.svg.png           # Corporate logo
├── content/
│   └── Presentation_plan_example.md  # Example content file
├── slides/                         # One JS file per slide
│   ├── slide01_Introduction.js
│   ├── slide02_TheProblem.js
│   └── ...
├── PPTX_SKILL.md                   # AI skill instructions for slide generation
├── build.js                        # Assembles slides and writes output.pptx
└── theme.js                        # Exyte Corporate Blue design system
```

## Theme System

`theme.js` exports constants and helpers used by every slide:

| Export | Purpose |
|---|---|
| `COLORS` | Exyte brand palette (cyan accent, card backgrounds, borders) |
| `FONTS` | Font families and size presets |
| `LAYOUT` | Safe content area coordinates (inches) |
| `applySlideBase(slide)` | Applies background, logo, and footer to a slide |
| `addTitle(slide, text)` | Cyan heading at top-left |
| `addSubtitle(slide, text)` | Italic line below the title |
| `addBody(slide, text, overrides?)` | Body text block |
| `addStyledTable(slide, headers, rows, opts?)` | Themed table with alternating row colors |
| `makeTextRun(text, opts?)` | Inline styled text run |
| `addCalloutBox(slide, textRuns, opts?)` | Highlighted box for key takeaways |

## Writing a Slide

Each slide file follows this pattern:

```javascript
module.exports = function (pptx, theme) {
  const slide = pptx.addSlide();
  theme.applySlideBase(slide);        // required -- bg, logo, footer
  theme.addTitle(slide, "My Title");  // optional

  // Custom content inside the safe area:
  // x: 0.8, y: 1.15, w: 8.4, h: 3.85
  slide.addText("Hello", {
    x: theme.LAYOUT.FREE_X,
    y: theme.LAYOUT.FREE_Y,
    w: theme.LAYOUT.FREE_W,
    h: 1,
    fontSize: 18,
    fontFace: theme.FONTS.BODY,
    color: theme.COLORS.TEXT_BODY,
  });
};
```

## Room for Improvement

This is a prototype. The gap for improvement is massive:

- **Custom figures and tables** -- pptxgenjs supports charts, complex tables, and shape compositions that are not yet used here. A richer theme could offer these as ready-made helpers.
- **Better theme reliability** -- the current theme is minimal. A more robust design system with stricter layout rules would produce more consistent output across different AI models.
- **Deterministic positioning tools** -- AI models struggle with placing text and objects at precise coordinates on slides. A purpose-built tool that handles positioning deterministically (snap-to-grid, auto-layout, overflow detection) would make the output significantly more reliable. This is probably the biggest win and something I may develop.

If any of this interests you -- ideas, feedback, contributions -- reach out: **grihladin@gmail.com**

## Dependencies

- [pptxgenjs](https://www.npmjs.com/package/pptxgenjs) ^4.0.1 -- PowerPoint file generation for Node.js

## License

MIT
