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

export const StartupProfileEmployeesTable = (props: any) => {
  const { employees = [] } = props;

  function handleLinkedIn(link: string) {
    window.open(link, '_blank');
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
                  LinkedIn
                </TableCell>
                <TableCell>
                    Email 
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
                    <TableCell onClick={() => handleLinkedIn(employee.linkedIn)}>
                        <p style={{ cursor: 'pointer' }}>
                            {employee.linkedIn}
                        </p>
                    </TableCell>
                    <TableCell>
                        <a href={`mailto:${employee.email}`} rel="email">
                            {employee.email}
                        </a>
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
