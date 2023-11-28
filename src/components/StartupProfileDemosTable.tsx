import { useNavigate } from 'react-router-dom';
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
import Switch from '@mui/material/Switch';
import { Scrollbar } from './Sidenav/Sidenav';
import DemoDogButton from './DemoDogButton';
import { colors } from './colors';
import { deleteData, postNonBinaryData } from '../utils/requests';
import { CompanyType, useStartupCompanyData } from '../hooks/useStartupCompanyData';
import { useIsLoading, useShowDialog } from '../hooks';

export const StartupProfilesDemosTable = (props: any) => {
  const { demos = [] } = props;
  let filteredDemos = demos.filter((demo: { private: boolean; }) => !demo.private);
  const navigate = useNavigate();
  const { company } = useStartupCompanyData();
  const { _id: companyId } = company as CompanyType;
  const queryClient = useQueryClient();
  const { setIsLoading } = useIsLoading();
  const { setDialogTitle, setIsError, setDialogMessage, handleDialogMessageChange } = useShowDialog();


function handleNavigate(id: string) {
  navigate(`/demo-video-profile-page/${id}`);
}

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
                <TableCell>
                    Demo Name
                </TableCell>
                <TableCell>
                  Play
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDemos.map((demo: any) => {

                return (
                  <TableRow
                    hover
                    key={demo.id}
                  >
                    <TableCell>
                      <Avatar src={`${process.env.REACT_APP_BASE_URI}api/get-photo-by-id/${demo.uploaderId}`} alt="Employee avatar" sx={{ height: 30, width: 30 }} />
                    </TableCell>
                    <TableCell>
                      {demo.uploaderName}
                    </TableCell>
                    <TableCell>
                        {demo.demoName}
                    </TableCell>
                    <TableCell>
                        <DemoDogButton 
                            buttonColor={colors.salmonPink}
                            onClick={() => handleNavigate(demo.videoId)}
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
