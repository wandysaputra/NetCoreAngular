
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public class GroupMenu : BaseEntity
    {     
        public int? GroupId { get; set; }
        public Group Group { get; set; }
        public int? MenuId { get; set; }
        public Menu Menu { get; set; }
     
    }
}
