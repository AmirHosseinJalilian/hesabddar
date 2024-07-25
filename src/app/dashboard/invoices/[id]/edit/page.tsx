import React from 'react';
import { InvoicesEditView } from 'src/sections/overview/invoices/view';
import { buildSiteTitle } from 'src/utils/build-site-title';

export const metadata = {
  title: buildSiteTitle('ویرایش سطح سختی'),
};

type Props = {
  params: {
    id: number;
    editMode: boolean;
  };
};

export default function InvoiceEditPage({ params }: Props) {
  const { id } = params;

  return <InvoicesEditView id={id} editMode />;
}
