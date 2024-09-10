import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import base_url from '../../settings/base_url';
import BlurredCard from '../events-page/components/event-carousel';

const EventPage = () => {
    const [uncomingEvents, setUncomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getUncomingEvents`);
                setUncomingEvents(response.data); // set the state with data
                console.log(response.data); // logs the data array
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getEventById`,{headers:{ params : {id}}});
                setUncomingEvents(response.data); // set the state with data
                console.log(response.data); // logs the data array
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return (
            <div>
                loading...
            </div>
        )
    } else {
        return (
            <div style={{maxWidth:'1200px', margin:'0 auto'}}>
                <Header dark={true} style={{ zIndex:1000 }}/>
                <BlurredCard backgroundImage={uncomingEvents[1].coverImage} logoSrc={uncomingEvents[1].logoImage} title={uncomingEvents[1].ru_name}
                    date="18-20 августа 2024"
                    location="Астана, Казахстан"
                    description={uncomingEvents[1].ru_description}
                />
                <Footer/>
            </div>
        )
    }
}

export default EventPage
