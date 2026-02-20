import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { AnalyticsService } from './analytics.service';

const getSystemOverview = createController({
  path: '/api/v1/analytics/overview',
  method: 'get',
  doc: {
    tags: ['Analytics'],
    summary:
      'Get system wide overview analytics (Total courses, active students, enrollment growth)',
    responses: { 200: { description: 'Analytics retrieved successfully' } },
  },
  handler: async (req, res) => {
    const result = await AnalyticsService.getSystemOverview();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'System overview retrieved successfully',
      data: result,
    });
  },
});

const getRevenuePerCourse = createController({
  path: '/api/v1/analytics/revenue/courses',
  method: 'get',
  doc: {
    tags: ['Analytics'],
    summary: 'Get revenue per course',
    responses: { 200: { description: 'Revenue data retrieved successfully' } },
  },
  handler: async (req, res) => {
    const result = await AnalyticsService.getRevenuePerCourse();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Revenue per course retrieved successfully',
      data: result,
    });
  },
});

const getInstructorPerformance = createController({
  path: '/api/v1/analytics/instructors/performance',
  method: 'get',
  doc: {
    tags: ['Analytics'],
    summary: 'Get completion rates per instructor',
    responses: {
      200: { description: 'Performance data retrieved successfully' },
    },
  },
  handler: async (req, res) => {
    const result = await AnalyticsService.getInstructorPerformance();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Instructor performance retrieved successfully',
      data: result,
    });
  },
});

const getOperationalStats = createController({
  path: '/api/v1/analytics/operational',
  method: 'get',
  doc: {
    tags: ['Analytics'],
    summary: 'Get operational stats including popular courses',
    responses: { 200: { description: 'Stats retrieved successfully' } },
  },
  handler: async (req, res) => {
    const result = await AnalyticsService.getOperationalStats();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Operational stats retrieved successfully',
      data: result,
    });
  },
});

export const AnalyticsController = {
  getSystemOverview,
  getRevenuePerCourse,
  getInstructorPerformance,
  getOperationalStats,
};
