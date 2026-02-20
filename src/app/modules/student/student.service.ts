import { ProgressRepository } from '../../data-access/progress/progress.repository';
import { EnrollmentRepository } from '../../data-access/enrollment/enrollment.repository';
import { CourseRepository } from '../../data-access/course/course.repository';
import { LessonRepository } from '../../data-access/lesson/lesson.repository';

const markLessonComplete = async (
  studentId: string,
  lessonId: string,
  courseId: string,
) => {
  // 1. Verify enrollment
  const enrollment = await EnrollmentRepository.findUnique(studentId, courseId);
  if (!enrollment || enrollment.status === 'DROPPED') {
    throw new Error('You must be enrolled to track progress in this course');
  }

  // 2. Mark lesson as complete
  await ProgressRepository.markLessonComplete(studentId, lessonId);

  // 3. Calculate new progress percentage
  const progress = await ProgressRepository.getProgress(studentId, courseId);

  // 4. Update enrollment table
  await ProgressRepository.updateEnrollmentProgress(
    studentId,
    courseId,
    progress.percentage,
  );

  return progress;
};

const getCourseContent = async (studentId: string, courseId: string) => {
  // 1. Verify enrollment
  const enrollment = await EnrollmentRepository.findUnique(studentId, courseId);
  if (!enrollment || enrollment.status === 'DROPPED') {
    throw new Error('You must be enrolled to access this content');
  }

  // 2. Fetch course with lessons
  const course = await CourseRepository.findById(courseId);
  const lessons = await LessonRepository.findByCourse(courseId);

  return {
    ...course,
    lessons,
    currentProgress: enrollment.progress,
  };
};

export const StudentService = {
  markLessonComplete,
  getCourseContent,
};
