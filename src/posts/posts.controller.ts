import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import Post from './posts.interface';
import User from './user.interface';
import postModel from './posts.model';
import userModel from './user.model';
import validationMiddleware from '../middleware/validation.middleware';
import CreatePostDto from './post.dto';
import CreateUserDto from './user.dto';
 
class PostsController implements Controller {
  public path = '/posts';
  public user_path = '/users';
  public router = express.Router();
  private post = postModel;
  private user = userModel;
 
  constructor() {
    this.initializeRoutes();
  }
 
  private initializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost);
    this.router.delete(`${this.path}/:id`, this.deletePost);
    this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);

    //users routes
    this.router.get(this.user_path, this.getAllUsers);
    this.router.get(`${this.user_path}/:id`, this.getUserById);
    this.router.put(`${this.user_path}/:id`, validationMiddleware(CreateUserDto, true), this.modifyUser);
    this.router.delete(`${this.user_path}/:id`, this.deleteUser);
    this.router.post(this.user_path, validationMiddleware(CreateUserDto), this.createUser);
  }
 
  private getAllPosts = (request: express.Request, response: express.Response) => {
    this.post.find()
      .then((posts) => {
        response.send(posts);
      });
  }
 
  private getPostById = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.post.findById(id)
      .then((post) => {
        if (post) {
          response.send(post);
        } else {
          response.status(404).send({ error: 'Post not found' });
        }
      });
  }
 
  private modifyPost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const postData: Post = request.body;
    this.post.findByIdAndUpdate(id, postData, { new: true })
      .then((post) => {
        response.send(post);
      });
  }
 
  private createPost = (request: express.Request, response: express.Response) => {
    const postData: Post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save()
      .then(savedPost => {
        response.send(savedPost);
      })
  }
 
  private deletePost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.post.findByIdAndDelete(id)
      .then((successResponse) => {
        if (successResponse) {
          response.send(200);
        } else {
          response.send(404);
        }
      });
  }

 

//function for handeling users url
private getAllUsers = (request: express.Request, response: express.Response) => {
  this.user.find()
    .then((users) => {
      response.send(users);
    });
}

private getUserById = (request: express.Request, response: express.Response) => {
  const id = request.params.id;
  this.user.findById(id)
    .then((user) => {
      if (user) {
        response.send(user);
      } else {
        response.status(404).send({ error: 'User not found' });
      }
    });
}

private modifyUser = (request: express.Request, response: express.Response) => {
  const id = request.params.id;
  const postData: User = request.body;
  this.user.findByIdAndUpdate(id, postData, { new: true })
    .then((user) => {
      response.send(user);
    });
}

private createUser = (request: express.Request, response: express.Response) => {
  const postData: User = request.body;
  const createdPost = new userModel(postData);
  createdPost.save()
    .then(savedUser => {
      response.send(savedUser);
    })
}

private deleteUser = (request: express.Request, response: express.Response) => {
  const id = request.params.id;
  this.user.findByIdAndDelete(id)
    .then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        response.send(404);
      }
    });
}
}

export default PostsController;