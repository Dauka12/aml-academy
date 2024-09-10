import axios from 'axios';
import React, { useEffect, useState } from 'react';
import base_url from '../../../../settings/base_url';

const AddToCourse = () => {
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [courseDropdownVisible, setCourseDropdownVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedCourses, setSelectedCourses] = useState('');
    const jwtToken = localStorage.getItem('jwtToken');
    const [userData, setUserData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [courseSearch, setCourseSearch] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState({ course_id: 0, course_name: "" });

    useEffect(() => {
        setUser();
    }, []);

    const setUser = () => {
        axios.get(base_url + '/api/aml/course/getUsersAndCourses')
            .then(response => {
                setUserData(response.data.users);
                setCourseData(response.data.courses);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    };

    const handleAddClick = () => {
        if (!selectedUser || !selectedCourse) {
            alert("Please select both a user and a course");
            return;
        }
        axios.put(`${base_url}/api/aml/course/saveUser/${selectedUser}/course/${selectedCourses}`, {}, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        })
            .then(response => {
                console.log("User added to course successfully:", response);
                alert(response);
            })
            .catch(error => {
                console.error("Error in adding user to course:", error);
                alert(error);
            });
    };
    const filteredUsers = userData.filter(
        user => `${user.firstname} ${user.lastname}`.toLowerCase().includes(userSearch.toLowerCase())
    );
    const filteredCourses = courseData.filter(
        course => course.course_name.toLowerCase().includes(courseSearch.toLowerCase())
    );
    return (
        <div>
            <div className="dropdown-container">
                <div className="dropdown-wrap">
                    <div className="dropdown">
                        <input
                            type="text"
                            placeholder="Искать пользователя"
                            value={userSearch}
                            onChange={(e) => {
                                setUserSearch(e.target.value);
                                setUserDropdownVisible(true);
                            }}
                            onClick={() => setUserDropdownVisible(true)}
                            className="dropdown-search"
                        />
                        {userDropdownVisible && (
                            <div className="dropdown-options">
                                {filteredUsers.map(user => (
                                    <div
                                        key={user.user_id}
                                        onClick={() => {
                                            setSelectedUser(user.user_id);
                                            setUserSearch(`${user.firstname} ${user.lastname}`);
                                            setUserDropdownVisible(false);
                                        }}
                                        className="dropdown-option"
                                    >
                                        {user.firstname} {user.lastname}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="dropdown">
                        <input
                            type="text"
                            placeholder="Искать курс"
                            value={courseSearch}
                            onChange={(e) => {
                                setCourseSearch(e.target.value);
                                setCourseDropdownVisible(true);
                            }}
                            onClick={() => setCourseDropdownVisible(true)}
                            className="dropdown-search"
                        />
                        {courseDropdownVisible && (
                            <div className="dropdown-options">
                                {filteredCourses.map(course => (
                                    <div
                                        key={course.course_id}
                                        onClick={() => {
                                            setSelectedCourses(course.course_id);
                                            setCourseSearch(course.course_name);
                                            setCourseDropdownVisible(false);
                                        }}
                                        className="dropdown-option"
                                    >
                                        {course.course_name} {course.course_id}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button className="button-user" onClick={handleAddClick}>Добавить</button>
            </div>
        </div>
    )
}

export default AddToCourse
