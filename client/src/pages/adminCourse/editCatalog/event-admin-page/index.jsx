import { Grid } from '@mui/joy'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import base_url from '../../../../settings/base_url'
import ForumCard from '../../../events-page/components/Card'
import EventRequestTable from "./EventRequestTable";

const EventAdminPage = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const handleNavigate = ( id ) => {
        navigate(`/change-event/${id}`)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${base_url}/api/aml/event/getAllEvents`);
                setEvents(response.data); // set the state with data

            } catch (error) {
                console.error("Error fetching data:", error);

            }
        }
        fetchData()
    }, [])
    return (
        <div style={{width:'1400px'}}>
            <div>
                <EventRequestTable/>
            </div>
            <div>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={2}>
                        {events?.map(event => (
                            <Grid item xs={12} sm={6} md={6} key={event.id} onClick={() => handleNavigate(event.id)}>
                                <ForumCard imageSrc={event.coverImage} title={event.ru_name} date={event.startDate} location={event.location} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default EventAdminPage
