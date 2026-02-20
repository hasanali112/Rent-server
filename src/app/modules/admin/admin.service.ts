import { AnalyticsRepository } from '../../data-access/analytics';
import { CourseRepository } from '../../data-access/course';

const getGlobalAnalytics = async () => {
  return await AnalyticsRepository.getGlobalAnalytics();
};

const overrideCourseStatus = async (id: string, status: any) => {
  return await CourseRepository.update(id, { status });
};

const updatePlatformConfig = async (config: any) => {
  return config;
};

const getOperationalAnalytics = async () => {
  return await AnalyticsRepository.getOperationalAnalytics();
};

const getAllCourses = async () => {
  return await CourseRepository.findAll();
};

export const AdminService = {
  getGlobalAnalytics,
  overrideCourseStatus,
  updatePlatformConfig,
  getOperationalAnalytics,
  getAllCourses,
};
