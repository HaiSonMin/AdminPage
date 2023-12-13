import app from './app';
import { generateAdmin } from './src/helper';
const PORT = process.env.PORT || 9000;
const server = app.listen(PORT, async () => {
  console.log(`Project task company listening on port ${PORT}`);
  await generateAdmin();
});

process.on('SIGINT', () =>
  server.close(() => console.log('Exit Server Express'))
);
