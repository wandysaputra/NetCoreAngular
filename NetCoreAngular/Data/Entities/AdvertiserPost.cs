using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public class AdvertiserPost : BaseEntity
    {
        [Required]
        [StringLength(100)]
        public string Code { get; set; }
        [Required]
        [StringLength(200)]
        public string Name { get; set; }
        [Required]
        public int PostTypeId { get; set; }
        [StringLength(2000)]
        public string Html { get; set; }
        [StringLength(2000)]
        public string ImageUrl { get; set; }
        [Required]
        public int AdvertiserId { get; set; }
        [Required]
        public DateTime ActiveFrom { get; set; }
        [Required]
        public DateTime ActiveTo { get; set; }

        public Advertiser Advertiser { get; set; }
    }
}
