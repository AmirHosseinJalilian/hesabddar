import React from 'react';
import { InvoicesDeleteView } from 'src/sections/overview/invoices/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('ویرایش سطح سختی'),
};

type Props = {
  params: {
    id: number;
    deleteMode: boolean;
  };
};

export default function InvoiceDeletePage({ params }: Props) {
  const { id } = params;

  return <InvoicesDeleteView id={id} deleteMode />;
}
