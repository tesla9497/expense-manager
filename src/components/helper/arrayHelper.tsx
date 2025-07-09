export const chunkArray = <T,>(array: T[], chunkSize: number): T[][] => {
  if (!Array.isArray(array)) {
    throw new Error("Input must be an array");
  }

  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new Error("Chunk size must be a positive integer");
  }

  if (array.length === 0) {
    return [];
  }

  const results: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }

  return results;
};
