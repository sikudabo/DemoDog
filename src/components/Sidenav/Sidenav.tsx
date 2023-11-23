import { useLocation, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';
import { DemoDogLogoIcon } from '../icons';
import { items } from './Items/items';
import { SideNavItem } from './Items/SideNavItem';
import { colors } from '../colors';
const AnimaLogo = require('../../static-site-images/anima_logo.jpeg');
export const Scrollbar = styled(SimpleBar)``;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
  });

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    [theme.breakpoints.up('lg')]: {
      paddingTop:  0,
      paddingLeft: 0,
      paddingRight: 0,
    },
  }));

export const SideNav = (props: { open: any; onClose: any; }) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const { pathname } = useLocation();

  const content = (
    <Scrollbar
      sx={{
        backgroundColor: colors.salmonPink,
        height: '100vh',
        overflow: 'auto',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            component="div"
          >
            {/* <DemoDogLogoIcon height={70} logoColor={colors.white} width={70} /> */}
            <img  alt="Company logo" src={AnimaLogo} height={70} width={70} />
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: colors.salmonPink,
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 2,
              p: '12px'
            }}
          >
            <div>
              <Typography
                color="inherit"
                variant="subtitle1"
              >
                Anima
              </Typography>
            </div>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item: any) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: colors.white,
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <StyledRoot>
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                backgroundColor: 'neutral.800',
                color: 'common.white',
                width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
        <Main>
            <Outlet />
        </Main>
    </StyledRoot>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
