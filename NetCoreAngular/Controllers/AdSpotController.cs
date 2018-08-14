using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetCoreAngular.Data;
using NetCoreAngular.Data.Entities;
using NetCoreAngular.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace NetCoreAngular.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AdSpotsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<AdSpotsController> _logger;
        private readonly IMapper _mapper;

        public AdSpotsController(INetCoreAngularRepository repository, ILogger<AdSpotsController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var results = _repository.GetAdSpots().ToList();

                return Ok(_mapper.Map<IEnumerable<AdSpot>, IEnumerable<AdSpotViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get adspots: {ex}");
                return BadRequest("Failed to get adspots");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetAdSpot(id);
                var model = _mapper.Map<AdSpot, AdSpotViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get adspot {id}: {ex}");
                return BadRequest($"Failed to get adspot {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]AdSpotViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newAdSpot = _repository.GetAdSpot(model.Id);
                    if (newAdSpot != null)
                    {
                        return BadRequest("AdSpot exists!");
                    }

                    newAdSpot = _mapper.Map<AdSpotViewModel, AdSpot>(model);
                    newAdSpot.Created = DateTime.UtcNow;
                    newAdSpot.CreatedBy = User.Identity.Name;

                    _repository.AddEntity(newAdSpot);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/AdSpots/{newAdSpot.Id}", _mapper.Map<AdSpot, AdSpotViewModel>(newAdSpot));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new adspot: {ex}");
            }

            return BadRequest("Failed to save new adspot");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] AdSpotViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var adspot = _repository.GetAdSpot(id);

                if (adspot == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, adspot);

                adspot.Edited = DateTime.UtcNow;
                adspot.EditedBy = User.Identity.Name;
                
                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update adspot {id}: {ex}");
            }

            return BadRequest($"Failed to update adspot {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var adspot = _repository.GetAdSpot(id);
                if (adspot == null)
                {
                    return NotFound();
                }
                
                _repository.RemoveEntity(adspot);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete adspot {id}: {ex}");
            }

            return BadRequest($"Failed to delete adspot {id}");
        }
    }
}
