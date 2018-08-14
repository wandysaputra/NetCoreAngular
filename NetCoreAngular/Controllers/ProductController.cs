using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetCoreAngular.Data;
using NetCoreAngular.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Controllers
{
    [Route("api/[Controller]")]
    public class ProductsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(INetCoreAngularRepository repository, ILogger<ProductsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetAllProducts());
            }
            catch(Exception ex)
            {
                _logger.LogError($"Failed to get products{ex}");
                return BadRequest("Failed to get product");
            }
            
        }
    }
}
