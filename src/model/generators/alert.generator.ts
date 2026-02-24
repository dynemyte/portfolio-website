import { faker } from '@faker-js/faker'
import { Alert, AlertType, AlertSeverity } from '../Alert'

export function generateAlert(): Alert {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement([
      AlertType.SYSTEM,
      AlertType.OPERATIVE,
      AlertType.OPERATION,
      AlertType.ASSIGNMENT,
      AlertType.SECURITY,
      AlertType.NOTIFICATION,
    ]),
    title: faker.lorem.words({ min: 2, max: 5 }),
    message: faker.lorem.sentence(),
    severity: faker.helpers.arrayElement([
      AlertSeverity.INFO,
      AlertSeverity.WARNING,
      AlertSeverity.CRITICAL,
    ]),
    createdAt: faker.date.recent().toISOString(),
  }
}

export function generateAlerts(count: number): Alert[] {
  return Array.from({ length: count }, () => generateAlert())
}
