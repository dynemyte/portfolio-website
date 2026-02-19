# Modules

## Overview

The `/modules` directory contains the core functional components of the application, organized by business domain. Each module represents a distinct feature area, encapsulating related UI components, containers, and domain-specific logic.

## Architecture Approach

This structure follows **Domain Driven Design (DDD)** principles by organizing code around business domains rather than technical layers. Key benefits:

- **Business Alignment**: Code structure mirrors business functionality
- **Clear Boundaries**: Each module has well-defined responsibilities
- **Team Ownership**: Teams can own specific domains independently
- **Scalability**: Domains can evolve without affecting others

## Module Structure

Each module contains:

```
module-name/
├── components/          # UI presentation components
└── containers/          # Business logic and state management
```

**Components** focus on UI rendering and user interaction, while **Containers** handle business logic, state management, and data coordination.

## What Goes Where

### ✅ Modules Should Contain

- **Domain UI Components**: User interface elements for the feature area
- **Business Logic**: Rules and workflows specific to the domain
- **State Management**: Local state handling within the module
- **Integration Logic**: Connecting to external services and data sources

### ❌ Modules Should NOT Contain

- **Raw Data**: Static JSON files or configuration data
- **Type Definitions**: Domain model interfaces (these live in `/src/model`)
- **Shared Utilities**: Cross-module helper functions
- **Global Concerns**: Authentication, logging, or app-wide functionality

## Integration Guidelines

- **Pages**: Import and mount module containers for routing
- **Models**: Import type definitions from `/src/model` for type safety
- **Independence**: Minimize dependencies between different modules
- **Boundaries**: Keep module interfaces clean and well-defined

## Best Practices

1. **Single Purpose**: Each module focuses on one business domain
2. **Consistent Structure**: Follow the components/containers pattern
3. **Clear Interfaces**: Define clean boundaries between modules
4. **Domain Language**: Use business terminology consistently within each module
