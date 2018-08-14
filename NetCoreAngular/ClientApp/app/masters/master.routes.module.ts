import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ProvinceListResolver, ProvinceResolver, RegencyListResolver, RegencyResolver
    , DistrictListResolver, DistrictResolver, VillageListResolver, VillageResolver
    , AdspotListResolver, AdspotResolver, AdvertiserListResolver, AdvertiserResolver
    , TimeSlotListResolver, TimeSlotResolver, AdvertiserPostResolver, AdvertiserPostListResolver
} from '../resolves'

import {
    ProvinceComponent, ProvinceDetailComponent, ProvinceListComponent
    , RegencyComponent, RegencyDetailComponent, RegencyListComponent
    , DistrictComponent, DistrictDetailComponent, DistrictListComponent
    , VillageComponent, VillageDetailComponent, VillageListComponent
    , AdspotComponent, AdspotDetailComponent, AdspotListComponent
    , AdvertiserComponent, AdvertiserDetailComponent, AdvertiserListComponent
    , AdvertiserPostComponent, AdvertiserPostDetailComponent, AdvertiserPostListComponent
    , TimeSlotComponent, TimeSlotDetailComponent, TimeSlotListComponent
} from '../masters';

let routes: Routes =
    [
        { path: 'provinces', component: ProvinceListComponent, resolve: { provinces: ProvinceListResolver }, data: { breadcrumb: 'Province', Title: 'Province' } }
        , { path: 'provinces/:id', component: ProvinceDetailComponent, resolve: { province: ProvinceResolver }, data: { breadcrumb: 'Province', Title: 'Province' } }
        , { path: 'provinces/:id/edit', component: ProvinceComponent, resolve: { province: ProvinceResolver }, data: { breadcrumb: 'Province', Title: 'Province' } }

        , { path: 'regencies', component: RegencyListComponent, resolve: { regencies: RegencyListResolver }, data: { breadcrumb: 'Regency', Title: 'Regency' } }
        , { path: 'regencies/:id', component: RegencyDetailComponent, resolve: { regency: RegencyResolver, provinces: ProvinceListResolver }, data: { breadcrumb: 'Regency', Title: 'Regency' } }
        , { path: 'regencies/:id/edit', component: RegencyComponent, resolve: { regency: RegencyResolver, provinces: ProvinceListResolver }, data: { breadcrumb: 'Regency', Title: 'Regency' } }

        , { path: 'districts', component: DistrictListComponent, resolve: { districts: DistrictListResolver }, data: { breadcrumb: 'District', Title: 'District' } }
        , { path: 'districts/:id', component: DistrictDetailComponent, resolve: { district: DistrictResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver }, data: { breadcrumb: 'District', Title: 'District' } }
        , { path: 'districts/:id/edit', component: DistrictComponent, resolve: { district: DistrictResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver }, data: { breadcrumb: 'District', Title: 'District' } }

        , { path: 'villages', component: VillageListComponent, resolve: { villages: VillageListResolver }, data: { breadcrumb: 'Village', Title: 'Village' } }
        , { path: 'villages/:id', component: VillageDetailComponent, resolve: { village: VillageResolver, districts: DistrictListResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver }, data: { breadcrumb: 'Village', Title: 'Village' } }
        , { path: 'villages/:id/edit', component: VillageComponent, resolve: { village: VillageResolver, districts: DistrictListResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver }, data: { breadcrumb: 'Village', Title: 'Village' } }

        , { path: 'timeslots', component: TimeSlotListComponent, resolve: { timeslots: TimeSlotListResolver }, data: { breadcrumb: 'TimeSlot', Title: 'TimeSlot' } }
        , { path: 'timeslots/:id', component: TimeSlotDetailComponent, resolve: { timeslot: TimeSlotResolver }, data: { breadcrumb: 'TimeSlot', Title: 'TimeSlot' } }
        , { path: 'timeslots/:id/edit', component: TimeSlotComponent, resolve: { timeslot: TimeSlotResolver }, data: { breadcrumb: 'TimeSlot', Title: 'TimeSlot' } }

        , { path: 'adspots', component: AdspotListComponent, resolve: { adspots: AdspotListResolver }, data: { breadcrumb: 'AdSpot', Title: 'AdSpot' } }
        , { path: 'adspots/:id', component: AdspotDetailComponent, resolve: { adspot: AdspotResolver, districts: DistrictListResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver, villages: VillageListResolver }, data: { breadcrumb: 'AdSpot', Title: 'AdSpot' } }
        , { path: 'adspots/:id/edit', component: AdspotComponent, resolve: { adspot: AdspotResolver, districts: DistrictListResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver, villages: VillageListResolver }, data: { breadcrumb: 'AdSpot', Title: 'AdSpot' } }

        , { path: 'advertisers', component: AdvertiserListComponent, resolve: { advertisers: AdvertiserListResolver }, data: { breadcrumb: 'Advertiser', Title: 'Advertiser' } }
        , { path: 'advertisers/:id', component: AdvertiserDetailComponent, resolve: { advertiser: AdvertiserResolver, districts: DistrictListResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver, villages: VillageListResolver }, data: { breadcrumb: 'Advertiser', Title: 'Advertiser' } }
        , { path: 'advertisers/:id/edit', component: AdvertiserComponent, resolve: { advertiser: AdvertiserResolver, districts: DistrictListResolver, provinces: ProvinceListResolver, regencies: RegencyListResolver, villages: VillageListResolver }, data: { breadcrumb: 'Advertiser', Title: 'Advertiser' } }

        , { path: 'advertiserPosts', component: AdvertiserPostListComponent, resolve: { advertiserPosts: AdvertiserPostListResolver }, data: { breadcrumb: 'Advertiser Post', Title: 'Advertiser Post' } }
        , { path: 'advertiserPosts/:id', component: AdvertiserPostDetailComponent, resolve: { advertiserPost: AdvertiserPostResolver, advertisers: AdvertiserListResolver }, data: { breadcrumb: 'Advertiser Post', Title: 'Advertiser Post' } }
        , { path: 'advertiserPosts/:id/edit', component: AdvertiserPostComponent, resolve: { advertiserPost: AdvertiserPostResolver, advertisers: AdvertiserListResolver }, data: { breadcrumb: 'Advertiser Post', Title: 'Advertiser Post' } }
    ];

@NgModule({
    imports: [        
        RouterModule.forChild(routes)
    ]
    , exports: [
        RouterModule
    ]
})
export class MasterRoutesModule { }