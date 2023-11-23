import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { styled as makeStyle } from '@mui/material/styles';
import { SideNav } from '../Sidenav';
import { TopNav } from '../TopNav/TopNav';
import { deviceBreakPointsMaxWidth, deviceBreakPointsMinWidth } from '../../utils/constants';

const SIDE_NAV_WIDTH = 280;

const CustomLayoutRoot = styled.div`
    display: flex;
    height: 100%;
    overflow: scroll;
    width: 100vw;
    @media ${deviceBreakPointsMinWidth.laptopL} {
        padding-left: ${SIDE_NAV_WIDTH}px;
    }
`;

const LayoutRoot = makeStyle('div')(({ theme }: any) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = makeStyle('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
});

export const Layout = (props: any) => {
    const { children } = props;
    const { pathname } = useLocation();
    const [openNav, setOpenNav] = useState(false);
  
    const handlePathnameChange = useCallback(
      () => {
        if (openNav) {
          setOpenNav(false);
        }
      },
      [openNav]
    );
  
    useEffect(
      () => {
        handlePathnameChange();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [pathname]
    );
  
    return (
      <>
        <TopNav onNavOpen={() => setOpenNav(true)} />
        <SideNav
          onClose={() => setOpenNav(false)}
          open={openNav}
        />
        <CustomLayoutRoot>
          <LayoutContainer>
            {children}
          </LayoutContainer>
        </CustomLayoutRoot>
      </>
    );
  };

