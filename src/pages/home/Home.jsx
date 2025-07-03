import React from 'react';
import Banner from './Banner';
import Services from './services/Services';
import ClientLogosMarquee from './clientLogosMarquee/ClientLogosMarquee';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
        </div>
    );
};

export default Home;