import app from './app';
import { generateAdmin } from './helper';
const SERVER_PORT = process.env.SERVER_PORT || 9000;
const server = app.listen(SERVER_PORT, async () => {
  console.log(`Project task company listening on port ${SERVER_PORT}`);
  await generateAdmin();
});

process.on('SIGINT', () =>
  server.close(() => console.log('Exit Server Express'))
);
