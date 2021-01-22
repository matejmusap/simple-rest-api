export const definitions = {};

const ip = `${process.env.IP}` || 'localhost';
const port = process.env.PORT || 3000;

const baseUrl = `http://${ip}:${port}`;

export function generateDocumentation(paths: any) {
  return {
    _swagger: '2.0',
    get swagger() {
      return this['_swagger'];
    },
    set swagger(value) {
      this['_swagger'] = value;
    },
    schemes: ['https'],
    securityDefinitions: {
      basicAuth: {
        type: 'basic'
      }
    },
    security: [
      {
        basicAuth: []
      }
    ],
    host: baseUrl,
    basePath: '/',
    paths,
    definitions,
    parameters: {}
  };
}
