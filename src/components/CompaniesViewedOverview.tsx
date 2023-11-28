import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { OrganizationType } from '../typings/OrganizationType';

export const CompaniesViewedOverview = (props: any) => {
  const { companies = [] } = props;

  return (
    <Card className="companies-viewed-card" elevation={10}>
      <CardHeader title="Companies that viewed you" />
      <List>
        {companies.map((company: OrganizationType, index: number) => {
          const hasDivider = index < companies.length - 1;

          return (
            <ListItem
              divider={hasDivider}
              key={company._id}
            >
              <ListItemAvatar>
                {
                  company.avatar
                    ? (
                      <Box
                        component="img"
                        src={`http://192.168.1.215:2000/api/get-photo/${company.avatar}`}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={company.name}
                secondary={company.email}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};
