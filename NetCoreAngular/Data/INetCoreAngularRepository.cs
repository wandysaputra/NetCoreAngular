using System.Collections.Generic;
using NetCoreAngular.Data.Entities;

namespace NetCoreAngular.Data
{
    public interface INetCoreAngularRepository
    {
        void AddEntity(object model);
        void RemoveEntity(object model);
        bool SaveAll();
        
        IEnumerable<Menu> GetMenus();
        Menu GetMenu(int id);
        Menu GetMenu(string code);

        IEnumerable<Group> GetGroups();
        Group GetGroup(int id);

        IEnumerable<GroupMenu> GetGroupMenus(int groupId);
        IEnumerable<UserGroup> GetUserGroups(string userId);

        Province GetProvince(int id);
        Province GetProvince(string code);
        IEnumerable<Province> GetProvinces();
        Regency GetRegency(int id);
        Regency GetRegency(string code);
        IEnumerable<Regency> GetRegencies();
        IEnumerable<Regency> GetRegencies(int regencyId);
        District GetDistrict(int id);
        District GetDistrict(string code);
        IEnumerable<District> GetDistricts();
        IEnumerable<District> GetDistricts(int regencyId);
        Village GetVillage(int id);
        Village GetVillage(string code);
        IEnumerable<Village> GetVillages();
        IEnumerable<Village> GetVillages(int districtId);

        AdSpot GetAdSpot(int id);
        IEnumerable<AdSpot> GetAdSpots();
        Advertiser GetAdvertiser(int id);
        IEnumerable<Advertiser> GetAdvertisers();
        TimeSlot GetTimeSlot(int id);
        IEnumerable<TimeSlot> GetTimeSlots();

        AdvertiserPost GetAdvertiserPost(int id);
        AdvertiserPost GetAdvertiserPost(string code);
        IEnumerable<AdvertiserPost> GetAdvertiserPosts();
        IEnumerable<AdvertiserPost> GetAdvertiserPostsByAdvertiserId(int advertiserId);
        AdvertiserPostSpot GetAdvertiserPostSpot(int id);
        IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpots();
        IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpotsByAdvertiserId(int advertiserId);
        IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpotsByAdSpotId(int adSpotId);
        IEnumerable<AdvertiserPostSpot> GetAdvertiserPostSpotsByAdvertiserPostId(int advertiserPostId);
        AdvertiserPostLog GetAdvertiserPostLog(int id);
        IEnumerable<AdvertiserPostLog> GetAdvertiserPostLogs();
        IEnumerable<AdvertiserPostLog> GetAdvertiserPostLogsByAdvertiserId(int advertiserId);
        IEnumerable<AdvertiserPostLog> GetAdvertiserPostLogsByAdSpotId(int adSpotId);
    }
}