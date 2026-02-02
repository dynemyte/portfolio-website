# High-Level Overview

## Concept

An interactive, gamified portfolio disguised as a command center dashboard for "Dani Co" — a fictional cat-based organization. Instead of showing your work, you're demonstrating your skills through an engaging, playful interactive experience.

**User Flow:**

1. Landing page → Name + skills overview
2. CTA "See my work" → Auto-typing login screen
3. Transition to dashboard
4. Explore the world of cat operatives on missions

**Core Value:** Demonstrates UI/UX design, React, API integration, interactivity, and storytelling through an immersive experience that stands out from traditional portfolios.

---

## Domain Model

### Operative

**Represents:** Individual cat agents (real API data + custom attributes)

**Source:** Cat API + fabricated personality/stats

**Attributes:**

- Name
- Image/avatar
- Status (available, on mission, etc.)
- Fictional background/quirks
- Skills/specialties

**Relationships:**

- Assigned to → Operations

---

### Operation

**Represents:** Missions or adventures for the cats

**Examples:**

- "Kitten trapped in trashcan"
- "Rescue mission against the Dogs"
- "Border patrol skirmish"

**Attributes:**

- Title
- Description/briefing
- Status (in-progress, completed, failed)
- Assigned operatives
- Timeline/duration

**Relationships:**

- Uses → Operatives
- Produces → Alerts

---

### Alert

**Represents:** Real-time mission updates and system notifications

**Types:**

- Mission status (started, completed, complications)
- Operative activity (deployed, returned, injured)
- Rivalry updates (vs Dogs)
- System events

**Relationships:**

- Belongs to → Operation (optional)

---

## Architecture

```
Operatives (Cat Team)
    ↓ assigned to
Operations (Missions)
    ↓ generate
Alerts (Live Feed)
```

**Dashboard displays:** Sidebar with operative roster, mission board showing active operations, and alert feed with real-time updates. Future enhancement: interactive map showing operative locations.

**Tech Stack:** Real cat API data + custom React components for dashboard, auto-typing login, and mission tracking UI.
