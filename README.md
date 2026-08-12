# thefaisalurrehman.github.io

Personal portfolio for **Faisal ur Rehman** — Senior Android Developer.

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies.
Drop it in the repo, push, done.

**Live:** https://thefaisalurrehman.github.io/

---

## ⚠️ Read this before you push

Your repo is **not empty**. It currently serves the TenDegree studio page *and*
the legal pages that your Play Store listings link to:

```
roomy-privacy-policy.html
roomy-terms-of-use.html
software-update-privacy-policy.html
software-update-terms-of-use.html
software-update-data-deletion.html
```

Google Play checks those URLs. **If you delete them, Roomy and Software Update
can get flagged or taken down.** Do not wipe the repo.

### What to do instead

1. **Rename** your current `index.html` → `tendegree.html`
   (this is your studio page; the portfolio links to it from the Studio section
   and the footer).
2. **Copy in** the files from this bundle — `index.html`, `404.html`,
   `assets/`, `robots.txt`, `sitemap.xml`, `.nojekyll`.
3. **Leave every other `.html` file exactly where it is.**

After that your repo looks like:

```
├── index.html                              ← new portfolio
├── tendegree.html                          ← your old index.html, renamed
├── 404.html
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── roomy-privacy-policy.html               ← untouched
├── roomy-terms-of-use.html                 ← untouched
├── software-update-privacy-policy.html     ← untouched
├── software-update-terms-of-use.html       ← untouched
├── software-update-data-deletion.html      ← untouched
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/favicon.svg
```

Every Play Store URL keeps working. Nothing breaks.

### Inside `tendegree.html`

Open it and fix the nav link that points home — change `href="index.html"` (or
`href="/"`) so it still makes sense now that the homepage is the portfolio.
Adding a "← Back to portfolio" link at the top is a nice touch.

---

## 🔧 Fill these in before you go live

Search `index.html` for each of these:

| Find | Replace with | Where |
|---|---|---|
| `92XXXXXXXXXX` | Your WhatsApp number, country code, **no `+`, no spaces, no dashes** | 2 places (hero button + contact card) |
| `Earlier roles` | Your actual 2020–2022 employer name | Experience timeline |

**WhatsApp number format.** For a Pakistani number like `0300 1234567`, drop the
leading `0` and prefix `92` → `923001234567`. The final link should read:

```
https://wa.me/923001234567?text=Hi%20Faisal%2C%20I%20found%20your%20portfolio
```

Test it on your phone before you announce the site anywhere. A dead WhatsApp
link on a portfolio is worse than no WhatsApp link.

### Numbers to sanity-check

The download figures come from your GitHub README. I filled in the ones it
didn't specify with conservative estimates — **check these and correct them**:

- AI Face Swap: `1M+`
- PDF Reader & Editor: `1M+`
- TV Remote: `500K+`

They appear in the phone mockup (`.app-screen` blocks in the hero) and in
`Public repositories` count (`data-count="19"` in the stats strip).

---

## 🎨 Customising

### Colours

Everything lives in CSS custom properties at the top of `assets/css/styles.css`.
Change these six and the whole site re-themes:

```css
--bg:      #080B14;   /* page background      */
--surface: #101728;   /* cards                */
--primary: #7C8CFF;   /* periwinkle — accents */
--accent:  #FFC24B;   /* gold — gradients     */
--mint:    #4ADE9B;   /* status / success     */
--text:    #EAEDF7;   /* body copy            */
```

The light theme is a separate block right below (`[data-theme="light"]`).

### Fonts

Three families, loaded from Google Fonts in the `<head>`:

- **Bricolage Grotesque** — headings. Variable, a bit characterful.
- **Manrope** — body copy.
- **JetBrains Mono** — labels, dates, numbers. The IntelliJ font, which felt
  right for an Android dev.

### The phone in the hero

Each app is one `<article class="app-screen">` in `index.html`. To add, remove
or reorder apps, just edit those blocks — the indicator dots and the auto-rotate
timing pick up the count automatically. The `--tint` inline style drives the
icon colour, the card gradient and the glow behind the phone.

Rotation speed is in `assets/js/main.js`:

```js
timer = setInterval(() => show(index + 1), 3400);   // milliseconds
```

### Adding a section

Copy any `<section class="section" id="...">` block, add a matching link in
`<nav class="nav">`, and put `class="reveal"` on anything you want to fade in on
scroll. Nothing else to wire up.

---

## 🚀 Deploying

```bash
git clone https://github.com/thefaisalurrehman/thefaisalurrehman.github.io.git
cd thefaisalurrehman.github.io

git mv index.html tendegree.html      # keep the studio page
# copy the new files in here

git add .
git commit -m "New portfolio homepage; move studio page to tendegree.html"
git push
```

GitHub Pages redeploys in about a minute. Hard-refresh (`Ctrl+Shift+R`) if you
see the old page — Pages caches aggressively.

### Running it locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. Opening `index.html` directly with
`file://` mostly works, but relative paths behave better over HTTP.

---

## ✅ What's in the box

**Design**
- Dark by default, light theme toggle, remembers your choice
- Follows the system theme on first visit
- Responsive from 320px up

**Motion**
- Staggered hero entrance
- Scroll-triggered reveals
- Animated phone cycling through six shipped apps
- Count-up stats
- Infinite tech marquee, pauses on hover
- Material-style ripple on every button and card
- Drifting ambient gradients
- Everything switches off under `prefers-reduced-motion`

**Technical**
- Zero dependencies, zero build step
- Open Graph + Twitter cards for link previews
- JSON-LD `Person` schema for search engines
- `sitemap.xml` and `robots.txt`
- Skip link, visible focus rings, ARIA labels, semantic landmarks
- Custom 404
- Print stylesheet — `Ctrl+P` gives a usable one-page CV
- Works with JavaScript disabled (content stays visible, just static)

---

## 📄 Licence

Content and design © Faisal ur Rehman. Code is yours to do whatever you want with.
