module.exports = function (pptx, theme) {
  const slide = pptx.addSlide();
  theme.applySlideBase(slide);
  theme.addTitle(slide, "Research: pptxgenjs");

  // Library name and stats
  slide.addText(
    [
      {
        text: "pptxgenjs",
        options: {
          fontSize: 20,
          fontFace: theme.FONTS.HEADING,
          color: theme.COLORS.ACCENT,
          bold: true,
        },
      },
      {
        text: "  by Brent Ely  |  1.7M npm downloads",
        options: {
          fontSize: 12,
          fontFace: theme.FONTS.BODY,
          color: theme.COLORS.TEXT_BODY,
        },
      },
    ],
    {
      x: theme.LAYOUT.FREE_X,
      y: theme.LAYOUT.FREE_Y + 0.1,
      w: theme.LAYOUT.FREE_W,
      h: 0.45,
      valign: "middle",
    }
  );

  // Strengths and limitation in a table layout
  theme.addStyledTable(
    slide,
    ["Strengths", "Details"],
    [
      ["Tables & Charts", "Strong built-in capabilities for corporate data presentation"],
      ["JavaScript Ecosystem", "Popular npm package, fits naturally into Node.js / Electron stacks"],
      ["Active Community", "Well-maintained, extensive documentation and examples"],
    ],
    {
      y: 1.85,
      colW: [2.5, 5.9],
      rowH: [0.35, 0.4, 0.4, 0.4],
    }
  );

  // Limitation highlight box
  slide.addShape("roundRect", {
    x: theme.LAYOUT.FREE_X,
    y: 3.6,
    w: theme.LAYOUT.FREE_W,
    h: 0.7,
    fill: { color: theme.COLORS.BG_SURFACE },
    rectRadius: 0.08,
  });

  slide.addText(
    [
      {
        text: "Limitation:  ",
        options: {
          fontSize: 13,
          fontFace: theme.FONTS.HEADING,
          color: theme.COLORS.ACCENT,
          bold: true,
        },
      },
      {
        text: "Can only ",
        options: { fontSize: 13, fontFace: theme.FONTS.BODY, color: theme.COLORS.TEXT_BODY },
      },
      {
        text: "create",
        options: { fontSize: 13, fontFace: theme.FONTS.BODY, color: theme.COLORS.TEXT_BODY, bold: true },
      },
      {
        text: " PPTX files -- cannot read or edit existing presentations.\nKeep this in mind -- it becomes relevant in the architecture decision.",
        options: { fontSize: 13, fontFace: theme.FONTS.BODY, color: theme.COLORS.TEXT_BODY },
      },
    ],
    {
      x: theme.LAYOUT.FREE_X + 0.25,
      y: 3.6,
      w: theme.LAYOUT.FREE_W - 0.5,
      h: 0.7,
      valign: "middle",
      lineSpacing: 20,
    }
  );

  // Bottom note
  slide.addText("Despite this limitation, its npm integration makes it compelling for a desktop Electron app.", {
    x: theme.LAYOUT.FREE_X,
    y: 4.45,
    w: theme.LAYOUT.FREE_W,
    h: 0.35,
    fontSize: 10,
    fontFace: theme.FONTS.BODY,
    color: theme.COLORS.TEXT_BODY,
    italic: true,
    align: "center",
    valign: "middle",
  });
};
