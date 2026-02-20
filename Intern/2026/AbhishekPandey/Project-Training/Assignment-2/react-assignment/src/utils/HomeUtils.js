export const sanitizeBudget = (budgetString) => {
  if (!budgetString) return ""; 

  let [min, max] = budgetString.split("-").map(Number);

  min = isNaN(min) ? 0 : Math.max(0, Math.min(min, 100));
  max = isNaN(max) ? 100 : Math.max(0, Math.min(max, 100)); 

  if (min > max) {
    [min, max] = [max, min];
  }

  return `${min}-${max}`;
};