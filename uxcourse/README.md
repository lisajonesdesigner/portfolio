# User Flows and Wireframes - LMS course replica

A static, self-contained replica of the ADL6002 blended learning module I designed and
built in Victoria University's Brightspace (D2L) sandpit, recreated so it can be viewed
outside the university LMS. Drop this folder anywhere (it uses only relative paths) or
embed it as a subfolder of an existing site.

## Structure

- `index.html` - Table of Contents (course home)
- `unit-overview.html` - unit outline: objectives, delivery structure, assessment
- `modules/` - one page per module (sessions, case study, further reading)
- `topics/` - the 29 individual lesson, activity, and assessment pages
- `assets/css/site.css` - single shared stylesheet (D2L-style chrome, accordions, quizzes)
- `assets/js/site.js` - shared behaviour: accordions, expand/collapse all, quiz feedback
- `assets/img/` - course media (banners, diagrams, wireframe examples)
- `assets/icons/` - UI icon set

## How it's built

Every page is generated from reusable component functions (header, nav bar, sidebar,
accordion, topic row, quiz) in a single Python build script, so the chrome is identical
across all 37 pages and a change to any component updates the whole site.
