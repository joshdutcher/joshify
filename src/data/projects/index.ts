// Individual project exports
export { electionDataPipeline } from './election-data-pipeline';
export { mobileApiRebuild } from './mobile-api-rebuild';
export { healthcareEtl } from './healthcare-etl';
export { democracyEngine } from './democracy-engine';
export { healthcareApiExtensions } from './healthcare-api-extensions';
export { medigapIntegration } from './medigap-integration';
export { apiEngineOptimization } from './api-engine-optimization';
export { beerFridge } from './beer-fridge';
export { didKansasWin } from './did-kansas-win';
export { wichitaRadar } from './wichita-radar';
export { lawFirmStartupOperations } from './law-firm-startup-operations';
export { startupTechnologyInfrastructure } from './startup-technology-infrastructure';
export { joshify } from './joshify';

// Import all for aggregation
import { electionDataPipeline } from './election-data-pipeline';
import { mobileApiRebuild } from './mobile-api-rebuild';
import { healthcareEtl } from './healthcare-etl';
import { democracyEngine } from './democracy-engine';
import { healthcareApiExtensions } from './healthcare-api-extensions';
import { medigapIntegration } from './medigap-integration';
import { apiEngineOptimization } from './api-engine-optimization';
import { beerFridge } from './beer-fridge';
import { didKansasWin } from './did-kansas-win';
import { wichitaRadar } from './wichita-radar';
import { lawFirmStartupOperations } from './law-firm-startup-operations';
import { startupTechnologyInfrastructure } from './startup-technology-infrastructure';
import { joshify } from './joshify';
import type { RawProject } from '@/types';

// All raw projects (before helper functions applied)
export const rawProjects: readonly RawProject[] = [
    joshify,
    didKansasWin,
    electionDataPipeline,
    mobileApiRebuild,
    healthcareEtl,
    democracyEngine,
    healthcareApiExtensions,
    medigapIntegration,
    apiEngineOptimization,
    beerFridge,
    wichitaRadar,
    lawFirmStartupOperations,
    startupTechnologyInfrastructure
] as const;
