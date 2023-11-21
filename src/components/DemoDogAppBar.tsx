import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ContactIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MenuIcon from '@mui/icons-material/Menu';
import SignUpIcon from '@mui/icons-material/AppRegistration';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Collapse,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';
import { DemoDogLogoIcon } from './icons';
import { colors } from './colors';
import { deviceBreakPointsMaxWidth } from '../utils/constants';

const StyledDemoDogAppBar = styled(AppBar)<{
    isHidden: boolean;
}>`
    ${({ isHidden }) => css`
        display: ${isHidden ? 'none' : 'flex'};
    `}
    align-items: center;
    background-color: ${colors.white};
    flex-direction: row;
    width: 100vw;

    .menu-icon {
        display: none;
        margin-right: auto;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            color: ${colors.navyBlue};
            display: block;
        }
    }

    .logo-container {
        align-items: center;
        cursor: pointer;
        display: flex;
        margin-right: auto;
        padding-left: 10px;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            margin-right: 10px;
        }

        .logo-container-text {
            color: ${colors.navyBlue};
            font-family: Pacifico;
            font-size: 20px;
            font-weight: 900;
        }
    }

    .large-screen-links-container {
        display: block;
        margin-right: 30px;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            display: none;
        }

        .link {
            color: ${colors.navyBlue};
            cursor: pointer;
        }

        .link-after {
            color: ${colors.navyBlue};
            cursor: pointer;
            margin-left: 10px;
        }
    }

    .drawer-navigation-presentation-layer {
        @media ${deviceBreakPointsMaxWidth.laptop} {
            display: none;
        }
        display: none;

        background-color: ${colors.navyBlue};
        opacity: 0.5;
        width: 100%;
        
        .drawer-list {
            width: 100vw;
            .drawer-text {
                color: ${colors.white};
                font-weight: 900;
            }
            .drawer-icon {
                color: ${colors.white};
            }
        }
    }
`;

export default function DemoDogAppBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        setIsDrawerOpen(false);
    }, [pathname]);

    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <StyledDemoDogAppBar isHidden={false}>
            <div className="logo-container">
                <IconButton
                    aria-label="Audio Swipe App Bar Menu Button"
                    className="menu-icon"
                    edge="start"
                    onClick={toggleDrawer}
                    size="large"
                >
                    <MenuIcon />
                </IconButton>
                {/* Add the code for the drawer for small screen devices here */}
                <Drawer 
                    anchor="left"
                    aria-label="DemoDog navigation drawer"
                    open={isDrawerOpen}
                    onClose={toggleDrawer}
                >
                    <Box 
                        aria-label="DemoDog navigation drawer presentation layer"
                        className="drawer-navigation-presentation-layer"
                        role="Presentation"
                        style={{
                            backgroundColor: colors.navyBlue,
                            opacity: 0.9,
                            height: '100vh',
                            width: 200,
                            overflow: 'scroll',
                        }}
                    >
                        <List className="drawer-list">
                            <ListItem onClick={() => navigate('sign-up')}>
                                <ListItemButton style={{ color: colors.white }}>
                                    <ListItemText className="drawer-text" primary="Sign Up" style={{ fontWeight: '900' }} />
                                    <SignUpIcon className="drawer-icon" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton style={{ color: colors.white }}>
                                    <ListItemText className="drawer-text" primary="Sign In" style={{ fontWeight: '900' }} />
                                    <LoginIcon className="drawer-icon" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton style={{ color: colors.white }}>
                                    <ListItemText className="drawer-text" primary="Contact" style={{ fontWeight: '900' }} />
                                    <ContactIcon className="drawer-icon" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem>
                                <ListItemButton style={{ color: colors.white }}>
                                    <ListItemText className="drawer-text" primary="LinkedIn" style={{ fontWeight: '900' }} />
                                    <LinkedInIcon className="drawer-icon" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                {/* End of the navigation drawer for small screen devices here */}
                <div onClick={() => navigate('/')} style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 0 }}>
                    <DemoDogLogoIcon  height={70} logoColor={colors.navyBlue} width={70} />
                    <p className="logo-container-text">
                        DemoDog 
                    </p>
                </div>
            </div>
            <div className="large-screen-links-container">
                <IconButton 
                    className="link"
                    onClick={() => navigate('/sign-up')}
                    disableRipple
                >
                    Sign Up 
                </IconButton>
                <IconButton 
                    className="link-after"
                    disableRipple
                >
                    Login 
                </IconButton>
                <IconButton 
                    className="link-after"
                    disableRipple
                >
                    Contact Us 
                </IconButton>
                <IconButton 
                    className="link-after"
                    disableRipple
                >
                    LinkedIn 
                </IconButton>
            </div>
        </StyledDemoDogAppBar>
    );
}