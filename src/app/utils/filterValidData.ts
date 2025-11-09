export const filterValidData = <T extends Record<string, any>>(payload: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) => value !== undefined && value !== '',
    ),
  ) as Partial<T>;
};
