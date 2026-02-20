/* eslint-disable @typescript-eslint/no-explicit-any */
class SwaggerRegistry {
  private static instance: SwaggerRegistry;
  private paths: Record<string, any> = {};

  private constructor() {}

  public static getInstance(): SwaggerRegistry {
    if (!SwaggerRegistry.instance) {
      SwaggerRegistry.instance = new SwaggerRegistry();
    }
    return SwaggerRegistry.instance;
  }

  public registerPath(path: string, method: string, doc: any) {
    if (!this.paths[path]) {
      this.paths[path] = {};
    }
    this.paths[path][method.toLowerCase()] = doc;
  }

  public getPaths() {
    return this.paths;
  }
}

export const swaggerRegistry = SwaggerRegistry.getInstance();
