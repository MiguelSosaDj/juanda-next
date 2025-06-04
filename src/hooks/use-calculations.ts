'use client';

import { useMemo } from 'react';

interface NutritionalData {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
}

interface PregnancyData extends NutritionalData {
  gestationalWeek: number;
  prePregnancyWeight: number;
}

export function useCalculations() {
  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
  };

  const calculateIdealWeight = (height: number, gender: 'male' | 'female') => {
    if (gender === 'male') {
      return (height - 100) - ((height - 150) / 4);
    }
    return (height - 100) - ((height - 150) / 2.5);
  };

  const calculateGestationalWeightGain = (
    currentWeight: number,
    prePregnancyWeight: number,
    gestationalWeek: number,
    preBmi: number
  ) => {
    const totalGain = currentWeight - prePregnancyWeight;
    let recommendedGain;

    if (preBmi < 18.5) {
      recommendedGain = (12.5 + 18) / 2; // Average of recommended range for underweight
    } else if (preBmi < 25) {
      recommendedGain = (11.5 + 16) / 2; // Normal weight
    } else if (preBmi < 30) {
      recommendedGain = (7 + 11.5) / 2; // Overweight
    } else {
      recommendedGain = (5 + 9) / 2; // Obese
    }

    const weeklyRecommended = recommendedGain / 40;
    const expectedGain = weeklyRecommended * gestationalWeek;

    return {
      totalGain,
      expectedGain,
      difference: totalGain - expectedGain,
      isWithinRange: Math.abs(totalGain - expectedGain) <= 2
    };
  };

  const calculatePediatricPercentiles = (
    weight: number,
    height: number,
    age: number,
    gender: 'male' | 'female'
  ) => {
    // This is a simplified version. In a real app, you'd use WHO or CDC growth charts
    const bmi = calculateBMI(weight, height);
    
    // Example percentile calculation (simplified)
    const heightForAge = (height / medianHeightForAge(age, gender)) * 100;
    const weightForAge = (weight / medianWeightForAge(age, gender)) * 100;
    const bmiForAge = (bmi / medianBmiForAge(age, gender)) * 100;

    return {
      heightPercentile: heightForAge,
      weightPercentile: weightForAge,
      bmiPercentile: bmiForAge
    };
  };

  // Helper functions for median values (simplified)
  const medianHeightForAge = (age: number, gender: 'male' | 'female') => {
    // Simplified example - real implementation would use growth charts
    return gender === 'male' ? 75 + (age * 5) : 74 + (age * 5);
  };

  const medianWeightForAge = (age: number, gender: 'male' | 'female') => {
    return gender === 'male' ? 9 + (age * 2) : 8.5 + (age * 2);
  };

  const medianBmiForAge = (age: number, gender: 'male' | 'female') => {
    return 15.5 + (age * 0.1);
  };

  return {
    calculateBMI,
    calculateIdealWeight,
    calculateGestationalWeightGain,
    calculatePediatricPercentiles
  };
}