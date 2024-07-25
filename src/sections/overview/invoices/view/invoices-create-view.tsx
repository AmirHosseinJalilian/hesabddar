'use client';

import { Container } from '@mui/material';
import React from 'react';
import InvoiceNewForm from '../invoices-new-form';
import { useSaleFactorConfirmationsQuery } from 'src/_req-hook/sale_factor_confirmation/useSaleFactorConfirmationsQuery';

type Props = {
  id: number;
  createMode: boolean;
};

export default function InvoicesCreateView({ id }: Props) {
  const { data: currentInvoices } = useSaleFactorConfirmationsQuery({ id }, { enabled: !!id });

  const invoice = currentInvoices?.data?.items?.[0];
//  if (editMode) {}
  return (
    <Container>
      <InvoiceNewForm currentInvoice={invoice} createMode id={id} />
    </Container>
  );
}
