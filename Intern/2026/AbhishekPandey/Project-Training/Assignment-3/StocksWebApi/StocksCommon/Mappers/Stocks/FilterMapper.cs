using System.ComponentModel;
using Riok.Mapperly.Abstractions;
using StocksCommon.DTOs;
using StocksCommon.Entity;
using StocksCommon.Enums;


namespace StocksCommon.Mappers
{
    [Mapper]
    public partial class FilterMapper
    {
        public partial FilterDTO ToDto(Filter filter);
    }
}