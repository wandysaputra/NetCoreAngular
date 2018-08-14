using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public class AdSpot : BaseAddress
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        
    }
}
