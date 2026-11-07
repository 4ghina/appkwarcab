import { Router, Request, Response } from 'express';
import { thematicMapService } from '../services/thematicMapService';

export const thematicMapRouter = Router();

thematicMapRouter.get('/map/thematic', (_req: Request, res: Response) => {
  try {
    const data = thematicMapService.getThematicDataset();
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal memuat dataset peta potensi tematik',
    });
  }
});
