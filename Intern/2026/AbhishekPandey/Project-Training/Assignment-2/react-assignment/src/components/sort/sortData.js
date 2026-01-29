export default function sortData(data = [], sortBy) {
  // 1. Remove duplicates by profileId
  const uniqueList = Array.from(
    new Map(data.map(item => [item.profileId, item])).values()
  );

  // console.log(sortBy)
  // console.log(data)
  // 2. Sort the deduplicated list
  switch (sortBy) {
    case "Price - Low to High":
      return uniqueList.sort(
        (a, b) => +a.priceNumeric - +b.priceNumeric
      );

    case "Price - High to Low":
      return uniqueList.sort(
        (a, b) => +b.priceNumeric - +a.priceNumeric
      );

    case "Year - Old to New":
      return uniqueList.sort(
        (a, b) => a.makeYear - b.makeYear
      );

    case "Year - New to Old":
      return uniqueList.sort(
        (a, b) => b.makeYear - a.makeYear
      );

    default:
      return uniqueList;
  }
}
