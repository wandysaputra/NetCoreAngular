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
    public class TimeSlotsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<TimeSlotsController> _logger;
        private readonly IMapper _mapper;

        public TimeSlotsController(INetCoreAngularRepository repository, ILogger<TimeSlotsController> logger, IMapper mapper)
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
                var results = _repository.GetTimeSlots().ToList();

                return Ok(_mapper.Map<IEnumerable<TimeSlot>, IEnumerable<TimeSlotViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get timeSlots: {ex}");
                return BadRequest("Failed to get timeSlots");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetTimeSlot(id);
                var model = _mapper.Map<TimeSlot, TimeSlotViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get timeSlot {id}: {ex}");
                return BadRequest($"Failed to get timeSlot {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]TimeSlotViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newTimeSlot = _repository.GetTimeSlot(model.Id);
                    if (newTimeSlot != null)
                    {
                        return BadRequest("TimeSlot exists!");
                    }

                    newTimeSlot = _mapper.Map<TimeSlotViewModel, TimeSlot>(model);
                    newTimeSlot.Created = DateTime.UtcNow;
                    newTimeSlot.CreatedBy = User.Identity.Name;
                    newTimeSlot.StartTime = model.StartTime.ToLocalTime().TimeOfDay;
                    newTimeSlot.EndTime = model.EndTime.ToLocalTime().TimeOfDay;

                    _repository.AddEntity(newTimeSlot);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/TimeSlots/{newTimeSlot.Id}", _mapper.Map<TimeSlot, TimeSlotViewModel>(newTimeSlot));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new timeSlot: {ex}");
            }

            return BadRequest("Failed to save new timeSlot");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] TimeSlotViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var timeSlot = _repository.GetTimeSlot(id);

                if (timeSlot == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, timeSlot);

                timeSlot.StartTime = model.StartTime.ToLocalTime().TimeOfDay;
                timeSlot.EndTime = model.EndTime.ToLocalTime().TimeOfDay;
                timeSlot.Edited = DateTime.UtcNow;
                timeSlot.EditedBy = User.Identity.Name;
                
                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update timeSlot {id}: {ex}");
            }

            return BadRequest($"Failed to update timeSlot {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var timeSlot = _repository.GetTimeSlot(id);
                if (timeSlot == null)
                {
                    return NotFound();
                }
                
                _repository.RemoveEntity(timeSlot);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete timeSlot {id}: {ex}");
            }

            return BadRequest($"Failed to delete timeSlot {id}");
        }
    }
}
