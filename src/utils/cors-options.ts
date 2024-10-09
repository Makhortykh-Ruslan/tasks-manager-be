export const corsOptions = {
  origin: [
    'http://localhost:4200',
    'https://makhortykh-ruslan.github.io/tasks-manager-fe',
  ],
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
};
