import styled from '@emotion/styled';
import { colors } from '../../components';
import { DemoDogLogoIcon } from '../../components/icons';
import { deviceBreakPointsMaxWidth } from '../../utils/constants';

const FooterContainer = styled.div`
    background-color: ${colors.navyBlue};
    margin-top: -20px;
    padding-left: 10px;
    width: 100%;

    .icon-container {
        align-items: center;
        display: flex;
        justify-content: center;
        flex-direction: row;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            flex-direction: column;
            padding-bottom: 10px;
        }

        .footer-logo-text {
            color: ${colors.white};
            font-family: Pacifico;
            font-size: 40px;
            font-weight: normal;
        }
    }

    .links-container {
        align-items: center;
        display: flex;
        gap: 10px;
        flex-direction: row;
        justify-content: center;
        padding-bottom: 50px;
        padding-left: 20px;
        spacing: 10px;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            flex-direction: column;
        }

        .link {
            color: ${colors.white};
            cursor: pointer;
            font-size: 20px;
            font-weight: 900;
            margin-left: 20px;
            text-decoration: none;

            @media ${deviceBreakPointsMaxWidth.tablet} {
                margin-left: 0;
            }
        }

        .link:visited {
            color: ${colors.white};
        }

        .link:hover {
            color: ${colors.white};
        }
    }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <div className="icon-container">
                <DemoDogLogoIcon
                    height={200}
                    logoColor={colors.white}
                    width={200}
                />
                <div className="footer-logo-text">
                    DemoDog
                </div>
            </div>
            <div className="links-container">
                <a className="link" href="https://www.linkedin.com/in/simeon-ikudabo-562542117/">
                    LinkedIn
                </a>
                <a className="link">
                    Sign Up 
                </a>
                <a className="link">
                    Sign In 
                </a>
                <a className="link">
                    Contact 
                </a>
            </div>
        </FooterContainer>
    );
}

