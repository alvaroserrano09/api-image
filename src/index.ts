import dotenv from 'dotenv';
import app from './app';
import launchInfrastructure from './infrastructure';



dotenv.config();


async function main() {
    const port = process.env.PORT;
    try {

      app.listen(port, () => {
        console.log('---------------------------------------------------');
        console.log(`🚀 APP running on port ${port}!`);
      });
    } catch (error) {
      console.error('# App error:', error);
    }
  }
  
  (async () => {
    await launchInfrastructure();
    await main();
  })();
  