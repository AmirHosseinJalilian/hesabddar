export type InvoiceBodyType = {
  id: number;
  headerId: number;
  sstid: string;
  sstt: string;
  mu: string;
  am: number;
  fee: number;
  cfee: number;
  cut: string;
  exr: number;
  prdis: number;
  dis: number;
  adis: number;
  vra: number;
  vam: number;
  odt: string;
  odr: number;
  odam: number;
  olt: string;
  olr: number;
  olam: number;
  consfee: number;
  spro: number;
  bros: number;
  tcpbs: number;
  cop: number;
  vop: number;
  bsrn: string;
  tsstam: number;
  nw: number;
  ssrv: number;
  sscv: number;
  pspd: number;
};

export type InvoicePaymentType = {
  id: number;
  headerId: number;
  iinn: string;
  acn: string;
  trmn: string;
  trn: string;
  pcn: string;
  pid: string;
  pdt: number;
  paymentDate: string;
  pmt: number;
  pv: number;
};

export type InvoiceType = {
  id: number;
  originInvoiceId: string;
  companyId: number;
  customerId: number;
  parentId: number;
  childId: number;
  taxid: string;
  orderDate: string;
  registerDate: string;
  inty: number;
  inno: string;
  irtaxid: string;
  inp: number;
  ins: number;
  tins: string;
  tob: number;
  bid: string;
  tinb: string;
  sbc: string;
  bpc: string;
  bbc: string;
  ft: number;
  bpn: string;
  scln: string;
  scc: string;
  crn: string;
  billid: string;
  tprdis: number;
  tdis: number;
  tadis: number;
  tvam: number;
  todam: number;
  tbill: number;
  setm: number;
  cap: number;
  insp: number;
  tvop: number;
  tax17: number;
  cdcn: string;
  cdcDate: string;
  tonw: number;
  torv: number;
  tocv: number;
  uid: string;
  referenceNumber: string;
  status: number;
  bodies: InvoiceBodyType[];
  payments: InvoicePaymentType[];
  postCustomerData: boolean;
};

export type AddInvoiceRequestType = {
  companyId: number;
  invoices: InvoiceType[];
};

export type AddInvoiceResponseType = {
  // Define the expected response structure here
  success: boolean;
  // other fields if necessary
};