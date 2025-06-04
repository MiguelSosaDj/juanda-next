import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Login - Sistema Nutricional',
  description: 'Accede a tu cuenta del sistema nutricional',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Bienvenido al Sistema
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Inicia sesión para continuar
          </p>
        </div>
        <div className="mt-8 bg-gray-800 py-8 px-4 shadow-xl rounded-lg">
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "bg-transparent shadow-none",
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
    </div>
  );
}