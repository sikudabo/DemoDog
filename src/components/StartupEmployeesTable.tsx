import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { useQueryClient } from '@tanstack/react-query';
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
import { deleteData } from '../utils/requests';
import { useIsLoading, useShowDialog, useStartupCompanyData, useStartupEmployeeData } from '../hooks';
import { CompanyType } from '../hooks/useStartupCompanyData';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const StartupEmployeesTable = (props: any) => {
  const { employees = [], sx } = props;
  const { setIsLoading } = useIsLoading();
  const { handleDialogMessageChange, setIsError, setDialogMessage, setDialogTitle } = useShowDialog();
  const queryClient = useQueryClient();
  const { company } = useStartupCompanyData();
  const { _id: companyId } = company as CompanyType;
  const { employee } = useStartupEmployeeData();
  const { _id: employeeId } = employee as any;

  async function handleDelete(_id: string, avatar: string) {
    setIsLoading(true);
  
    await deleteData({
      data: {},
      endpoint: `api/delete-startup-employee/${_id}/${avatar}`,
    }).then(res => {
      const { isSuccess, message } = res;
      if (!isSuccess) {
        setIsLoading(false);
        setIsError(true);
        setDialogMessage(message);
        setDialogTitle('Error');
        handleDialogMessageChange(true);
        return;
      }

      queryClient.invalidateQueries(['get-company-stats-cards', companyId]);
      setIsLoading(false);

      setDialogMessage(message);
      setDialogTitle('Success');
      handleDialogMessageChange(true);

    })
  }

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
                      <Avatar src={`${process.env.REACT_APP_BASE_URI}api/get-photo/${employee.avatar}`} alt={`${employee.firstName} ${employee.lastName} profile picture`} sx={{ height: 30, width: 30 }} />
                    </TableCell>
                    <TableCell>
                      {employee.firstName} {employee.lastName}
                    </TableCell>
                    <TableCell>
                        {employee.jobTitle}
                    </TableCell>
                    <TableCell>
                        {employee._id === employeeId ? (
                          null
                        ): (
                          <DemoDogButton 
                            buttonColor={colors.error}
                            onClick={() => handleDelete(employee._id, employee.avatar)}
                            text="DELETE"
                            isNormal
                        />
                        )}
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
