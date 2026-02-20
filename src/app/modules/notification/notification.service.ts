import prisma from '../../utils/prisma';
import { SocketUtils } from '../../utils/socket';
import { EmailHelper } from '../../utils/emailHelper';

const sendNotification = async (payload: {
  userId: string;
  title: string;
  message: string;
  emailSubject?: string;
  emailHtml?: string;
}) => {
  const { userId, title, message, emailSubject, emailHtml } = payload;

  // 1. Save to database
  const notification = await prisma.notification.create({
    data: {
      userId,
      title,
      message,
    },
  });

  // 2. Real-time update via WebSocket
  SocketUtils.emitNotification(userId, 'NOTIFICATION', notification);

  // 3. Email simulation (if email details are provided)
  if (emailSubject && emailHtml) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.email) {
      await EmailHelper.sendEmail(user.email, emailSubject, emailHtml);
    }
  }

  return notification;
};

const getMyNotifications = async (userId: string) => {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

const markAsRead = async (id: string) => {
  return await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
};

export const NotificationService = {
  sendNotification,
  getMyNotifications,
  markAsRead,
};
