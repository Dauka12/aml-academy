import React from 'react';
import news1 from '../../assets/svg/news1.svg';
import news2 from '../../assets/svg/news2.svg';
import news3 from '../../assets/svg/news3.svg';
import CoursesComponent from '../../components/courses-component';
// import EventsComponent from '../../components/event-component';
import FormComponent from '../../components/form-component';
import LearningFormat from '../../components/learning-format';
import NewsComponent from '../../components/news-component';
import PartnersComponent from '../../components/partners-component';
import ThirdComponent from '../../components/third-component';
import './style.css';

const SecondSection = () => {
    const testData = [
        {
            id: 1,
            title: 'Новость 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: '04 июнь 2024',
            imageUrl: news2,
        },
        {
            id: 2,
            title: 'Новость 2',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '07 июнь 2024',
            imageUrl: news2,
        },
        {
            id: 3,
            title: 'Новость 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: '08 июнь 2024',
            imageUrl: news1,
        },
        {
            id: 4,
            title: 'Новость 4',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '09 июнь 2024',
            imageUrl: news3,
        },
        {
            id: 5,
            title: 'Новость 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            date: '07 июнь 2024',
            imageUrl: news2,
        },
        {
            id: 6,
            title: 'Новость 6',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            date: '07 июнь 2024',
            imageUrl: news3,
        },
    ];

    return (
        <section className='second-section'>
            {/* <EventsComponent /> */}
            <br /><br /><br />
            <CoursesComponent />
            <ThirdComponent />
            <LearningFormat />
            <NewsComponent news={testData} />
            <FormComponent />
            <PartnersComponent />
        </section>
    );
};

export default SecondSection;
