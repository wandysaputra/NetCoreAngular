using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public interface IBaseAddress
    {
        [Required]
        [StringLength(1000)]
        string Street { get; set; }
        [Required]
        int VillageId { get; set; }
        //Village Village { get; set; }
        [Required]
         int DistrictId { get; set; }
        //District District { get; set; }
        [Required]
         int RegencyId { get; set; }
        //Regency Regency { get; set; }
        [Required]
         int ProvinceId { get; set; }
        //Province Province { get; set; }
        [StringLength(10)]
         string Postcode { get; set; }


    }
}
