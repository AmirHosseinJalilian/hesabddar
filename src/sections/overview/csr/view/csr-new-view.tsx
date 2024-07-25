'use client';

import { Button, Container, Stack } from '@mui/material';
import React from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import CSRNew from '../csr-new';

export default function CSRNewView() {
  const router = useRouter();
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <CustomBreadcrumbs
          heading="فاکتور ها"
          links={[{ name: 'خانه', href: paths.dashboard.root }, { name: 'CSR' }]}
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
      <CSRNew />
    </Container>
  );
}
