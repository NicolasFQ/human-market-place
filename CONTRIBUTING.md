# Contributing to HUMAN.EXE Marketplace

Thank you for your interest in contributing to HUMAN.EXE Marketplace! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/humanexe-marketplace.git
   cd humanexe-marketplace
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Development Guidelines

### Code Style

- Use **JavaScript (ES6+)** for all new code
- Follow **React best practices** and hooks patterns
- Use **CSS Modules** for styling (`.module.css` files)
- Follow **Next.js 15 App Router** conventions
- Use **semantic HTML** and accessibility best practices

### File Structure

```
src/
├── app/
│   ├── components/     # Reusable React components
│   ├── styles/        # CSS Modules
│   ├── api/          # API routes (mock data)
│   └── [pages]/      # Page components
└── public/           # Static assets
```

### Naming Conventions

- **Components**: PascalCase (`ProductCard.jsx`)
- **Files**: camelCase for JS, kebab-case for CSS
- **CSS Classes**: camelCase (`.productCard`)
- **Variables**: camelCase (`productName`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🐛 Reporting Issues

### Before Creating an Issue

1. Check if the issue already exists
2. Verify you're using the latest version
3. Try to reproduce the issue

### Issue Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

## 🔧 Making Changes

### Branch Naming

Use descriptive branch names:
- `feature/add-search-functionality`
- `bugfix/fix-cart-calculation`
- `docs/update-readme`
- `style/improve-mobile-layout`

### Commit Messages

Follow conventional commits:
```
feat: add product search functionality
fix: resolve cart total calculation error
docs: update installation instructions
style: improve mobile responsiveness
refactor: optimize product card component
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add comments for complex logic
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Use the PR template
   - Provide a clear description
   - Link related issues
   - Add screenshots if applicable

## 🧪 Testing

### Manual Testing

- Test all user flows
- Verify responsive design
- Check browser compatibility
- Test cart functionality
- Verify navigation

### Testing Checklist

- [ ] Landing page loads correctly
- [ ] Product catalog displays properly
- [ ] Shopping cart works as expected
- [ ] Checkout process completes
- [ ] Mobile layout is responsive
- [ ] All links navigate correctly

## 📋 Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Style/UI changes

## Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested cart functionality
- [ ] Tested navigation

## Screenshots
Add screenshots if applicable.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No console errors
- [ ] Responsive design maintained
```

## 🎨 Design Guidelines

### UI/UX Principles

- **Cyberpunk Theme**: Dark backgrounds, neon accents
- **Accessibility**: Proper contrast ratios, keyboard navigation
- **Responsive**: Mobile-first approach
- **Performance**: Optimized images and code

### Component Guidelines

- Keep components small and focused
- Use props for customization
- Include proper TypeScript types (if applicable)
- Add hover states and transitions

## 📚 Documentation

### Code Documentation

- Comment complex logic
- Use JSDoc for functions
- Keep README.md updated
- Document API changes

### Component Documentation

```javascript
/**
 * ProductCard component displays individual product information
 * @param {Object} product - Product data object
 * @param {string} product.name - Product name
 * @param {string} product.price - Product price
 * @param {Function} onAddToCart - Callback for add to cart action
 */
```

## 🚀 Release Process

1. **Version Bumping**
   - Update `package.json` version
   - Update CHANGELOG.md
   - Create release notes

2. **Deployment**
   - Build production version
   - Deploy to hosting platform
   - Verify deployment

## 💬 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the golden rule

### Communication

- Use clear, descriptive language
- Ask questions when unsure
- Provide context for issues
- Be patient with responses

## 🆘 Getting Help

- **Documentation**: Check README.md and code comments
- **Issues**: Search existing issues first
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainers for urgent issues

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to HUMAN.EXE Marketplace! 🚀
