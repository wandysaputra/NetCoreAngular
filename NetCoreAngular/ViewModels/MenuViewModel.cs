using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.ViewModels
{
    public class MenuViewModel
    {        
        [Required]        
        public string Code { get; set; }
        [Required]
        public string Title { get; set; }        
        public string Url { get; set; }        
        public string Icon { get; set; }
        public int? ParentMenuId { get; set; }
        public MenuViewModel ParentMenu { get; set; }

        public int Id { get; set; }
        public bool IsActive { get; set; }
    }
}
