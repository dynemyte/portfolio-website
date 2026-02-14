// scripts/generateData.js
import { faker } from '@faker-js/faker';
faker.locale = 'en'; // Set to English
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const recentDate = () => faker.date.recent({ days: 7 }).toISOString();

// Roles
const roles = [
  { id: 'medic', title: 'Medic', description: 'Provides first aid and support.' },
  { id: 'hacker', title: 'Hacker', description: 'Breaches security systems.' },
  { id: 'scout', title: 'Scout', description: 'Reconnaissance and surveillance.' },
  { id: 'muscle', title: 'Muscle', description: 'Physical combat and strength.' },
  { id: 'leader', title: 'Leader', description: 'Coordinates team operations.' },
  { id: 'support', title: 'Support', description: 'Logistics and backup.' },
];

// Operatives
const operatives = [];
for (let i = 1; i <= 8; i++) {
  const status = faker.helpers.arrayElement(['available', 'deployed', 'recovering', 'offline']);
  operatives.push({
    id: String(i),
    codename: faker.word.noun() + faker.string.alphanumeric(2),
    avatarUrl: `/assets/react.svg`,
    bio: faker.lorem.sentence(),
    quirks: faker.lorem.sentence(),
    specialties: faker.helpers.arrayElements(['medic', 'hacker', 'scout', 'muscle', 'leader', 'support'], { min: 1, max: 3 }),
    createdAt: recentDate(),
    status,
    currentOperationId: status === 'deployed' ? `op${faker.number.int({ min: 1, max: 5 })}` : null,
    lastSeenAt: recentDate(),
    health: faker.number.int({ min: 50, max: 100 }),
    energy: faker.number.int({ min: 40, max: 100 }),
  });
}

// Operations
const operations = [];
for (let i = 1; i <= 6; i++) {
  const status = faker.helpers.arrayElement(['draft', 'planned', 'active', 'completed', 'failed', 'cancelled']);
  operations.push({
    id: `op${i}`,
    title: faker.lorem.words(3),
    briefing: faker.lorem.paragraph(),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
    status,
    startAt: faker.date.recent({ days: 3 }).toISOString(),
    endAt: faker.date.soon({ days: 2 }).toISOString(),
    createdAt: recentDate(),
    location: faker.location.city(),
    difficulty: faker.number.int({ min: 1, max: 5 }),
    assignedOperatives: faker.helpers.arrayElements(['1','2','3','4','5','6','7','8'], { min: 1, max: 4 }),
  });
}

// Alerts
const alerts = [];
for (let i = 1; i <= 10; i++) {
  const type = faker.helpers.arrayElement(['system', 'operative', 'operation', 'assignment', 'security', 'notification']);
  const severity = faker.helpers.arrayElement(['info', 'warning', 'critical']);
  alerts.push({
    id: `a${i}`,
    type,
    severity,
    message: faker.lorem.sentence(),
    createdAt: recentDate(),
    operationId: type === 'operation' ? `op${faker.number.int({ min: 1, max: 5 })}` : null,
    operativeId: type === 'operative' ? String(faker.number.int({ min: 1, max: 8 })) : null,
    metadata: severity === 'critical' ? { reason: faker.lorem.word() } : {},
  });
}

fs.writeFileSync(path.join(dataDir, 'roles.json'), JSON.stringify(roles, null, 2));
fs.writeFileSync(path.join(dataDir, 'operatives.json'), JSON.stringify(operatives, null, 2));
fs.writeFileSync(path.join(dataDir, 'operations.json'), JSON.stringify(operations, null, 2));
fs.writeFileSync(path.join(dataDir, 'alerts.json'), JSON.stringify(alerts, null, 2));

console.log('✅ Data generated in src/data/');