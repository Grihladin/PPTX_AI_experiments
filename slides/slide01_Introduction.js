module.exports = function (pptx, theme) {
  const slide = pptx.addSlide();
  theme.applySlideBase(slide);

  // Title — large centered presentation name
  slide.addText("AI-Powered PPTX Generation", {
    x: theme.LAYOUT.FREE_X,
    y: 1.3,
    w: theme.LAYOUT.FREE_W,
    h: 0.8,
    fontSize: 30,
    fontFace: theme.FONTS.HEADING,
    color: theme.COLORS.TEXT_PRIMARY,
    bold: true,
    align: "center",
    valign: "middle",
  });

  // Subtitle
  slide.addText("From Personal Hack to Product Vision", {
    x: theme.LAYOUT.FREE_X,
    y: 2.1,
    w: theme.LAYOUT.FREE_W,
    h: 0.5,
    fontSize: 18,
    fontFace: theme.FONTS.BODY,
    color: theme.COLORS.TEXT_BODY,
    italic: true,
    align: "center",
    valign: "middle",
  });

  // Thin divider line
  slide.addShape("rect", {
    x: 3.5,
    y: 2.8,
    w: 3.0,
    h: 0.02,
    fill: { color: theme.COLORS.ACCENT },
  });

  // Presenter info
  slide.addText(
    [
      {
        text: "Michael Ratke",
        options: {
          fontSize: 16,
          fontFace: theme.FONTS.BODY,
          color: theme.COLORS.TEXT_BODY,
          bold: true,
        },
      },
      {
        text: "\nIPAI AI-Circle",
        options: {
          fontSize: 13,
          fontFace: theme.FONTS.BODY,
          color: theme.COLORS.TEXT_BODY,
        },
      },
    ],
    {
      x: theme.LAYOUT.FREE_X,
      y: 3.05,
      w: theme.LAYOUT.FREE_W,
      h: 0.9,
      align: "center",
      valign: "top",
    }
  );

  // Context note at bottom of free area
  slide.addText("This project is not related to any internal Exyte project. It's a side project that grew out of a real daily need.", {
    x: theme.LAYOUT.FREE_X + 0.5,
    y: 4.15,
    w: theme.LAYOUT.FREE_W - 1.0,
    h: 0.6,
    fontSize: 11,
    fontFace: theme.FONTS.BODY,
    color: theme.COLORS.TEXT_BODY,
    italic: true,
    align: "center",
    valign: "middle",
  });
};
