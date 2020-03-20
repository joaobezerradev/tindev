import { Request, Response } from 'express';
import Dev from '../Schema/Dev';

class DislikeController {
  async store(req: Request, res: Response): Promise<Response> {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'Dev not exists' });
    }
    if (loggedDev?.likes) {
      loggedDev?.likes?.splice(targetDev._id, 1);
    }

    loggedDev?.dislikes?.push(targetDev._id);

    await loggedDev?.save();

    return res.json(loggedDev);
  }
}
export default new DislikeController();
