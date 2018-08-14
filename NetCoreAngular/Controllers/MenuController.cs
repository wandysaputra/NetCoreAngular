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
    public class MenusController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<MenusController> _logger;
        private readonly IMapper _mapper;

        public MenusController(INetCoreAngularRepository repository, ILogger<MenusController> logger, IMapper mapper)
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
                var results = _repository.GetMenus();

                return Ok(_mapper.Map<IEnumerable<Menu>, IEnumerable<MenuViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get menus: {ex}");
                return BadRequest("Failed to get menus");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetMenu(id);

                return Ok(_mapper.Map<Menu, MenuViewModel>(result));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get menu {id}: {ex}");
                return BadRequest($"Failed to get menu {id}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]MenuViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {
                    var newMenu = _repository.GetMenu(model.Code);
                    if (newMenu != null)
                    {
                        return BadRequest("Menu exists!");
                    }

                    newMenu = _mapper.Map<MenuViewModel, Menu>(model);
                    newMenu.Created = DateTime.UtcNow;
                    newMenu.CreatedBy = User.Identity.Name;
                    //newMenu.ParentMenu = _repository.GetMenu(newMenu.ParentMenu.Id, false);
                    
                    _repository.AddEntity(newMenu);
                    if (_repository.SaveAll())
                    {
                        return Created($"/api/menus/{newMenu.Id}", _mapper.Map<Menu, MenuViewModel>(newMenu));
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

            return BadRequest("Failed to save new menu");
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] MenuViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var menu = _repository.GetMenu(id);

                if (menu == null)
                {
                    return NotFound();
                }

                //model.ParentMenu = _mapper.Map<Menu, MenuViewModel>(_repository.GetMenu(model.ParentMenuId, false));

                _mapper.Map(model, menu);
                menu.Edited = DateTime.UtcNow;
                menu.EditedBy = User.Identity.Name;
                //var parentMenu = _repository.GetMenu(menu.ParentMenu.Id, false);

                //menu.ParentMenu = new Menu() { Id = parentMenu.Id, Code = parentMenu.Code, Title = parentMenu.Title };

                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update menu {id}: {ex}");
            }

            return BadRequest($"Failed to update menu {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var menu = _repository.GetMenu(id);
                if (menu == null)
                {
                    return NotFound();
                }

                _repository.RemoveEntity(menu);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete menu {id}: {ex}");
            }

            return BadRequest($"Failed to delete menu {id}");
        }
    }
}
