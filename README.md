# SPY EN - Next.js WhatsApp Tracker

A modern, optimized Next.js application for WhatsApp tracking and monitoring.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive Design** optimized for mobile
- 🔒 **Server Actions** for secure API calls
- 🗺️ **Interactive Maps** with Leaflet
- 📊 **Real-time Progress** tracking
- 🎯 **SEO Optimized** with metadata
- 🚀 **Performance Optimized** with Image optimization

## Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── step1/             # Step 1 page
│   ├── step2/             # Step 2 page
│   ├── step3/             # Step 3 page
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utilities and actions
├── public/               # Static assets
└── middleware.ts         # Next.js middleware
\`\`\`

## Key Improvements

### Performance
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting for better loading times
- **Dynamic Imports**: Lazy loading for maps and heavy components
- **Server Actions**: Secure server-side API calls

### SEO & Accessibility
- **Metadata API**: Proper meta tags for each page
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine optimization
- **Semantic HTML**: Proper HTML structure

### Mobile Optimization
- **Responsive Design**: Mobile-first approach
- **Touch Optimization**: Better touch interactions
- **Viewport Handling**: Proper mobile viewport configuration

### Security
- **Security Headers**: XSS protection and content security
- **Server Actions**: Secure API communication
- **Input Validation**: Proper form validation

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WHATSAPP_API_URL=https://primary-production-aac6.up.railway.app
\`\`\`

## API Integration

The app integrates with external APIs:
- **WhatsApp Photo API**: For profile photo retrieval
- **Location API**: For IP-based geolocation
- **Monitoring API**: For tracking user interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary.
