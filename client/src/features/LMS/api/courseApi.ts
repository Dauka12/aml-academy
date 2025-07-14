import axios from "axios";

export async function enrollToCourse(courseId: number) {
  return axios.post(`/api/lms/lms-courses/${courseId}/enroll`);
}
