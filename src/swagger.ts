const definitions = {
  user: {
    description: 'User Object',
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      admin: {
        type: 'boolean'
      },
      blocked: {
        type: 'boolean'
      }
    }
  },
  post: {
    description: 'Post Object',
    type: 'object',
    properties: {
      id: {
        type: 'ineteger'
      },
      userId: {
        type: 'string'
      },
      title: {
        type: 'string'
      },
      content: {
        type: 'string'
      },
      crecreateOrEditTimeateTime: {
        type: 'stirng'
      },
      blocked: {
        type: 'boolean'
      },
      edited: {
        type: 'boolean'
      }
    }
  },
  comment: {
    description: 'Comment Object',
    type: 'object',
    properties: {
      id: {
        type: 'ineteger'
      },
      content: {
        type: 'string'
      },
      userId: {
        type: 'string'
      },
      postId: {
        type: 'ineteger'
      },
      createTime: {
        type: 'stirng'
      }
    }
  },
  postHistory: {
    description: 'PostHistory Object',
    type: 'object',
    properties: {
      id: {
        type: 'ineteger'
      },
      userId: {
        type: 'string'
      },
      postId: {
        type: 'ineteger'
      },
      lastEditTime: {
        type: 'stirng'
      },
      oldContent: {
        type: 'stirng'
      }
    }
  },
  collaborator: {
    description: 'Collaborator Object',
    type: 'object',
    properties: {
      id: {
        type: 'ineteger'
      },
      userId: {
        type: 'string'
      },
      collaboratorId: {
        type: 'stirng'
      }
    }
  }
};

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
