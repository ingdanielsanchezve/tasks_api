const app = require('./app')
const swaggerUi = require('swagger-ui-express'),
      swaggerJsdoc = require('swagger-jsdoc')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Task management application for ABC, Inc / API Docs',
    description: 'Task management application for ABC, Inc / API Docs',
    termsOfService: 'http://swagger.io/terms/',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    },
    contact: {
      name: 'Daniel Sánchez',
      url: 'linkedin.com/in/ingdanielsanchezvzla',
      email: 'ingdanielsanchezve@gmail.com'
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
}

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
}

const PORT = process.env.PORT || 3000

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs) )

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))