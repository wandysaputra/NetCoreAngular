export interface IMenu {
    id: number;
    code: string;
    title: string;
    url: string;
    icon: string;
    parentMenuId: number;    
    parentMenu: IMenu;
    isActive: boolean;
}

