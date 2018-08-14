
export interface IAdvertiserPost {
    id: number;
    isActive: boolean;

    code: string;
    name: string;
    advertiserId: number;
    activeFrom: Date;
    activeTo: Date;
    postTypeId: number;
    html: string;
    imageUrl: string;

}

