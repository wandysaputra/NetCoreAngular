using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.ViewModels
{
    public class AdvertiserPostSpotViewModel
    {
        [Required]
        public int AdSpotId { get; set; }
        [Required]
        public int AdvertiserPostId { get; set; }

        public int Id { get; set; }
        public bool IsActive { get; set; }        
    }
}
