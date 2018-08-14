using AutoMapper;
using NetCoreAngular.Data.Entities;
using NetCoreAngular.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCoreAngular.Data
{
    public class NetCoreAngularMappingProfile : Profile
    {
        public NetCoreAngularMappingProfile()
        {
            //CreateMap<Order, OrderViewModel>()
            //   .ForMember(o => o.OrderId, ex => ex.MapFrom(o => o.Id))
            //   .ReverseMap();

            //CreateMap<OrderItem, OrderItemViewModel>()
            //  .ReverseMap();

            CreateMap<AppUser, UserViewModel>().ReverseMap();
            CreateMap<Menu, MenuViewModel>().ReverseMap();
            CreateMap<Group, GroupViewModel>().ReverseMap();

            CreateMap<Province, ProvinceViewModel>().ReverseMap();
            CreateMap<Regency, RegencyViewModel>().ReverseMap();
            CreateMap<District, DistrictViewModel>().ReverseMap();
            CreateMap<Village, VillageViewModel>().ReverseMap();
            CreateMap<TimeSlot, TimeSlotViewModel>()
                //.ForMember(s => s.StartTime, t => t.MapFrom(m => DateTime.MinValue.Add(m.StartTime)))
                //.ForMember(s => s.EndTime, t => t.MapFrom(m => DateTime.MinValue.Add(m.EndTime)))
                .ReverseMap();

            CreateMap<AdSpot, AdSpotViewModel>().ReverseMap();
            CreateMap<Advertiser, AdvertiserViewModel>().ReverseMap();
            CreateMap<AdvertiserPost, AdvertiserPostViewModel>()
                
                .ReverseMap();
            CreateMap<AdvertiserPostSpot, AdvertiserPostSpotViewModel>().ReverseMap();
            CreateMap<AdvertiserPostLog, AdvertiserPostLogViewModel>()
                
                .ReverseMap();
        }
    }
}