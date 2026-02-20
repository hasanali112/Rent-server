import { createController } from '../../utils/createController';
import { NotificationService } from './notification.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getMyNotifications = createController({
  path: '/api/v1/notifications',
  method: 'get',
  doc: {
    tags: ['Notifications'],
    summary: 'Get notifications for current user',
    responses: { 200: { description: 'Notifications retrieved successfully' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const result = await NotificationService.getMyNotifications(req.user.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notifications retrieved successfully',
      data: result,
    });
  },
});

const markAsRead = createController({
  path: '/api/v1/notifications/:id/read',
  method: 'patch',
  doc: {
    tags: ['Notifications'],
    summary: 'Mark a notification as read',
    responses: { 200: { description: 'Notification marked as read' } },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  handler: async (req, res) => {
    const result = await NotificationService.markAsRead(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Notification marked as read',
      data: result,
    });
  },
});

export const NotificationController = {
  getMyNotifications,
  markAsRead,
};
