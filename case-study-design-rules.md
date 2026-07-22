# Case study design rules

Reference for the conventions established while building out the case study
pages (Monash, Kyra PAS, Aged Care, AI for Accessible Learning, Schema
Compass, Curriculum Design, Digital Twin Advocate). All rules live in
`styles.css`; this doc just
explains the *why* behind them in one place. Section numbers below match the
numbered comments in `styles.css` (Cmd+F the number, e.g. "26.").

## Page types and body classes

Three page types, each with its own width column:

- **Case study pages** (`monash.html`, `pas.html`, `aged.html`, `access.html`,
  `chatbot.html`, `curriculum.html`, `digitaltwin.html`) - `<body class="case-study-page">`.
  Content column is **1228px**.
- **Hub pages** - both `index.html` and `learning.html` have `<body
  class="hub-page">`, content column **1320px** on both.
- **Everything else** (about, contact, styleguide, 404) - no special body
  class, uses the base widths defined on `.section`, `.intro`, etc.

Adding `body.case-study-page` to a new page's `<body>` tag automatically
widens its `nav`, `.hero-content`, `.crumbs`, and `.case-nav` to match - no
other markup needed for that part.

## The 1228px case study column, explained

`.case-toc-layout` (section 26) is `max-width: 1228px` with `padding: 50px
48px 100px` and `grid-template-columns: 1fr 240px; gap: 72px`. That number
isn't arbitrary - it's built from the pieces inside it:

```
820px (.case-main text column)
+ 72px (grid gap)
+ 240px (.case-toc sidebar)
+ 96px (48px padding × 2)
= 1228px
```

`nav`, `.hero-content`, `.crumbs`, and `.case-nav` are all pinned to this
same 1228px so the logo, breadcrumbs, hero copy, and bottom nav bar share one
left edge. The hero heading itself (`.hero-title`) is capped separately at
**820px** (desktop only, `min-width: 801px`) to match `.case-main`'s reading
width, not the full 1228px box - otherwise it would run wider than the body
copy underneath it.

**If you ever need to resize this column**, change `.case-toc-layout`'s
`max-width` and recompute using the formula above, then update these in
lockstep (search for `1228px` to find all of them):
- `body.case-study-page nav, .hero-content` (section 6)
- `body.case-study-page .crumbs` padding formula (section 23)
- `body.case-study-page .case-nav` padding formula (section 23)
- `body.case-study-page footer` (section 20)

## Table of contents sidebar

Every case study page follows the same structure inside `.case-toc-layout`:

```html
<div class="case-toc-layout">
  <div class="case-main">
    <section id="intro">...</section>
    <section id="problem" class="divider-top">...</section>
    <section id="solution" class="divider-top">...</section>
    ...
  </div>

  <details class="case-toc" open>
    <summary><span class="chevron">&#9662;</span> Table of contents</summary>
    <ul>
      <li><a href="#intro" data-toc-link>Project overview</a></li>
      <li><a href="#problem" data-toc-link>...</a></li>
      ...
    </ul>
  </details>
</div>
```

Rules:
- Every `<section>` needs a lowercase `id`. The first section (`intro`) gets
  no `divider-top` class; every section after it does (adds a hairline rule
  and top padding, section 26).
- TOC link text is generally the section's own `<h2>` text verbatim, except
  the intro section (no `h2` of its own) which gets a short custom label
  like "Project overview".
