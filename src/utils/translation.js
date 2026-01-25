export const translateValue = (map, language, value) => map[value]?.[language] ?? value;

export const translateWithFallback = (primaryMap, fallbackMap, language, value) =>
  primaryMap[value]?.[language] ?? fallbackMap[value]?.[language] ?? value;
