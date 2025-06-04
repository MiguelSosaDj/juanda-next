import React from 'react';
import { calculateBMI, getBMICategory } from '@/lib/measurements';
import { calculateNutritionalNeeds } from '@/lib/diet-planning';

interface RecommendationProps {
  weight: number;
  height: number;
  age: number;
  activityLevel: 'sedentary' | 'moderate' | 'active';
  isPregnant?: boolean;
  gestationalWeek?: number;
}

export const NutritionalRecommendations: React.FC<RecommendationProps> = ({
  weight,
  height,
  age,
  activityLevel,
  isPregnant = false,
  gestationalWeek
}) => {
  const nutritionalNeeds = calculateNutritionalNeeds(
    weight,
    height,
    age,
    activityLevel,
    isPregnant,
    gestationalWeek
  );

  const bmi = calculateBMI(
    { value: weight, unit: 'kg' },
    { value: height, unit: 'cm' }
  );

  const bmiCategory = getBMICategory(bmi);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800">
        Recomendaciones Nutricionales
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded">
          <h3 className="font-medium text-gray-700">Necesidades Calóricas</h3>
          <p className="text-2xl font-bold text-blue-600">
            {nutritionalNeeds.calories} kcal/día
          </p>
        </div>
        
        <div className="p-3 bg-gray-50 rounded">
          <h3 className="font-medium text-gray-700">IMC</h3>
          <p className="text-2xl font-bold text-blue-600">
            {bmi.toFixed(1)} ({bmiCategory})
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">Macronutrientes Recomendados</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 bg-green-50 rounded">
            <p className="text-sm text-green-800">Proteínas</p>
            <p className="font-bold text-green-600">{nutritionalNeeds.protein}g</p>
          </div>
          <div className="p-2 bg-blue-50 rounded">
            <p className="text-sm text-blue-800">Carbohidratos</p>
            <p className="font-bold text-blue-600">{nutritionalNeeds.carbs}g</p>
          </div>
          <div className="p-2 bg-yellow-50 rounded">
            <p className="text-sm text-yellow-800">Grasas</p>
            <p className="font-bold text-yellow-600">{nutritionalNeeds.fats}g</p>
          </div>
        </div>
      </div>

      {isPregnant && nutritionalNeeds.additionalNeeds && (
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">Necesidades Adicionales</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 bg-purple-50 rounded">
              <p className="text-sm text-purple-800">Ácido Fólico</p>
              <p className="font-bold text-purple-600">
                {nutritionalNeeds.additionalNeeds.folicAcid} mcg
              </p>
            </div>
            <div className="p-2 bg-red-50 rounded">
              <p className="text-sm text-red-800">Hierro</p>
              <p className="font-bold text-red-600">
                {nutritionalNeeds.additionalNeeds.iron} mg
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-blue-50 rounded">
        <h3 className="font-medium text-blue-800">Recomendaciones Generales</h3>
        <ul className="list-disc list-inside text-sm text-blue-700 mt-2">
          <li>Mantener una hidratación adecuada (8-10 vasos de agua al día)</li>
          <li>Distribuir las comidas en 5-6 tomas diarias</li>
          <li>Incluir variedad de frutas y verduras en cada comida</li>
          {isPregnant && (
            <>
              <li>Evitar alimentos crudos o poco cocinados</li>
              <li>Limitar el consumo de cafeína</li>
              <li>Evitar pescados con alto contenido en mercurio</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};