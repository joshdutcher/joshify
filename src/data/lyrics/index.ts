import type { SyncedLyric } from '@/types';

import apiEngineOptimizationData from './api-engine-optimization.json';
import democracyEngineData from './democracy-engine.json';
import didKansasWinData from './did-kansas-win.json';
import electionDataPipelineData from './election-data-pipeline.json';
import healthcareApiExtensionsData from './healthcare-api-extensions.json';
import healthcareEtlData from './healthcare-etl.json';
import joshifyData from './joshify.json';
import lawFirmStartupOperationsData from './law-firm-startup-operations.json';
import medigapIntegrationData from './medigap-integration.json';
import mobileApiRebuildData from './mobile-api-rebuild.json';
import startupTechnologyInfrastructureData from './startup-technology-infrastructure.json';
import wichitaRadarData from './wichita-radar.json';

export const syncedLyricsMap: Record<string, SyncedLyric[]> = {
    'api-engine-optimization': apiEngineOptimizationData,
    'democracy-engine': democracyEngineData,
    'did-kansas-win': didKansasWinData,
    'election-data-pipeline': electionDataPipelineData,
    'healthcare-api-extensions': healthcareApiExtensionsData,
    'healthcare-etl': healthcareEtlData,
    'joshify': joshifyData,
    'law-firm-startup-operations': lawFirmStartupOperationsData,
    'medigap-integration': medigapIntegrationData,
    'mobile-api-rebuild': mobileApiRebuildData,
    'startup-technology-infrastructure': startupTechnologyInfrastructureData,
    'wichita-radar': wichitaRadarData,
};
