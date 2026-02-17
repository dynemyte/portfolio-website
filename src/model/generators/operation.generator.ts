import { faker } from '@faker-js/faker';
import { Operation, OperationPriority, OperationStatus } from '../Operation';

export function generateOperation(): Operation {
  return {
    id: faker.string.uuid(),
    title: faker.word.words(3),
    description: faker.lorem.paragraph(),
    priority: faker.helpers.arrayElement([
      OperationPriority.LOW,
      OperationPriority.MEDIUM,
      OperationPriority.HIGH,
      OperationPriority.CRITICAL,
    ]),
    status: faker.helpers.arrayElement([
      OperationStatus.DRAFT,
      OperationStatus.PLANNED,
      OperationStatus.ACTIVE,
      OperationStatus.COMPLETED,
      OperationStatus.FAILED,
      OperationStatus.CANCELLED,
    ]),
    alerts: [],
    createdAt: faker.date.past().toISOString(),
    location: faker.helpers.maybe(() => faker.location.city(), { probability: 0.7 }) || null,
    difficulty: faker.helpers.maybe(() => faker.helpers.arrayElement(['Easy', 'Medium', 'Hard', 'Extreme']), { probability: 0.8 }) || null,
  };
}

export function generateOperations(count: number): Operation[] {
  return Array.from({ length: count }, () => generateOperation());
}
