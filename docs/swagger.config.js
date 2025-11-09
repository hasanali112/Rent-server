"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const YAML = __importStar(require("yaml"));
// Base swagger configuration
const baseConfig = {
    openapi: '3.0.3',
    info: {
        title: 'Easy Search API Management',
        version: '1.0.0',
        description: 'API documentation for Easy Search Rent Services',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Local development server',
        },
    ],
    paths: {},
    components: {
        schemas: {},
    },
};
// Function to read and merge YAML files
function loadYamlFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return YAML.parse(content);
    }
    catch (error) {
        console.warn(`Could not load ${filePath}:`, error.message);
        return null;
    }
}
// Load user paths
const userPaths = loadYamlFile(path.join(__dirname, 'modules/user/paths.yaml'));
if (userPaths) {
    baseConfig.paths['/api/v1/users/create-admin'] = userPaths;
}
// Load auth paths
const authPaths = loadYamlFile(path.join(__dirname, 'modules/auth/paths.yaml'));
if (authPaths) {
    if (authPaths.register) {
        baseConfig.paths['/api/v1/users/register'] = authPaths.register;
    }
    if (authPaths.login) {
        baseConfig.paths['/api/v1/auth/login'] = authPaths.login;
    }
}
// Load category paths
const categoryPaths = loadYamlFile(path.join(__dirname, 'modules/category/paths.yaml'));
if (categoryPaths) {
    if (categoryPaths['create-category']) {
        baseConfig.paths['/api/v1/categories/create-category'] =
            categoryPaths['create-category'];
    }
    if (categoryPaths['get-all-category']) {
        baseConfig.paths['/api/v1/categories/get-all-category'] =
            categoryPaths['get-all-category'];
    }
    if (categoryPaths['update-category']) {
        baseConfig.paths['/api/v1/categories/update-category/{id}'] =
            categoryPaths['update-category'];
    }
    if (categoryPaths['delete-category']) {
        baseConfig.paths['/api/v1/categories/delete-category/{id}'] =
            categoryPaths['delete-category'];
    }
}
// Load houseRent paths
const houseRentPaths = loadYamlFile(path.join(__dirname, 'modules/houseRent/paths.yaml'));
if (houseRentPaths) {
    if (houseRentPaths['create-house-rent']) {
        baseConfig.paths['/api/v1/house-rent/create-house-rent'] =
            houseRentPaths['create-house-rent'];
    }
    if (houseRentPaths['get-all-house-rent']) {
        baseConfig.paths['/api/v1/house-rent/get-all-house-rent'] =
            houseRentPaths['get-all-house-rent'];
    }
    if (houseRentPaths['update-house-rent']) {
        baseConfig.paths['/api/v1/house-rent/update-house-rent/{id}'] =
            houseRentPaths['update-house-rent'];
    }
    if (houseRentPaths['delete-house-rent']) {
        baseConfig.paths['/api/v1/house-rent/delete-house-rent/{id}'] =
            houseRentPaths['delete-house-rent'];
    }
}
// Load hostelRent paths
const hostelRentPaths = loadYamlFile(path.join(__dirname, 'modules/hostelRent/paths.yaml'));
if (hostelRentPaths) {
    if (hostelRentPaths['create-hostel-rent']) {
        baseConfig.paths['/api/v1/hostel-rent/create-hostel-rent'] =
            hostelRentPaths['create-hostel-rent'];
    }
    if (hostelRentPaths['get-all-hostel-rent']) {
        baseConfig.paths['/api/v1/hostel-rent/get-all-hostel-rent'] =
            hostelRentPaths['get-all-hostel-rent'];
    }
    if (hostelRentPaths['update-hostel-rent']) {
        baseConfig.paths['/api/v1/hostel-rent/update-hostel-rent/{id}'] =
            hostelRentPaths['update-hostel-rent'];
    }
    if (hostelRentPaths['delete-hostel-rent']) {
        baseConfig.paths['/api/v1/hostel-rent/delete-hostel-rent/{id}'] =
            hostelRentPaths['delete-hostel-rent'];
    }
}
// Load schemas
const createAdminRequest = loadYamlFile(path.join(__dirname, 'modules/user/schemas/CreateAdminRequest.yaml'));
if (createAdminRequest) {
    baseConfig.components.schemas.CreateAdminRequest = createAdminRequest;
}
const createResponse = loadYamlFile(path.join(__dirname, 'shared/responses/CreateResponse.yaml'));
if (createResponse) {
    baseConfig.components.schemas.CreateResponse = createResponse;
}
const getAllResponse = loadYamlFile(path.join(__dirname, 'shared/responses/GetAllResponse.yaml'));
if (getAllResponse) {
    baseConfig.components.schemas.GetAllResponse = getAllResponse;
}
const meta = loadYamlFile(path.join(__dirname, 'shared/schemas/Meta.yaml'));
if (meta) {
    baseConfig.components.schemas.Meta = meta;
}
// Load auth schemas
const registerRequest = loadYamlFile(path.join(__dirname, 'modules/auth/schemas/RegisterRequest.yaml'));
if (registerRequest) {
    baseConfig.components.schemas.RegisterRequest = registerRequest;
}
const registerResponse = loadYamlFile(path.join(__dirname, 'modules/auth/schemas/RegisterResponse.yaml'));
if (registerResponse) {
    baseConfig.components.schemas.RegisterResponse = registerResponse;
}
const apiResponse = loadYamlFile(path.join(__dirname, 'shared/responses/ApiResponse.yaml'));
if (apiResponse) {
    baseConfig.components.schemas.ApiResponse = apiResponse;
}
const loginRequest = loadYamlFile(path.join(__dirname, 'modules/auth/schemas/LoginRequest.yaml'));
if (loginRequest) {
    baseConfig.components.schemas.LoginRequest = loginRequest;
}
const loginResponse = loadYamlFile(path.join(__dirname, 'modules/auth/schemas/LoginResponse.yaml'));
if (loginResponse) {
    baseConfig.components.schemas.LoginResponse = loginResponse;
}
// Load category schemas
const createCategoryRequest = loadYamlFile(path.join(__dirname, 'modules/category/schemas/CreateCategoryRequest.yaml'));
if (createCategoryRequest) {
    baseConfig.components.schemas.CreateCategoryRequest = createCategoryRequest;
}
const updateCategoryRequest = loadYamlFile(path.join(__dirname, 'modules/category/schemas/UpdateCategoryRequest.yaml'));
if (updateCategoryRequest) {
    baseConfig.components.schemas.UpdateCategoryRequest = updateCategoryRequest;
}
// Load houseRent schemas
const createHouseRentRequest = loadYamlFile(path.join(__dirname, 'modules/houseRent/schemas/CreateHouseRentRequest.yaml'));
if (createHouseRentRequest) {
    baseConfig.components.schemas.CreateHouseRentRequest = createHouseRentRequest;
}
const updateHouseRentRequest = loadYamlFile(path.join(__dirname, 'modules/houseRent/schemas/UpdateHouseRentRequest.yaml'));
if (updateHouseRentRequest) {
    baseConfig.components.schemas.UpdateHouseRentRequest = updateHouseRentRequest;
}
// Load hostelRent schemas
const createHostelRentRequest = loadYamlFile(path.join(__dirname, 'modules/hostelRent/schemas/CreateHostelRentRequest.yaml'));
if (createHostelRentRequest) {
    baseConfig.components.schemas.CreateHostelRentRequest = createHostelRentRequest;
}
const updateHostelRentRequest = loadYamlFile(path.join(__dirname, 'modules/hostelRent/schemas/UpdateHostelRentRequest.yaml'));
if (updateHostelRentRequest) {
    baseConfig.components.schemas.UpdateHostelRentRequest = updateHostelRentRequest;
}
// Load error response schema
const errorResponse = loadYamlFile(path.join(__dirname, 'shared/responses/ErrorResponse.yaml'));
if (errorResponse) {
    baseConfig.components.schemas.ErrorResponse = errorResponse;
}
exports.default = baseConfig;
