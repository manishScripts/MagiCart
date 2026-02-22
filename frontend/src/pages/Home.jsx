// import Nav from '../components/Nav.jsx';
import React, {useState} from 'react';
import Background from '../components/Background.jsx';
import Hero from '../components/Hero.jsx';
import LatestCollection from '../components/LatestCollection.jsx';
import BestSellers from '../components/BestSellers.jsx';
import OurPolicy from '../components/OurPolicy.jsx';
import Newsletter from '../components/NewLetter.jsx';
import Footer from '../components/Footer.jsx';
const Home = () =>{
    let heroData = [
        {text1: "30% OFF Limited Offer" , text2: "Style that Defines You"},
        {text1: "New Arrivals are Here" , text2: "Discover the Latest Trends"},
        {text1: "Exclusive Deals for You" , text2: "Shop More, Save More"}
    ]

    let [heroCount , setHeroCount] = useState(0);

    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
           {/* <Nav/> */}
           <div className="w-full min-h-[400px] sm:min-h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center relative overflow-hidden">
            <Background heroCount={heroCount} />
            <Hero heroCount={heroCount} setHeroCount={setHeroCount} heroData={heroData[heroCount]} slides={heroData} />
           </div>
           <LatestCollection/>
           <BestSellers/>
           <OurPolicy/>
           <Newsletter/>
           <Footer/>
        </div>
    )
}

export default Home;