- The `data-toc-link` attribute is required - the scroll-spy script (bottom
  of each page's `<script>` block) queries for it.
- On desktop the TOC is permanently open and sticky (`position: sticky; top:
  96px`). Below 800px it collapses into a small floating disclosure pinned
  top-right over the hero/intro area, and the same JS auto-opens/closes it
  based on viewport width - don't hand-toggle the `open` attribute in HTML.

## Image treatments

Every content image follows the same three-part structure, no exceptions:
**heading, then image, then caption.** The heading is a short label (what
the artefact is - "Program flow", "Conversation flow"), the caption is a
sentence or two of description below the frame (what it shows or why it
matters). They should never say the same thing twice - if you find yourself
repeating the heading's words at the start of the caption, the caption is
doing the wrong job.

```html
<div class="img-frame-grey">
  <div class="img-heading">Program flow</div>
  <img class="img" src="..." alt="...">
  <a href="#" class="view-larger">View larger &#8599;</a>
</div>
<div class="caption">Module 2 is the built deliverable. Modules 1, 3, and 4 are fully designed and documented.</div>
```

Don't fold the heading into the caption as a bold lead-in (`<div
class="caption"><strong>Program flow.</strong> ...`) - that was a pattern
that crept into Access/Schema Compass/Curriculum before this pass and has
been undone. Always use a real `.img-heading` div.

### Choosing a frame: border, grey, or plain

Three interchangeable frame classes, all in section 9. Pick per image, based
on what the image itself looks like - don't default to one across a whole
page:

- **`.img-frame-plain`** (no border, no background, no padding, full content
  width) - for screenshots that already have their own visual edge or UI
  chrome (an app screenshot, a table, a browser-style frame). An outer
  border on top of that just adds visual noise. This is also the right
  choice for a set of screenshots sitting together in a grid, so the eye
  reads them as one family.
- **`.img-frame-grey`** - the default for diagrams, flow charts, personas,
  and comparison graphics that don't already have a hard edge of their own.
  Soft background gives them a defined area without a harsh line.
- **`.img-frame-border`** - for dense technical diagrams or a single image
  that needs a crisp, defined boundary against the surrounding white -
  used more sparingly, as an accent rather than a default.

When a group of images sits in the same grid (e.g. three Rise screenshots,
three curriculum screenshots), give them all the same frame class so the
set reads as one visual unit rather than three unrelated choices.

`.view-larger` is a small pill badge, bottom-right corner of the image only
(not every image needs one - use it on dense screenshots, tables, or small
text that's genuinely hard to read at the default size). It opens the
shared `.lightbox` overlay (section 25); the JS wiring lives in a
`<script>` block near the end of the page and expects `.view-larger` to be
the last element inside an `.img-frame-*` div, immediately after the image.
Images are **not** directly clickable anymore - the badge is the only zoom
affordance on case study pages.

## Breadcrumbs and bottom nav

`.crumbs` (top breadcrumb trail) and `.case-nav` (bottom "back to hub /
next case study" bar) both use a `max(48px, calc(50% - Xpx))` padding
formula instead of `max-width` + `margin: auto`, so they can be full-bleed
elements (for background colour, if ever needed) while still centering
their content to the same column width as everything else. Don't switch
these to `max-width` + auto margin without checking the mobile breakpoints
still line up.

## Spacing scale

Utility classes, defined in section 5:

| Class | Value |
|---|---|
| `.mt-1` | 8px |
| `.mt-2` | 16px |
| `.mt-3` | 24px |
| `.mt-4` | 32px |
| `.mt-5` | 48px |
| `.pt-5` | 80px |

Use these instead of one-off inline margins when spacing between two
elements in a case study body.

## Responsive breakpoints

| Width | What changes |
|---|---|
| 1024px | Case study `.intro-meta` grid drops from 4 to 2 columns |
| 800px | Desktop nav hides, hamburger shows; case study TOC sidebar collapses into a floating disclosure; `.hero-content`/`.crumbs` padding tightens |
| 720px | Hub project grid drops to 2 columns |
| 640px | General mobile padding reduction, most grids go 1-column |
| 480px | Hub project grid drops to 1 column; case study `.intro-meta` drops to 1 column |
| 360px | Minimal padding for very small phones |

## No eyebrow labels on case study section headings

Inside `.case-toc-layout` `<section>` blocks, headings are plain `<h2>` -
no `.eyebrow` overline label above them (the small purple uppercase tag used
elsewhere on the site, e.g. "The Problem", "Design Process"). Monash, Kyra
PAS, and Aged Care never had them added; the TOC sidebar already lists each
section's heading as a link, so a repeated label directly above the same
heading in the body is redundant.

`.eyebrow` is still correct to use in places that *aren't* mirrored by a
TOC: the "Currently" CTA on about.html, and `.card-eyebrow` on hub project
tiles (a different, smaller class - company name above a card title, not a
section label).

Access, Schema Compass, and Curriculum carried `.eyebrow` divs over from
their pre-TOC layout ("The Problem", "The Solution", etc. above each `<h2>`)
when they were converted to the case-toc-layout system - these have now
been removed to match Monash/PAS/Aged. If you start a new case study from
one of these pages as a template, don't copy an eyebrow div into a new
section.

## Card colour: grey for labelled content blocks

Any card that pairs a `.card-label` with a list, a paragraph, or a
decision/finding is `card card-grey` (light grey background), not plain
`.card` (white, just a border). This applies to "Decision" cards, "What the
evidence shows" / "What was not measured" cards, and similar labelled
callouts across every case study - Monash, Kyra PAS, Aged Care, Access,
Schema Compass, and Curriculum all follow this now.

Plain `.card` (no `-grey`) is still correct for a few other things that
aren't this pattern: `.card-purple` and `.card-bar` variants, `.step` cards
in a numbered process list, and simple attributed quote cards like the
participant testimonials in Schema Compass's Formative Testing section
(name + blockquote, no `.card-label`).

## Bolded lead sentence in the intro paragraph

Every case study's `.intro-summary` opens with one bolded sentence stating
the core thing that makes the project distinctive, before the factual
paragraph that follows it:

```html
<p class="intro-summary"><strong>One governed learning model, built to hold
structure across 10,000+ units and 86,558 students.</strong> Moodle is the
learning management system Monash University uses...</p>
```

Write this last, after the rest of the case study is settled - it should
distill the project's actual thesis (the tension or decision that shaped
everything else), not just restate the first sentence of the paragraph in
bold.

## Outcomes section: evidence vs not-measured

Every case study's Outcomes section ends with a two-card grid, not a wall of
prose, honestly separating what was actually demonstrated from what wasn't
tested:

```html
<div class="grid grid-2 gap-1">
  <div class="card card-grey">
    <span class="card-label">What the evidence shows</span>
    <p>...</p>
  </div>
  <div class="card card-grey">
    <span class="card-label">What was not measured</span>
    <p>...</p>
  </div>
</div>
```

Kyra PAS uses "Proven" / "Not proven" instead of "What the evidence shows" /
"What was not measured" - both label pairs are fine, pick whichever reads
more naturally for the project, but keep the same two-card structure. This
exists specifically to avoid overclaiming impact: don't let the left card
imply something the right card contradicts.

## Naming conventions

1. **Utilities are short**: `mt-3`, `bg-grey`, `text-purple`, `img-border`.
2. **Variants are hyphenated off a base class**: `card`, `card-grey`,
   `card-purple`; `btn`, `btn-purple`, `btn-outline`.
3. **Children are prefixed by their parent**: `project-thumb`,
   `project-title` live inside `.project-card`.
4. **Section ids** on case study pages are short lowercase words describing
   the section's role, not its exact heading (`problem`, `solution`,
   `decisions`, `process`, `outcomes`, `reflection`), reused across
   different case studies without conflict since each page is a separate
   HTML document.

Every class is demonstrated live in `styleguide.html`.

## A CSS gotcha worth remembering

There's a global reset at the top of the file: `p:last-child { margin-bottom:
0; }` (section 2). If you ever add a paragraph that needs bottom spacing and
it happens to be the *last* paragraph inside its parent container, this rule
will silently override you - and it wins even against a class selector like
`.your-class { margin-bottom: 40px; }`, because `p:last-child` combines a
type selector with a pseudo-class, which counts as *more* specific than a
class selector alone. This bit the hub intro spacing during this round of
work.

**Fix pattern**: scope your override with the parent, e.g.
`.hub-intro .hub-lead { margin-bottom: 40px; }` instead of just `.hub-lead {
margin-bottom: 40px; }`. Adding the parent selector adds a second class-level
match, which outranks `p:last-child`'s type + pseudo-class combination.

## Open items / not yet done

- `styleguide.html` has some documented classes (BEM-style names like
  `.card--tinted`) that don't exist in the real CSS - flagged earlier, not
  yet cleaned up.
