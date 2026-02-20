import { AnalyticsRepository } from '../../data-access/analytics';

const getGlobalStats = async () => {
  return await AnalyticsRepository.getGlobalAnalytics();
};

const getOperationalStats = async () => {
  return await AnalyticsRepository.getOperationalAnalytics();
};

const getInstructorStats = async (instructorId: string) => {
  return await AnalyticsRepository.getInstructorAnalytics(instructorId);
};

const getSystemOverview = async () => {
  return await AnalyticsRepository.getSystemOverview();
};

const getRevenuePerCourse = async () => {
  return await AnalyticsRepository.getRevenuePerCourse();
};

const getInstructorPerformance = async () => {
  return await AnalyticsRepository.getInstructorPerformance();
};

export const AnalyticsService = {
  getGlobalStats,
  getOperationalStats,
  getInstructorStats,
  getSystemOverview,
  getRevenuePerCourse,
  getInstructorPerformance,
};
