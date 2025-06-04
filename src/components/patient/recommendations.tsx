'use client';

interface RecommendationRule {
  condition: string;
  category: 'diet' | 'exercise' | 'lifestyle' | 'supplements';
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}

interface RecommendationConfig {
  bmi?: {
    underweight: number;
    normal: number;
    overweight: number;
  };
  gestationalWeightGain?: {
    min: number;
    max: number;
  };
  rules: RecommendationRule[];
}

interface PatientData {
  bmi?: number;
  weightGain?: number;
  gestationalWeek?: number;
  conditions?: string[];
}

interface RecommendationsProps {
  config: RecommendationConfig;
  patientData: PatientData;
}

export default function Recommendations({ config, patientData }: RecommendationsProps) {
  const getRecommendations = () => {
    const matchedRules: RecommendationRule[] = [];

    config.rules.forEach(rule => {
      let matches = false;

      // Check BMI conditions
      if (config.bmi && patientData.bmi) {
        if (rule.condition.includes('underweight') && patientData.bmi < config.bmi.underweight) matches = true;
        if (rule.condition.includes('normal') && patientData.bmi >= config.bmi.underweight && patientData.bmi < config.bmi.overweight) matches = true;
        if (rule.condition.includes('overweight') && patientData.bmi >= config.bmi.overweight) matches = true;
      }

      // Check gestational weight gain conditions
      if (config.gestationalWeightGain && patientData.weightGain && patientData.gestationalWeek) {
        const expectedGain = (config.gestationalWeightGain.max + config.gestationalWeightGain.min) / 2 * (patientData.gestationalWeek / 40);
        if (rule.condition.includes('excessive_gain') && patientData.weightGain > expectedGain) matches = true;
        if (rule.condition.includes('insufficient_gain') && patientData.weightGain < expectedGain) matches = true;
      }

      // Check specific conditions
      if (patientData.conditions) {
        patientData.conditions.forEach(condition => {
          if (rule.condition.includes(condition)) matches = true;
        });
      }

      if (matches) matchedRules.push(rule);
    });

    return matchedRules.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const recommendations = getRecommendations();

  return (
    <div className="space-y-6">
      {recommendations.map((rule, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-white capitalize">
              {rule.category}
            </h3>
            <span className={`
              px-2 py-1 text-xs rounded-full
              ${rule.priority === 'high' ? 'bg-red-900 text-red-200' :
                rule.priority === 'medium' ? 'bg-yellow-900 text-yellow-200' :
                'bg-blue-900 text-blue-200'}
            `}>
              {rule.priority}
            </span>
          </div>
          <ul className="space-y-2">
            {rule.recommendations.map((recommendation, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 mt-1 text-gray-400">•</span>
                <span className="text-gray-300">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {recommendations.length === 0 && (
        <p className="text-gray-400 text-center py-4">
          No hay recomendaciones específicas para este paciente.
        </p>
      )}
    </div>
  );
}