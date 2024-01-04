import { Model } from '../interfaces/app.settings.interface';

export class AppSettings {
  get sideBarMenuRxjs(): iSidebarMenuRxjs[] {
    return this._sideBarMenuRxjs;
  }

  set sideBarMenuRxjs(value: iSidebarMenuRxjs[]) {
    this._sideBarMenuRxjs = value;
  }


  get model(): any[] {
    return this._model;
  }

  set model(value: any[]) {
    this._model = value;
  }

  private _productionConnection: iConnection;
  private _clientSettings: iConnection;
  private _sideBarMenu: iSideBarMenu[];
  private _sideBarMenuRxjs: iSidebarMenuRxjs[];
  private _deviceZones: idevicesZones[];
  private _flags: any[];
  private _model: Model[];

  constructor(
    productionConnection: iConnection,
    clientSettings: iConnection,
    sideBarMenu: iSideBarMenu[],
    sideBarMenuRxjs: iSidebarMenuRxjs[],
    deviceZones: idevicesZones[],
    flags: any[],
    model: Model[]
  ) {
    this._productionConnection = productionConnection;
    this._clientSettings = clientSettings;
    this._sideBarMenu = sideBarMenu;
    this._sideBarMenuRxjs = sideBarMenuRxjs;
    this._deviceZones = deviceZones;
    this._flags = flags;
    this._model = model;
  }

  get productionConnection(): iConnection {
    return this._productionConnection;
  }

  set productionConnection(value: iConnection) {
    this._productionConnection = value;
  }

  get clientSettings(): iConnection {
    return this._clientSettings;
  }

  set clientSettings(value: iConnection) {
    this._clientSettings = value;
  }

  get sideBarMenu(): iSideBarMenu[] {
    return this._sideBarMenu;
  }

  set sideBarMenu(value: iSideBarMenu[]) {
    this._sideBarMenu = value;
  }

  get deviceZones(): idevicesZones[] {
    return this._deviceZones;
  }

  set deviceZones(value: idevicesZones[]) {
    this._deviceZones = value;
  }

  get flags(): any[] {
    return this._flags;
  }

  set flags(value: any[]) {
    this._flags = value;
  }
}
export interface iConnection {
  frontEndUrl: string;
  serverUrl: string;
  signalRHub: string;
}
export interface iSideBarMenu {
  id: number;
  title: string;
  translatetitle: string;
  expanded: boolean;
  subMenu: iSubMenu[];
  icon?: string;
}
export interface iSidebarMenuRxjs {
  id: number;
  title: string;
  translatetitle: string;
  expanded: boolean;
  subMenu: iSubMenu[];
  icon?: string;
}
export interface iSubMenu {
  id: number;
  icon: string;
  subTitle: string;
  routerLink: string;
}

export interface idevicesZones {
  nameZone: string;
  labelTranslate: string;
  devices: string[];
}
