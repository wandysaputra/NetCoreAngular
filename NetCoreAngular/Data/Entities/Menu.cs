using System.ComponentModel.DataAnnotations;

namespace NetCoreAngular.Data.Entities
{
    public class Menu : BaseEntity
    {        
        [Required]
        [StringLength(10)]
        public string Code { get; set; }
        [Required]
        [StringLength(50)]
        public string Title { get; set; }        
        [StringLength(500)]
        public string Url { get; set; }        
        [StringLength(50)]
        public string Icon { get; set; }
        public int? ParentMenuId { get; set; }
        public Menu ParentMenu { get; set; }
    }
}
