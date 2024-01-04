
export interface AppSettingsInterface{
  "firebaseConfig ":    FirebaseConfig;
  localConnection:      Connection;
  productionConnection: Connection;
  clientSettings:       ClientSettings;
  firebaseConnection:   ClientSettings;
  deviceZones:          DeviceZone[];
  sideBarMenu:          SideBarMenu[];
  sideBarMenuRxjs:      SideBarMenu[];
  flags:                Flag[];
  model:                Model[];
}

export interface ClientSettings {
}

export interface DeviceZone {
  nameZone:       string;
  labelTranslate: string;
  devices:        string[];
}

export interface FirebaseConfig {
  apiKey:            string;
  authDomain:        string;
  projectId:         string;
  storageBucket:     string;
  messagingSenderId: string;
  appId:             string;
  measurementId:     string;
}

export interface Flag {
  name: string;
  flag: string;
  code: string;
}

export interface Connection {
  frontEndUrl: string;
  serverUrl:   string;
  signalRHub:  string;
}

export interface Model {
  label: string;
  items: Item[];
  icon?: string;
}

export interface Item {
  label:       string;
  icon:        string;
  routerLink?: string[];
  items?:      Item[];
  command?:    () => void;
}

export interface SideBarMenu {
  id:             number;
  title:          string;
  translatetitle: string;
  subMenu:        SubMenu[];
  icon?:          Icon;
  expanded?:      boolean;
}

export enum Icon {
  FasFaEdit = " fas fa-edit",
  FasFaHammer = "fas fa-hammer",
}

export interface SubMenu {
  id:         number;
  icon:       Icon;
  subTitle:   string;
  routerLink: string;
}
