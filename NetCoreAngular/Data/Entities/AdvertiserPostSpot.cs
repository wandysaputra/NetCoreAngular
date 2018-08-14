using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public class AdvertiserPostSpot : BaseEntity
    {
        [Required]
        public int AdSpotId { get; set; }
        public AdSpot AdSpot { get; set; }
        [Required]
        public int TimeSlotId { get; set; }
        public TimeSlot TimeSlot { get; set; }
        [Required]
        public int AdvertiserPostId { get; set; }
        public AdvertiserPost AdvertiserPost { get; set; }
    }
}
