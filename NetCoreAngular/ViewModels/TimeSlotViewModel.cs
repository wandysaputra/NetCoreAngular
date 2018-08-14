using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.ViewModels
{
    public class TimeSlotViewModel
    {
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public DateTime EndTime { get; set; }

        public int Id { get; set; }
        public bool IsActive { get; set; }        
    }
}
