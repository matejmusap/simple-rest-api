const definitions = {};

const port = process.env.PORT || 3000;
const ip = process.env.IP || 'localhost';

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
    info: {
      contact: {
        name: 'Briteback support',
        email: 'developer@briteback.com'
      }
    },
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
    host: `http://${ip}:${port}`,
    basePath: '/',
    paths,
    definitions,
    parameters: {}
  };
}
