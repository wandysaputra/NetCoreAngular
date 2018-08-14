using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NetCoreAngular.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data
{
    public class NetCoreAngularRepository : INetCoreAngularRepository
    {
        private readonly NetCoreAngularContext _context;
        private readonly ILogger<NetCoreAngularRepository> _logger;

        public NetCoreAngularRepository(NetCoreAngularContext context, ILogger<NetCoreAngularRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void AddEntity(object model)
        {
            _context.Add(model);
            
        }

        public void RemoveEntity(object model)
        {
            _context.Remove(model);
        }
        
        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        #region Menu
        public Menu GetMenu(int id)
        {
            try
            {
                return _context.Menus.SingleOrDefault(w => w.Id == id);               
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get menu: {ex}");
                return null;
            }
        }

        public Menu GetMenu(string code)
        {
            try
            {
                return _context.Menus.Include(i => i.ParentMenu).SingleOrDefault(w => w.Code == code);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get menu: {ex}");
                return null;
            }
        }

        public IEnumerable<Menu> GetMenus()
        {
            try
            {
                return _context.Menus.Include(i => i.ParentMenu).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get menus: {ex}");
                return null;
            }
        }
        #endregion

        #region Group
        public Group GetGroup(int id)
        {
            try
            {
                return _context.Groups.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Group: {ex}");
                return null;
            }
        }
        public IEnumerable<Group> GetGroups()
        {
            try
            {
                var results =_context.Groups.ToList();
                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Groups: {ex}");
                return null;
            }
        }
        #endregion

        #region GroupMenu        
        public IEnumerable<GroupMenu> GetGroupMenus(int groupId)
        {
            try
            {
                var results = _context.GroupMenus.Where(w=>w.GroupId == groupId).ToList();
                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Group menus: {ex}");
                return Enumerable.Empty<GroupMenu>();
            }
        }
        #endregion

        #region UserGroups
        public IEnumerable<UserGroup> GetUserGroups(string userId)
        {
            try
            {
                var results = _context.UserGroups.Where(w => w.UserId == userId).ToList();
                return results;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get user groups: {ex}");
                return null;
            }
        }
        #endregion

        #region Province
        public Province GetProvince(int id)
        {
            try
            {
                return _context.Provinces.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get province: {ex}");
                return null;
            }
        }

        public Province GetProvince(string code)
        {
            try
            {
                return _context.Provinces.SingleOrDefault(w => w.Code == code);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get province: {ex}");
                return null;
            }
        }

        public IEnumerable<Province> GetProvinces()
        {
            try
            {
                return _context.Provinces.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get provinces: {ex}");
                return null;
            }
        }
        #endregion

        #region Regency
        public Regency GetRegency(int id)
        {
            try
            {
                return _context.Regencies.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get regency: {ex}");
                return null;
            }
        }

        public Regency GetRegency(string code)
        {
            try
            {
                return _context.Regencies.SingleOrDefault(w => w.Code == code);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get regency: {ex}");
                return null;
            }
        }

        public IEnumerable<Regency> GetRegencies()
        {
            try
            {
                return _context.Regencies.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get regencies: {ex}");
                return null;
            }
        }

        public IEnumerable<Regency> GetRegencies(int provinceId)
        {
            try
            {
                
                return _context.Regencies.Where(w => w.ProvinceId == provinceId ).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get regencies: {ex}");
                return null;
            }
        }
        #endregion

        #region District
        public District GetDistrict(int id)
        {
            try
            {
                return _context.Districts.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get district: {ex}");
                return null;
            }
        }

        public District GetDistrict(string code)
        {
            try
            {
                return _context.Districts.SingleOrDefault(w => w.Code == code);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get district: {ex}");
                return null;
            }
        }

        public IEnumerable<District> GetDistricts()
        {
            try
            {
                return _context.Districts.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get districts: {ex}");
                return null;
            }
        }

        public IEnumerable<District> GetDistricts(int regencyId)
        {
            try
            {
                return _context.Districts.Where(w => w.RegencyId == regencyId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get districts: {ex}");
                return null;
            }
        }
        #endregion

        #region Village
        public Village GetVillage(int id)
        {
            try
            {
                return _context.Villages.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get village: {ex}");
                return null;
            }
        }

        public Village GetVillage(string code)
        {
            try
            {
                return _context.Villages.SingleOrDefault(w => w.Code == code);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get village: {ex}");
                return null;
            }
        }

        public IEnumerable<Village> GetVillages()
        {
            try
            {
                return _context.Villages.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get villages: {ex}");
                return null;
            }
        }

        public IEnumerable<Village> GetVillages(int districtId)
        {
            try
            {
                return _context.Villages.Where(w => w.DistrictId == districtId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get villages: {ex}");
                return null;
            }
        }
        #endregion

        #region TimeSlot
        public TimeSlot GetTimeSlot(int id)
        {
            try
            {
                return _context.TimeSlots.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get TimeSlot: {ex}");
                return null;
            }
        }      

        public IEnumerable<TimeSlot> GetTimeSlots()
        {
            try
            {
                return _context.TimeSlots.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get TimeSlot: {ex}");
                return null;
            }
        }
        #endregion

        #region AdSpots
        public AdSpot GetAdSpot(int id)
        {
            try
            {
                return _context.AdSpots.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get ad spot: {ex}");
                return null;
            }
        }

        public IEnumerable<AdSpot> GetAdSpots()
        {
            try
            {
                return _context.AdSpots.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get ad spots: {ex}");
                return null;
            }
        }
        #endregion

        #region Advertiser
        public Advertiser GetAdvertiser(int id)
        {
            try
            {
                return _context.Advertisers.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser: {ex}");
                return null;
            }
        }

        public IEnumerable<Advertiser> GetAdvertisers()
        {
            try
            {
                return _context.Advertisers.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser: {ex}");
                return null;
            }
        }
        #endregion

        #region AdvertiserPost
        public AdvertiserPost GetAdvertiserPost(int id)
        {
            try
            {
                return _context.AdvertiserPosts.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post: {ex}");
                return null;
            }
        }

        public AdvertiserPost GetAdvertiserPost(string code)
        {
            try
            {
                return _context.AdvertiserPosts.SingleOrDefault(w => w.Code == code);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPost> GetAdvertiserPosts()
        {
            try
            {
                return _context.AdvertiserPosts.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Posts: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPost> GetAdvertiserPostsByAdvertiserId(int advertiserId)
        {
            try
            {
                return _context.AdvertiserPosts.Where(w => w.AdvertiserId == advertiserId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Posts: {ex}");
                return null;
            }
        }
        #endregion

        #region AdvertiserPostSpot
        public AdvertiserPostSpot GetAdvertiserPostSpot(int id)
        {
            try
            {
                return _context.AdvertiserPostSpots.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post Spot: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpots()
        {
            try
            {
                return _context.AdvertiserPostSpots.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post Spots: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpotsByAdvertiserId(int advertiserId)
        {
            try
            {
                return _context.AdvertiserPostSpots.Where(w => w.AdvertiserPost.AdvertiserId == advertiserId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post Spots: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpotsByAdSpotId(int adSpotId)
        {
            try
            {
                return _context.AdvertiserPostSpots.Where(w => w.AdSpotId == adSpotId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post Spots: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpotsByAdvertiserPostId(int advertiserPostId)
        {
            try
            {
                return _context.AdvertiserPostSpots.Where(w => w.AdvertiserPostId == advertiserPostId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post Spots: {ex}");
                return null;
            }
        }
        #endregion

        #region AdvertiserPostLog
        public AdvertiserPostLog GetAdvertiserPostLog(int id)
        {
            try
            {
                return _context.AdvertiserPostLogs.SingleOrDefault(w => w.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Log: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPostLog> GetAdvertiserPostLogs()
        {
            try
            {
                return _context.AdvertiserPostLogs.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Logs: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPostLog> GetAdvertiserPostLogsByAdvertiserId(int advertiserId)
        {
            try
            {
                return _context.AdvertiserPostLogs.Where(w => w.AdvertiserPost.AdvertiserId == advertiserId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Logs: {ex}");
                return null;
            }
        }

        public IEnumerable<AdvertiserPostLog> GetAdvertiserPostLogsByAdSpotId(int adSpotId)
        {
            try
            {
                return _context.AdvertiserPostLogs.Where(w => w.AdSpotId == adSpotId).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Advertiser Post Logs: {ex}");
                return null;
            }
        }
        #endregion
    }
}
