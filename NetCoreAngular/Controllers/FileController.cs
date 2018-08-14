using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NetCoreAngular.Data;
using NetCoreAngular.Data.Entities;
using NetCoreAngular.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Transactions;

namespace NetCoreAngular.Controllers
{
    [Route("api/[Controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class FilesController : Controller
    {
        private readonly INetCoreAngularRepository _repository;
        private readonly ILogger<FilesController> _logger;
        private readonly IMapper _mapper;

        public FilesController(INetCoreAngularRepository repository, ILogger<FilesController> logger, IMapper mapper)
        {
            _repository = repository;
            _logger = logger;
            _mapper = mapper;
        }

        //[HttpGet]
        //public IActionResult Get()
        //{
        //    try
        //    {
        //        var results = _repository.GetFiles().ToList();

        //        return Ok(_mapper.Map<IEnumerable<AdvertiserPost>, IEnumerable<AdvertiserPostViewModel>>(results));
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Failed to get advertisers: {ex}");
        //        return BadRequest("Failed to get advertisers");
        //    }
        //}

        //[HttpGet("{id:int}")]
        //public IActionResult Get(int id)
        //{
        //    try
        //    {
        //        var result = _repository.GetAdvertiserPost(id);
        //        var model = _mapper.Map<AdvertiserPost, AdvertiserPostViewModel>(result);

        //        return Ok(model);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Failed to get advertiser {id}: {ex}");
        //        return BadRequest($"Failed to get advertiser {id}");
        //    }
        //}

        [HttpPost]
        public IActionResult Post(IFormFile file)
        {
            // add it to the db
            try
            {
                if (file == null) throw new Exception("File is null");
                if (file.Length == 0) throw new Exception("File is empty");

                using (Stream stream = file.OpenReadStream())
                {
                    using (var binaryReader = new BinaryReader(stream))
                    {
                        var fileContent = binaryReader.ReadBytes((int)file.Length);
                        //await _uploadService.AddFile(fileContent, file.FileName, file.ContentType);
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save a new advertiser: {ex}");
            }

            return BadRequest("Failed to save new advertiser");
        }

        //[HttpPut("{id}")]
        //public IActionResult Update(int id, [FromBody] AdvertiserPostViewModel model)
        //{
        //    try
        //    {
        //        if (model == null)
        //        {
        //            return BadRequest();
        //        }

        //        var advertiser = _repository.GetAdvertiserPost(id);

        //        if (advertiser == null)
        //        {
        //            return NotFound();
        //        }

        //        _mapper.Map(model, advertiser);

        //        advertiser.Edited = DateTime.UtcNow;
        //        advertiser.EditedBy = User.Identity.Name;
                
        //        var result = _repository.SaveAll();

        //        if (result)
        //        {
        //            return new NoContentResult();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Failed to update advertiser {id}: {ex}");
        //    }

        //    return BadRequest($"Failed to update advertiser {id}");
        //}

        //[HttpDelete("{id:int}")]
        //public IActionResult Delete(int id)
        //{
        //    try
        //    {
        //        var advertiser = _repository.GetAdvertiserPost(id);
        //        if (advertiser == null)
        //        {
        //            return NotFound();
        //        }
                
        //        _repository.RemoveEntity(advertiser);
        //        if (_repository.SaveAll())
        //        {
        //            return new NoContentResult();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"Failed to delete advertiser {id}: {ex}");
        //    }

        //    return BadRequest($"Failed to delete advertiser {id}");
        //}
    }
}
