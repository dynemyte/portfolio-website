import { RowCard } from './RowCard'
import { TitleCell, SeverityCell, AlertTypeCell, MessagePreviewCell } from './cells'

export const AlertsRow = ({ alert }) => (
  <RowCard>
    <TitleCell title={alert.title} />
    <SeverityCell severity={alert.severity} />
    <AlertTypeCell type={alert.type} />
    <MessagePreviewCell message={alert.message} />
  </RowCard>
)
