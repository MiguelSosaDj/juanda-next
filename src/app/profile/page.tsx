import { UserProfile } from '@clerk/nextjs';

export const metadata = {
  title: 'Perfil - Sistema Nutricional',
  description: 'Gestiona tu perfil de usuario',
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Perfil</h1>
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
        <UserProfile 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-transparent shadow-none",
              navbar: "bg-gray-800",
              navbarButton: "text-gray-300 hover:text-white",
              headerTitle: "text-white",
              headerSubtitle: "text-gray-400",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
              formFieldInput: "bg-gray-700 border-gray-600 text-white",
              formFieldLabel: "text-gray-300",
            },
          }}
        />
      </div>
    </div>
  );
}