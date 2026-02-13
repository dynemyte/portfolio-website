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
- bio / quirks
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

- currentOperationId (nullable)

- lastSeenAt

- health

- energy

---

## History

Do NOT store past missions directly inside the operative object.

Instead, store history using:

- assignments (join model)
- alerts (event log)

This prevents duplication and keeps the operative object lightweight.

---

# Operation (Mission) → Case File

Represents a mission or operation.

Each operation acts as a case file.

**Fields:**

- id
- title
- briefing
- priority
- status

- startAt (nullable until launched)
- endAt (nullable until finished)

- createdAt

Optional future fields:

- location
- difficulty

---

# Assignment (Join Model)

Represents the relationship between operatives and operations.

This exists because:

- One operative can participate in many operations
- One operation can include many operatives

This is how real systems model people assigned to projects or cases.

---

## Fields

- id
- operationId
- operativeId

- role (derived from the operative’s role; not editable)

- assignedAt

Optional:

- outcomeNote

---

# Alert (Live Feed + Log)

Alerts represent system events.

Alerts form an append-only event stream.

This means alerts are never edited or deleted — only new alerts are added.

---

## Fields

- id
- type
- message

- severity  
  Possible values:
  - info
  - warning
  - critical

- createdAt

- operationId (optional)
- operativeId (optional)

- metadata (JSON object)

Example metadata:

```json
{
  "injury": "sprained paw",
  "rival": "Dogs"
}
```
