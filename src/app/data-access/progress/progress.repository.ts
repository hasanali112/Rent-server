import prisma from '../../utils/prisma';

const markLessonComplete = async (studentId: string, lessonId: string) => {
  return await prisma.lessonProgress.upsert({
    where: {
      studentId_lessonId: {
        studentId,
        lessonId,
      },
    },
    update: {
      isCompleted: true,
      completedAt: new Date(),
    },
    create: {
      studentId,
      lessonId,
      isCompleted: true,
      completedAt: new Date(),
    },
  });
};

const getProgress = async (studentId: string, courseId: string) => {
  const completedLessons = await prisma.lessonProgress.findMany({
    where: {
      studentId,
      lesson: {
        courseId,
      },
      isCompleted: true,
    },
  });

  const totalLessons = await prisma.lesson.count({
    where: { courseId },
  });

  return {
    completedCount: completedLessons.length,
    totalCount: totalLessons,
    percentage:
      totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0,
  };
};

const updateEnrollmentProgress = async (
  studentId: string,
  courseId: string,
  percentage: number,
) => {
  return await prisma.enrollment.update({
    where: {
      studentId_courseId: {
        studentId,
        courseId,
      },
    },
    data: {
      progress: percentage,
      status: percentage === 100 ? 'COMPLETED' : 'ACTIVE',
      ...(percentage === 100 && { completedAt: new Date() }),
    },
  });
};

export const ProgressRepository = {
  markLessonComplete,
  getProgress,
  updateEnrollmentProgress,
};
