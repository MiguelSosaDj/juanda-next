import FormCard from '@/components/ui/form-card';
import FormButton from '@/components/ui/form-button';

export const metadata = {
  title: 'Configuración - Sistema Nutricional',
  description: 'Ajustes y preferencias del sistema',
};

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Configuración</h1>
      
      <FormCard title="Preferencias">
        <div className="space-y-6">
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-700 bg-gray-800"
                defaultChecked
              />
              <span className="text-gray-300">Modo oscuro por defecto</span>
            </label>
          </div>
          
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-700 bg-gray-800"
              />
              <span className="text-gray-300">Mostrar notificaciones</span>
            </label>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-4">
          <FormButton variant="secondary">
            Cancelar
          </FormButton>
          <FormButton>
            Guardar cambios
          </FormButton>
        </div>
      </FormCard>
    </div>
  );
}