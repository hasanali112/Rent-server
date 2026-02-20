import prisma from '../../utils/prisma';

const getGlobalAnalytics = async () => {
  const [totalUsers, totalEnrollments, revenueResult] = await Promise.all([
    prisma.user.count(),
    prisma.enrollment.count(),
    prisma.payment.aggregate({
      where: { status: 'SUCCESS' },
      _sum: { amount: true },
    }),
  ]);

  return {
    totalUsers,
    totalEnrollments,
    totalRevenue: Number(revenueResult._sum.amount) || 0,
  };
};

const getOperationalAnalytics = async () => {
  const [totalEnrollments, popularCourses, completionStats, revenueResult] =
    await Promise.all([
      prisma.enrollment.count(),
      prisma.course.findMany({
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
      }),
      prisma.enrollment.groupBy({
        by: ['status'],
        _count: true,
      }),
      prisma.payment.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amount: true },
      }),
    ]);

  return {
    totalEnrollments,
    popularCourses: popularCourses.map(c => ({
      id: c.id,
      title: c.title,
      enrollments: c._count.enrollments,
    })),
    completionStats,
    revenueSummary: {
      totalRevenue: Number(revenueResult._sum.amount) || 0,
    },
  };
};

const getInstructorAnalytics = async (instructorId: string) => {
  const [totalRevenueResult, counts] = await Promise.all([
    prisma.payment.aggregate({
      where: {
        course: { instructorId },
        status: 'SUCCESS',
      },
      _sum: { amount: true },
    }),
    prisma.course.findMany({
      where: { instructorId },
      select: {
        id: true,
        _count: {
          select: { enrollments: true },
        },
        enrollments: {
          where: { status: 'COMPLETED' },
          select: { id: true },
        },
      },
    }),
  ]);

  let totalEnrollments = 0;
  let completions = 0;

  counts.forEach(course => {
    totalEnrollments += course._count.enrollments;
    completions += course.enrollments.length;
  });

  return {
    totalRevenue: Number(totalRevenueResult._sum.amount) || 0,
    totalEnrollments,
    completions,
    courseCount: counts.length,
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
    select: {
      id: true,
      email: true,
      courses: {
        select: {
          id: true,
          _count: {
            select: {
              enrollments: true,
            },
          },
          enrollments: {
            where: { status: 'COMPLETED' },
            select: { id: true },
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
      totalCompletions += course.enrollments.length;
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
