import { faker } from '@faker-js/faker';
import { Operative, OperativeStatus, Role } from '../Operative';

export function generateOperative(): Operative {
  return {
    id: faker.string.uuid(),
    codename: faker.word.words(2),
    avatarUrl: faker.image.url(),
    profile: faker.lorem.sentence(),
    role: faker.helpers.arrayElement([
      Role.MEDIC,
      Role.HACKER,
      Role.SCOUT,
      Role.MUSCLE,
      Role.LEADER,
      Role.SUPPORT,
    ]),
    createdAt: faker.date.past().toISOString(),

    status: faker.helpers.arrayElement([
      OperativeStatus.AVAILABLE,
      OperativeStatus.DEPLOYED,
      OperativeStatus.RECOVERING,
      OperativeStatus.OFFLINE,
    ]),
    health: faker.number.int({ min: 10, max: 100 }),
    alerts: [],
    location: faker.location.city(),
  };
}

export function generateOperatives(count: number): Operative[] {
  return Array.from({ length: count }, () => generateOperative());
}
