import prisma from '../../utils/prisma';

const getGlobalAnalytics = async () => {
  const totalUsers = await prisma.user.count();
  const totalEnrollments = await prisma.enrollment.count();
  const payments = await prisma.payment.findMany({
    where: { status: 'SUCCESS' },
    select: { amount: true },
  });

  const totalRevenue = payments.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0,
  );

  return {
    totalUsers,
    totalEnrollments,
    totalRevenue,
  };
};

const getOperationalAnalytics = async () => {
  const totalEnrollments = await prisma.enrollment.count();
  const popularCourses = await prisma.course.findMany({
    take: 5,
    orderBy: {
      enrollments: {
        _count: 'desc',
      },
    },
    include: {
      _count: {
        select: { enrollments: true },
      },
    },
  });

  const completionStats = await prisma.enrollment.groupBy({
    by: ['status'],
    _count: true,
  });

  const payments = await prisma.payment.findMany({
    where: { status: 'SUCCESS' },
    select: { amount: true },
  });
  const totalRevenue = payments.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0,
  );

  return {
    totalEnrollments,
    popularCourses: popularCourses.map(c => ({
      id: c.id,
      title: c.title,
      enrollments: c._count.enrollments,
    })),
    completionStats,
    revenueSummary: {
      totalRevenue,
    },
  };
};

const getInstructorAnalytics = async (instructorId: string) => {
  const courses = await prisma.course.findMany({
    where: { instructorId },
    include: {
      enrollments: {
        include: {
          payments: {
            where: { status: 'SUCCESS' },
          },
        },
      },
    },
  });

  let totalRevenue = 0;
  let totalEnrollments = 0;
  let completions = 0;

  courses.forEach(course => {
    totalEnrollments += course.enrollments.length;
    course.enrollments.forEach(enrol => {
      if (enrol.status === 'COMPLETED') completions++;
      enrol.payments.forEach(payment => {
        totalRevenue += Number(payment.amount);
      });
    });
  });

  return {
    totalRevenue,
    totalEnrollments,
    completions,
    courseCount: courses.length,
  };
};

export const AnalyticsRepository = {
  getGlobalAnalytics,
  getOperationalAnalytics,
  getInstructorAnalytics,
};
