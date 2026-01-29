export const buildQuery = (filters) => {
  let params = [];

  if (filters.fuel.length) params.push(`fuel=${filters.fuel.join("+")}`);
  if (filters.budget) params.push(`budget=${filters.budget}`);
  if (filters.makeIds.length) params.push(`car=${filters.makeIds.join("+")}`);
  if (filters.cityIds.length) params.push(`city=${filters.cityIds.join("+")}`);

  return params.length ? `?${params.join("&")}` : "";
};
