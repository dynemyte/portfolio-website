/**
 * Alert (Live Feed + Log) Model
 * Represents system events in an append-only event stream
 * Alerts are never edited or deleted — only new alerts are added
 */

/**
 * Alert Type values
 */
export enum AlertType {
  SYSTEM = 'system',
  OPERATIVE = 'operative',
  OPERATION = 'operation',
  ASSIGNMENT = 'assignment',
  SECURITY = 'security',
  NOTIFICATION = 'notification',
}

/**
 * Alert Severity values
 */
export enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
}

/**
 * Alert interface
 */
export interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
  severity: AlertSeverity
  createdAt: string
}
