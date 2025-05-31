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
        <section className='second-section' style={{
            background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Add decorative background elements */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23cbd5e1" fill-opacity="0.1"%3E%3Ccircle cx="5" cy="5" r="2"/%3E%3Ccircle cx="55" cy="55" r="2"/%3E%3Ccircle cx="55" cy="5" r="2"/%3E%3Ccircle cx="5" cy="55" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                zIndex: 1
            }} />
            
            {/* Content with proper z-index */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                {/* <EventsComponent /> */}
                <div style={{ paddingTop: '4rem' }} />
                <CoursesComponent />
                <ThirdComponent />
                <LearningFormat />
                <NewsComponent />
                <FormComponent />
                <PartnersComponent />
            </div>
        </section>
    );
};

export default SecondSection;
