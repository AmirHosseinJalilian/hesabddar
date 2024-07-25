import React from 'react';
import { InvoicesCreateView } from 'src/sections/overview/invoices/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('ویرایش سطح سختی'),
};

type Props = {
  params: {
    id: number;
    createMode: boolean;
  };
};

export default function InvoiceCreatePage({ params }: Props) {
  const { id } = params;

  return <InvoicesCreateView id={id} createMode />;
}
