using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.ViewModels
{
    public class VillageViewModel
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        public int Id { get; set; }
        public bool IsActive { get; set; }        
        public int DistrictId { get; set; }
    }
}
