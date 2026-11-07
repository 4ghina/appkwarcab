import { Router } from 'express';
import { configRouter } from './configRoutes';
import { systemRouter } from './systemRoutes';
import { skuSubmissionRouter } from './skuSubmissionRoutes';
import { skuCurriculumRouter } from './skuCurriculumRoutes';
import { advancementRouter } from './advancementRoutes';
import { rfidRouter } from './rfidRoutes';
import { infographicRouter } from './infographicRoutes';
import { membershipRouter } from './membershipRoutes';
import { sampleDataRouter } from './sampleDataRoutes';
import { mapRouter } from './mapRoutes';
import { thematicMapRouter } from './thematicMapRoutes';

export const apiRouter = Router();

// Mount all modularized domain routers
apiRouter.use(configRouter);
apiRouter.use(systemRouter);
apiRouter.use(skuSubmissionRouter);
apiRouter.use(skuCurriculumRouter);
apiRouter.use(advancementRouter);
apiRouter.use(rfidRouter);
apiRouter.use(infographicRouter);
apiRouter.use(membershipRouter);
apiRouter.use(sampleDataRouter);
apiRouter.use(mapRouter);
apiRouter.use(thematicMapRouter);
