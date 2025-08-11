# Mini Invoice Generator

A small internal tool to create and preview invoices before sending to clients. Built with React (Vite) and Tailwind CSS.

## Links

- Live Demo: https://invoice-generator-five-mu.vercel.app
- GitHub Repository: https://github.com/nikhil-87/invoice-generator

## Features

- Create invoices: client, date, and line items (description, qty, rate)
- Add/remove items with smooth Tailwind animations
- Auto totals: Subtotal, GST 18%, Grand Total
- Live preview updates as you type
- Fully responsive: mobile cards + desktop table; centered layout
- Tailwind-only styling; clean light theme
- Validation and input sanitization for qty/rate (mobile-friendly 16px inputs)
- Local-only data: no backend; React state
- Clean component-based structure (Form, Preview, utils); production-ready Vite build

## Tech Stack

- React + Vite
- Tailwind CSS v4

## Run Locally

- npm install
- npm run dev