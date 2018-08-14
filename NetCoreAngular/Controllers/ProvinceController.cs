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
    public class ProvincesController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<ProvincesController> _logger;
        private readonly IMapper _mapper;

        public ProvincesController(INetCoreAngularRepository repository, ILogger<ProvincesController> logger, IMapper mapper)
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
                var results = _repository.GetProvinces().ToList();

                return Ok(_mapper.Map<IEnumerable<Province>, IEnumerable<ProvinceViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get provinces: {ex}");
                return BadRequest("Failed to get provinces");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetProvince(id);
                var model = _mapper.Map<Province, ProvinceViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get province {id}: {ex}");
                return BadRequest($"Failed to get province {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]ProvinceViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newProvince = _repository.GetProvince(model.Id);
                    if (newProvince != null)
                    {
                        return BadRequest("Province exists!");
                    }

                    newProvince = _mapper.Map<ProvinceViewModel, Province>(model);
                    newProvince.Created = DateTime.UtcNow;
                    newProvince.CreatedBy = User.Identity.Name;

                    _repository.AddEntity(newProvince);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/Provinces/{newProvince.Id}", _mapper.Map<Province, ProvinceViewModel>(newProvince));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new province: {ex}");
            }

            return BadRequest("Failed to save new province");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] ProvinceViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var province = _repository.GetProvince(id);

                if (province == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, province);

                province.Edited = DateTime.UtcNow;
                province.EditedBy = User.Identity.Name;
                
                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update province {id}: {ex}");
            }

            return BadRequest($"Failed to update province {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var province = _repository.GetProvince(id);
                if (province == null)
                {
                    return NotFound();
                }
                
                _repository.RemoveEntity(province);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete province {id}: {ex}");
            }

            return BadRequest($"Failed to delete province {id}");
        }
    }
}
