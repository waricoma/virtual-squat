import fs from 'fs';
import packageJSON from './package.json';
import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;
import {
  generateRoutes,
  generateSwaggerSpec,
  RoutesConfig,
  SwaggerConfig,
} from 'tsoa';
import apiSpecConverter from 'api-spec-converter';

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);

(async (): Promise<void> => {
  // Define setting of automatic generating Swagger.json
  const swaggerOptions: SwaggerConfig = {
    basePath: '/api',
    entryFile: './server/common/server.ts',
    specVersion: 3,
    outputDirectory: './server/common/',
    controllerPathGlobs: ['./server/api/controllers/*/index.ts'],
  };

  // Define setting of Automatic generating routing file
  const routeOptions: RoutesConfig = {
    basePath: '/api',
    entryFile: './server/common/server.ts',
    routesDir: './server',
  };

  // Run those
  await generateSwaggerSpec(swaggerOptions, routeOptions);
  await generateRoutes(routeOptions, swaggerOptions);

  // Add title and version to info.
  try {
    const swaggerJSON = JSON.parse(
      fs.readFileSync('./server/common/swagger.json', 'utf-8')
    );
    swaggerJSON.info.title = packageJSON.name;
    swaggerJSON.info.version = packageJSON.version;
    fs.writeFileSync(
      './server/common/swagger.json',
      JSON.stringify(swaggerJSON, null, 2)
    );
  } catch (err) {
    if (err) {
      throw err;
    }
  }

  // Convert to JSON from YAML
  apiSpecConverter.convert(
    {
      from: 'openapi_3',
      to: 'openapi_3',
      source: './server/common/swagger.json',
    },
    (err, converted) => {
      if (err) {
        throw new Error(err);
      }

      fs.writeFile(
        './server/common/swagger.yaml',
        converted.stringify({ syntax: 'yaml', order: 'openapi' }),
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    }
  );
})();
