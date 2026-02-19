# Pages

## Overview

The `/pages` directory serves as the routing layer for the application, built on top of React Router DOM. This directory is responsible for mapping URL routes to their corresponding React components.

## Purpose and Responsibilities

### Primary Function

- **Route Mapping**: Maps application routes (e.g., `/app`, `/dashboard`) to their respective React components
- **Routing Logic**: Handles all React Router DOM configuration and route management
- **Component Mounting**: Serves as the entry point for mounting container components from the modules directory

### Architecture Guidelines

#### ✅ What Pages Should Do

- Define route configurations and navigation structure
- Mount container components from the `/modules` directory
- Handle route-specific parameters and query strings
- Manage route-level authentication and authorization checks

#### ❌ What Pages Should NOT Do

- **No Application Logic**: Pages must never contain business logic or application-specific functionality
- **No Direct UI Components**: Should not implement UI components directly
- **No Data Management**: Should not handle state management or data fetching operations

## Design Principles

- **Separation of Concerns**: Pages act purely as a routing layer, delegating all application functionality to appropriate modules
- **Clean Architecture**: Maintains clear boundaries between routing concerns and application logic
- **Modularity**: Promotes reusable and testable code by keeping routing separate from business logic

## Example Structure

```
pages/
├── app.jsx          // Routes to app module containers
├── dashboard.jsx    // Routes to dashboard module containers
├── login.jsx        // Routes to auth module containers
└── operations.jsx   // Routes to operations module containers
```

Each page file should import and mount the appropriate container from the `/modules` directory while handling route-specific concerns.
