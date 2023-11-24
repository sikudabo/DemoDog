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
import { Scrollbar } from './Sidenav/Sidenav';
import DemoDogButton from './DemoDogButton';
import { colors } from './colors';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const StartupEmployeesTable = (props: any) => {
  const { employees = [], sx } = props;

  return (
    <Card className="team-table-card">
      <CardHeader title="Team" />
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
                  Job
                </TableCell>
                <TableCell>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee: any) => {

                return (
                  <TableRow
                    hover
                    key={employee._id}
                  >
                    <TableCell>
                      <Avatar src={`http://192.168.1.215:2000/api/get-photo/${employee.avatar}`} alt={`${employee.firstName} ${employee.lastName} profile picture`} sx={{ height: 30, width: 30 }} />
                    </TableCell>
                    <TableCell onClick={() => console.log(employee)}>
                      {employee.firstName} {employee.lastName}
                    </TableCell>
                    <TableCell>
                        {employee.jobTitle}
                    </TableCell>
                    <TableCell>
                        <DemoDogButton 
                            buttonColor={colors.error}
                            text="DELETE"
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
