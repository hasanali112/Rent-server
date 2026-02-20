import { createController } from '../../utils/createController';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CategoryService } from './index';

const createCategory = createController({
  path: '/api/v1/categories',
  method: 'post',
  doc: {
    tags: ['Category Management'],
    summary: 'Create a new category',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'slug'],
            properties: {
              name: { type: 'string' },
              slug: { type: 'string' },
            },
          },
        },
      },
    },
    responses: { 201: { description: 'Category created successfully' } },
  },
  handler: async (req, res) => {
    const result = await CategoryService.createCategory(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Category created successfully',
      data: result,
    });
  },
});

const getAllCategories = createController({
  path: '/api/v1/categories',
  method: 'get',
  doc: {
    tags: ['Category Management'],
    summary: 'Get all categories',
    responses: { 200: { description: 'Categories retrieved successfully' } },
  },
  handler: async (req, res) => {
    const result = await CategoryService.getAllCategories();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Categories retrieved successfully',
      data: result,
    });
  },
});

const updateCategory = createController({
  path: '/api/v1/categories/:id',
  method: 'patch',
  doc: {
    tags: ['Category Management'],
    summary: 'Update a category',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              slug: { type: 'string' },
            },
          },
        },
      },
    },
    responses: { 200: { description: 'Category updated successfully' } },
  },
  handler: async (req, res) => {
    const result = await CategoryService.updateCategory(
      req.params.id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category updated successfully',
      data: result,
    });
  },
});

const deleteCategory = createController({
  path: '/api/v1/categories/:id',
  method: 'delete',
  doc: {
    tags: ['Category Management'],
    summary: 'Delete a category',
    parameters: [
      { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    ],
    responses: { 200: { description: 'Category deleted successfully' } },
  },
  handler: async (req, res) => {
    await CategoryService.deleteCategory(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category deleted successfully',
      data: null,
    });
  },
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
