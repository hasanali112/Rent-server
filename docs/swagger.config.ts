/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';

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
  paths: {} as Record<string, any>,
  components: {
    schemas: {} as Record<string, any>,
  },
};

// Function to read and merge YAML files
function loadYamlFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return YAML.parse(content);
  } catch (error: any) {
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

// Load schemas
const createAdminRequest = loadYamlFile(
  path.join(__dirname, 'modules/user/schemas/CreateAdminRequest.yaml'),
);
if (createAdminRequest) {
  baseConfig.components.schemas.CreateAdminRequest = createAdminRequest;
}

const createResponse = loadYamlFile(
  path.join(__dirname, 'shared/responses/CreateResponse.yaml'),
);
if (createResponse) {
  baseConfig.components.schemas.CreateResponse = createResponse;
}

const getAllResponse = loadYamlFile(
  path.join(__dirname, 'shared/responses/GetAllResponse.yaml'),
);
if (getAllResponse) {
  baseConfig.components.schemas.GetAllResponse = getAllResponse;
}

const meta = loadYamlFile(path.join(__dirname, 'shared/schemas/Meta.yaml'));
if (meta) {
  baseConfig.components.schemas.Meta = meta;
}

// Load auth schemas
const registerRequest = loadYamlFile(
  path.join(__dirname, 'modules/auth/schemas/RegisterRequest.yaml'),
);
if (registerRequest) {
  baseConfig.components.schemas.RegisterRequest = registerRequest;
}

const registerResponse = loadYamlFile(
  path.join(__dirname, 'modules/auth/schemas/RegisterResponse.yaml'),
);
if (registerResponse) {
  baseConfig.components.schemas.RegisterResponse = registerResponse;
}

const apiResponse = loadYamlFile(
  path.join(__dirname, 'shared/responses/ApiResponse.yaml'),
);
if (apiResponse) {
  baseConfig.components.schemas.ApiResponse = apiResponse;
}

export default baseConfig;
