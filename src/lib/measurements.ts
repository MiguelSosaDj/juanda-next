export interface HeightMeasurement {
  value: number;
  unit: 'cm' | 'm';
}

export interface WeightMeasurement {
  value: number;
  unit: 'kg' | 'lb';
}

export function calculateBMI(weight: WeightMeasurement, height: HeightMeasurement): number {
  // Convert weight to kg if necessary
  const weightInKg = weight.unit === 'lb' ? weight.value * 0.45359237 : weight.value;
  
  // Convert height to meters if necessary
  const heightInM = height.unit === 'cm' ? height.value / 100 : height.value;
  
  // BMI = weight (kg) / height² (m)
  return weightInKg / (heightInM * heightInM);
}

export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return 'bajo-peso';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'sobre-peso';
  return 'obesidad';
}

export function calculateGestationalWeightGain(
  initialWeight: WeightMeasurement,
  currentWeight: WeightMeasurement,
  initialBMI: number,
  gestationalWeek: number
): {
  gain: number;
  recommended: { min: number; max: number };
  status: 'bajo' | 'normal' | 'excesivo';
} {
  // Convert weights to kg if necessary
  const initialKg = initialWeight.unit === 'lb' ? initialWeight.value * 0.45359237 : initialWeight.value;
  const currentKg = currentWeight.unit === 'lb' ? currentWeight.value * 0.45359237 : currentWeight.value;
  
  // Calculate total weight gain
  const gain = currentKg - initialKg;

  // Recommended weight gain ranges based on initial BMI
  let totalRecommended: { min: number; max: number };
  if (initialBMI < 18.5) {
    totalRecommended = { min: 12.5, max: 18 };
  } else if (initialBMI < 25) {
    totalRecommended = { min: 11.5, max: 16 };
  } else if (initialBMI < 30) {
    totalRecommended = { min: 7, max: 11.5 };
  } else {
    totalRecommended = { min: 5, max: 9 };
  }

  // Calculate recommended gain for current week
  const weekFraction = gestationalWeek / 40;
  const recommended = {
    min: totalRecommended.min * weekFraction,
    max: totalRecommended.max * weekFraction
  };

  // Determine status
  let status: 'bajo' | 'normal' | 'excesivo';
  if (gain < recommended.min) {
    status = 'bajo';
  } else if (gain > recommended.max) {
    status = 'excesivo';
  } else {
    status = 'normal';
  }

  return { gain, recommended, status };
}

export function calculateFetalWeight(
  gestationalWeek: number,
  motherWeight: WeightMeasurement,
  motherHeight: HeightMeasurement,
  waistCircumference: number, // in cm
  multiplePregnancy: boolean = false
): number {
  // This is a simplified version of fetal weight estimation
  // For more accurate results, consider using ultrasound measurements
  // and implementing specific formulas like Hadlock's or Shepard's

  const bmi = calculateBMI(motherWeight, motherHeight);
  
  // Base estimation using gestational week
  let baseWeight = Math.exp(1.63 + 0.166 * gestationalWeek - 0.0005466 * gestationalWeek * gestationalWeek);
  
  // Adjust for mother's BMI
  if (bmi > 25) {
    baseWeight *= 1.1;
  } else if (bmi < 18.5) {
    baseWeight *= 0.9;
  }

  // Adjust for waist circumference
  const waistFactor = waistCircumference / 100;
  baseWeight *= waistFactor;

  // Adjust for multiple pregnancy
  if (multiplePregnancy) {
    baseWeight *= 0.85; // Each fetus typically weighs less in multiple pregnancies
  }

  return Math.round(baseWeight * 100) / 100; // Round to 2 decimal places
}

export function calculateIdealWeight(
  height: HeightMeasurement,
  gender: 'male' | 'female',
  frame: 'small' | 'medium' | 'large'
): WeightMeasurement {
  // Convert height to cm if in meters
  const heightInCm = height.unit === 'm' ? height.value * 100 : height.value;

  // Base calculation using Hamwi formula
  let baseWeight: number;
  if (gender === 'male') {
    baseWeight = 48 + 2.7 * (heightInCm - 152.4) / 2.54;
  } else {
    baseWeight = 45.5 + 2.2 * (heightInCm - 152.4) / 2.54;
  }

  // Adjust for frame size
  switch (frame) {
    case 'small':
      baseWeight *= 0.9;
      break;
    case 'large':
      baseWeight *= 1.1;
      break;
  }

  return {
    value: Math.round(baseWeight * 10) / 10,
    unit: 'kg'
  };
}