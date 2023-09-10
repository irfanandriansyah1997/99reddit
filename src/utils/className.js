const _generateClassName = (args) => {
  if (typeof args === "string" && args) return [args];

  if (typeof args === "object" && Array.isArray(args)) {
    return args.reduce((prev, current) => {
      const formattedClassName = _generateClassName(current);

      if (formattedClassName.length > 0) prev.push(...formattedClassName);
      return prev;
    }, []);
  }

  if (typeof args === "object" && !Array.isArray(args) && args) {
    return Object.keys(args).reduce((prev, current) => {
      if (current && typeof args[current] === "boolean") {
        if (args[current]) prev.push(current);
      }

      return prev;
    }, []);
  }

  return [];
};

export const cx = (args) => {
  return _generateClassName(args).join(" ");
};
