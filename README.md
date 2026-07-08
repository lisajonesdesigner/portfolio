# lisajones.com.au

Portfolio site. Plain HTML + one stylesheet (`styles.css`). No build step: edit, commit, push, and GitHub Pages deploys it.

**See every style rendered live: open `styleguide.html` in a browser.**

## Class cheat sheet

### Spacing (scale: 1=8px, 2=16px, 3=24px, 4=32px, 5=48px)
| Class | Does |
|---|---|
| `mt-1` … `mt-5` | margin-top |
| `mb-1` … `mb-5` | margin-bottom |
| `pt-5` | padding-top 80px (page tops) |

### Colour & text helpers
| Class | Does |
|---|---|
| `bg-grey` / `bg-purple` | full-bleed band background (wrap around a `.section`) |
| `text-purple` | purple text (headings) |
| `text-muted` | quieter grey text |
| `lead` | bigger intro paragraph |
| `caption` | small image caption (bold first words = dark label) |
| `eyebrow` | small caps purple overline above a heading |

### Layout
| Class | Does |
|---|---|
| `section` | 900px content column (the default) |
| `grid-2` / `grid-3` | 2 or 3 columns (add `gap-1` tight / `gap-4` loose) |
| `masonry` | 2-col variable-height cards (testimonials) |
| `divider` / `divider-dark` / `divider-space` | horizontal rules |
| `page-end` | spacer before footer (add `bg-grey` if the page ends grey) |

### Images
| Class | Does |
|---|---|
| `img` | full-width block image |
| `img-border` | + 1px grey border |
| `img-zoom` | hover zoom (parent needs `grid-overflow`) |
| `img-right` | half width, right aligned, text flows left |

### Buttons
`btn` + one of: `btn-purple` (primary) · `btn-outline` · `btn-grey` · `btn-link` (text with arrow)

### Cards
| Class | Look |
|---|---|
| `card` | white, grey border |
| `card-grey` | soft grey fill |
| `card-shadow` | white with drop shadow (testimonials) |
| `card-purple` | purple fill, white text |
| `card-bar` | white with purple left bar |
| `step` | numbered process row (`step-num` + `step-body`) |
| inside cards | `card-label`, `card-title` |

### Case-study pieces
| Class | Look |
|---|---|
| `insight` + `insight-label` | tinted purple callout (Insight / Decision / Outcome) |
| `pullquote` + `pullquote-label` | big white quote card |
| `testimonial-quote/-name/-role` | quote attribution (works on light and purple cards) |
| `case-meta` | Role / Org / Timeframe line under the hero |
| `intro-summary`, `intro-meta`, `meta-item`, `meta-label`, `meta-value` | learning-page intro block |

### Hub pages (index, learning)
`hub-intro` (header block: `hub-kicker`, `hub-sub`, `hub-cross`) · `hub-section` (group label) · `hub-band` (grey band) · `hub-cards bg-soft` (soft grey band behind the tile grid) · `project-card` (tile: `project-link`, `project-thumb`, `project-body`, `project-title`, `project-more`) · `badge` ("coming soon" chip) · add `coming` to unclickable tiles

### Don't rename these (JavaScript uses them)
`nav-toggle` · `nav-overlay` · `is-open` · `nav-open` · `form-status` · `is-visible` · `success` · `error` · ids `contact-form`, `form-status`

## Editing tips
- Colours and font sizes all live in `:root` at the top of styles.css (search TOKENS).
- The stylesheet header has a FIND IT FAST index — Cmd+F the capitalised word.
- After editing: hard refresh (Cmd+Shift+R). GitHub Pages also caches CSS ~10 min after a push.
