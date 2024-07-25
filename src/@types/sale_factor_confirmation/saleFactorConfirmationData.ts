// // import { UserData } from 'src/@types/vault/user/userData';

import { GroupingData } from '../grouping/groupingData';
import { SaleFactorConfirmationDetailsData } from '../sale_factor_confirmation_details/saleFactorConfirmationDetailsData';
import { SaleFactorTaxData } from '../sale_factor_tax/saleFactorTaxData';
import { SaleFactorTaxStatusData } from '../sale_factor_tax_status/saleFactorTaxStatusData';

// export interface SaleFactorConfirmationData {
//   id: number;
//   factorNumber?: string;
//   saleType?: number;
//   details?: {
//     count?: number | undefined;
//     unitCost?: number;
//     commodityDiscount?: number;
//     iSCommodityDiscount?: boolean;
//     vat?: number;
//     commodity?: {
//       comodityCod?: string;
//       commodityName?: string;
//       unitCount?: number;
//       basePrice?: number;
//     }[];
//   }[];
//   pepoleGrouping?: {
//     pepoles?: {
//       name?: string;
//       pepoleType?: number;
//       codPepole?: string;
//       pepoleDescriptions?: {
//         nationalityCode?: string;
//         phone?: string;
//         address?: string;
//       }[];
//     }[];
//   };
//   dateFactorSale?: string;
// }

// --------------------------------------------------------------

export type SaleFactorConfirmationData = {
  id: number;
  rowId: string;
  dateFactorSale: Date; // assuming this is a string in ISO format
  factorNumber: string;
  saleType: number;
  pepoleGroupingID: number;
  details: SaleFactorConfirmationDetailsData[];
  pepoleGrouping: GroupingData;
  saleFactorTax: SaleFactorTaxData;
  saleFactorTaxStatus: SaleFactorTaxStatusData;
};

// ---------------------------------------------------------

// export type SaleFactorConfirmationData = {
//   id: number;
//   rowId: string;
//   dateFactorSale: Date;
//   factorNumber: string;
//   saleType: number;
//   pepoleGroupingID: number;
//   // Details:

//   saleFactorConfirmationID: number;
//   count: number;
//   unitCost: number;
//   commodityDiscount: number;
//   iSCommodityDiscount: boolean;
//   vat: number;
//   commodityID: number;
//   // commodity:
//   comodityCod: string;
//   commodityName: string;
//   unitCount: number;
//   basePrice: number;
//   // PepoleGrouping:
//   objectValue: string;
//   // pepoles:
//   name: string;
//   pepoleType: number;
//   codPepole: string;
//   groupingID: number;
//   // pepoleDescriptions:
//   pepoleID: number;
//   address: string;
//   phone: string;
//   nationalityCode: string;
// };
