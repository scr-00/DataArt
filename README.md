# 🎶 Coldplay Live Concert Timeline

## Stage 1: Static Skeleton (HTML)
This project is a timeline-based web app that showcases Coldplay's most iconic live concerts. The goal of this first stage was to create a static HTML structure that will later be enhanced with dynamic content, filters, and interactivity.

### 🔧 Features in This Stage
- **Header**: Includes the app logo (Coldplay Live Timeline) and a theme toggle button (currently non-functional).
- **Navigation Bar**: A placeholder for future filters such as year, location, or tour name.
- **Main Section**: Displays the purpose of the timeline and a sample concert event.
- **Timeline Section**: A section with a sample article detailing Coldplay’s 2022 Buenos Aires concert from the *Music of the Spheres* tour.
- **Modal**: An empty modal container for future pop-up details on concert events.
- **Semantic HTML Tags**: Uses `<main>`, `<article>`, `<figure>`, and other proper HTML5 elements to keep the structure clean and accessible.

---

## Stage 2: Responsive Styling (CSS)
In this stage, the app received a polished, responsive design using CSS Grid, Flexbox, and a Coldplay-inspired color scheme.

### 🎨 Features in This Stage
- **Responsive Layout**:  
  - CSS Grid for timeline layout.  
  - Flexbox for header and navigation bar.  
  - Breakpoints for mobile (<768px), tablet (768–1023px), and desktop (≥1024px).
- **Header Styling**: Dark gradient background, bold typography, Coldplay yellow theme toggle button.
- **Timeline Design**: Vertical timeline with connected circular event markers.
- **Typography & Colors**: Dark background with warm yellow highlights for contrast.
- **Modal Styling**: Hidden by default with overlay styling.
- **Mobile-Friendly**: Single-column layout and optimized spacing for small screens.

---

## Stage 3: Interactivity (JavaScript + JSON)
This stage introduced dynamic content loading and modal interactivity using **vanilla JavaScript**.

### 🖱 Features in This Stage
- **Events Data**:  
  - Added `data/events.json` with 8 Coldplay concerts (year, title, description, image, category).
- **Dynamic Rendering**:  
  - `script.js` fetches `events.json` and generates timeline event cards dynamically inside `#timeline`.
- **Interactive Modals**:  
  - Clicking an event opens a modal with full event details (image, year, description, category).
  - Modal can be closed by clicking the close button or outside the content area.
- **Error Handling**:  
  - Console error logs if `events.json` fails to load.
