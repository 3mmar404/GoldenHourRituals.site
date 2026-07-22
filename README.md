<div align="center">

# ✨ Golden Hour Rituals

### Capture The Light. Own The Glow.

A marine‑luxury skincare storefront — a curated, affiliate‑powered showcase of viral K‑Beauty essences, high‑tech LED masks, and glow rituals.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Amazon Associates](https://img.shields.io/badge/Amazon_Associates-FF9900?logo=amazon&logoColor=white)
![No Build Step](https://img.shields.io/badge/build-none%20required-brightgreen)

**[🌊 View Live Demo](https://3mmar404.github.io/GoldenHourRituals.site/)**

![Golden Hour Rituals preview](./preview.jpg)

</div>

---

## 📖 Overview

**Golden Hour Rituals** is a single‑page, fully static storefront built around a "sunset‑over‑the‑ocean" aesthetic. It presents a hand‑curated catalog of **34 skincare products** across **6 themed rituals**, each with an image gallery, a step‑by‑step usage guide ("The Ritual"), and buy buttons that route to **Amazon** marketplaces in multiple countries.

The site is monetized through the **Amazon Associates** program — every purchase link is an affiliate link. There is **no backend, no database, and no build step**: the entire experience is driven by a single JavaScript data file rendered client‑side.

## 🗂️ Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [Adding & Editing Products](#-adding--editing-products)
- [Ritual Categories](#-ritual-categories)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Notes & Known Issues](#-notes--known-issues)
- [Affiliate Disclosure](#-affiliate-disclosure)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Author](#-author)

## 🌟 Features

- **Glassmorphism UI** — frosted‑glass product cards over a fixed sunset‑ocean gradient, with soft shadows, hover lift, and shine effects.
- **Data‑driven catalog** — all products live in one file (`products.js`); the grid, filters, and modal are generated dynamically.
- **Category filtering** — a sticky, horizontally scrollable filter bar switches between ritual collections instantly.
- **Product detail modal** — opens on card click with a multi‑image gallery + thumbnails, an expandable "Read More" description, a numbered **"The Ritual"** how‑to guide, and purchase buttons.
- **Multi‑marketplace buy links** — each product can link to several Amazon storefronts (USA, UK, Germany, France, Italy), each shown with its country flag via [flagcdn](https://flagcdn.com).
- **Decorative star ratings** — cards display a randomized 4.5–5.0 rating and review count for social‑proof styling.
- **Responsive & mobile‑first** — full‑screen modal on mobile with a sticky purchase bar, a slide‑down mobile menu, and a category rail that scrolls on small screens.
- **Polish touches** — hide‑on‑scroll header, animated back‑to‑top button, lazy‑loaded images with spinners and graceful fallbacks, and `Esc`/backdrop‑to‑close on the modal.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (single `index.html` shell) |
| Styling | [Tailwind CSS](https://tailwindcss.com) via CDN + a custom theme and hand‑written CSS |
| Logic | Vanilla JavaScript (ES6), no framework |
| Icons | [Phosphor Icons](https://phosphoricons.com) via CDN |
| Fonts | [Google Fonts](https://fonts.google.com) — *Cormorant Garamond* (serif) & *Montserrat* (sans) |
| Flags | [flagcdn.com](https://flagcdn.com) for marketplace country flags |
| Monetization | Amazon Associates affiliate links |

> No package manager, bundler, or transpiler is used. Everything loads from CDNs at runtime.

## 📁 Project Structure

```
GoldenHourRituals.site/
├── index.html      # Page shell: header, hero, filter bar, grid mount point, modal, footer + Tailwind theme
├── products.js     # The catalog — a single `products` array (source of truth for all content)
├── script.js       # Rendering engine: builds cards, wires filters, populates & controls the modal
└── src/            # Product imagery (.webp) + favicon
    ├── biodance-bio-collagen-mask.webp
    ├── cosrx-snail-mucin-essence.webp
    ├── ...
    └── favicon-32x32.png
```

## ⚙️ How It Works

The architecture is intentionally simple — **data in, DOM out**:

1. **`index.html`** loads Tailwind (with a custom theme), the fonts and icons, then defines the static shell: header/nav, hero banner, the category filter bar, an empty `#product-grid`, and the product modal markup.
2. **`products.js`** defines a global `const products = [ ... ]` array. This is the single source of truth for everything shown on the page.
3. **`script.js`** runs on `DOMContentLoaded` and:
   - Calls `renderProducts(products)` to build a card for every item and inject it into `#product-grid`.
   - Wires the **filter buttons** — clicking one re‑renders the grid with `products.filter(p => p.category === category)`.
   - Handles **modal open/close**, populating it from the clicked product (gallery, description, ritual steps, buy links).
   - Adds UX behaviors: mobile menu toggle, hide‑on‑scroll header, and back‑to‑top.

Because rendering is a pure function of the `products` array, **you never touch the HTML or JS to change the catalog** — you only edit `products.js`.

## 🚀 Getting Started

No dependencies to install. Clone and open:

```bash
git clone https://github.com/3mmar404/GoldenHourRituals.site.git
cd GoldenHourRituals.site
```

Then run it with any static server (recommended, so relative image paths resolve cleanly):

```bash
# Python 3
python3 -m http.server 8000

# …or Node
npx serve .

# …or VS Code: right‑click index.html → "Open with Live Server"
```

Visit **http://localhost:8000**. Opening `index.html` directly in a browser also works for a quick look.

## 🧩 Adding & Editing Products

Every product is one object in the `products` array inside **`products.js`**. Add a new object (or edit an existing one) using this shape:

```js
{
  id: "unique-product-slug",                    // string · unique identifier
  name: "Full Product Name (Tagline)",          // string · shown as the card & modal title
  description: "Short hook, ~1–2 lines.",        // string · card text (clamped to 2 lines)
  longDescription: "The full story of the product…", // string · modal text (expandable "Read More")
  howToUse: [                                    // string[] · rendered as "The Ritual" numbered steps
    "Step 1: Cleanse and prep.",
    "Step 2: Apply and pat in.",
    "Step 3: Seal with moisturizer."
  ],
  category: "Marine Beauty Secrets 🌊",          // string · MUST exactly match a filter's data-filter (see note below)
  image: "./src/your-image.webp",               // string · card thumbnail
  gallery: [                                     // string[] · modal gallery + thumbnails
    "./src/your-image.webp",
    "./src/your-image-1.webp",
    "./src/your-image-2.webp"
  ],
  badge: "Viral Best Seller 🔥",                 // string · corner ribbon label (optional)
  links: [                                       // array · one button per marketplace
    { country: "USA", flag: "us", url: "https://www.amazon.com/…?tag=YOURTAG-20" },
    { country: "UK",  flag: "gb", url: "https://www.amazon.co.uk/…?tag=YOURTAG-21" }
  ]
}
```

**Field notes:**

| Field | Required | Purpose |
|-------|:---:|---------|
| `id` | ✅ | Unique slug; keep it consistent with the image filenames. |
| `name` | ✅ | Card & modal heading. |
| `description` | ✅ | Short teaser on the card (auto‑truncated to 2 lines). |
| `longDescription` | – | Full modal copy; falls back to `description` if omitted. |
| `howToUse` | – | Array of steps shown as "The Ritual"; omit to hide that block. |
| `category` | ✅ | Groups the product; **must match a filter button exactly** to be filterable. |
| `image` | ✅ | Grid thumbnail (a placeholder loads automatically if the file is missing). |
| `gallery` | – | Modal images; if omitted, the modal uses `image`. |
| `badge` | – | Small uppercase ribbon in the card's top‑left corner. |
| `links` | – | Buy buttons. `flag` is a 2‑letter [ISO code](https://flagcdn.com); no links → "Out of Stock". |

To add product **imagery**, drop `.webp` files into `src/` and point `image` / `gallery` at them.

## 🌊 Ritual Categories

The catalog is organized into six themed collections:

| Category | Products |
|----------|:---:|
| 🌊 Marine Beauty Secrets | 3 |
| 🌿 Minimalist Skincare (Skinamalism) | 7 |
| ✨ Goddess Glow Skincare Rituals | 4 |
| ☀️ Morning Skincare Routine | 7 |
| 🌙 Night Ritual for Youthful Skin | 6 |
| ✨ Glowing Skin Secrets | 7 |
| **Total** | **34** |

## 🎨 Customization

**Theme colors** are defined in the Tailwind config inside `index.html`:

| Token | Hex | Role |
|-------|-----|------|
| `gold-hour` | `#CC9966` | Primary / accent |
| `marine-depths` | `#0F2C3E` | Secondary / dark |
| `skin-glow` | `#FAF5EF` | Background |
| `luxury-charcoal` | `#2C2926` | Body text |
| `rose-quartz` | `#E6C2BF` | Soft accent |

The signature background is a fixed four‑stop gradient (skin‑glow → rose‑quartz → gold‑hour → marine‑depths) set on `body`. Typography pairs **Cormorant Garamond** for headings with **Montserrat** for body text — swap either in the Google Fonts `<link>` and the Tailwind `fontFamily` config.

## 📦 Deployment

Being fully static, the site can be hosted anywhere:

- **GitHub Pages** — already live at **https://3mmar404.github.io/GoldenHourRituals.site/**. Enable via *Settings → Pages → Deploy from branch → `main` / root*.
- **Netlify / Vercel / Cloudflare Pages** — point at the repo; no build command, publish directory is the root (`.`).
- **Any web host** — upload `index.html`, `products.js`, `script.js`, and `src/`.

## 📝 Notes & Known Issues

A few things worth knowing when maintaining the project:

- **⚠️ Two category filters currently return no results.** Filtering uses an exact string match (`p.category === data-filter`), but two filter buttons in `index.html` are missing the trailing emoji present in the product `category` values:
  - `Skinamalism` button → `data-filter="Minimalist Skincare (Skinamalism)"` vs. product category `"Minimalist Skincare (Skinamalism) 🌿"`
  - `Goddess Glow` button → `data-filter="Goddess Glow Skincare Rituals"` vs. product category `"Goddess Glow Skincare Rituals ✨"`
  
  **Fix:** make the two `data-filter` values match the product strings exactly (add the emoji), or normalize both sides (e.g. strip emojis) before comparing in `script.js`.
- **Navigation links point to pages that don't exist yet.** The header menu links to `marine-beauty.html`, `skinamalism.html`, `goddess-glow.html`, `morning-routine.html`, `glowing-secrets.html`, `anti-aging-tips.html`, `night-ritual.html`, and `essentials.html`. These are planned content pages and currently 404 — see the [Roadmap](#-roadmap).
- **Star ratings are decorative.** Each card's rating and review count are randomly generated on every render and are not tied to real product data.
- **Hero image is hosted externally.** The hero banner loads from a third‑party image host; consider self‑hosting it in `src/` for reliability.

## ⚖️ Affiliate Disclosure

> Golden Hour Rituals is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon. As an Amazon Associate, we earn from qualifying purchases.

## 🗺️ Roadmap

- [ ] Fix the Skinamalism / Goddess Glow filter mismatch
- [ ] Build out the eight themed content/blog pages linked in the navigation
- [ ] Self‑host the hero image
- [ ] Optional: replace decorative ratings with curated real ratings
- [ ] Add a search field and price/marketplace sorting

## 📄 License

No license file is currently included, and the site footer states **"© 2025 Golden Hour Rituals. All Rights Reserved."** Until a license is added, the code is treated as **all rights reserved** by default. If you intend the project to be open source, add a `LICENSE` file (e.g. [MIT](https://choosealicense.com/licenses/mit/)).

## 👤 Author

**3mmar404**

- GitHub: [@3mmar404](https://github.com/3mmar404)
- Pinterest: [Golden Hour Glow Tips](https://www.pinterest.com/GoldenHourGlowTips/)

---

<div align="center">
<sub>Built with sunlight, sea minerals, and a little vanilla JavaScript. 🌅</sub>
</div>
