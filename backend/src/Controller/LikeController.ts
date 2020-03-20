import { Request, Response } from 'express';
import Dev from '../Schema/Dev';

class LikeController {
  async store(req: Request, res: Response): Promise<Response> {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }

    if (loggedDev?.dislikes) {
      loggedDev?.dislikes.splice(targetDev._id, 1);
    }

    if (targetDev.likes?.push(targetDev._id)) {
      console.log('MATCH');
    }
    loggedDev?.likes?.push(targetDev._id);

    await loggedDev?.save();

    return res.json(loggedDev);
  }
}
export default new LikeController();
