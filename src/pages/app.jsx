import { Outlet } from 'react-router-dom';
import AppLayout from '../modules/app/components/AppLayout';

export default function AppPage() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
