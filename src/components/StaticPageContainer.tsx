import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from './colors';
import { deviceBreakPointsMaxWidth } from '../utils/constants';

type StaticPageContainerProps = {
    backgroundColor?: string;
    children: React.ReactNode;
};

const StaticPageCustomContainer = styled.div<{
    backgroundColor?: string;
}>`
    ${({ backgroundColor }) => css`
        background-color: ${backgroundColor ? backgroundColor : colors.white};
    `
    }
    
    height: 100%;
    margin-top: 0;
    padding: 0;
    width: 100vw;

    /* This handles a header that might be at the top of the page */
    .top-page-header {
        padding-bottom: 20px;
        text-align: center;
        width: 100%;

        .top-page-header-title {
            color: ${colors.white};
            font-size: 40px;
            font-weight: 900;

            ${({ backgroundColor }) => css`
                    color: ${backgroundColor === colors.white || !backgroundColor ? colors.black : colors.white };
                `
            }

            @media ${deviceBreakPointsMaxWidth.mobileL} {
                font-size: 30px;
            }
        }

    }

    .two-column-large-screen-section {
        display: flex;
        flex-direction: row;
        width: 100%;

        /* Make this display as a column if it is on a tablet or smaller device */
        @media ${deviceBreakPointsMaxWidth.laptop} {
            flex-direction: column;
        }

        .words-section-container {
            display: flex;
            flex-direction: column;
            padding-left: 20px;
            width: 50%;

            @media ${deviceBreakPointsMaxWidth.laptop} {
                width: 100%;
            }

            .words-section-title {
                color: ${colors.white};
                font-size: 20px;
                font-weight: normal;
            }

            .words-section-bold-text {
                color: ${colors.white};
                font-size: 30px;
                font-weight: 900;
            }

            .words-section-cta-button-container {
                padding-bottom: 20px;
                padding-top: 10px;
                width: 100%;

                @media ${deviceBreakPointsMaxWidth.laptop} {
                    padding-right: 10px;
                }

                .btn {

                    width: 100px;

                    @media ${deviceBreakPointsMaxWidth.laptop} {
                        width: 100%;
                    }
                }
            }

            .words-section-cta-buttons-container {
                display: flex;
                flex-direction: row;
                width: 100%;

                .second-cta-button {
                    margin-left: 10px;
                }
            }
        }

        .img-section-container {
            width: 50%;

            @media ${deviceBreakPointsMaxWidth.laptop} {
                padding-left: 0;
                padding-right: 0;
                width: 100%;
            }

            img {
                height: 100%;
                width: 100%;
            }
        }
    }
`;

export const TwoColumnLargeScreenSection = styled.div<{
    backgroundColor?: string;
}>`
    background-color: ${colors.white};

    ${({ backgroundColor }) => css`
        background-color: ${backgroundColor ? backgroundColor : colors.white};
    `}
`;

export const SectionTitleHeader = styled.div<{
    backgroundColor?: string;
}>`
    background-color: ${colors.white};
    padding-bottom: 20px;
    text-align: center;
    width: '100%';

    ${({ backgroundColor }) => css`
        background-color: ${backgroundColor? backgroundColor : colors.white};
        color: ${!backgroundColor || backgroundColor === colors.white ? colors.black : colors.white};
    `}

    .section-title-header-text {
        margin-top: 0px;
        font-size: 40px;
        font-weight: 900;
    }
`;

export const ResponsiveImageRow = styled.div<{
    backgroundColor?: string;
}>`
    background-color: ${colors.white};
    display: flex;
    flex-direction: row;
    gap: 20px;
    width: '100%';

    ${({ backgroundColor }) => css`
        background-color: ${backgroundColor ? backgroundColor : colors.white};
    `}

    @media ${deviceBreakPointsMaxWidth.tablet} {
        flex-direction: column;
        align-items: center;
    }

    .section {
        align-items: center;
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 20px;
        padding-left: 20px;
        width: 25%;

        @media ${deviceBreakPointsMaxWidth.tablet} {
            align-items: center;
            justify-content: center;
        }

        .section-header-text {
            color: ${colors.white};
            font-size: 30px;
            font-weight: 700;

            ${({ backgroundColor }) => css`
                color: ${backgroundColor === colors.white ||!backgroundColor ? colors.black : colors.white };
            `}
        }

        .img-section {
            height: 100px;
            width: 100px;

            @media ${deviceBreakPointsMaxWidth.tablet} {
                height: 200px;
                width: 100%;
            }

            img {
                height: 100%;
                width: 100%;
            }
        }
    }
`;

export default function StaticPageContainer({ backgroundColor, children }: StaticPageContainerProps) {
    return (
        <StaticPageCustomContainer backgroundColor={backgroundColor}>
            {children}
        </StaticPageCustomContainer>
    );
}