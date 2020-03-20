import { Request, Response } from 'express';
import axios from 'axios';
import Dev from '../Schema/Dev';

interface IGitHub {
  name: string;
  user: string;
  bio: string;
  avatar_url: string;
}

class DevController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { user } = req.headers;
    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev?.likes } },
        { _id: { $nin: loggedDev?.dislikes } }
      ]
    });

    return res.json(users);
  }

  // public async show(req: Request, res: Response): Promise<Response> {
  //   const dev = await Dev.find({ _id: req.params.id });
  //   return res.json(dev);
  // }

  public async store(req: Request, res: Response): Promise<Response> {
    const { username } = req.body;

    const userExists = await Dev.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }
    const response = await axios.get<IGitHub>(
      `https://api.github.com/users/${username}`
    );
    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    return res.json(dev);
  }

  // public async update(req: Request, res: Response): Promise<Response> {
  //   const dev = await Dev.findOneAndUpdate({ _id: req.params.id }, req.body, {
  //     new: true
  //   });

  //   return res.json(dev);
  // }

  // public async destroy(req: Request, res: Response): Promise<any> {
  //   await Dev.findOneAndDelete({ _id: req.params.id });
  // }
}

export default new DevController();
