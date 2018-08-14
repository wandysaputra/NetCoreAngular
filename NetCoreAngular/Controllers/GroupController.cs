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
    public class GroupsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<GroupsController> _logger;
        private readonly IMapper _mapper;

        public GroupsController(INetCoreAngularRepository repository, ILogger<GroupsController> logger, IMapper mapper)
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
                var results = _repository.GetGroups().ToList();

                return Ok(_mapper.Map<IEnumerable<Group>, IEnumerable<GroupViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get groups: {ex}");
                return BadRequest("Failed to get groups");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetGroup(id);
                var model = _mapper.Map<Group, GroupViewModel>(result);
                model.MenuIds = _repository.GetGroupMenus(id)?.Where(w => w.MenuId.HasValue)?.Select(s => s.MenuId.Value).ToList() ?? new List<int>();

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get group {id}: {ex}");
                return BadRequest($"Failed to get group {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]GroupViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newGroup = _repository.GetGroup(model.Id);
                    if (newGroup != null)
                    {
                        return BadRequest("Group exists!");
                    }

                    newGroup = _mapper.Map<GroupViewModel, Group>(model);
                    newGroup.Created = DateTime.UtcNow;
                    newGroup.CreatedBy = User.Identity.Name;

                    _repository.AddEntity(newGroup);

                    if (model.MenuIds?.Any() ?? false)
                    {
                        model.MenuIds.ToList().ForEach(f => _repository.AddEntity(new GroupMenu() { GroupId = newGroup.Id, MenuId = f }));
                    }

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/Groups/{newGroup.Id}", _mapper.Map<Group, GroupViewModel>(newGroup));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new group: {ex}");
            }

            return BadRequest("Failed to save new group");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] GroupViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var group = _repository.GetGroup(id);

                if (group == null)
                {
                    return NotFound();
                }

                _mapper.Map(model, group);

                group.Edited = DateTime.UtcNow;
                group.EditedBy = User.Identity.Name;

                var menuIds = model.MenuIds.ToList();
                var groupMenus = _repository.GetGroupMenus(group.Id);
                var existingMenuIds = groupMenus?.Where(w => w.MenuId.HasValue).Select(s => s.MenuId.Value).ToList() ?? new List<int>();

                if (existingMenuIds.Any())
                {
                    groupMenus.Where(w => w.MenuId.HasValue && !menuIds.Contains(w.MenuId.Value)).ToList().ForEach(_repository.RemoveEntity);
                }

                foreach (var menuId in menuIds.Where(w => !existingMenuIds.Contains(w)).ToList())
                {
                    _repository.AddEntity(new GroupMenu() { GroupId = group.Id, MenuId = menuId });
                }

                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update group {id}: {ex}");
            }

            return BadRequest($"Failed to update group {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var group = _repository.GetGroup(id);
                if (group == null)
                {
                    return NotFound();
                }

                _repository.GetGroupMenus(group.Id).ToList().ForEach(_repository.RemoveEntity);                

                _repository.RemoveEntity(group);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete group {id}: {ex}");
            }

            return BadRequest($"Failed to delete group {id}");
        }
    }
}
