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

const getSystemOverview = async () => {
  const totalCourses = await prisma.course.count();
  const totalActiveStudents = await prisma.enrollment.groupBy({
    by: ['studentId'],
    where: { status: 'ACTIVE' },
    _count: true,
  });

  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  const enrollmentGrowth = await prisma.enrollment.groupBy({
    by: ['enrolledAt'],
    where: {
      enrolledAt: {
        gte: tenDaysAgo,
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      enrolledAt: 'asc',
    },
  });

  return {
    totalCourses,
    activeStudentCount: totalActiveStudents.length,
    enrollmentGrowth: enrollmentGrowth.map(item => ({
      date: item.enrolledAt.toISOString().split('T')[0],
      count: item._count.id,
    })),
  };
};

const getRevenuePerCourse = async () => {
  const revenue = await prisma.payment.groupBy({
    by: ['courseId'],
    where: { status: 'SUCCESS' },
    _sum: {
      amount: true,
    },
  });

  const courseDetails = await prisma.course.findMany({
    where: {
      id: { in: revenue.map(r => r.courseId) },
    },
    select: { id: true, title: true },
  });

  return revenue.map(r => ({
    courseId: r.courseId,
    title: courseDetails.find(c => c.id === r.courseId)?.title,
    revenue: Number(r._sum.amount),
  }));
};

const getInstructorPerformance = async () => {
  const instructors = await prisma.user.findMany({
    where: { role: 'INSTRUCTOR' },
    include: {
      courses: {
        include: {
          _count: {
            select: {
              enrollments: true,
            },
          },
          enrollments: {
            select: {
              status: true,
            },
          },
        },
      },
    },
  });

  return instructors.map(instructor => {
    let totalEnrollments = 0;
    let totalCompletions = 0;

    instructor.courses.forEach(course => {
      totalEnrollments += course._count.enrollments;
      totalCompletions += course.enrollments.filter(
        e => e.status === 'COMPLETED',
      ).length;
    });

    return {
      instructorId: instructor.id,
      email: instructor.email,
      completionRate:
        totalEnrollments > 0 ? (totalCompletions / totalEnrollments) * 100 : 0,
    };
  });
};

export const AnalyticsRepository = {
  getGlobalAnalytics,
  getOperationalAnalytics,
  getInstructorAnalytics,
  getSystemOverview,
  getRevenuePerCourse,
  getInstructorPerformance,
};
