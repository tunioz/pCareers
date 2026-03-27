# Figma Make Prompt - pCloud Careers Portal Open Roles Page

## Overview
Create the OPEN ROLES PAGE of the pCloud Careers Portal using the design system from the [INSERT FIGMA PROJECT LINK HERE]. Use ONLY the text content and structural layout provided below. ALL visual styling, typography, colors, component styles, and spacing must be sourced from the Figma Design System project.

**IMPORTANT:** Use the following NEW component types that have NOT been used in Home, About, or Culture pages:
- Quick Filter Tags/Pills (interactive tag filtering system)
- Filter Control Dropdowns (department, product, seniority filters)
- Job Card Component (specialized job listing card)
- Filter Toggle (Product View / Department View switch)
- Status Badges (NEW badge, HIGH PRIORITY badge)
- Results Counter (dynamic "[n] roles found" display)
- Job Grid with Grouping (by product or department)

---

## 📄 PAGE STRUCTURE & CONTENT

### **Meta Information**
- **Page Title:** "What will you build for 24M+ people?"
- **Section Count:** 8 main sections

---

### **SECTION 1: HERO**

| Element | Content |
|---------|---------|
| Headline | "What will you build for 24M+ people?" |
| Accent Text | "24M+" (accent color on number) |
| Subheading | "Join our world-class team of builders" |

---

### **SECTION 2: QUICK FILTER TAGS**

**Layout:** Horizontal scrolling/wrapping tag pills

**Filter Tag Pills (8 total):**
- React
- Go
- DevOps
- Security
- iOS
- Pass
- Drive
- TypeScript

**Behavior:**
- Clicking tag filters job cards showing only matching tags
- Each pill has data-tag attribute
- Visual feedback on active state
- Can multi-select tags

---

### **SECTION 3: FILTER CONTROLS**

**Layout:** Horizontal control bar

**Filter Controls (4 elements):**

1. **Department Dropdown**
   - Label: "Department"
   - Options: Engineering, Security, Infrastructure, Design, Mobile, Quality, Business
   - Default: "All"

2. **Product Dropdown**
   - Label: "Product"
   - Options: pCloud Drive, pCloud Encryption, pCloud Pass, pCloud Business, Platform/Core
   - Default: "All"

3. **Seniority Dropdown**
   - Label: "Seniority"
   - Options: Junior, Mid-level, Senior, Staff, Principal
   - Default: "All"

4. **Clear All Button**
   - Label: "Clear All"
   - Resets all filters and tag selections
   - Disabled state when no filters active

**View Toggle (additional control):**
- Button Label: "Product View | Department View"
- Toggle between two job display modes (see Sections 4 and 5)

**Results Counter (dynamic):**
- Display: "[n] roles found"
- Updates based on active filters
- Shows total available if no filters

---

### **SECTION 4: JOBS — PRODUCT VIEW**

**Headline:** "Open Roles"

**Jobs Grouped by Product:**

#### Product Group 1: pCloud Drive
- **Total Roles:** 4

**Job Card 1.1**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Drive"
- **Badges:** [NEW / HIGH PRIORITY if applicable]
- **Link:** Links to job detail page

**Job Card 1.2**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Drive"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

**Job Card 1.3**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Drive"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

**Job Card 1.4**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Drive"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

---

#### Product Group 2: pCloud Encryption
- **Total Roles:** 2

**Job Card 2.1**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Encryption"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

**Job Card 2.2**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Encryption"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

---

#### Product Group 3: pCloud Pass
- **Total Roles:** 2

**Job Card 3.1**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Pass"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

**Job Card 3.2**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Pass"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

---

#### Product Group 4: pCloud Business
- **Total Roles:** 1

**Job Card 4.1**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "pCloud Business"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

---

#### Product Group 5: Platform/Core
- **Total Roles:** 3

**Job Card 5.1**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "Platform/Core"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

**Job Card 5.2**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "Platform/Core"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

**Job Card 5.3**
- **Title:** [INSERT job title]
- **Department Tag:** [INSERT department]
- **Product Tag:** "Platform/Core"
- **Badges:** [if applicable]
- **Link:** Links to job detail page

---

### **SECTION 5: JOBS — DEPARTMENT VIEW**

**Headline:** "Open Roles"

**Jobs Grouped by Department:**

#### Department Group 1: Engineering
- **Total Roles:** 4
- **Job Cards:** 4 job cards (same structure as Section 4)

#### Department Group 2: Security
- **Total Roles:** 2
- **Job Cards:** 2 job cards

#### Department Group 3: Infrastructure
- **Total Roles:** 2
- **Job Cards:** 2 job cards

#### Department Group 4: Design
- **Total Roles:** 1
- **Job Cards:** 1 job card

#### Department Group 5: Mobile
- **Total Roles:** 1
- **Job Cards:** 1 job card

