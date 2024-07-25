// utils
// import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
  },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    general: {
      // app: `${ROOTS.DASHBOARD}/app`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      ranking: `${ROOTS.DASHBOARD}/ranking`,
      invoices: {
        root: `${ROOTS.DASHBOARD}/invoices`,
        delete: (id: number, deleteMode: boolean) => `${ROOTS.DASHBOARD}/invoices/${id}/delete`,
        edit: (id: number, editMode: boolean) => `${ROOTS.DASHBOARD}/invoices/${id}/edit`,
        create: (id: number, createMode: boolean) => `${ROOTS.DASHBOARD}/invoices/${id}/create`,
        return:(id: number, returnFromSaleMode: boolean) => `${ROOTS.DASHBOARD}/invoices/${id}/return`,
        
      },
      customer: `${ROOTS.DASHBOARD}/customer`,
      stuff: `${ROOTS.DASHBOARD}/stuff`,
      company: `${ROOTS.DASHBOARD}/company`,
      employee: `${ROOTS.DASHBOARD}/employee`,
      csr: `${ROOTS.DASHBOARD}/csr`,
      search_stuff: `${ROOTS.DASHBOARD}/search-stuff`,
      user: `${ROOTS.DASHBOARD}/user`,
    },

    // user: {
    //   root: `${ROOTS.DASHBOARD}/user`,
    //   new: `${ROOTS.DASHBOARD}/user/new`,
    //   list: `${ROOTS.DASHBOARD}/user/list`,
    //   account: `${ROOTS.DASHBOARD}/user/account`,
    //   edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
    // },

    // invoice: {
    //   root: `${ROOTS.DASHBOARD}/invoice`,
    //   new: `${ROOTS.DASHBOARD}/invoice/new`,
    //   details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
    //   edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
    // },
  },
};
