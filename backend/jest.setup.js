const { startServer } = require('./src/app');

module.exports = async () => {
  await startServer(3000);

  global.teardownServer = async () => {
    await new Promise((resolve) => {
      app.close(resolve);
    });
  };
};
