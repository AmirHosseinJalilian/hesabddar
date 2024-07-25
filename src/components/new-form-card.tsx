import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import Iconify from './iconify';

interface NewFormCardProps {
  children: ReactNode;
  disable?: any;
  loading?: any;
}

export default function NewFormCard(props: NewFormCardProps) {
  const { children, disable, loading } = props;
  const router = useRouter();
  return (
    <Card sx={{ p: 3, border: '1px solid', borderColor: 'primary.main' }}>
      <Box sx={{ p: 2 }}>{children}
      <Stack
       alignItems="center" justifyContent='center' spacing={3} direction="row" sx={{ mt: 3 }}
      >
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={disable}
          loading={loading}
          type="submit"
        >
          <Stack spacing={1} direction="row" alignItems="center">
            <Iconify icon="ph:plus-fill" />
            افزودن
          </Stack>
        </LoadingButton>
        <Button variant="contained" onClick={() => router.back()} color="secondary">
          <Stack spacing={1} direction="row" alignItems="center">
            <Iconify icon="fa6-solid:xmark" />
            انصراف
          </Stack>
        </Button>
      </Stack>
      </Box>
    </Card>
  );
}
