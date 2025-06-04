import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/login');
  }

  return <>{children}</>;
}