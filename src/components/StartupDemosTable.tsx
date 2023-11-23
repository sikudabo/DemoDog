import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import Switch from '@mui/material/Switch';
import { Scrollbar } from './Sidenav/Sidenav';
import DemoDogButton from './DemoDogButton';
import { colors } from './colors';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const StartupDemosTable = (props: any) => {
  const { demos = [], sx } = props;

  return (
    <Card className="demos-table-card">
      <CardHeader title="Demos" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Avatar
                </TableCell>
                <TableCell>
                  Employee
                </TableCell>
                <TableCell sortDirection="desc">
                  Public
                </TableCell>
                <TableCell>
                  Delete
                </TableCell>
                <TableCell>
                  Play
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demos.map((demo: any) => {

                return (
                  <TableRow
                    hover
                    key={demo.id}
                  >
                    <TableCell>
                      <Avatar src={demo.uploaderAvatar} alt="Employee avatar" sx={{ height: 30, width: 30 }} />
                    </TableCell>
                    <TableCell>
                      {demo.uploaderName}
                    </TableCell>
                    <TableCell>
                        <Switch color="secondary" defaultChecked />
                    </TableCell>
                    <TableCell>
                        <DemoDogButton 
                            buttonColor={colors.error}
                            text="DELETE"
                            isNormal
                        />
                    </TableCell>
                    <TableCell>
                        <DemoDogButton 
                            buttonColor={colors.salmonPink}
                            text="PLAY"
                            isNormal
                        />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};
