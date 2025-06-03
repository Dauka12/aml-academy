import axios from 'axios';
import base_url from '../settings/base_url';

class CourseAPI {
  constructor() {
    this.baseURL = base_url;
    this.token = localStorage.getItem('jwtToken');
  }

  getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }

  // Course related APIs
  async getCourseById(courseId) {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/aml/course/getCourseById/${courseId}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  }

  // Session status APIs
  async getSessionStatuses(courseId) {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/aml/chapter/getChecked/${courseId}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching session statuses:', error);
      throw error;
    }
  }

  async markLessonCompleted(lessonId) {
    try {
      const response = await axios.post(
        `${this.baseURL}/api/aml/chapter/checked/${lessonId}`,
        {},
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error marking lesson as completed:', error);
      throw error;
    }
  }

  // Quiz APIs
  async submitQuizAnswer(quizId, answers) {
    try {
      const response = await axios.post(
        `${this.baseURL}/api/aml/quiz/submit/${quizId}`,
        { answers },
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error submitting quiz:', error);
      throw error;
    }
  }

  // User course enrollment
  async enrollUserToCourse(userId, courseId) {
    try {
      const response = await axios.put(
        `${this.baseURL}/api/aml/course/saveUser/${userId}/course/${courseId}`,
        {},
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error enrolling user to course:', error);
      throw error;
    }
  }
}

export default new CourseAPI();
