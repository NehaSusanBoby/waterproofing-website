// Central place for all site content — edit here to update every page.
// Business details below are real; services text, reviews, projects and FAQs are still placeholders.

export const site = {
  name: 'PK Tradings',
  owner: 'Boby P Kuriakose',
  tagline: 'Keeping your property dry, strong and protected.',
  intro:
    'Professional waterproofing in Kothamangalam for homes and commercial buildings — roofs, basements, bathrooms, walls and tanks.',
  phone: '+91 94477 64490',
  whatsapp: '919447764490', // country code + number, no spaces or +
  email: '', // add an email address here to show it on the site
  address: 'Putheeckal Building, Near Kala Auditorium, Kothamangalam, Kerala 686691',
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM', // placeholder — confirm real hours
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

export const services = [
  {
    id: 'roof',
    icon: '🏠',
    title: 'Roof & Terrace Waterproofing',
    description: 'Membrane and liquid coatings that stop leaks and seepage from the top down.',
    details:
      'Placeholder — describe your roof and terrace process, materials used, and typical project duration.',
    benefits: ['Stops ceiling leaks and dampness', 'Heat-reflective coating options', 'Long-life warranty'],
  },
  {
    id: 'basement',
    icon: '🧱',
    title: 'Basement Waterproofing',
    description: 'Below-grade protection against groundwater pressure and dampness.',
    details: 'Placeholder — describe your basement treatment methods.',
    benefits: ['Prevents water ingress', 'Protects foundations', 'Reduces mould and odour'],
  },
  {
    id: 'bathroom',
    icon: '🚿',
    title: 'Bathroom & Kitchen',
    description: 'Wet-area treatment beneath tiles to prevent leaks into walls and floors below.',
    details: 'Placeholder — describe your wet-area waterproofing process.',
    benefits: ['No more seepage to the floor below', 'Option without breaking tiles', 'Quick turnaround'],
  },
  {
    id: 'wall',
    icon: '🏢',
    title: 'Exterior Wall Coating',
    description: 'Weather-resistant coatings that block rain penetration and cracks.',
    details: 'Placeholder — describe your exterior wall treatment.',
    benefits: ['Blocks monsoon seepage', 'Crack-bridging coatings', 'Improves appearance'],
  },
  {
    id: 'tank',
    icon: '💧',
    title: 'Water Tank Waterproofing',
    description: 'Safe, non-toxic linings for overhead and underground tanks.',
    details: 'Placeholder — describe your tank lining process.',
    benefits: ['Food-grade safe materials', 'Stops leakage and loss', 'Easy to clean surface'],
  },
  {
    id: 'crack',
    icon: '🛠️',
    title: 'Crack & Joint Repair',
    description: 'Injection grouting and sealants for structural cracks and expansion joints.',
    details: 'Placeholder — describe your crack repair and grouting methods.',
    benefits: ['Seals active leaks', 'Restores structural integrity', 'Flexible joint sealants'],
  },
]

export const features = [
  { title: 'Free Site Inspection', text: 'We find the real source of the leak before quoting.' },
  { title: 'Quality Materials', text: 'Branded, tested products suited to your structure.' },
  { title: 'Trained Team', text: 'Experienced applicators supervised on every job.' },
  { title: 'Written Warranty', text: 'Every job comes with a clear warranty on the work.' },
]

// Steps shown in the pinned scroll scene on the home page
export const storySteps = [
  {
    short: 'Leak',
    title: 'Water always finds a way in.',
    text: 'Rain, groundwater and daily use slowly push moisture through roofs, walls, bathrooms and basements — causing stains, peeling paint and damage.',
  },
  {
    short: 'Inspect',
    title: 'We find the real source.',
    text: 'A free site inspection with moisture checks pinpoints exactly where water is getting in, so we fix the cause, not just the stain.',
  },
  {
    short: 'Treat',
    title: 'The right system, layer by layer.',
    text: 'Surfaces are prepared and sealed with quality membranes, coatings and injections chosen for each part of your building.',
  },
  {
    short: 'Protect',
    title: 'A dry home, backed by warranty.',
    text: 'Your property stays dry season after season — and every job comes with a written warranty.',
  },
]

export const marqueeItems = [
  'Roof Waterproofing',
  'Basement Sealing',
  'Bathroom Leak Fix',
  'Exterior Wall Coating',
  'Water Tank Lining',
  'Crack Injection',
]

export const stats = [
  { value: '10+', label: 'Years experience' },
  { value: '500+', label: 'Projects completed' },
  { value: '100%', label: 'Warranty-backed' },
]

export const testimonials = [
  { name: 'Customer Name', location: 'Area, City', text: 'Placeholder review — add a real customer quote here.' },
  { name: 'Customer Name', location: 'Area, City', text: 'Placeholder review — add a real customer quote here.' },
  { name: 'Customer Name', location: 'Area, City', text: 'Placeholder review — add a real customer quote here.' },
]

export const projects = [
  { id: 1, title: 'Terrace Waterproofing', category: 'roof', location: 'Area, City' },
  { id: 2, title: 'Basement Treatment', category: 'basement', location: 'Area, City' },
  { id: 3, title: 'Bathroom Leak Fix', category: 'bathroom', location: 'Area, City' },
  { id: 4, title: 'Exterior Wall Coating', category: 'wall', location: 'Area, City' },
  { id: 5, title: 'Overhead Tank Lining', category: 'tank', location: 'Area, City' },
  { id: 6, title: 'Crack Injection', category: 'crack', location: 'Area, City' },
]

export const faqs = [
  { q: 'How long does waterproofing last?', a: 'Placeholder — typical lifespan depends on the system used.' },
  { q: 'Do you need to break the tiles?', a: 'Placeholder — explain when tile removal is or is not required.' },
  { q: 'Can waterproofing be done during the monsoon?', a: 'Placeholder — explain your approach in wet seasons.' },
  { q: 'Is the inspection really free?', a: 'Placeholder — describe your inspection policy.' },
  { q: 'What warranty do you provide?', a: 'Placeholder — describe your warranty terms.' },
]
