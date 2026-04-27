// ============================================================
// Design System — Exyte Corporate Blue Theme
// ============================================================

const COLORS = {
  // Backgrounds
  BG: 'FFFFFF',
  BG_CARD: 'F0F7FB',
  BG_SURFACE: 'E3EFF6',
  BORDER: 'C4D9E8',

  // Text
  TEXT_PRIMARY: '009CDE',
  TEXT_BODY: '3C3C3C',
  TEXT_MUTED: '009CDE',

  // Accent
  ACCENT: '009CDE',
  ACCENT_SOFT: 'E0F2FC',

  // Utility
  WHITE: 'FFFFFF',
};

const FONTS = {
  HEADING: 'Arial',
  BODY: 'Arial',
  MONO: 'Consolas',
  TITLE_SIZE: 26,
  SUBTITLE_SIZE: 14,
  BODY_SIZE: 13,
  SMALL_SIZE: 10,
  TABLE_SIZE: 11,
  TABLE_HEADER_SIZE: 12,
};

// Layout grid (inches, 10x5.63 canvas)
const LAYOUT = {
  // Chrome (header, logo, footer — managed by theme)
  MARGIN_L: 0.8,
  MARGIN_R: 0.8,
  CONTENT_X: 0.8,
  CONTENT_W: 8.4,
  TITLE_Y: 0.5,
  TITLE_H: 0.5,
  FOOTER_Y: 5.25,
  FOOTER_H: 0.25,

  // Free content box — AI can place anything here without restrictions
  FREE_X: 0.8,
  FREE_Y: 1.15,
  FREE_W: 8.4,
  FREE_H: 3.85,
};

let slideCounter = 0;
let TOTAL_SLIDES = 25;

// Presentation-level settings
let presentationTitle = '';
let presentationDate = '';
let logoPath = '';

function updatePresentationSettings(title, date, logo) {
  presentationTitle = title || '';
  presentationDate = date || '';
  logoPath = logo || '';
}

function resetSlideCounter(val) {
  slideCounter = val !== undefined ? val : 0;
}

// ── Base slide layout ──────────────────────────────────────

function applySlideBase(slide, opts = {}) {
  slideCounter++;
  const currentSlide = slideCounter;
  const skipFooter = opts.skipFooter || false;

  slide.background = { color: COLORS.BG };

  // Logo (top-right, natural aspect ratio ~2.7:1)
  if (logoPath) {
    slide.addImage({
      path: logoPath,
      x: 8.2,
      y: 0.3,
      w: 1.2,
      h: 0.45,
      sizing: { type: 'contain', w: 1.2, h: 0.45 },
    });
  }

  if (!skipFooter) {
    // Bottom accent line
    slide.addShape('rect', {
      x: LAYOUT.CONTENT_X,
      y: LAYOUT.FOOTER_Y - 0.08,
      w: LAYOUT.CONTENT_W,
      h: 0.015,
      fill: { color: COLORS.ACCENT },
    });

    // © Exyte I {title} (left)
    const footerLeft = presentationTitle ? `\u00A9 Exyte I ${presentationTitle}` : '\u00A9 Exyte';
    slide.addText(footerLeft, {
      x: LAYOUT.CONTENT_X,
      y: LAYOUT.FOOTER_Y,
      w: 5,
      h: LAYOUT.FOOTER_H,
      fontSize: 8,
      fontFace: FONTS.BODY,
      color: COLORS.TEXT_MUTED,
      align: 'left',
      valign: 'middle',
    });

    // {date}  |  {page} (right)
    const rightParts = [presentationDate, String(currentSlide)].filter(Boolean).join('  |  ');
    slide.addText(rightParts, {
      x: 7.8,
      y: LAYOUT.FOOTER_Y,
      w: 1.4,
      h: LAYOUT.FOOTER_H,
      fontSize: 8,
      fontFace: FONTS.BODY,
      color: COLORS.TEXT_MUTED,
      align: 'right',
      valign: 'middle',
    });
  }
}

// ── Typography helpers ──────────────────────────────────────

function addTitle(slide, text) {
  slide.addText(text, {
    x: LAYOUT.CONTENT_X,
    y: LAYOUT.TITLE_Y,
    w: LAYOUT.CONTENT_W,
    h: LAYOUT.TITLE_H,
    fontSize: FONTS.TITLE_SIZE,
    fontFace: FONTS.HEADING,
    color: COLORS.TEXT_PRIMARY,
    bold: true,
    valign: 'bottom',
  });
}

