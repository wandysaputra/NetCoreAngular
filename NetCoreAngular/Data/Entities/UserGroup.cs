﻿
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetCoreAngular.Data.Entities
{
    public class UserGroup:BaseEntity
    {        
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public int? GroupId { get; set; }
        public Group Group { get; set; }
    }
}
