# Data Model – Dani Co Command System

## Core Principle: Static, Current State, History

Each major entity is structured in three layers:

- Static profile (rarely changes)
- Current state (changes often)
- History (stored externally via relationships or events)

This keeps the system clean, scalable, and easy to maintain.

---

# Operative (Cat Agent)

Represents an individual cat operative.

---

## Static Profile (Rarely Changes)

Defines the operative’s identity.

**Fields:**

- id
- codename
- avatarUrl
- profile
- role
- createdAt

**Rules:**

- Each operative has exactly one fixed role.
- An operative’s role never changes per mission.
- Operatives cannot perform multiple roles or switch roles.

---

## Current State (Changes Often)

Represents the operative’s live operational status.

**Fields:**

- status  
  Possible values:
  - available
  - deployed
  - recovering
  - offline

- health

- alerts (array of alert IDs)

- location

---

## History

Do NOT store past missions directly inside the operative object.

Instead, store history using:

- assignments (join model)
- alerts (event log)

This prevents duplication and keeps the operative object lightweight.

---

# Role

Defines the role/specialty of an operative.

**Relationships:**

- Each role belongs to ONE operative
- Each operative can have MANY roles

---

## Fields

- id  
  Possible values:
  - medic
  - hacker
  - scout
  - muscle
  - leader
  - support

- title

- description

- assignedAt

---

# Operation (Mission) → Case File

Represents a mission or operation.

Each operation acts as a case file.

**Fields:**

- id
- title
- description
- priority  
  Possible values:
  - low
  - medium
  - high
  - critical

- status  
  Possible values:
  - draft
  - planned
  - active
  - completed
  - failed
  - cancelled

- alerts (array of alert IDs)

- createdAt

Optional future fields:

- location
- difficulty

---

m

- operative
- operation
- assignment
- security
- notification

- message

- severity  
  Possible values:
  - info
  - warning
  - critical

- createdAt
