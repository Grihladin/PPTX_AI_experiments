module.exports = function (pptx, theme) {
  const slide = pptx.addSlide();
  theme.applySlideBase(slide);
  theme.addTitle(slide, "Research: python-pptx");

  // Library name and author
  slide.addText(
    [
      {
        text: "python-pptx",
        options: {
          fontSize: 20,
          fontFace: theme.FONTS.HEADING,
          color: theme.COLORS.ACCENT,
          bold: true,
        },
      },
      {
        text: "  by Steve Canny  |  MIT License",
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

  // Two feature cards side by side
  const cardW = 3.9;
  const cardH = 1.8;
  const cardY = 2.0;
  const leftX = theme.LAYOUT.FREE_X;
  const rightX = theme.LAYOUT.FREE_X + cardW + 0.6;

  // Card 1: Deep XML Control
  slide.addShape("roundRect", {
    x: leftX,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: theme.COLORS.BG_CARD },
    rectRadius: 0.08,
    line: { color: theme.COLORS.BORDER, width: 0.5 },
  });

  slide.addText("Deep XML Control", {
    x: leftX + 0.25,
    y: cardY + 0.2,
    w: cardW - 0.5,
    h: 0.35,
    fontSize: 15,
    fontFace: theme.FONTS.HEADING,
    color: theme.COLORS.TEXT_PRIMARY,
    bold: true,
    valign: "middle",
  });

  slide.addText(
    "Full access to the underlying OpenXML structure. Define slide design entirely in Python with fine-grained control over every element.",
    {
      x: leftX + 0.25,
      y: cardY + 0.6,
      w: cardW - 0.5,
      h: 1.0,
      fontSize: 12,
      fontFace: theme.FONTS.BODY,
      color: theme.COLORS.TEXT_BODY,
      valign: "top",
      lineSpacing: 20,
    }
  );

  // Card 2: Read & Write
  slide.addShape("roundRect", {
    x: rightX,
    y: cardY,
    w: cardW,
    h: cardH,
    fill: { color: theme.COLORS.BG_CARD },
    rectRadius: 0.08,
    line: { color: theme.COLORS.ACCENT, width: 1.5 },
  });

  slide.addText("Read & Write PPTX", {
    x: rightX + 0.25,
    y: cardY + 0.2,
    w: cardW - 0.5,
    h: 0.35,
    fontSize: 15,
    fontFace: theme.FONTS.HEADING,
    color: theme.COLORS.TEXT_PRIMARY,
    bold: true,
    valign: "middle",
  });

  slide.addText(
    "Can both read and write PPTX files. Inspect and modify existing presentations -- not just create new ones.",
    {
      x: rightX + 0.25,
      y: cardY + 0.6,
      w: cardW - 0.5,
      h: 1.0,
      fontSize: 12,
      fontFace: theme.FONTS.BODY,
      color: theme.COLORS.TEXT_BODY,
      valign: "top",
      lineSpacing: 20,
    }
  );

  // Callout at the bottom
  theme.addCalloutBox(
    slide,
    [
      theme.makeTextRun("Key advantage: ", { bold: true, color: theme.COLORS.ACCENT }),
      theme.makeTextRun("The ability to read existing presentations opens the door to template inspection and modification workflows."),
    ],
    { y: 4.15, h: 0.6, fontSize: 11 }
  );
};
