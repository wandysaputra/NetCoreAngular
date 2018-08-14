using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.ViewModels
{
    public class AdSpotViewModel
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        [StringLength(1000)]
        public string Street { get; set; }
        [Required]
        public int VillageId { get; set; }
        [Required]
        public int DistrictId { get; set; }
        [Required]
        public int RegencyId { get; set; }
        [Required]
        public int ProvinceId { get; set; }
        [StringLength(10)]
        public string Postcode { get; set; }

        public int Id { get; set; }
        public bool IsActive { get; set; }        
    }
}
