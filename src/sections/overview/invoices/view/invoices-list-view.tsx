'use client';

import { Button, Container, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import React, { useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import InvoicesListsOurself from '../invoices-lists_ourself';
import InvoicesListsMoadian from '../invoices-lists_moadian';

export default function InvoicesListView() {
  const [status, setStatus] = useState('legal');
  const router = useRouter();

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <CustomBreadcrumbs
          heading="فاکتور ها"
          links={[{ name: 'خانه', href: paths.dashboard.root }, { name: 'فاکتور' }]}
        />
        {/* <Button
          variant="contained"
          color="primary"
          startIcon={<Icon icon="ph:plus-bold" />}
          onClick={() => {
            router.push(paths.dashboard.general.invoices.edit);
          }}
          >
          فاکتور جدید
        </Button> */}
      </Stack>
      <Stack spacing={2}>
        <RadioGroup row defaultValue="g">
          <FormControlLabel
            onChange={() => setStatus('legal')}
            checked={status === 'legal'}
            value="legal"
            control={<Radio size="medium" color="default" />}
            label={'خودمون'}
          />
          <FormControlLabel
            onChange={() => setStatus('individual')}
            checked={status === 'individual'}
            value="individual"
            control={<Radio size="medium" color="default" />}
            label={'مودیان'}
          />
        </RadioGroup>
        {status === 'legal' && <InvoicesListsOurself />}
        {status === 'individual' && <InvoicesListsMoadian />}
      </Stack>
    </Container>
  );
}
