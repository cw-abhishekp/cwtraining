namespace StocksGrpcService.Common.Queries
{
    public static class SqlQueries
    {
        public const string BaseFilteredStocks = @"
            SELECT 
                s.profile_id AS ProfileId,
                s.make_id AS MakeId,
                m.make_name AS MakeName,
                s.city_id AS CityId,
                c.city_name AS CityName,
                s.version_name AS VersionName,
                s.km_numeric AS KmNumeric,
                s.fuel AS FuelInt,
                s.make_year AS MakeYear,
                s.model_name AS ModelName,
                s.price_numeric AS PriceNumeric,
                s.emi_price AS EmiPrice
            FROM stock s
            JOIN make m ON s.make_id = m.make_id
            JOIN city c ON s.city_id = c.city_id
            WHERE s.is_active = 1";

        public const string imageSql = @"
            SELECT profile_id, image_url 
            FROM stock_images 
            WHERE profile_id IN @Ids AND is_active = 1";

        public const string BaseStockCountQuery = @"
    SELECT COUNT(*) 
    FROM stock s
    WHERE s.is_active = 1";
        public const string SelectAllCities = @"
            SELECT 
                city_id AS CityId, 
                city_name AS CityName 
            FROM city ";


            public const string SelectAllMakes = @"
            SELECT 
                make_id AS MakeId, 
                make_name AS MakeName 
            FROM make";
    }
}