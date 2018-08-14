
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public abstract class BaseEntity
    {
        [Required]
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public DateTime Edited { get; set; }
        public string EditedBy { get; set; }
    }
}
