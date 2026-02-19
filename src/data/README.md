# Data

## Overview

The `/data` directory contains static JSON files that serve as the data source for the application during development and testing. These files represent concrete instances of our domain models and are automatically generated using the generator scripts found elsewhere in the project.

## Purpose in DDD Architecture

In our Domain Driven Design (DDD) structure, this directory acts as a simple **Infrastructure Data Layer**:

- **Static Data Store**: JSON files provide a lightweight data persistence solution
- **Domain Model Instances**: Files contain actual data that conforms to our domain entity definitions
- **Development Support**: Enables consistent data across development environments
- **Testing Foundation**: Provides reliable test data for application features

## Data Generation Process

### How Data is Created

The JSON files in this directory are **automatically generated** rather than manually written:

1. **Generator Scripts**: Specialized scripts create domain-compliant data using the model generators
2. **Domain Validation**: Generated data follows the business rules and constraints defined in our domain models
3. **File Output**: Data is serialized to JSON format and saved to this directory
4. **Refresh Process**: Data can be regenerated as needed when domain models or business requirements change

### Benefits of Generated Data

- **Consistency**: All data follows the same domain model contracts
- **Maintainability**: Changes to domain models automatically propagate to data
- **Realistic Content**: Generators can create varied, business-appropriate sample data
- **Testing Support**: Fresh data sets can be generated for different testing scenarios

## What Goes Here

### ✅ Should Contain

- **JSON Data Files**: Static data representing domain entities
- **Configuration Files**: Application settings and metadata
- **Generated Content**: Output from automated data generation processes

### ❌ Should NOT Contain

- **Code or Logic**: No TypeScript, JavaScript, or business logic
- **UI Components**: No React components or interface elements
- **Manual Data**: Avoid hand-written data that might become inconsistent
- **Processing Scripts**: Data generation scripts belong elsewhere in the project

## Usage in the Application

Domain modules import these JSON files as static data sources. The application treats this data as read-only and uses it to populate user interfaces, demonstrate functionality, and support testing workflows.

Since this data is generated, it should be considered **disposable** - it can be recreated at any time without losing important information. The real source of truth remains in the domain models and generator logic, not in these output files.

## Best Practices

- **Regenerate Regularly**: Keep data fresh by running generators when domain models change
- **Version Control**: Include generated files in source control for team consistency
- **Treat as Output**: Remember these are generated artifacts, not source files
- **Validate Structure**: Ensure generated data matches current domain model expectations