#### Department Group 6: Quality
- **Total Roles:** 1
- **Job Cards:** 1 job card

#### Department Group 7: Business
- **Total Roles:** 1
- **Job Cards:** 1 job card

**Note:** Total = 12 open roles

---

### **SECTION 6: JOB CARD COMPONENT SPECIFICATION**

**Job Card Layout & Structure:**

| Element | Content |
|---------|---------|
| Clickable Area | Entire card links to job detail page |
| Title | Job title (prominent) |
| Product/Department Tags | Pill-style tags |
| NEW Badge | Amber/yellow badge (if job < 7 days old) |
| HIGH PRIORITY Badge | Red badge (if marked as high priority) |
| Data Attributes | data-title, data-product, data-department, data-seniority, data-search |

**Badge Styling:**
- NEW badge: Amber color, "NEW" text
- HIGH PRIORITY badge: Red color, "HIGH PRIORITY" text
- Multiple badges can display simultaneously

**Hover/Interactive State:**
- Card becomes clickable/hoverable
- Visual feedback for interactivity

---

### **SECTION 7: TALENT COMMUNITY CTA**

**Headline:** "Don't see what you're looking for?"

**Content:** "Join Our Talent Community — we'll alert you when matching roles open"

**Form Fields:**
1. Name input field (required)
2. Email input field (required)
3. Subscribe button

**Post-Submit Behavior:**
- Show thank you message: "Thanks for joining our Talent Community!"
- Or handle via email service integration

---

### **SECTION 8: WHY JOIN**

**Headline:** "Build Something That Matters"

**Benefits Cards (4 total):**

#### Benefit Card 1
- **Title:** "Top 1% Compensation"
- **Description:** Market-rate salaries, competitive equity packages, performance bonuses

#### Benefit Card 2
- **Title:** "Real Impact"
- **Description:** Serving 24M+ users, leading Swiss privacy standards, trusted by millions globally

#### Benefit Card 3
- **Title:** "Continuous Growth"
- **Description:** Training budgets, mentorship programs, challenging projects, career development

#### Benefit Card 4
- **Title:** "Work-Life Balance"
- **Description:** Flexible hours, remote-friendly, generous paid time off, wellness support

---

## 🎨 FREE CREATIVE RESOURCES (Images, Icons, Photos)

**FREE CREATIVE RESOURCES:**

- Icons for Department Tags: Feather Icons or Heroicons
- Icons for Why Join benefit cards: Feather Icons or Heroicons
- Background patterns: Pixabay, Unsplash

---

## 📋 DELIVERABLE CHECKLIST

- [ ] Hero section with headline and accent text
- [ ] Quick Filter Tags component (8 tags, interactive filtering)
- [ ] Filter Control dropdowns (Department, Product, Seniority)
- [ ] Clear All button (functional)
- [ ] View Toggle button (Product View / Department View)
- [ ] Results Counter dynamic display
- [ ] Jobs in Product View (5 groups, 12 total roles)
- [ ] Jobs in Department View (7 groups, 12 total roles)
- [ ] Job Card components with all required fields
- [ ] NEW and HIGH PRIORITY badges on applicable cards
- [ ] Talent Community CTA form
- [ ] Why Join benefit cards (4 total)
- [ ] All styling applied from Figma Design System
- [ ] Filter functionality verified (tag filtering, dropdown filtering)
- [ ] View toggle switches between Product/Department grouping
- [ ] Results counter updates with active filters
- [ ] All links and CTAs functional
- [ ] Responsive layouts verified

---

## 📌 COMPONENT USAGE SUMMARY

**New Components Used on Open Roles Page (Not used in Home, About, or Culture):**

1. **Quick Filter Tags/Pills** - Interactive tag-based filtering system
2. **Filter Control Dropdowns** - Department, Product, Seniority selectors
3. **Clear All Button** - Filter reset control
4. **View Toggle Button** - Product View / Department View switch
5. **Results Counter Display** - Dynamic "[n] roles found" text
6. **Job Card Component** - Specialized job listing card with tags and badges
7. **Status Badges** - NEW badge (amber), HIGH PRIORITY badge (red)
8. **Job Grid with Grouping** - Products or Departments grouping with headers
9. **Why Join Benefit Cards** - Benefits highlight cards (different context from Culture page Benefits)

---

## 📌 NOTES

- **Figma Project Link:** [INSERT THE ACTUAL LINK TO YOUR DESIGN SYSTEM FIGMA FILE]
- Apply all styles from the Figma Design System project
- All text content and structure from this document
- Use free creative resources listed above
- Job data can pull from a JSON file, CMS, or hardcoded list
- Filter controls should be functional (JavaScript-based filtering)
- Each component type is NEW and distinct from Home/About/Culture pages

---

**Version:** 1.0  
**Last Updated:** March 2025  
**Status:** Ready for Figma Make automation