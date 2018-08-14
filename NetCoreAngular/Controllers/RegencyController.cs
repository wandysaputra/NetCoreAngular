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
    public class RegenciesController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<RegenciesController> _logger;
        private readonly IMapper _mapper;

        public RegenciesController(INetCoreAngularRepository repository, ILogger<RegenciesController> logger, IMapper mapper)
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
                var results = _repository.GetRegencies().ToList();

                return Ok(_mapper.Map<IEnumerable<Regency>, IEnumerable<RegencyViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get regencies: {ex}");
                return BadRequest("Failed to get regencies");
            }
        }


        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetRegency(id);
                var model = _mapper.Map<Regency, RegencyViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get regency {id}: {ex}");
                return BadRequest($"Failed to get regency {id}");
            }
        }

        [HttpGet("GetByProvince/{id:int}")]
        public IActionResult GetByProvince(int id)
        {
            try
            {
                var result = _repository.GetRegencies(id);
                var model = _mapper.Map<IEnumerable<Regency>, IEnumerable<RegencyViewModel>>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get regencies by province {id}: {ex}");
                return BadRequest($"Failed to get regencies by province {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]RegencyViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newRegency = _repository.GetRegency(model.Id);
                    if (newRegency != null)
                    {
                        return BadRequest("Regency exists!");
                    }

                    newRegency = _mapper.Map<RegencyViewModel, Regency>(model);
                    newRegency.Created = DateTime.UtcNow;
                    newRegency.CreatedBy = User.Identity.Name;

                    _repository.AddEntity(newRegency);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/Regencies/{newRegency.Id}", _mapper.Map<Regency, RegencyViewModel>(newRegency));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new regency: {ex}");
            }

            return BadRequest("Failed to save new regency");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] RegencyViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var regency = _repository.GetRegency(id);

                if (regency == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, regency);

                regency.Edited = DateTime.UtcNow;
                regency.EditedBy = User.Identity.Name;
                
                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update regency {id}: {ex}");
            }

            return BadRequest($"Failed to update regency {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var regency = _repository.GetRegency(id);
                if (regency == null)
                {
                    return NotFound();
                }
                
                _repository.RemoveEntity(regency);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete regency {id}: {ex}");
            }

            return BadRequest($"Failed to delete regency {id}");
        }
    }
}
