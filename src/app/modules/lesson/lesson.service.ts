import { LessonRepository } from '../../data-access/lesson';

const addLesson = async (courseId: string, data: any) => {
  const result = await LessonRepository.create({
    ...data,
    courseId,
  });
  return result;
};

const updateLesson = async (id: string, data: any) => {
  const result = await LessonRepository.update(id, data);
  return result;
};

const deleteLesson = async (id: string) => {
  const result = await LessonRepository.deleteById(id);
  return result;
};

const reorderLessons = async (
  courseId: string,
  orders: { id: string; order: number }[],
) => {
  await LessonRepository.updateOrder(courseId, orders);
};

const getLessonsByCourse = async (courseId: string) => {
  const result = await LessonRepository.findByCourse(courseId);
  return result;
};

export const LessonService = {
  addLesson,
  updateLesson,
  deleteLesson,
  reorderLessons,
  getLessonsByCourse,
};
