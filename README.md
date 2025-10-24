# Robert Sty Triana - Portfolio

Professional personal portfolio built with React, TailwindCSS, and Framer Motion.

## Features

- 🎨 Modern dark design with electric blue accents
- 🌍 Bilingual support (Spanish/English) with i18next
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 📧 Contact form with EmailJS integration
- 🚀 Fast and optimized with Vite

## Tech Stack

- React 18
- Vite
- TailwindCSS
- Framer Motion
- i18next
- EmailJS
- React Icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/rstriana-dev.git
cd rstriana-dev
```

2. Install dependencies
```bash
npm install
```

3. Configure EmailJS (Optional)

Create an account at [EmailJS](https://www.emailjs.com/) and update the credentials in `src/components/Contact.jsx`:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',      // Replace with your service ID
  'YOUR_TEMPLATE_ID',     // Replace with your template ID
  {...},
  'YOUR_PUBLIC_KEY'       // Replace with your public key
);
```

4. Start the development server
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  primary: {
    bg: '#0C1628',
    accent: '#1E3A8A',
    text: '#E2E8F0',
    gray: '#94A3B8',
    dark: '#071123',
  },
}
```

### Content

Update the translation files to modify content:
- `src/i18n/es.json` - Spanish content
- `src/i18n/en.json` - English content

### Projects

Add your real projects by editing the `projects.items` array in the translation files.

### Social Links

Update social media links in `src/components/Footer.jsx`.

## Project Structure

```
src/
├── assets/             # Images and static files
├── components/         # React components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Projects.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── i18n/              # Internationalization
│   ├── index.js
│   ├── es.json
│   └── en.json
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## License

MIT License - feel free to use this template for your own portfolio!

## Contact

Robert Sty Triana - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/yourusername/rstriana-dev](https://github.com/yourusername/rstriana-dev)


