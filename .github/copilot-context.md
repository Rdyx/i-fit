# Copilot context snapshot for i-fit (2025-07-14)

## Key files and their state

- `app/ExercisesTable.tsx`: Main DataGrid table for exercises, with dark theme, column visibility, and accessibility features. Uses MUI DataGrid, custom columns, and row striping. Handles both repetition and duration-based exercises, and displays external links.
- `app/globals.css`: Contains global styles, including `.exercise-table-dark` for dark DataGrid appearance, sticky navbar class, and other theme variables. Uses Tailwind and custom CSS.
- `app/layout.tsx`: Provides global DayContext, always-visible sticky navbar, and wraps children. Uses Geist font and applies antialiased body class.
- `app/Navbar.tsx`: Responsive, accessible navbar with global day selector (in French), always visible and sticky.
- `app/WorkoutDisplay.tsx`: Aggregates and displays all exercises for the selected day, including warmups if available, and passes data to `ExercisesTable`.
- `app/types.ts`, `app/utils/index.ts`: Centralized types and utility functions for type safety and maintainability.
- `public/sports_json/`: Contains multiple JSON files (`top.json`, `bottom.json`, `center.json`) with workout data.
- Error and not-found pages: Consistent styling with the app.

## Features/requirements implemented
- Dark theme for exercise table and headers in DataGrid
- Always-visible, sticky navbar using a CSS class
- Responsive, accessible, and visually consistent UI
- Day-based filtering and global day selector
- Handles both repetition and duration-based exercises
- Warmups shown if available, missing data handled gracefully
- DataGrid: row striping, header/footer colors, column autosizing removed, columns for Programme/Alternative hidden by default
- All types and utilities centralized
- All error and type issues resolved

## Last commit summary
- All changes staged and committed with a detailed message
- Pushed to GitHub with upstream set for main branch

## Usage
This file is a context snapshot for Copilot or other AI assistants. Use it to quickly restore or share the current project context, requirements, and file state across machines or team members.
