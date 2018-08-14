using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public abstract class BaseAddress: BaseEntity, IBaseAddress
    {
        [Required]
        [StringLength(1000)]
        public string Street { get; set; }
        [Required]
        public int VillageId { get; set; }
        //public Village Village { get; set; }
        [Required]
        public int DistrictId { get; set; }
        //public District District { get; set; }
        [Required]
        public int RegencyId { get; set; }
        //public Regency Regency { get; set; }
        [Required]
        public int ProvinceId { get; set; }
        //public Province Province { get; set; }
        [StringLength(10)]
        public string Postcode { get; set; }


    }
}
