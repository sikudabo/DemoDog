import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import truncate from 'lodash/truncate';
import { useNavigate } from 'react-router-dom';
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
    inLikes: Array<any>;
    profileViews: Array<string>;
    _id: string;
};

export const CompanyCard = ({
    avatar,
    className,
    companyEmail,
    companyName,
    description,
    _id,
}: CompanyType & { className: string }) => {

    const navigate = useNavigate();

    function handleNavigation(_id: string) {
        navigate(`/startup-profile/${_id}`);
    }

  return (
    <Card
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 500,
        overflow: 'auto',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3,
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
            align="left"
            color="textSecondary"
            variant="body2"
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
        
          <DemoDogButton text="View Profile" onClick={() => handleNavigation(_id)} isOutlined />
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
          <a
            href={`mailto:${companyEmail}`}
          >
            {truncate(companyEmail, { length: 20 })}
          </a>
        </Stack>
      </Stack>
    </Card>
  );
};
