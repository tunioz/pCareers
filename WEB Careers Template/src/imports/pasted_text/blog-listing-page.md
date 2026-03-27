# Figma Make Prompt - pCloud Careers Portal Blog Page (Listing)

## Overview
Create the BLOG PAGE (LISTING) of the pCloud Careers Portal using the design system from the [INSERT FIGMA PROJECT LINK HERE]. Use ONLY the text content and structural layout provided below. ALL visual styling, typography, colors, component styles, and spacing must be sourced from the Figma Design System project.

**IMPORTANT:** Use the following NEW component types that have NOT been used in other pages:
- Featured Article Card (large prominent card)
- Category Filter Pills (category-based filtering)
- Blog Card Component (article listing cards with metadata)
- Newsletter Signup Form (email capture with confirmation)
- Load More Button (dynamic content loading)
- Blog Grid Layout (responsive grid with article cards)

---

## 📄 PAGE STRUCTURE & CONTENT

### **Meta Information**
- **Page Title:** "Under the hood"
- **Section Count:** 8 main sections

---

### **SECTION 1: HERO**

| Element | Content |
|---------|---------|
| Headline | "Under the hood" |
| Subheading | "Engineering insights from the pCloud team" |

---

### **SECTION 2: FEATURED ARTICLE**

**Headline:** "Featured"

#### Featured Article Card

| Element | Content |
|---------|---------|
| Title | "How We Scaled to 500 Petabytes: The Architecture Behind pCloud's Storage Layer" |
| Category | "Infrastructure" |
| Excerpt | [INSERT 100–150 word excerpt describing the article topic] |
| Author | [INSERT author name] |
| Publish Date | [INSERT date in format "March 15, 2025"] |
| Read Time | "12 min read" |
| CTA Link | "Read article →" (links to individual blog post page) |

---

### **SECTION 3: CATEGORY FILTERS**

**Layout:** Horizontal scrolling/wrapping filter pills

**Category Filter Pills (7 total):**
- All
- Infrastructure
- Security
- Performance
- Mobile
- Product Eng
- Culture

**Behavior:**
- Clicking category filters blog grid to show only articles in that category
- "All" shows all articles
- data-filter attribute on each pill
- Visual feedback on active filter
- Single select (clicking new category deselects previous)

---

### **SECTION 4: BLOG GRID**

**Headline:** "Latest Articles"

**Layout:** Responsive grid of blog article cards

**Blog Card Component Structure:**

Each blog card contains:
- Thumbnail image
- Category pill (.filter-pill, data-category)
- Article title (.blog-card-title)
- Author name
- Publish date
- Read time estimate (in format "X min read")
- "Read article →" link (links to individual blog post page)

---

#### Blog Articles by Category:

**INFRASTRUCTURE (3 articles):**

##### Article 1
- **Title:** "How We Scaled to 500 Petabytes: The Architecture Behind pCloud's Storage Layer"
- **Category:** "Infrastructure"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "12 min read"
- **Excerpt:** [INSERT brief excerpt or description]

##### Article 2
- **Title:** "Migration to gRPC: Modernizing Our Backend Communication"
- **Category:** "Infrastructure"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "9 min read"
- **Excerpt:** [INSERT brief excerpt or description]

##### Article 3
- **Title:** "Distributed Caching Strategies for 99.9% Uptime"
- **Category:** "Infrastructure"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "10 min read"
- **Excerpt:** [INSERT brief excerpt or description]

---

**SECURITY (2 articles):**

##### Article 4
- **Title:** "Zero-Knowledge Encryption: Why pCloud Chose This Standard"
- **Category:** "Security"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "8 min read"
- **Excerpt:** [INSERT brief excerpt or description]

##### Article 5
- **Title:** "Designing for Trust: UX Patterns in Privacy-First Applications"
- **Category:** "Security"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "7 min read"
- **Excerpt:** [INSERT brief excerpt or description]

---

**PERFORMANCE (2 articles):**

##### Article 6
- **Title:** "Optimizing File Sync: Reducing P99 Latency by 40%"
- **Category:** "Performance"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "11 min read"
- **Excerpt:** [INSERT brief excerpt or description]

##### Article 7
- **Title:** "Database Query Optimization at Scale"
- **Category:** "Performance"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "9 min read"
- **Excerpt:** [INSERT brief excerpt or description]

---

**PRODUCT ENG (2 articles):**

##### Article 8
- **Title:** "Building pCloud Pass: From Concept to Launch"
- **Category:** "Product Eng"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "8 min read"
- **Excerpt:** [INSERT brief excerpt or description]

