import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

export const CompaniesViewedOverview = (props: any) => {
  const { companies = [], sx } = props;

  return (
    <Card className="companies-viewed-card" elevation={10}>
      <CardHeader title="Companies that viewed you" />
      <List>
        {companies.map((company: any, index: number) => {
          const hasDivider = index < companies.length - 1;

          return (
            <ListItem
              divider={hasDivider}
              key={company.id}
            >
              <ListItemAvatar>
                {
                  company.image
                    ? (
                      <Box
                        component="img"
                        src={company.image}
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
