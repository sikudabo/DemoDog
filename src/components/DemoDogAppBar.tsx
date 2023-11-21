import { useMemo } from 'react';
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
`;

export default function DemoDogAppBar() {
    return (
        <StyledDemoDogAppBar isHidden={false}>
            <div className="logo-container">
                <IconButton
                    aria-label="Audio Swipe App Bar Menu Button"
                    className="menu-icon"
                    edge="start"
                    size="large"
                >
                    <MenuIcon />
                </IconButton>
                <DemoDogLogoIcon  height={70} logoColor={colors.navyBlue} width={70} />
                <p className="logo-container-text">
                    DemoDog 
                </p>
            </div>
            <div className="large-screen-links-container">
                <IconButton 
                    className="link"
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