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
  components/   Shared UI: Layout, Navbar, Footer, ServiceCard
  pages/        Route pages: Home, Services, About, Contact, NotFound
  data/site.js  Business details and services list (edit here first)
  App.jsx       Route definitions
  main.jsx      App entry (BrowserRouter)
  index.css     Global styles and theme variables
```

## Next steps

- Replace the placeholder business details in `src/data/site.js`
- Add real images to `src/assets/` (project photos, before/after)
- Connect the contact form in `src/pages/Contact.jsx` to a backend or form service
