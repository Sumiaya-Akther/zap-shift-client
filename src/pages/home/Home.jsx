import React from 'react';
import Banner from './Banner';
import Services from './services/Services';
import ClientLogosMarquee from './clientLogosMarquee/ClientLogosMarquee';
import Benefits from './benefets/Benefits';
import BeMerchant from './beMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Benefits></Benefits>
            <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;