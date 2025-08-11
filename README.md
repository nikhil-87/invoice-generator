# Mini Invoice Generator UI — Xportel Frontend Internship Task

A small internal tool to create and preview invoices before sending to clients. Built with React (Vite) and Tailwind CSS.

## Links

- Live Demo: https://invoice-generator-five-mu.vercel.app
- GitHub Repository: https://github.com/nikhil-87/invoice-generator

Replace the above with your actual links.

## Requirement Coverage

1) Invoice Form
- Client Name (text) — implemented
- Invoice Date (date picker) — implemented
- Line Items: Description, Quantity, Rate — implemented
- Add/Remove line items — implemented (with smooth animations)
- Subtotal + GST 18% auto-calculated — implemented

2) Live Preview Panel
- Preview updates live as the user types — implemented
- Clean, printable-like layout — implemented

3) UI / Design
- Fully responsive (mobile and desktop) — implemented
- Tailwind CSS for all styling — implemented
- Good spacing, alignment, clean layout — implemented

4) Functionality
- No backend / no PDF generation — implemented (local state only)
- Local state to manage data — implemented (React state)
- Basic validation for numeric fields — implemented (Qty/Rate sanitization)

Bonus
- Component-based structure — implemented (Form + Preview + utils)
- Validation feedback — implemented (invalid fields styled)
- UI animations for add/remove — implemented (Tailwind-based)
- Deployable build — Vite build ready (live link provided above)

## Tech Stack

- React + Vite
- Tailwind CSS v4

## Run Locally

- npm install
- npm run dev

## Notes

- Mobile-friendly inputs to avoid iOS zoom
- Overflow-safe on very small screens
- Animations via Tailwind utilities
