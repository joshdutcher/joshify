### Analytics Tracking Implementation Plan

**Objective:** Implement comprehensive page-view tracking for the single-page application (SPA) using the provided tracking script.

**Phase 1: Load the Tracking Script**
1.  **Action:** The contents of `tracking.html` need to be loaded by the application. The most direct way to ensure the script is available on initial load is to copy the `<script>` tag from `tracking.html` and paste it into the `<head>` of the main `public/index.html` file.
2.  **Rationale:** In a Vite-based SPA, `index.html` serves as the single entry point for the entire application. Placing the script here ensures the analytics library is loaded before the React application mounts. The `tracking.html` file itself is not used by the web server.

**Phase 2: Create a Tracking Utility**
1.  **Action:** Create a new file at `src/utils/analytics.ts`. This file will contain a function responsible for sending page view events.
2.  **Example Code (`src/utils/analytics.ts`):**
    ```typescript
    export const trackPageView = (path: string) => {
      // This assumes a Google Analytics gtag function, but it should be
      // replaced with the actual function provided by your analytics suite.
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: path,
        });
      } else {
        console.warn('Analytics tracking function (e.g., window.gtag) not found.');
      }
    };
    ```
3.  **Rationale:** Encapsulating the tracking logic in a dedicated utility makes the code cleaner, easier to maintain, and decouples the analytics implementation from the navigation logic.

**Phase 3: Integrate Tracking with Navigation**
1.  **Action:** The application's navigation logic needs to be modified to call the `trackPageView` function whenever the route changes. The most suitable location for this is the `src/hooks/useNavigationHistory.ts` hook, which appears to manage navigation state.
2.  **Modification Point:** Inside the `useNavigationHistory.ts` hook, identify the function that handles pushing new entries into the history stack. Immediately after the history state is updated, call the new tracking utility.
3.  **Example (Conceptual change in `useNavigationHistory.ts`):**
    ```typescript
    import { trackPageView } from '../utils/analytics';

    // ... inside the navigation function ...
    const navigate = (newPath: string) => {
      // ... existing navigation logic ...
      setCurrentPath(newPath);
      // Add this line to track the new page view
      trackPageView(newPath);
    };
    ```
4.  **Rationale:** Tying the tracking call to the navigation event ensures that every client-side route change is captured as a distinct page view, providing accurate analytics for the SPA.

**Phase 4: Verification**
1.  **Action:** After implementation, run the application and open the browser's Developer Tools.
2.  **Steps:**
    *   Navigate between different views of the application (e.g., Home, a project detail page, the profile view).
    *   Monitor the "Network" tab to confirm that a request is sent to the analytics provider's domain on each navigation.
    *   Check the "Console" for any errors or for the warning message defined in `trackPageView` if the analytics script isn't loading correctly.
