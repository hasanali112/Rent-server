import { EnrollmentRepository } from '../../data-access/enrollment/enrollment.repository';
import { CourseRepository } from '../../data-access/course/course.repository';
import { NotificationService } from '../notification/notification.service';

const enrollInCourse = async (studentId: string, courseId: string) => {
  // 1. Verify if course is published
  const course = await CourseRepository.findById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }
  if (course.status !== 'PUBLISHED') {
    throw new Error('You can only enroll in published courses');
  }

  // 2. Check for duplicate enrollment
  const existingEnrollment = await EnrollmentRepository.findUnique(
    studentId,
    courseId,
  );
  if (existingEnrollment) {
    throw new Error('You are already enrolled in this course');
  }

  const result = await EnrollmentRepository.create({ studentId, courseId });

  // 3. Trigger Notification (WebSocket + Email Simulation)
  await NotificationService.sendNotification({
    userId: studentId,
    title: 'Enrollment Confirmed!',
    message: `You have successfully enrolled in the course: ${course.title}`,
    emailSubject: 'LMS: Enrollment Confirmation',
    emailHtml: `
      <h1>Welcome to the course!</h1>
      <p>Your enrollment in <b>${course.title}</b> is confirmed.</p>
      <p>Happy learning!</p>
    `,
  });

  return result;
};

const dropCourse = async (enrollmentId: string) => {
  return await EnrollmentRepository.updateStatus(enrollmentId, 'DROPPED');
};

const completeCourse = async (enrollmentId: string) => {
  return await EnrollmentRepository.updateStatus(enrollmentId, 'COMPLETED');
};

const getMyEnrolledCourses = async (studentId: string) => {
  return await EnrollmentRepository.findMyEnrollments(studentId);
};

export const EnrollmentService = {
  enrollInCourse,
  dropCourse,
  completeCourse,
  getMyEnrolledCourses,
};
