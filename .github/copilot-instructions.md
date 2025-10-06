# Copilot Instructions for SafePath (ResQnow)

## Project Overview
- **SafePath** is a React-based emergency response web app for reporting incidents, locating emergency services, and accessing medical assistance.
- The app is structured around major features: accident reporting (multi-step), emergency locator, and medical assistance.
- All UI and logic are in the `src/` directory, with components grouped by feature.

## Key Architectural Patterns
- **Component Structure**: Each major feature (reporting, locator, assistance) has its own main page and supporting components in `src/components/`.
- **Multi-Step Forms**: The reporting flow is split into four steps, each as a separate component under `src/components/report/`.
- **Context Usage**: Shared state (e.g., location) is managed via React Context in `src/contexts/`.
- **Styling**: Global styles in `src/App.css`; feature/component-specific styles are co-located (e.g., `EmergencyCarousel.css`).
- **Routing**: Uses React Router DOM for navigation between pages.

## Developer Workflows
- **Start Dev Server**: `npm start` (runs on http://localhost:3000)
- **Run Tests**: `npm test` (Jest, see `App.test.js` and `setupTests.js`)
- **Build for Production**: `npm run build`
- **Add Dependencies**: Use `npm install <package>`

## Project-Specific Conventions
- **Severity Levels**: Color-coded (Low/Medium/High) for incident reporting, see `Step1IncidentDetails.js` and CSS.
- **Service/Category Lists**: Emergency services and medical categories are defined as arrays in their respective page components for easy extension.
- **Icons**: Uses Unicode emojis for cross-platform compatibility, not icon libraries.
- **Responsive Design**: All components are expected to be mobile-friendly; use grid/flex layouts and avoid fixed widths.
- **No TypeScript**: All code is JavaScript (no `.ts`/`.tsx` files).

## Integration Points
- **No backend/API integration** is present in the codebase; all data is local or mocked.
- **Deployment**: Build output in `build/` is suitable for static hosting (Netlify, Vercel, S3, GitHub Pages).

## Examples
- To add a new emergency service: update the `nearbyServices` array in `EmergencyLocatorPage.js`.
- To add a new medical category: update the `medicalCategories` array in `GetAssistancePage.js`.
- To add a new report step: add a new component in `src/components/report/` and update `ReportPage.js`.

## Key Files/Directories
- `src/components/` — All UI components, grouped by feature
- `src/components/report/` — Multi-step reporting flow
- `src/contexts/LocationContext.js` — Location state management
- `src/App.js` — Main app entry and router
- `src/App.css` — Global styles
- `README.md` — Full feature and workflow overview

---
For more details, see the `README.md` or ask for specific workflow or pattern examples.
