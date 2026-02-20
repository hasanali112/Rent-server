import { CourseRepository } from '../../data-access/course';
import { AnalyticsRepository } from '../../data-access/analytics';

const createCourse = async (instructorId: string, data: any) => {
  const result = await CourseRepository.create({
    ...data,
    instructorId,
    price: Number(data.price),
    status: 'DRAFT', // Explicitly start as DRAFT
  });
  return result;
};

const getAllCourses = async (query: any) => {
  const { searchTerm, sortBy, sortOrder, page, limit, ...filter } = query;

  const options = {
    searchTerm,
    filter,
    sort: sortBy ? { field: sortBy, order: sortOrder || 'desc' } : undefined,
    pagination: {
      take: limit ? Number(limit) : 10,
      cursor: query.cursor,
    },
  };

  const result = await CourseRepository.findAll(options);
  return result;
};

const getMyCourses = async (instructorId: string) => {
  return await CourseRepository.findInstructorCourses(instructorId);
};

const updateCourse = async (id: string, data: any) => {
  const result = await CourseRepository.update(id, {
    ...data,
    ...(data.price && { price: Number(data.price) }),
  });
  return result;
};

const updateCourseStatus = async (id: string, status: string) => {
  const result = await CourseRepository.update(id, { status });
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
  getAllCourses,
  getMyCourses,
  updateCourse,
  updateCourseStatus,
  deleteCourse,
  getInstructorAnalytics,
};
