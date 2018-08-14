using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetCoreAngular.Data;
using NetCoreAngular.Data.Entities;
using NetCoreAngular.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Controllers
{
    [Route("api/[Controller]")]
    public class UsersController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<UsersController> _logger;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public UsersController(INetCoreAngularRepository repository, ILogger<UsersController> logger, IMapper mapper, UserManager<AppUser> userManager)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var results = _userManager.Users.ToList();

                return Ok(_mapper.Map<IEnumerable<AppUser>, IEnumerable<UserViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get users: {ex}");
                return BadRequest("Failed to get users");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            try
            {
                var result = await _userManager.FindByIdAsync(id);
                var user = _mapper.Map<AppUser, UserViewModel>(result);
                user.GroupIds = _repository.GetUserGroups(user.Id).Where(w => w.GroupId.HasValue).Select(s => s.GroupId.Value).ToList();

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get user {id}: {ex}");
                return BadRequest($"Failed to get user {id}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]UserViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {
                    var newUser = await _userManager.FindByNameAsync(model.UserName);
                    if (newUser != null)
                    {
                        return BadRequest("Username exists!");
                    }

                    newUser = new AppUser()
                    {
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        UserName = model.UserName,
                        Email = model.UserName
                    };
                    
                    var password = model.Password;
                    if(string.IsNullOrWhiteSpace(password))
                    {
                        password = "P@ssw0rd!";
                    }

                    var result = await _userManager.CreateAsync(newUser, password);
                    if (result == IdentityResult.Success)
                    {
                        if (model.GroupIds?.Any() ?? false)
                        {
                            model.GroupIds.ToList().ForEach(f =>
                            {
                                var userGroup = new UserGroup()
                                {
                                    UserId = newUser.Id,
                                    GroupId = f
                                };
                                _repository.AddEntity(userGroup);
                            });
                            if (!_repository.SaveAll())
                            {
                                _logger.LogError("Failed to save user groups!");
                            }
                        }

                        return Created($"/api/users/{newUser.Id}", _mapper.Map<AppUser, UserViewModel>(newUser));                        
                    }                    
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new user: {ex}");
            }

            return BadRequest("Failed to save new user");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UserViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.UserName = model.UserName;

                var result = await _userManager.UpdateAsync(user);

                if (result.Succeeded)
                {
                    var groupIds = model.GroupIds.ToList();
                    var groupMenus = _repository.GetUserGroups(user.Id);
                    var existingMenuIds = groupMenus?.Where(w => w.GroupId.HasValue).Select(s => s.GroupId.Value).ToList() ?? new List<int>();

                    if (existingMenuIds.Any())
                    {
                        groupMenus.Where(w => w.GroupId.HasValue && !groupIds.Contains(w.GroupId.Value)).ToList().ForEach(_repository.RemoveEntity);
                    }

                    foreach (var groupId in groupIds.Where(w => !existingMenuIds.Contains(w)).ToList())
                    {
                        _repository.AddEntity(new UserGroup() { UserId = user.Id, GroupId = groupId });
                    }

                    _repository.SaveAll();

                    return new NoContentResult();
                }                
            }
            catch(Exception ex)
            {
                _logger.LogError($"Failed to update user {id}: {ex}");
            }

            return BadRequest($"Failed to update user {id}");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                if(user == null)
                {
                    return NotFound();
                }

                _repository.GetUserGroups(user.Id).ToList().ForEach(_repository.RemoveEntity);
                _repository.SaveAll();

                var result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    return new NoContentResult();
                }
            }
            catch(Exception ex)
            {
                _logger.LogError($"Failed to delete user {id}: {ex}");
            }

            return BadRequest($"Failed to delete user {id}");
        }
    }
}
