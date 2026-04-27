module.exports = function (pptx, theme) {
  const slide = pptx.addSlide();
  theme.applySlideBase(slide);

  // Full-width statement — no title bar, let the quote breathe
  slide.addText(
    [
      {
        text: "I've never used PowerPoint\nin my life.",
        options: {
          fontSize: 28,
          fontFace: theme.FONTS.HEADING,
          color: theme.COLORS.TEXT_PRIMARY,
          bold: true,
          lineSpacing: 38,
        },
      },
    ],
    {
      x: theme.LAYOUT.FREE_X,
      y: 1.2,
      w: 5.5,
      h: 1.4,
      valign: "middle",
    }
  );

  // Supporting paragraph — left-aligned beneath the statement
  slide.addText(
    "I've done plenty of presentations -- but always in Canva or Google Slides. And now, at Exyte, I have to produce PPTX.",
    {
      x: theme.LAYOUT.FREE_X,
      y: 2.7,
      w: 5.5,
      h: 0.7,
      fontSize: 13,
      fontFace: theme.FONTS.BODY,
      color: theme.COLORS.TEXT_BODY,
      valign: "top",
      lineSpacing: 22,
    }
  );

  // Right-side vertical timeline: past vs. now
  const colX = 7.0;
  const colW = 2.2;

  // "Before" label
  slide.addText("Before", {
    x: colX,
    y: 1.3,
    w: colW,
    h: 0.3,
    fontSize: 10,
    fontFace: theme.FONTS.BODY,
    color: theme.COLORS.ACCENT,
    bold: true,
    align: "center",
    valign: "middle",
  });

  // Before items
  const before = ["Canva", "Google Slides"];
  before.forEach((tool, i) => {
    const y = 1.7 + i * 0.55;
    slide.addShape("roundRect", {
      x: colX,
      y: y,
      w: colW,
      h: 0.42,
      fill: { color: theme.COLORS.BG_CARD },
      rectRadius: 0.06,
    });
    slide.addText(tool, {
      x: colX,
      y: y,
      w: colW,
      h: 0.42,
      fontSize: 12,
      fontFace: theme.FONTS.BODY,
      color: theme.COLORS.TEXT_BODY,
      align: "center",
      valign: "middle",
    });
  });

  // Dotted connector line
  slide.addShape("rect", {
    x: colX + colW / 2 - 0.01,
    y: 2.75,
    w: 0.02,
    h: 0.35,
    fill: { color: theme.COLORS.BORDER },
  });

  // "Now" label
  slide.addText("Now", {
    x: colX,
    y: 3.15,
    w: colW,
    h: 0.3,
    fontSize: 10,
    fontFace: theme.FONTS.BODY,
    color: theme.COLORS.ACCENT,
    bold: true,
    align: "center",
    valign: "middle",
  });

  // Now item — highlighted
  slide.addShape("roundRect", {
    x: colX,
    y: 3.5,
    w: colW,
    h: 0.42,
    fill: { color: theme.COLORS.ACCENT },
    rectRadius: 0.06,
  });
  slide.addText("PowerPoint", {
    x: colX,
    y: 3.5,
    w: colW,
    h: 0.42,
    fontSize: 12,
    fontFace: theme.FONTS.BODY,
    color: theme.COLORS.WHITE,
    bold: true,
    align: "center",
    valign: "middle",
  });
};
