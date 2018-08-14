import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MasterRoutesModule } from './master.routes.module';

import { TimepickerModule, BsDatepickerModule} from 'ngx-bootstrap';

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

import {
    ProvinceService, RegencyService, DistrictService, VillageService
    , AdspotService, AdvertiserService, TimeSlotService, AdvertiserPostService    
} from '../services';

@NgModule({
    imports: [
        SharedModule,
        TimepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        MasterRoutesModule
    ]
    , declarations: [                
        ProvinceComponent, ProvinceDetailComponent, ProvinceListComponent,
        RegencyComponent, RegencyDetailComponent, RegencyListComponent,
        DistrictComponent, DistrictDetailComponent, DistrictListComponent,
        VillageComponent, VillageDetailComponent, VillageListComponent,
        AdspotComponent, AdspotDetailComponent, AdspotListComponent,
        AdvertiserComponent, AdvertiserDetailComponent, AdvertiserListComponent,
        TimeSlotComponent, TimeSlotDetailComponent, TimeSlotListComponent,
        AdvertiserPostComponent, AdvertiserPostDetailComponent, AdvertiserPostListComponent
    ]
    , providers: [
        ProvinceService, ProvinceListResolver, ProvinceResolver,
        RegencyService, RegencyListResolver, RegencyResolver,
        DistrictService, DistrictListResolver, DistrictResolver,
        VillageService, VillageListResolver, VillageResolver,
        AdspotService, AdspotListResolver, AdspotResolver,
        AdvertiserService, AdvertiserListResolver, AdvertiserResolver,
        TimeSlotService, TimeSlotListResolver, TimeSlotResolver,
        AdvertiserPostService, AdvertiserPostResolver, AdvertiserPostListResolver
    ]
})
export class MasterModule { }