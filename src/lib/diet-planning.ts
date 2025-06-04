interface AdditionalNeeds {
  folicAcid: number;
  iron: number;
}

interface NutritionalNeeds {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  additionalNeeds?: AdditionalNeeds;
}

interface FoodItem {
  name: string;
  portionSize: number;
  unit: 'g' | 'ml' | 'piece';
  nutrients: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    [key: string]: number;
  };
  categories: string[];
}

interface MealPlan {
  breakfast: FoodItem[];
  morningSnack?: FoodItem[];
  lunch: FoodItem[];
  afternoonSnack?: FoodItem[];
  dinner: FoodItem[];
}

export function calculateNutritionalNeeds(
  weight: number,
  height: number,
  age: number,
  activityLevel: 'sedentary' | 'moderate' | 'active',
  isPregnant: boolean = false,
  gestationalWeek?: number
): NutritionalNeeds {
  // Base metabolic rate using Mifflin-St Jeor Equation
  const bmr = (10 * weight) + (6.25 * height) - (5 * age);
  
  // Activity factor
  const activityFactors = {
    sedentary: 1.2,
    moderate: 1.55,
    active: 1.725
  };
  
  let calories = bmr * activityFactors[activityLevel];
  
  // Pregnancy adjustment
  if (isPregnant && gestationalWeek) {
    if (gestationalWeek <= 13) {
      calories += 100;
    } else if (gestationalWeek <= 26) {
      calories += 300;
    } else {
      calories += 400;
    }
  }
  
  // Macronutrient distribution
  const protein = (calories * 0.20) / 4; // 20% of calories from protein
  const carbs = (calories * 0.55) / 4;   // 55% of calories from carbs
  const fats = (calories * 0.25) / 9;    // 25% of calories from fats
  
  const result: NutritionalNeeds = {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fats: Math.round(fats)
  };
  
  // Additional needs for pregnant women
  if (isPregnant) {
    result.additionalNeeds = {
      folicAcid: 600, // mcg/day
      iron: 27        // mg/day
    };
  }
  
  return result;
}

export function generateMealPlan(): MealPlan {
  // This is a placeholder implementation
  // In a real application, you would have a database of food items
  // and implement an algorithm to create balanced meal plans
  
  const defaultPlan: MealPlan = {
    breakfast: [
      {
        name: "Avena con frutas",
        portionSize: 250,
        unit: "g",
        nutrients: {
          calories: 300,
          protein: 10,
          carbs: 45,
          fats: 8
        },
        categories: ["cereales", "frutas"]
      }
    ],
    lunch: [
      {
        name: "Pollo a la plancha con ensalada",
        portionSize: 350,
        unit: "g",
        nutrients: {
          calories: 400,
          protein: 35,
          carbs: 20,
          fats: 15
        },
        categories: ["proteinas", "vegetales"]
      }
    ],
    dinner: [
      {
        name: "Pescado al horno con vegetales",
        portionSize: 300,
        unit: "g",
        nutrients: {
          calories: 350,
          protein: 30,
          carbs: 15,
          fats: 12
        },
        categories: ["proteinas", "vegetales"]
      }
    ]
  };

  return defaultPlan;
}

export function adjustPortions(
  plan: MealPlan,
  targetCalories: number
): MealPlan {
  const currentCalories = calculateMealPlanCalories(plan);
  const ratio = targetCalories / currentCalories;

  const adjustedPlan: MealPlan = {
    breakfast: adjustFoodItems(plan.breakfast, ratio),
    lunch: adjustFoodItems(plan.lunch, ratio),
    dinner: adjustFoodItems(plan.dinner, ratio)
  };

  if (plan.morningSnack) {
    adjustedPlan.morningSnack = adjustFoodItems(plan.morningSnack, ratio);
  }
  if (plan.afternoonSnack) {
    adjustedPlan.afternoonSnack = adjustFoodItems(plan.afternoonSnack, ratio);
  }

  return adjustedPlan;
}

function calculateMealPlanCalories(plan: MealPlan): number {
  const meals = [
    plan.breakfast,
    plan.morningSnack,
    plan.lunch,
    plan.afternoonSnack,
    plan.dinner
  ].filter(Boolean);

  return meals.reduce((total, meal) => {
    if (!meal) return total;
    return total + meal.reduce((mealTotal, item) => 
      mealTotal + item.nutrients.calories, 0);
  }, 0);
}

function adjustFoodItems(items: FoodItem[] | undefined, ratio: number): FoodItem[] {
  if (!items) return [];
  
  return items.map(item => ({
    ...item,
    portionSize: item.portionSize * ratio,
    nutrients: {
      ...item.nutrients,
      calories: item.nutrients.calories * ratio,
      protein: item.nutrients.protein * ratio,
      carbs: item.nutrients.carbs * ratio,
      fats: item.nutrients.fats * ratio
    }
  }));
}