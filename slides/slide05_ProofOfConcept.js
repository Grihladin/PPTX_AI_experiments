module.exports = function (pptx, theme) {
  const slide = pptx.addSlide();
  theme.applySlideBase(slide);
  theme.addTitle(slide, "Building It: Proof of Concept");

  // Timeline / flow — three steps as connected cards
  const stepW = 2.3;
  const stepH = 2.2;
  const stepY = 1.5;
  const gap = 0.5;
  const arrowW = 0.5;
  const totalW = stepW * 3 + gap * 2;
  const startX = theme.LAYOUT.FREE_X + (theme.LAYOUT.FREE_W - totalW) / 2;

  const steps = [
    {
      num: "1",
      title: "Read the Docs",
      body: "Studied the python-pptx documentation and set up a Python environment.",
    },
    {
      num: "2",
      title: "Feed the AI",
      body: "Gave the AI coding assistant the library docs and asked for a 5-slide PPTX about dogs.",
    },
    {
      num: "3",
      title: "First Try",
      body: "Working presentation generated on the very first attempt. No manual fixes needed.",
    },
  ];

  steps.forEach((step, i) => {
    const x = startX + i * (stepW + gap);

    // Step card
    slide.addShape("roundRect", {
      x: x,
      y: stepY,
      w: stepW,
      h: stepH,
      fill: { color: theme.COLORS.BG_CARD },
      rectRadius: 0.08,
      line: { color: theme.COLORS.BORDER, width: 0.5 },
    });

    // Step number circle
    slide.addShape("ellipse", {
      x: x + stepW / 2 - 0.22,
      y: stepY + 0.2,
      w: 0.44,
      h: 0.44,
      fill: { color: theme.COLORS.ACCENT },
    });

    slide.addText(step.num, {
      x: x + stepW / 2 - 0.22,
      y: stepY + 0.2,
      w: 0.44,
      h: 0.44,
      fontSize: 16,
      fontFace: theme.FONTS.HEADING,
      color: theme.COLORS.WHITE,
      bold: true,
      align: "center",
      valign: "middle",
    });

    // Step title
    slide.addText(step.title, {
      x: x + 0.15,
      y: stepY + 0.8,
      w: stepW - 0.3,
      h: 0.35,
      fontSize: 14,
      fontFace: theme.FONTS.HEADING,
      color: theme.COLORS.TEXT_PRIMARY,
      bold: true,
      align: "center",
      valign: "middle",
    });

    // Step body
    slide.addText(step.body, {
      x: x + 0.2,
      y: stepY + 1.2,
      w: stepW - 0.4,
      h: 0.85,
      fontSize: 11,
      fontFace: theme.FONTS.BODY,
      color: theme.COLORS.TEXT_BODY,
      align: "center",
      valign: "top",
      lineSpacing: 18,
    });

    // Arrow between cards
    if (i < steps.length - 1) {
      const arrowX = x + stepW + (gap - arrowW) / 2;
      slide.addText("\u25B6", {
        x: arrowX,
        y: stepY + stepH / 2 - 0.2,
        w: arrowW,
        h: 0.4,
        fontSize: 18,
        fontFace: theme.FONTS.BODY,
        color: theme.COLORS.ACCENT,
        align: "center",
        valign: "middle",
      });
    }
  });

  // Result callout
  theme.addCalloutBox(
    slide,
    [
      theme.makeTextRun("Result: ", { bold: true, color: theme.COLORS.ACCENT }),
      theme.makeTextRun("AI + python-pptx produced a working presentation in under 2 hours. The approach had real potential."),
    ],
    { y: 4.05, h: 0.6, fontSize: 11 }
  );
};
