using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public class AdvertiserPostLog : BaseEntity
    {
        [Required]
        public int AdSpotId { get; set; }
        public AdSpot AdSpot { get; set; }
        [Required]
        public int AdvertiserPostId { get; set; }
        public AdvertiserPost AdvertiserPost { get; set; }
        [Required]
        public DateTime ExecutedDateTime { get; set; }
        public DateTime LoadCompletedDateTime { get; set; }
        public bool IsLoadCompleted { get; set; }
    }
}
