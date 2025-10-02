# HUMAN.EXE Marketplace

A cyberpunk-themed marketplace built with Next.js 15, featuring a landing page, product catalog, shopping cart, and checkout system.

## 🚀 Features

- **Landing Page** - Cyberpunk-themed introduction with animated characters
- **Product Catalog** - Browse skins, weapons, accessories, and exclusive items
- **Shopping Cart** - Add/remove items with persistent storage
- **Product Details** - Detailed product pages with image galleries
- **Checkout System** - Complete purchase flow with order summary
- **Responsive Design** - Mobile-friendly interface
- **Category Navigation** - Filter products by category
- **AI Chat Integration** - Chat interface for customer support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules + Tailwind CSS 4
- **Fonts**: Press Start 2P, Inter, Silkscreen
- **State Management**: React Context API
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd humanexe-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── mock.json          # Product data
│   │       ├── route.js           # GET all products
│   │       └── [id]/route.js      # GET single product
│   ├── components/
│   │   ├── Banner.jsx
│   │   ├── CartContext.jsx        # Shopping cart state
│   │   ├── CartSidebar.jsx
│   │   ├── Category.jsx
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductSection.jsx
│   ├── styles/                    # CSS Modules
│   │   ├── Banner.module.css
│   │   ├── CartSidebar.module.css
│   │   ├── Category.module.css
│   │   ├── Checkout.module.css
│   │   ├── Header.module.css
│   │   ├── Landing.module.css
│   │   ├── PaymentSuccess.module.css
│   │   ├── Plans.module.css
│   │   ├── ProductCard.module.css
│   │   ├── ProductDetail.module.css
│   │   └── ProductSection.module.css
│   ├── checkout/page.js           # Checkout page
│   ├── home/page.js              # Marketplace home
│   ├── landing/page.js           # Landing page
│   ├── payment-success/page.js   # Order confirmation
│   ├── plans/page.js             # Premium plans
│   ├── product/[id]/page.js      # Product details
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Root redirect
├── public/
│   └── images/                   # Static assets
└── package.json
```

## 🎮 Pages & Routes

- **`/`** → Redirects to `/landing`
- **`/landing`** → Cyberpunk landing page
- **`/home`** → Marketplace with products
- **`/product/[id]`** → Individual product pages
- **`/checkout`** → Shopping cart checkout
- **`/payment-success`** → Order confirmation
- **`/plans`** → Premium subscription plans
- **`/ai-chat`** → AI customer support

## 🛒 Shopping Cart Features

- **Add to Cart** - Click any product to add to cart
- **Persistent Storage** - Cart saved in localStorage
- **Cart Sidebar** - Slide-out cart interface
- **Item Management** - Remove items, view quantities
- **Price Calculation** - Automatic total calculation

## 🎨 Design System

- **Color Scheme**: Cyberpunk (dark backgrounds, neon accents)
- **Typography**: Press Start 2P (headings), Inter (body text)
- **Components**: Modular CSS with hover effects
- **Layout**: Responsive grid system
- **Animations**: Smooth transitions and hover states

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar navigation
- **Tablet**: Adapted grid layouts
- **Mobile**: Stacked layouts with touch-friendly buttons

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Setup

No environment variables required - this is a frontend-only application with mock data.

## 📊 Data Structure

Products are stored in `src/app/api/products/mock.json` with the following structure:

```json
{
  "id": 1,
  "name": "Product Name",
  "price": "R$ 29,99",
  "mainImage": "/images/product.png",
  "thumbnailImages": ["/images/thumb1.png"],
  "creator": "@username",
  "profile": "/images/profile.png",
  "likes": 2.3,
  "vip": false,
  "discount": 0,
  "description": "Product description"
}
```

## 🚀 Deployment

This project can be deployed to any static hosting service:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Build for Production

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Real backend integration
- [ ] User authentication system
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Product search functionality
- [ ] User reviews and ratings
- [ ] Inventory management
- [ ] Order tracking system

## 📞 Support

For support, email support@humanexe.com or create an issue in this repository.

---

**Built with ❤️ using Next.js 15**