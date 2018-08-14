using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.ViewModels
{
    public class AdvertiserPostViewModel
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
        public string ImageUrl { get; set; }
        public IFormFile Image { get; set; }
        [Required]
        public int AdvertiserId { get; set; }

        [Required]
        public DateTime ActiveFrom { get; set; }
        [Required]
        public DateTime ActiveTo { get; set; }

        public int Id { get; set; }
        public bool IsActive { get; set; }        
    }
}
