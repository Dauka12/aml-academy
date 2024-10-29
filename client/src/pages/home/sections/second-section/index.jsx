import React from 'react';
import CoursesComponent from '../../components/courses-component';
// import EventsComponent from '../../components/event-component';
import FormComponent from '../../components/form-component';
import LearningFormat from '../../components/learning-format';
import NewsComponent from '../../components/news-component';
import PartnersComponent from '../../components/partners-component';
import ThirdComponent from '../../components/third-component';
import './style.css';

const SecondSection = () => {
    
    return (
        <section className='second-section'>
            {/* <EventsComponent /> */}
            <br /><br /><br />
            <CoursesComponent />
            <ThirdComponent />
            <LearningFormat />
            <NewsComponent />
            <FormComponent />
            <PartnersComponent />
        </section>
    );
};

export default SecondSection;
