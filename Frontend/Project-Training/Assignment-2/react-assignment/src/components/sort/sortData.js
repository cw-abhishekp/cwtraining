export default function sortData(data = [], sortBy) {
  const list = [...data];
  console.log(sortBy)
  console.log(list)
  switch (sortBy) {
    case "Price - Low to High":
      return list.sort((a, b) => +a.priceNumeric - +b.priceNumeric);

    case "Price - High to Low":
      return list.sort((a, b) => +b.priceNumeric - +a.priceNumeric);

    case "Year - Old to New":
      return list.sort((a, b) => a.makeYear - b.makeYear);

    case "Year - New to Old":
      return list.sort((a, b) => b.makeYear - a.makeYear);

    default:
      return list;
  }
}
