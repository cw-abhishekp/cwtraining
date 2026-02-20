export default function sortData(data = [], sortBy) {
  const uniqueList = Array.from(
    new Map(data.map(item => [item.profileId, item])).values()
  );

  switch (sortBy) {
    case "PriceAsc":
      return uniqueList.sort(
        (a, b) => +a.priceNumeric - +b.priceNumeric
      );

    case "PriceDesc":
      return uniqueList.sort(
        (a, b) => +b.priceNumeric - +a.priceNumeric
      );

    case "YearAsc":
      return uniqueList.sort(
        (a, b) => a.makeYear - b.makeYear
      );

    case "YearDesc":
      return uniqueList.sort(
        (a, b) => b.makeYear - a.makeYear
      );

    default:
      return uniqueList;
  }
}
