import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import advancedCourseImg from '../../assets/svg/advanced_course.svg';
import baseCourseImg from '../../assets/svg/base_course.svg';
import profileCourseImg from '../../assets/svg/profile_course.svg';
import tematicCourseImg from '../../assets/svg/tematic_course.svg';
import Card from '../courses-card';
import SectionTitles from '../section-titles';
import './style.css';

const CoursesComponent = () => {
    const [courses, setCourses] = useState([]);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const isKazakh = i18n.language === 'kz';
        const fetchedCourses = [
            { name: t('core'), imageSrc: baseCourseImg, courseId: isKazakh ? 81 : 8 },
            { name: t('specialized'), imageSrc: profileCourseImg, courseId: '#top' },
            { name: t('advanced'), imageSrc: advancedCourseImg, courseId: '#top' },
            { name: t('thematic'), imageSrc: tematicCourseImg, courseId: '#top' }
        ];

        setCourses(fetchedCourses);
    }, [t, i18n.language]);

    return (
        <div>
            <SectionTitles title={t('Courses in the field of')}/>
            <div className='courses-grid-wrapper'>
                <div className="courses-grid">
                    {courses.slice(-4).map((course, index) => (
                        <Card key={index} name={course.name} imageSrc={course.imageSrc} courseId={course.courseId} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursesComponent;
