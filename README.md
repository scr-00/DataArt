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

---

## Stage 4: Static Typing & Modularization (TypeScript)
This stage introduced TypeScript for type safety, modular code organization, and stricter development practices.

### 🛠 Features in This Stage
- **TypeScript Initialization**:  
  - Added `tsconfig.json` with strict mode enabled.
- **Code Modularization**:  
  - Converted `script.js` into `src/index.ts`.  
  - Created separate modules:  
    - `fetcher.ts` → loads and parses events.  
    - `renderer.ts` → renders events into the timeline.  
    - `modal.ts` → controls modal open/close logic.
- **Interfaces & Types**: Defined `Event` interface with fields (year, title, description, imageURL, category).
- **Build Output**:  
  - TypeScript compiles to plain JavaScript in the `dist/` folder.  
  - Browser runs the compiled version while devs work with TypeScript source.

---

## Stage 5: React Rebuild (Vite + TypeScript + React)
In this stage, the app was rebuilt as a **React application** for better scalability, reusability, and modern UI development.

### ⚛️ Features in This Stage
- **Vite + React + TypeScript Setup**: Initialized using Vite’s React-TS template.
- **Component Structure**:  
  - `<Header>` → logo + theme toggle.  
  - `<Timeline>` → maps through events and renders markers.  
  - `<EventMarker>` → individual timeline dots with year/title.  
  - `<EventModal>` → detailed event popup (via state).  
  - `<FilterPanel>` (placeholder for future filters).  
- **State Management**:  
  - `useState` + `useEffect` used to fetch events and manage modal visibility.  
- **Dynamic Rendering**:  
  - Events loaded from `public/events.json`.  
  - Clicking markers opens modal with full details.  
- **Styling**: Imported existing CSS, with option to migrate to CSS Modules or styled-components.  
- **Future Proofing**: Code structured for future features like filtering, bookmarks, or theme switching.

