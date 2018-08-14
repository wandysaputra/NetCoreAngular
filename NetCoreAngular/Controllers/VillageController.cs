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
    public class VillagesController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<VillagesController> _logger;
        private readonly IMapper _mapper;

        public VillagesController(INetCoreAngularRepository repository, ILogger<VillagesController> logger, IMapper mapper)
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
                var results = _repository.GetVillages().ToList();

                return Ok(_mapper.Map<IEnumerable<Village>, IEnumerable<VillageViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get villages: {ex}");
                return BadRequest("Failed to get villages");
            }
        }


        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetVillage(id);
                var model = _mapper.Map<Village, VillageViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get village {id}: {ex}");
                return BadRequest($"Failed to get village {id}");
            }
        }

        [HttpGet("GetByDistrict/{id:int}")]
        public IActionResult GetByDistrict(int id)
        {
            try
            {
                var result = _repository.GetVillages(id);
                var model = _mapper.Map<IEnumerable<Village>, IEnumerable<VillageViewModel>>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get villages by district {id}: {ex}");
                return BadRequest($"Failed to get villages by district {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]VillageViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newVillage = _repository.GetVillage(model.Id);
                    if (newVillage != null)
                    {
                        return BadRequest("Village exists!");
                    }

                    newVillage = _mapper.Map<VillageViewModel, Village>(model);
                    newVillage.Created = DateTime.UtcNow;
                    newVillage.CreatedBy = User.Identity.Name;

                    _repository.AddEntity(newVillage);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/Villages/{newVillage.Id}", _mapper.Map<Village, VillageViewModel>(newVillage));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new village: {ex}");
            }

            return BadRequest("Failed to save new village");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] VillageViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var village = _repository.GetVillage(id);

                if (village == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, village);

                village.Edited = DateTime.UtcNow;
                village.EditedBy = User.Identity.Name;
                
                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update village {id}: {ex}");
            }

            return BadRequest($"Failed to update village {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var village = _repository.GetVillage(id);
                if (village == null)
                {
                    return NotFound();
                }
                
                _repository.RemoveEntity(village);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete village {id}: {ex}");
            }

            return BadRequest($"Failed to delete village {id}");
        }
    }
}
