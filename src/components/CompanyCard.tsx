import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { DemoDogButton } from '../components';


export type CompanyType = {
    avatar: string;
    category: string;
    companyEmail: string;
    companyName: string;
    companyUrl: string;
    createdAt: Date;
    demos: Array<string>;
    description: string;
    profileViews: Array<string>;
    _id: string;
};

export const CompanyCard = ({
    avatar,
    companyEmail,
    companyName,
    description,
    _id,
}: CompanyType) => {

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={`http://192.168.1.215:2000/api/get-photo/${avatar}`}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {companyName}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
        
          <DemoDogButton text="View Profile" variant="outlined" />
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            {companyEmail}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
