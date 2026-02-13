/**
 * Alert (Live Feed + Log) Model
 * Represents system events in an append-only event stream
 * Alerts are never edited or deleted — only new alerts are added
 */

/**
 * Alert object structure
 */
export const Alert = {
  id: '',
  type: '',
  message: '',
  
  severity: 'info',
  
  createdAt: '',
  
};

/**
 * Alert Type values
 */
export const AlertType = {
  SYSTEM: 'system',
  OPERATIVE: 'operative',
  OPERATION: 'operation',
  ASSIGNMENT: 'assignment',
  SECURITY: 'security',
  NOTIFICATION: 'notification',
};

/**
 * Alert Severity values
 */
export const AlertSeverity = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'critical',
};
