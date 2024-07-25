import React from 'react';
import { InvoicesReturnFromSaleView } from 'src/sections/overview/invoices/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('ویرایش سطح سختی'),
};

type Props = {
  params: {
    id: number;
    returnMode: boolean;
  };
};

export default function InvoiceRetuenFromSalePage({ params }: Props) {
  const { id } = params;

  return <InvoicesReturnFromSaleView id={id} returnMode />;
}
