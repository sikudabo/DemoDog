import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import ContactIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SignUpIcon from '@mui/icons-material/AppRegistration';
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { DemoDogLogoIcon } from './icons';
import { colors } from './colors';
import { deviceBreakPointsMaxWidth } from '../utils/constants';
import { useOrganizationData } from '../hooks';

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
    const { organization, setOrganization } = useOrganizationData();
    const { pathname } = useLocation();

    function handleLogout() {
        setOrganization({} as any);
        navigate('/');
    }

    useEffect(() => {
        setIsDrawerOpen(false);
    }, [pathname]);

    const isHidden = useMemo(() => {
        if (pathname.includes('dashboard')) {
            return true;
        }

        return false;
    }, [pathname]);

    const shouldDisplayNav = useMemo(() => {
        console.log('The organization is:', organization);
        if (typeof organization === 'undefined' || typeof (organization as any).password === 'undefined') {
            return true
        }

        return false
    }, [organization]);

    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <StyledDemoDogAppBar isHidden={isHidden}>
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
                        {shouldDisplayNav ? (
                            <List className="drawer-list">
                                <ListItem onClick={() => navigate('sign-up-decision')}>
                                    <ListItemButton style={{ color: colors.white }}>
                                        <ListItemText className="drawer-text" primary="Sign Up" style={{ fontWeight: '900' }} />
                                        <SignUpIcon className="drawer-icon" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem onClick={() => navigate('sign-in')}>
                                    <ListItemButton style={{ color: colors.white }}>
                                        <ListItemText className="drawer-text" primary="Sign In" style={{ fontWeight: '900' }} />
                                        <LoginIcon className="drawer-icon" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('contact')} style={{ color: colors.white }}>
                                        <ListItemText className="drawer-text" primary="Contact" style={{ fontWeight: '900' }} />
                                        <ContactIcon className="drawer-icon" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => window.open('https://www.linkedin.com/company/demodog?trk=public_profile_experience-item_profile-section-card_subtitle-click')} style={{ color: colors.white }}>
                                        <ListItemText className="drawer-text" primary="LinkedIn" style={{ fontWeight: '900' }} />
                                        <LinkedInIcon className="drawer-icon" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => navigate('/search-companies')} style={{ color: colors.white }}>
                                        <ListItemText className="drawer-text" primary="Search" style={{ fontWeight: '900' }} />
                                        <SearchIcon className="drawer-icon" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        ): (
                            <ListItem onClick={handleLogout}>
                                <ListItemButton style={{ color: colors.white }}>
                                    <ListItemText className="drawer-text" primary="Log out" style={{ fontWeight: '900' }} />
                                    <LoginIcon className="drawer-icon" />
                                </ListItemButton>
                            </ListItem>
                        )}
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
                {shouldDisplayNav ? (
                    <>
                        <IconButton 
                            className="link"
                            onClick={() => navigate('sign-up-decision')}
                            disableRipple
                        >
                            Sign Up 
                        </IconButton>
                        <IconButton 
                            className="link-after"
                            onClick={() => navigate('sign-in')}
                            disableRipple
                        >
                            Sign In
                        </IconButton>
                        <IconButton 
                            className="link"
                            onClick={() =>  navigate('/search-companies')}
                            disableRipple
                        >
                            Search
                        </IconButton>
                        <IconButton 
                            className="link-after"
                            onClick={() => navigate('/contact')}
                            disableRipple
                        >
                            Contact Us 
                        </IconButton>
                        <IconButton 
                            className="link-after"
                            onClick={() => window.open('https://www.linkedin.com/company/demodog?trk=public_profile_experience-item_profile-section-card_subtitle-click')}
                            disableRipple
                        >
                            LinkedIn 
                        </IconButton>
                    </>): (
                        <IconButton 
                            className="link"
                            onClick={handleLogout}
                            disableRipple
                        >
                            Log out
                        </IconButton>
                    )}
            </div>
        </StyledDemoDogAppBar>
    );
}