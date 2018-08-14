using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetCoreAngular.Data;
using NetCoreAngular.Data.Entities;
using NetCoreAngular.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace NetCoreAngular.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AdvertiserPostsController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<AdvertiserPostsController> _logger;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _hosting;

        public AdvertiserPostsController(INetCoreAngularRepository repository, ILogger<AdvertiserPostsController> logger, IMapper mapper, IHostingEnvironment hosting)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
            _hosting = hosting;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var results = _repository.GetAdvertiserPosts().ToList();

                return Ok(_mapper.Map<IEnumerable<AdvertiserPost>, IEnumerable<AdvertiserPostViewModel>>(results));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get advertiserposts: {ex}");
                return BadRequest("Failed to get advertiserposts");
            }
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _repository.GetAdvertiserPost(id);
                var model = _mapper.Map<AdvertiserPost, AdvertiserPostViewModel>(result);

                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get advertiserPOst {id}: {ex}");
                return BadRequest($"Failed to get advertiserPost {id}");
            }
        }

        private async Task<string> SaveImage(AdvertiserPostViewModel model)
        {
            if (model.Image == null)
            {
                return null;
            }
            try
            {
                var filename = Path.Combine(@"Uploads", $"{DateTime.UtcNow.ToFileTime()}_{model.Image.FileName}");
                var rootPath = _hosting.WebRootPath;
                var fileInfo = new FileInfo($"{rootPath}\\{filename}");

                if (!Directory.Exists(fileInfo.Directory.FullName))
                {
                    Directory.CreateDirectory(fileInfo.Directory.FullName);
                }

                using (var stream = new FileStream(fileInfo.FullName, FileMode.Create))
                {
                    await model.Image.CopyToAsync(stream);
                }

                return filename;
            }
            catch(Exception ex)
            {
                _logger.LogError($"Failed to save image {model}: {ex}");
                throw ex;
            }
            return null;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm]AdvertiserPostViewModel model)
        {
            // add it to the db
            try
            {
                if (ModelState.IsValid)
                {

                    var newAdvertiserPost = _repository.GetAdvertiserPost(model.Code);
                    if (newAdvertiserPost != null)
                    {
                        return BadRequest("AdvertiserPost exists!");
                    }                   

                    newAdvertiserPost = _mapper.Map<AdvertiserPostViewModel, AdvertiserPost>(model);
                    newAdvertiserPost.Created = DateTime.UtcNow;
                    newAdvertiserPost.CreatedBy = User.Identity.Name;

                    var fileName = await SaveImage(model);
                    if (!string.IsNullOrWhiteSpace(fileName))
                    {
                        newAdvertiserPost.ImageUrl = fileName;
                    }

                    _repository.AddEntity(newAdvertiserPost);                 

                    if (_repository.SaveAll())
                    {
                        return Created($"/api/AdvertiserPosts/{newAdvertiserPost.Id}", _mapper.Map<AdvertiserPost, AdvertiserPostViewModel>(newAdvertiserPost));
                    }

                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new advertiserPost: {ex}");
            }

            return BadRequest("Failed to save new advertiserPost");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] AdvertiserPostViewModel model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest();
                }

                var advertiser = _repository.GetAdvertiserPost(id);
                var existingImageUrl = advertiser.ImageUrl;
                if (advertiser == null)
                {
                    return NotFound();
                }               

                _mapper.Map(model, advertiser);
                advertiser.Id = id;
                advertiser.ImageUrl = existingImageUrl;
                advertiser.Edited = DateTime.UtcNow;
                advertiser.EditedBy = User.Identity.Name;

                var fileName = await SaveImage(model);
                if (!string.IsNullOrWhiteSpace(fileName))
                {
                    advertiser.ImageUrl = fileName;
                }

                var result = _repository.SaveAll();

                if (result)
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to update advertiserPost {id}: {ex}");
            }

            return BadRequest($"Failed to update advertiserPost {id}");
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var advertiser = _repository.GetAdvertiserPost(id);
                if (advertiser == null)
                {
                    return NotFound();
                }

                var rootPath = _hosting.WebRootPath;
                var fileInfo = new FileInfo($"{rootPath}\\{advertiser.ImageUrl}");
                if (fileInfo.Exists)
                    fileInfo.Delete();

                _repository.RemoveEntity(advertiser);
                if (_repository.SaveAll())
                {
                    return new NoContentResult();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete advertiserPost {id}: {ex}");
            }

            return BadRequest($"Failed to delete advertiserPost {id}");
        }
    }
}
