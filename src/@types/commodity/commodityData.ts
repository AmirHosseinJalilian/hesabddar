// import { UserData } from 'src/@types/vault/user/userData';

export type CommodityData = {
  map(arg0: (commodity: any) => { comodityCod: any; commodityName: any; unitCount: any; basePrice: any; }): any;
  cid: number;
  commodityCod: string;
  commodityName: string;
  unitCount: number;
  basePrice: number;
};
