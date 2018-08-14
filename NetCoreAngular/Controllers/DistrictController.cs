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
    public class DistrictsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<DistrictsController> _logger;
        private readonly IMapper _mapper;

        public DistrictsController(INetCoreAngularRepository repository, ILogger<DistrictsController> logger, IMapper mapper)
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
                var results = _repository.GetDistricts().ToList();

                return Ok(_mapper.Map<IEnumerable<District>, IEnumerable<DistrictViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get districts: {ex}");
                return BadRequest("Failed to get districts");
            }
        }


        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetDistrict(id);
                var model = _mapper.Map<District, DistrictViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get district {id}: {ex}");
                return BadRequest($"Failed to get district {id}");
            }
        }

        [HttpGet("GetByRegency/{id:int}")]
        public IActionResult GetByRegency(int id)
        {
            try
            {
                var result = _repository.GetDistricts(id);
                var model = _mapper.Map<IEnumerable<District>, IEnumerable<DistrictViewModel>>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get districts by regency {id}: {ex}");
                return BadRequest($"Failed to get districts by regency {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]DistrictViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newDistrict = _repository.GetDistrict(model.Id);
                    if (newDistrict != null)
                    {
                        return BadRequest("District exists!");
                    }

                    newDistrict = _mapper.Map<DistrictViewModel, District>(model);
                    newDistrict.Created = DateTime.UtcNow;
                    newDistrict.CreatedBy = User.Identity.Name;

                    _repository.AddEntity(newDistrict);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/Districts/{newDistrict.Id}", _mapper.Map<District, DistrictViewModel>(newDistrict));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new district: {ex}");
            }

            return BadRequest("Failed to save new district");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] DistrictViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var district = _repository.GetDistrict(id);

                if (district == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, district);

                district.Edited = DateTime.UtcNow;
                district.EditedBy = User.Identity.Name;
                
                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update district {id}: {ex}");
            }

            return BadRequest($"Failed to update district {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var district = _repository.GetDistrict(id);
                if (district == null)
                {
                    return NotFound();
                }
                
                _repository.RemoveEntity(district);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete district {id}: {ex}");
            }

            return BadRequest($"Failed to delete district {id}");
        }
    }
}