##### Article 9
- **Title:** "Feature Rollouts: A/B Testing in a Privacy-First World"
- **Category:** "Product Eng"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "6 min read"
- **Excerpt:** [INSERT brief excerpt or description]

---

**MOBILE (2 articles):**

##### Article 10
- **Title:** "Rebuilding iOS App in SwiftUI: Lessons Learned"
- **Category:** "Mobile"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "10 min read"
- **Excerpt:** [INSERT brief excerpt or description]

##### Article 11
- **Title:** "Cross-Platform State Management: React Native at pCloud"
- **Category:** "Mobile"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "7 min read"
- **Excerpt:** [INSERT brief excerpt or description]

---

**CULTURE (1 article):**

##### Article 12
- **Title:** "How We Run Hackathons: Building a Culture of Innovation"
- **Category:** "Culture"
- **Author:** [INSERT author name]
- **Date:** [INSERT publication date]
- **Read Time:** "5 min read"
- **Excerpt:** [INSERT brief excerpt or description]

---

### **SECTION 5: LOAD MORE BUTTON**

**Button ID:** "loadMoreBtn"

**Label:** "Load More Articles"

**Behavior:**
- Click loads additional articles dynamically
- AJAX-based page loading or infinite scroll
- Can be repeated until all articles are displayed
- Button disabled when no more articles available

---

### **SECTION 6: NEWSLETTER SIGNUP**

**Headline:** "Stay in the loop"

**Subheading:** "Get engineering insights delivered to your inbox"

**Form Fields:**
1. Email input field (required)
2. Name input field (optional)
3. Subscribe button

**Post-Submit Behavior:**
- Show thank you message: "Thanks for subscribing! Check your inbox for a confirmation email."
- Or handle via email service integration (Mailchimp, SendGrid, etc.)

---

### **SECTION 7: RELATED JOBS**

**Headline:** "These problems excite you?"

**Subheading:** "We're looking for talented engineers to solve them"

**Job Cards (3 total):**

#### Job Card 1
- **Title:** "Senior Backend Engineer"
- **Department:** Engineering
- **Product:** Platform/Core
- **Link:** Links to job detail page
- [INSERT brief description of role]

#### Job Card 2
- **Title:** "Security Engineer"
- **Department:** Security
- **Product:** Security
- **Link:** Links to job detail page
- [INSERT brief description of role]

#### Job Card 3
- **Title:** "Site Reliability Engineer (SRE)"
- **Department:** Infrastructure
- **Product:** Platform/Core
- **Link:** Links to job detail page
- [INSERT brief description of role]

---

### **SECTION 8: SOCIAL SHARING**

**Headline:** "Share this article" (or similar)

**Social Share Options:**
- Share on LinkedIn
- Share on Twitter
- Share via Email

**Display:** Links/buttons for each platform with icons

---

## 🎨 FREE CREATIVE RESOURCES (Images, Icons, Photos)

**FREE CREATIVE RESOURCES:**

- Blog Thumbnail Images: Unsplash, Pexels, Pixabay
- Category Icons: Feather Icons or Heroicons
- Social Media Share Icons: SimpleIcons
- Background patterns: Pixabay, Unsplash

---

## 📋 DELIVERABLE CHECKLIST

- [ ] Hero section with headline and subheading
- [ ] Featured Article card (large, prominent)
- [ ] Category Filter pills (7 categories)
- [ ] Blog Grid with article cards (12 articles)
- [ ] Each article card with thumbnail, category, title, author, date, read time
- [ ] Load More button (functional)
- [ ] Newsletter signup form
- [ ] Related Jobs section (3 job cards)
- [ ] Social sharing options
- [ ] All styling applied from Figma Design System
- [ ] Filter functionality verified (category filtering)
- [ ] Load More functionality verified
- [ ] Responsive layouts verified
- [ ] All links and CTAs functional

---

## 📌 NOTES

- **Figma Project Link:** [INSERT THE ACTUAL LINK TO YOUR DESIGN SYSTEM FIGMA FILE]
- Apply all styles from the Figma Design System project
- All text content and structure from this document
- Use free creative resources listed above
- Blog articles can pull from a CMS, JSON file, or static data
- Filter should be functional (JavaScript-based filtering by category)
- Load More button should dynamically load additional articles
- Newsletter form can integrate with email service provider

---

**Version:** 1.0  
**Last Updated:** March 2025  
**Status:** Ready for Figma Make automation