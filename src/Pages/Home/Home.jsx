import Banner from './Banner';
import Features from './Features';
import CallToActionSection from './CallToActionSection';
import CategorySection from './CategorySection';
import AboutUsSection from './AboutUsSection';
import Help from './Help';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CategorySection></CategorySection>
            <CallToActionSection></CallToActionSection>
            <Help></Help>
           <Features></Features>
           <AboutUsSection></AboutUsSection>
            
        </div>
    );
};

export default Home;