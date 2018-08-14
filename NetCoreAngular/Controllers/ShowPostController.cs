using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetCoreAngular.Data;
using NetCoreAngular.Data.Entities;
using NetCoreAngular.ViewModels;
using System;

namespace NetCoreAngular.Controllers
{
    [Route("api/[Controller]")]    
    public class ShowPostsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<ShowPostsController> _logger;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _hosting;

        public ShowPostsController(INetCoreAngularRepository repository, ILogger<ShowPostsController> logger, IMapper mapper, IHostingEnvironment hosting)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _hosting = hosting;
        }

      
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetAdvertiserPost(id);
                var model = _mapper.Map<AdvertiserPost, AdvertiserPostViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get show post {id}: {ex}");
                return BadRequest($"Failed to get show post {id}");
            }
        }

    }
}
