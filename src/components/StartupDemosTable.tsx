import { useState } from 'react';
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
import Switch from '@mui/material/Switch';
import { Scrollbar } from './Sidenav/Sidenav';
import DemoDogButton from './DemoDogButton';
import { colors } from './colors';
import { deleteData, postNonBinaryData } from '../utils/requests';
import { CompanyType, useStartupCompanyData } from '../hooks/useStartupCompanyData';
import { useIsLoading, useShowDialog } from '../hooks';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const StartupDemosTable = (props: any) => {
  const { demos = [], sx } = props;
  const { company } = useStartupCompanyData();
  const { _id: companyId } = company as CompanyType;
  const queryClient = useQueryClient();
  const { setIsLoading } = useIsLoading();
  const { setDialogTitle, setIsError, setDialogMessage, handleDialogMessageChange } = useShowDialog();

  async function handleDeleteDemo(demoId: string, videoId: string) {
    setIsLoading(true);
    await deleteData({
      data: {},
      endpoint: `api/delete-demo/${demoId}/${videoId}`,
    }).then(res => {
      const { isSuccess, message } = res;
      if (!isSuccess) {
        setIsLoading(false);
        setDialogTitle('Error');
        setIsError(true);
        setDialogMessage(message);
        setIsLoading(false);
        handleDialogMessageChange(true);
        return;
      }

      queryClient.invalidateQueries(['get-company-stats-cards', companyId]);
      setIsLoading(false);

  }).catch(() => {
    setIsLoading(false);
    setDialogTitle('Error');
    setIsError(true);
    setDialogMessage('There was an error deleting that demo. Please try again!');
    setIsLoading(false);
    handleDialogMessageChange(true);
  })
}

  async function handlePrivacyChange(e: { target: { checked: boolean }}, _id: string) {
    setIsLoading(true);
    await postNonBinaryData({
      data: { _id, isPrivate: !e.target.checked},
      endpoint: 'api/demo-privacy-change',
    }).then(res => {  
      const { isSuccess, message } = res;
      if (!isSuccess) {
        setIsLoading(false);
        console.log('Error:', message);
      }

      queryClient.invalidateQueries(['get-company-stats-cards', companyId]);
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      console.log('Error:', err.message);
    });
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
                      <Avatar src={`http://192.168.1.215:2000/api/get-photo-by-id/${demo.uploaderId}`} alt="Employee avatar" sx={{ height: 30, width: 30 }} />
                    </TableCell>
                    <TableCell>
                      {demo.uploaderName}
                    </TableCell>
                    <TableCell>
                        {demo.demoName}
                    </TableCell>
                    <TableCell>
                        <Switch color="secondary" checked={!demo.private} onChange={(e) => handlePrivacyChange(e, demo._id)}/>
                    </TableCell>
                    <TableCell>
                        <DemoDogButton 
                            buttonColor={colors.error}
                            onClick={(() => handleDeleteDemo(demo._id, demo.videoId)) }
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
