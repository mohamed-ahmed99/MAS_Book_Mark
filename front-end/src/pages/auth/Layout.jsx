import { Outlet } from 'react-router-dom';
import Navebar from './Navebar';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-canvas text-text-high flex flex-col font-geist">
      <Navebar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
