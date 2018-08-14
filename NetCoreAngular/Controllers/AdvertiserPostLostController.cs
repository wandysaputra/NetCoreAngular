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
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AdvertiserPostLogsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<AdvertiserPostLogsController> _logger;
        private readonly IMapper _mapper;

        public AdvertiserPostLogsController(INetCoreAngularRepository repository, ILogger<AdvertiserPostLogsController> logger, IMapper mapper)
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
                var results = _repository.GetAdvertiserPostLogs().ToList();

                return Ok(_mapper.Map<IEnumerable<AdvertiserPostLog>, IEnumerable<AdvertiserPostLogViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get advertisers: {ex}");
                return BadRequest("Failed to get advertisers");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetAdvertiserPostLog(id);
                var model = _mapper.Map<AdvertiserPostLog, AdvertiserPostLogViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get advertiser {id}: {ex}");
                return BadRequest($"Failed to get advertiser {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]AdvertiserPostLogViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newAdvertiserPostLog = _repository.GetAdvertiserPostLog(model.Id);
                    if (newAdvertiserPostLog != null)
                    {
                        return BadRequest("AdvertiserPostLog exists!");
                    }

                    newAdvertiserPostLog = _mapper.Map<AdvertiserPostLogViewModel, AdvertiserPostLog>(model);
                    newAdvertiserPostLog.Created = DateTime.UtcNow;
                    newAdvertiserPostLog.CreatedBy = User.Identity.Name;

                    _repository.AddEntity(newAdvertiserPostLog);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/AdvertiserPostLogs/{newAdvertiserPostLog.Id}", _mapper.Map<AdvertiserPostLog, AdvertiserPostLogViewModel>(newAdvertiserPostLog));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new advertiser: {ex}");
            }

            return BadRequest("Failed to save new advertiser");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] AdvertiserPostLogViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var advertiser = _repository.GetAdvertiserPostLog(id);

                if (advertiser == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, advertiser);

                advertiser.Edited = DateTime.UtcNow;
                advertiser.EditedBy = User.Identity.Name;
                
                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update advertiser {id}: {ex}");
            }

            return BadRequest($"Failed to update advertiser {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var advertiser = _repository.GetAdvertiserPostLog(id);
                if (advertiser == null)
                {
                    return NotFound();
                }
                
                _repository.RemoveEntity(advertiser);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete advertiser {id}: {ex}");
            }

            return BadRequest($"Failed to delete advertiser {id}");
        }
    }
}
