# Sebastian Dohne - Portfolio Website

A modern, responsive portfolio website showcasing ecological data science projects, work experience, and academic background. Built with vanilla HTML, CSS, and JavaScript featuring smooth animations and interactive expandable content sections.

## 🌟 Features

- **Single Page Application (SPA)** - Smooth navigation between sections without page reloads
- **Expandable Content Cards** - Interactive training and work experience sections with detailed information
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **PDF Viewer Modal** - In-browser document viewing for project reports
- **GitHub Integration** - Direct links to project repositories
- **Professional Animations** - Smooth transitions and hover effects
- **Accessibility Features** - Keyboard navigation and screen reader support

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main HTML file (single page application)
├── css/
│   └── style.css           # All styling and responsive design
├── js/
│   └── script.js           # Interactive functionality and animations
├── images/                 # Assets folder
│   ├── mee.png            # Profile picture
│   ├── *.pdf              # Project reports and documents
│   └── *.png              # Publication and project images
└── README.md              # This file
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd portfolio-website
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. **Access the site**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or open `index.html` directly in your browser

## 📋 Page Sections

### 🏠 Portfolio (Home)
- **Profile header** with photo and GitHub showcase
- **Project grid** featuring:
  - Global Wheat Yield Prediction (Final Project)
  - High Performance Computing Project
  - Miniproject: Bacterial Growth Analysis
  - Statistical Analysis Projects
  - GIS & Bioinformatics Work
  - Undergraduate Research

### 👤 About
- Personal background and career objectives
- Contact information and social links
- Professional summary

### 💼 Work Experience
- **Expandable job cards** with detailed responsibilities:
  - **Risk Analyst** (Current) - Animal and Plant Health Agency
  - **Scientific Assistant** (Previous) - Laboratory role
- Click on job titles to expand and see detailed information

### 🎓 Training
- **Expandable institution cards**:
  - **Imperial College London** - MSc modules and coursework
  - **University of Exeter** - BSc degree components
- **Professional certifications** section

### 📚 Publications
- Conference presentations
- Research contributions
- Professional publications with visual previews

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with:
  - CSS Grid and Flexbox for layouts
  - CSS Variables for consistent theming
  - CSS Animations and transitions
  - Media queries for responsive design
- **Vanilla JavaScript** - Interactive functionality including:
  - Single page application navigation
  - Expandable content cards
  - PDF modal viewer
  - Smooth scroll animations
  - Keyboard accessibility
- **Font Awesome** - Icons for social media and UI elements

## 🎨 Customization Guide

### Adding New Projects

1. **Add project card** to the projects grid in `index.html`:
```html
<div class="project-card" data-pdf="images/your-project.pdf" data-github="https://github.com/your-repo">
    <div class="project-info">
        <h3 class="project-title">Your Project Title</h3>
        <p class="project-summary">Project description...</p>
        <div class="project-details">
            <span class="project-category">Project Type</span>
            <span class="project-year">2025</span>
        </div>
        <div class="project-actions">
            <button class="action-button pdf-button">View Report</button>
            <button class="action-button github-button">View Code</button>
        </div>
    </div>
</div>
```

2. **Add PDF file** to the `images/` folder
3. **Update GitHub URL** in the `data-github` attribute

### Adding New Work Experience

1. **Add work card** to the work experience section:
```html
<div class="work-card institution-card" data-institution="your-role">
    <div class="institution-header">
        <div class="institution-info">
            <h3 class="training-name">Job Title</h3>
            <p class="institution-description">Department/Team</p>
            <div class="work-details">
                <span class="company-name">Company Name</span>
                <span class="work-location">Location</span>
            </div>
            <div class="training-info">
                <span class="training-date">Start – End Date</span>
                <span class="training-provider">Role Type</span>
            </div>
        </div>
        <div class="expand-icon">
            <i class="fas fa-chevron-down"></i>
        </div>
    </div>
    <div class="modules-content" style="display: none;">
        <!-- Add module-item divs for job responsibilities -->
    </div>
</div>
```

### Updating Colors and Styling

All colors are defined as CSS variables in `:root` at the top of `style.css`:

```css
:root {
  --primary-color: #333;        /* Main brand color */
  --background-main: #f7f7f7;   /* Page background */
  --text-primary: #222;         /* Main text color */
  /* ... more variables */
}
```

Change these variables to update the entire site's color scheme.

### Adding New Pages

1. **Add navigation link** in the nav section
2. **Create new page content** div with `page-content` class
3. **Update JavaScript** navigation arrays to include the new page

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Development Tips

### Local Development
- Use browser developer tools for responsive testing
- Check console for any JavaScript errors
- Test keyboard navigation (Tab, Enter, Escape keys)

### Performance
- Optimize images before adding to `images/` folder
- Keep PDF file sizes reasonable for web viewing
- Test loading times on slower connections

### Browser Compatibility
- Tested on modern browsers (Chrome, Firefox, Safari, Edge)
- Uses modern CSS features (Grid, Flexbox, CSS Variables)
- Includes fallbacks for older browser support

## 📞 Contact & Updates

**Sebastian Dohne**
- Email: sebdohne@gmail.com
- GitHub: [github.com/airbreather2](https://github.com/airbreather2)
- LinkedIn: [Sebastian Dohne](https://www.linkedin.com/in/sebastian-dohne-3a3061209/)

## 📄 License

This project is personal portfolio website. Feel free to use the code structure and styling as inspiration for your own portfolio, but please don't copy the content directly.

---

**Last Updated**: May 2025  
**Version**: 1.0.0