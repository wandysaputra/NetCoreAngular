using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public class Village:BaseEntity
    {
        [Required]
        [StringLength(20)]
        public string Code { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        public int DistrictId { get; set; }
        public District District { get; set; }
    }
}
