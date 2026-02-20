import { CourseRepository } from '../../data-access/course';
import { AnalyticsRepository } from '../../data-access/analytics';

const createCourse = async (instructorId: string, data: any) => {
  const result = await CourseRepository.create({
    ...data,
    instructorId,
    price: Number(data.price),
  });
  return result;
};

const getMyCourses = async (instructorId: string) => {
  const result = await CourseRepository.findInstructorCourses(instructorId);
  return result;
};

const updateCourse = async (id: string, data: any) => {
  const result = await CourseRepository.update(id, {
    ...data,
    ...(data.price && { price: Number(data.price) }),
  });
  return result;
};

const deleteCourse = async (id: string) => {
  const result = await CourseRepository.deleteById(id);
  return result;
};

const getInstructorAnalytics = async (instructorId: string) => {
  return await AnalyticsRepository.getInstructorAnalytics(instructorId);
};

export const CourseService = {
  createCourse,
  getMyCourses,
  updateCourse,
  deleteCourse,
  getInstructorAnalytics,
};
