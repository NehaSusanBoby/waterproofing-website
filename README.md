# Waterproofing Website

A React website for a waterproofing services business, built with Vite and React Router.

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
npm run lint     # lint with oxlint
```

## Project structure

```
src/
  components/
    sections/     Homepage sections: Hero, ServicesPreview, WhyChooseUs,
                  Process, Testimonials, CtaBanner
    Layout.jsx    Navbar + page + Footer + WhatsApp button
    Navbar.jsx, Footer.jsx, PageHeader.jsx, SectionHeading.jsx,
    ServiceCard.jsx, ScrollToTop.jsx, WhatsAppButton.jsx
  pages/          Home, Services, ServiceDetail, Projects, About, Faq,
                  Contact, NotFound
  hooks/          usePageTitle (browser tab titles)
  data/site.js    ALL site content: business details, services, FAQs,
                  testimonials, projects (edit here first)
  App.jsx         Route definitions
  index.css       Global styles and theme colours
```

## Animations

Built with [GSAP](https://gsap.com) + ScrollTrigger and [Lenis](https://lenis.darkroom.engineering) smooth scrolling.

| Piece | File |
| --- | --- |
| Loading screen (rising water + % counter) | `src/components/fx/Preloader.jsx` |
| Rain with protective dome (hero), light rain (page headers) | `src/components/fx/RainCanvas.jsx` |
| Pinned scroll story: Leak → Inspect → Treat → Protect | `src/components/sections/Story.jsx` |
| Word-by-word headline reveal (`*word*` = gradient accent) | `src/components/fx/SplitText.jsx` |
| Scroll reveal for anything with `data-reveal` / `data-reveal="stagger"` | `src/hooks/useReveal.js` |
| Rolling waves, marquee, counters, hold-to-book button, scroll progress bar | `src/components/fx/` |

Visitors with "reduce motion" turned on in their device settings get a calm, static version.

## Pages

| URL                 | Page                                   |
| ------------------- | -------------------------------------- |
| `/`                 | Home                                   |
| `/services`         | All services                           |
| `/services/:id`     | Single service (e.g. `/services/roof`) |
| `/projects`         | Project gallery with category filter   |
| `/about`            | About the company                      |
| `/faq`              | Frequently asked questions             |
| `/contact`          | Contact details and inspection form    |

## Next steps

- Replace the placeholder business details in `src/data/site.js`
- Add real images to `src/assets/` (project photos, before/after)
- Connect the contact form in `src/pages/Contact.jsx` to a backend or form service
