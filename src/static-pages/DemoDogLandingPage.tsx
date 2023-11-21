import { SectionTitleHeader, ResponsiveImageRow, TwoColumnLargeScreenSection } from "../components/StaticPageContainer";
import { DemoDogButton, StaticPageContainer, colors } from "../components";
const EducationImage = require('../static-site-images/education.jpeg');
const HealthCareImage = require('../static-site-images/healthcare.jpeg');
const InvestorsImage = require('../static-site-images/investors.jpeg');
const MobileAppsImage = require('../static-site-images/mobile_apps.jpeg');
const LightBulbImage = require('../static-site-images/lightbulb.jpeg');
const TeamworkImage = require('../static-site-images/teamwork.jpeg');
const NavigateImage = require('../static-site-images/navigate.jpeg');
const SaasImage = require('../static-site-images/saas.jpeg');
const StartupsImage = require('../static-site-images/startups.jpeg');
const StartupsAlt = require('../static-site-images/startups2.jpeg')

export default function DemoDogLandingPage() {
    return (
        <StaticPageContainer backgroundColor={colors.white}>
            <TwoColumnLargeScreenSection backgroundColor={colors.navyBlue} className="two-column-large-screen-section">
                <div className="words-section-container" style={{ paddingLeft: 10, paddingTop: 100 }}>
                    <div className="words-section-title">
                        Our Mission
                    </div>
                    <div className="words-section-bold-text">
                        Enabling organizations to create and find 
                        new products & services that make a meaningful impact. 
                        We help you build, become discovered, and discover 
                        new tools that benefit your team.
                    </div>
                    <div className="words-section-cta-button-container">
                        <DemoDogButton 
                            buttonColor={colors.salmonPink}
                            className="btn"
                            text="Sign Up"
                            isNormal 
                        />
                    </div>
                </div>
                <div className="img-section-container">
                    <img alt="Mobile apps" aria-label="DemoDog mobile applications image" src={MobileAppsImage} />
                </div>
            </TwoColumnLargeScreenSection>
            <SectionTitleHeader backgroundColor={colors.white} style={{ marginTop: -30, paddingTop: 10 }}>
                <h1 className="section-title-header-text">
                    Our Values 
                </h1>
            </SectionTitleHeader>
            <ResponsiveImageRow backgroundColor={colors.white}>
                <div className="section">
                    <div className="section-header-text">
                        Teamwork
                    </div>
                    <div className="img-section">
                        <img aria-label="DemoDog teamwork image" src={TeamworkImage} />
                    </div>
                </div>
                <div className="section">
                    <div className="section-header-text">
                        Creativity 
                    </div>
                    <div className="img-section">
                        <img aria-label="DemoDog Light bul b image" src={LightBulbImage} />
                    </div>
                </div>
                <div className="section">
                    <div className="section-header-text">
                        Navigate
                    </div>
                    <div className="img-section">
                        <img aria-label="DemoDog Navigate image" src={NavigateImage} />
                    </div>
                </div>
            </ResponsiveImageRow>
            <TwoColumnLargeScreenSection backgroundColor={colors.salmonPink} className="two-column-large-screen-section">
                <div className="img-section-container">
                    <img aria-label="DemoDog plugin Image" src={StartupsAlt} />
                </div>
                <div className="words-section-container" style={{ paddingTop: 20 }}>
                    <div className="words-section-title">
                        How we help startups
                    </div>
                    <div className="words-section-bold-text">
                        We enable startups to build MVP's of their 
                        products or new features. We give you a platform 
                        to demo those products to potential customers and 
                        investors. We launch you to success. 
                    </div>
                    <div className="words-section-cta-button-container">
                        <DemoDogButton 
                            buttonColor={colors.navyBlue}
                            className="btn"
                            text="Sign Up"
                            isNormal 
                        />
                    </div>
                </div>
            </TwoColumnLargeScreenSection>
            <SectionTitleHeader backgroundColor={colors.white} style={{ paddingTop: 30 }}>
                <h1 className="section-title-header-text">
                    Industries
                </h1>
            </SectionTitleHeader>
            <ResponsiveImageRow backgroundColor={colors.white}>
                <div className="section">
                    <div className="section-header-text">
                        Healthcare
                    </div>
                    <div className="img-section">
                        <img aria-label="DemoDog Healthcare image" src={HealthCareImage} />
                    </div>
                </div>
                <div className="section">
                    <div className="section-header-text">
                        Startups 
                    </div>
                    <div className="img-section">
                        <img alt="DemoDog startups" aria-label="DemoDog Startups image" src={StartupsImage} />
                    </div>
                </div>
                <div className="section">
                    <div className="section-header-text">
                        Education 
                    </div>
                    <div className="img-section">
                        <img aria-label="DemoDog Education Image" src={EducationImage} />
                    </div>
                </div>
                <div className="section">
                    <div className="section-header-text">
                        SaaS
                    </div>
                    <div className="img-section">
                        <img aria-label="DemoDog SaaS Image" src={SaasImage} />
                    </div>
                </div>
            </ResponsiveImageRow>
            <TwoColumnLargeScreenSection className="two-column-large-screen-section">
                <div className="words-section-container" style={{ paddingTop: 20 }}>
                    <div className="words-section-title" style={{ color: colors.black }}>
                        How we help organizations and investors
                    </div>
                    <div className="words-section-bold-text" style={{ color: colors.black }}>
                        Organizations and investment firms are always adapting.
                        Organizations can reduce SaaS costs and improve efficiency 
                        with our catalog of new & hot companies. Investors can find the next 
                        generation of SaaS companies to maximize returns. 
                    </div>
                    <div className="words-section-cta-button-container">
                        <DemoDogButton 
                            buttonColor={colors.aqua}
                            className="btn"
                            text="Sign Up"
                            isNormal 
                        />
                    </div>
                </div>
                <div className="img-section-container">
                    <img aria-label="DemoDog Investors Image" src={InvestorsImage} />
                </div>
            </TwoColumnLargeScreenSection>
        </StaticPageContainer>
    );
}