function addSubtitle(slide, text) {
  slide.addText(text, {
    x: LAYOUT.FREE_X,
    y: LAYOUT.FREE_Y,
    w: LAYOUT.FREE_W,
    h: 0.3,
    fontSize: FONTS.SUBTITLE_SIZE,
    fontFace: FONTS.BODY,
    color: COLORS.TEXT_BODY,
    italic: true,
    valign: 'top',
  });
}

function addBody(slide, textOrArray, overrides = {}) {
  const pos = {
    x: LAYOUT.FREE_X,
    y: LAYOUT.FREE_Y + 0.4,
    w: LAYOUT.FREE_W,
    h: LAYOUT.FREE_H - 0.4,
    ...overrides,
  };

  slide.addText(textOrArray, {
    ...pos,
    fontSize: FONTS.BODY_SIZE,
    fontFace: FONTS.BODY,
    color: COLORS.TEXT_BODY,
    valign: 'top',
    lineSpacing: 22,
  });
}

// ── Table helper ────────────────────────────────────────────

function addStyledTable(slide, headers, dataRows, opts = {}) {
  const headerRow = headers.map((h) => ({
    text: h,
    options: {
      bold: true,
      color: COLORS.TEXT_PRIMARY,
      fill: { color: COLORS.BG_SURFACE },
      fontFace: FONTS.BODY,
      fontSize: FONTS.TABLE_HEADER_SIZE,
      align: 'left',
      valign: 'middle',
      margin: [5, 8, 5, 8],
    },
  }));

  const bodyRows = dataRows.map((row, rowIdx) =>
    row.map((cellContent) => {
      const isObj = typeof cellContent === 'object' && cellContent !== null;
      return {
        text: isObj ? cellContent.text : cellContent,
        options: {
          fontFace: FONTS.BODY,
          fontSize: opts.bodyFontSize || FONTS.TABLE_SIZE,
          color: COLORS.TEXT_BODY,
          fill: { color: rowIdx % 2 === 0 ? COLORS.BG : COLORS.BG_CARD },
          align: 'left',
          valign: 'top',
          margin: [5, 8, 5, 8],
          ...(isObj ? cellContent.opts : {}),
        },
      };
    })
  );

  const allRows = [headerRow, ...bodyRows];

  slide.addTable(allRows, {
    x: opts.x || LAYOUT.FREE_X,
    y: opts.y || LAYOUT.FREE_Y + 0.4,
    w: opts.w || LAYOUT.FREE_W,
    colW: opts.colW,
    border: { type: 'solid', pt: 0.5, color: COLORS.BORDER },
    fontFace: FONTS.BODY,
    rowH: opts.rowH,
  });
}

// ── Rich text run helper ────────────────────────────────────

function makeTextRun(text, opts = {}) {
  return {
    text,
    options: {
      fontFace: FONTS.BODY,
      fontSize: FONTS.BODY_SIZE,
      color: COLORS.TEXT_BODY,
      ...opts,
    },
  };
}

// ── Callout box helper ──────────────────────────────────────

function addCalloutBox(slide, textRuns, opts = {}) {
  const x = opts.x || LAYOUT.CONTENT_X;
  const y = opts.y || 4.2;
  const w = opts.w || LAYOUT.CONTENT_W;
  const h = opts.h || 0.7;

  // Background
  slide.addShape('roundRect', {
    x: x,
    y: y,
    w: w,
    h: h,
    fill: { color: COLORS.BG_SURFACE },
    rectRadius: 0.05,
  });

  // Text
  slide.addText(textRuns, {
    x: x + 0.15,
    y: y,
    w: w - 0.3,
    h: h,
    fontFace: FONTS.BODY,
    fontSize: opts.fontSize || 12,
    color: COLORS.TEXT_BODY,
    valign: 'middle',
  });
}

module.exports = {
  COLORS,
  FONTS,
  LAYOUT,
  TOTAL_SLIDES,
  updatePresentationSettings,
  applySlideBase,
  addTitle,
  addSubtitle,
  addBody,
  addStyledTable,
  makeTextRun,
  addCalloutBox,
  resetSlideCounter,
};
