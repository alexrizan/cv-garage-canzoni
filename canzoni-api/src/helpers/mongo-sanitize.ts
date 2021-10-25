export const hasMongoDbInjection = (...args: string[]): boolean => {
  return !!args.find(a => a.includes('{') || a.includes('$'));
};
