using Microsoft.Extensions.Logging;
using NetCoreAngular.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NetCoreAngular.Data.Services
{
    public class MenuService : NetCoreAngularRepository
    {
        public MenuService(NetCoreAngularContext context, ILogger<NetCoreAngularRepository> logger) : base(context, logger)
        {
        }

        public IEnumerable<Menu> Get()
        {
            try
            {
                return _context.Menus.Inc.ToList();               
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get all orders: {ex}");
                return null;
            }
        }
    }
}
