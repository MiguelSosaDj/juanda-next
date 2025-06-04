import NavMenu from '@/components/ui/nav-menu';
import Toast from '@/components/ui/toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <NavMenu />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Toast />
    </div>
  );
}