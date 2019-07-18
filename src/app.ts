import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
 
class App {
  public app: express.Application;
 
  constructor(controllers: Controller[]) {
    this.app = express();
 
    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();

  }
 
  public listen() {
    this.app.listen(3000, () => {
      console.log(`App listening on the port 3000`);
    });
  }
 
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }
 
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
 
  private connectToTheDatabase() {
    mongoose.connect(`mongodb://localhost:27017/new`,{ useNewUrlParser: true });
  }
}
 
export default App;