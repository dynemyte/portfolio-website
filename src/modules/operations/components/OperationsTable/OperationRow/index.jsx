import { RowCard } from './RowCard';
import { TitleCell, PriorityCell, DifficultyCell, AlertsCell, StatusCell } from './cells';

export const OperationRow = ({ operation }) => (
  <RowCard>
    <TitleCell title={operation.title} />
    <PriorityCell priority={operation.priority} />
    <DifficultyCell difficulty={operation.difficulty} />
    <AlertsCell alerts={operation.alerts} />
    <StatusCell status={operation.status} />
  </RowCard>
);
