import { format } from 'date-fns';
// @mui
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fCurrency } from 'src/utils/format-number';
// types
import { IInvoice } from 'src/@types/invoice';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { Stack, Tooltip, Zoom } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  row: IInvoice;
  selected: boolean;
  onSelectRow: VoidFunction;
};

export default function CustomerTable({ row }: Props) {
  const { sent, createDate, dueDate, status, totalAmount } = row;

  return (
    <>
      <TableRow>
        <TableCell></TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Stack direction="row" spacing={1}>
            <Tooltip TransitionComponent={Zoom} title="دریافت PDF">
              <Button sx={{ minWidth: 20, bgcolor: 'red' }}>
                <Iconify
                  icon="mdi:delete"
                  sx={{ color: 'white' }}
                />
              </Button>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="ابطال">
              <Button sx={{ minWidth: 20, bgcolor: 'royalblue' }}>
                <Iconify icon="ri:edit-box-fill" width={18} sx={{ color: 'white' }} />
              </Button>
            </Tooltip>
            <Tooltip TransitionComponent={Zoom} title="اصلاح">
              <Button sx={{ minWidth: 20, bgcolor: 'green' }}>
                <Iconify icon="zondicons:exclamation-solid" width={18} sx={{ color: 'white' }} />
              </Button>
            </Tooltip>
          </Stack>
        </TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(createDate), 'dd MMM yyyy')}
            secondary={format(new Date(createDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              width: 110,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={format(new Date(dueDate), 'dd MMM yyyy')}
            secondary={format(new Date(dueDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              width: 110,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <Stack width={120}>{fCurrency(totalAmount)}</Stack>
        </TableCell>

        <TableCell align="center">
          <Stack width={120}>{sent}</Stack>
        </TableCell>

        <TableCell>
          <Stack width={120}>
            <Label
              variant="soft"
              color={
                (status === 'paid' && 'success') ||
                (status === 'pending' && 'warning') ||
                (status === 'overdue' && 'error') ||
                'default'
              }
            >
              {status}
            </Label>
          </Stack>
        </TableCell>
        <TableCell>
          <ListItemText
            primary={format(new Date(dueDate), 'dd MMM yyyy')}
            secondary={format(new Date(dueDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              width: 150,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell>
          <ListItemText
            primary={format(new Date(dueDate), 'dd MMM yyyy')}
            secondary={format(new Date(dueDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              width: 150,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        {/* <TableCell>
          <ListItemText
            primary={format(new Date(dueDate), 'dd MMM yyyy')}
            secondary={format(new Date(dueDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              width: 120,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell> */}
        <TableCell>
          {/* <ListItemText
            primary={format(new Date(dueDate), 'dd MMM yyyy')}
            secondary={format(new Date(dueDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              width: 150,

              component: 'span',
              typography: 'caption',
            }}
          /> */}
          <Stack width={150}></Stack>
        </TableCell>
      </TableRow>
    </>
  );
}
