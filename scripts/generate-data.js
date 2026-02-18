import fs from 'node:fs';
import path from 'node:path';
import { faker } from '@faker-js/faker';
import { generateAlerts } from '../src/model/generators/alert.generator.ts';
import { generateOperations } from '../src/model/generators/operation.generator.ts';
import { generateOperatives } from '../src/model/generators/operative.generator.ts';
import { generateRoles } from '../src/model/generators/role.generator.ts';

const DATA_DIR = path.resolve('src/data');

const SEED = 12345;
const ALERT_COUNT = 120;
const OPERATIVE_COUNT = 18;
const OPERATION_COUNT = 24;

faker.seed(SEED);

const pickSome = (arr, maxCount) => {
  const count = faker.number.int({ min: 0, max: Math.min(maxCount, arr.length) });
  return faker.helpers.shuffle(arr).slice(0, count);
};

const writeDataFile = (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Generated ${filename}`);
};

// Generate base data
const roles = generateRoles(); // Generates all roles
const alerts = generateAlerts(ALERT_COUNT);
const alertIds = alerts.map((alert) => alert.id);

const operatives = generateOperatives(OPERATIVE_COUNT).map(operative => ({
  ...operative,
  alerts: pickSome(alertIds, 4),
}));

const operations = generateOperations(OPERATION_COUNT).map(operation => ({
  ...operation,
  alerts: pickSome(alertIds, 6),
}));

// Create data directory
fs.mkdirSync(DATA_DIR, { recursive: true });

// Write separate files for each model
writeDataFile('roles.json', roles);
writeDataFile('alerts.json', alerts);
writeDataFile('operatives.json', operatives);
writeDataFile('operations.json', operations);

// Write metadata file
writeDataFile('metadata.json', {
  generatedAt: new Date().toISOString(),
  counts: {
    roles: roles.length,
    alerts: alerts.length,
    operatives: operatives.length,
    operations: operations.length,
  },
});
