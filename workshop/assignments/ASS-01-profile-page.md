# Assignment 1: Profile Page

Build a personal profile page using only HTML and CSS. No JavaScript. No frameworks.

**Due:** follow the date given in class
**Repo:** your own GitHub repository (see submission below)

---

## Goal

Create a single-page profile that introduces you. A visitor should learn who you are, what you are learning, and how to reach you, without opening DevTools.

---

## Requirements

### Must have

- [ ] `index.html` as the main page
- [ ] External stylesheet, for example `css/style.css` (do not put all styles in a `<style>` tag)
- [ ] Page title in `<title>`
- [ ] Semantic layout: `header`, `main`, `section`, `footer`
- [ ] Your name as the main heading (`h1`)
- [ ] A short bio (2 to 4 sentences)
- [ ] A profile image (`img` with a real `alt` attribute)
- [ ] A list of at least 4 skills or tools you are learning
- [ ] A projects or hobbies section with at least 2 items
- [ ] Contact section with at least one working link (`mailto:` or GitHub/LinkedIn URL)
- [ ] Readable typography, spacing, and a consistent color palette
- [ ] Layout that still works at about 375px width (phone) and desktop

### Should have

- [ ] Hover styles on links and buttons
- [ ] A simple nav (About, Skills, Contact) that jumps to sections using ids
- [ ] A card or box style for skills or projects

### Do not

- [ ] Do not use Bootstrap, Tailwind CDN, or React
- [ ] Do not use JavaScript
- [ ] Do not paste a full template from a theme site and only change the name
- [ ] Do not commit huge unused image files

---

## Suggested file structure

```
assignment-1-profile/
  index.html
  css/
    style.css
  images/
    profile.jpg
  README.md
```

---

## Process

1. Create a new GitHub repo, for example `assignment-1-profile`.
2. Clone it locally.
3. Add `index.html` and `css/style.css`.
4. Write the HTML structure first with real content (your name, your bio).
5. Add CSS: colors, spacing, then layout.
6. Open the file in a browser. Resize the window and check mobile width.
7. Commit often (see Git section).
8. Push and submit the repo URL.

---

## Checkpoints

Use these as a self-review before you submit.

### Checkpoint A: HTML

- [ ] File opens in the browser with no missing assets
- [ ] Headings follow order (`h1` then `h2`, no skipped levels for decoration)
- [ ] Every `img` has `alt` text
- [ ] Labels exist if you added any form (form is optional)

### Checkpoint B: CSS

- [ ] Styles load from an external CSS file
- [ ] Text contrast is readable on the background
- [ ] Sections are separated by spacing, not only by color
- [ ] Links are visible and look clickable

### Checkpoint C: Content

- [ ] Bio is written in your own words
- [ ] Skills list is specific (example: HTML, CSS, Git)
- [ ] Contact link opens mail or a real profile

### Checkpoint D: Git

- [ ] `README.md` in the repo explains what the page is and how to open it
- [ ] At least 3 commits with clear messages
- [ ] GitHub repo is public (unless the instructor said otherwise)
- [ ] `main` (or `master`) has the latest code

---

## README for your repo

Include:

- Your name
- What the page is
- How to open it (`open index.html` or live GitHub Pages URL if you used Pages)
- A screenshot (optional)

---

## Git submission guidelines

### First time setup

```bash
git clone https://github.com/YOUR_USERNAME/assignment-1-profile.git
cd assignment-1-profile
```

If you created the folder first:

```bash
cd assignment-1-profile
git init
git add .
git commit -m "Add profile page structure"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/assignment-1-profile.git
git push -u origin main
```

### Commit style

Write short messages that say why or what changed:

```text
Add header and bio section
Style skills as a two-column list
Fix mobile padding on contact section
```

Avoid:

```text
update
final
asdf
```

### Before you submit

```bash
git status
git log --oneline
git push origin main
```

Submit the GitHub URL, for example:

```text
https://github.com/YOUR_USERNAME/assignment-1-profile
```

If you used GitHub Pages, also send the live URL.

---

## Grading notes (what reviewers look for)

| Area | Weak | Strong |
|------|------|--------|
| Structure | One long `div` pile | Header, sections, footer |
| CSS | Default browser look | Consistent spacing and type |
| Content | Placeholder lorem text | Real bio and links |
| Git | One dump commit | Several meaningful commits |

---

## Resources

- HTML elements: https://developer.mozilla.org/en-US/docs/Web/HTML
- CSS basics: https://developer.mozilla.org/en-US/docs/Web/CSS
- Images and alt text: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
