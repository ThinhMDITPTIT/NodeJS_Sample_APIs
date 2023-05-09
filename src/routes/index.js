const blogsRouter = require('./blogs');
const usersRouter = require('./users');

const route = (app) => {
  app.use('/api/v1/blogs', blogsRouter);
  app.use('/api/v1/users', usersRouter);

  // All other routes that do not match RESTful API routes will be handled here
  app.use('/', (req, res, next) => res.status(404).json({ message: 'Not Found' }));
}

module.exports = route;