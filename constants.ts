import configuration from './configuration.json';

import type { Configuration } from "./types/Configuration";

export const { entryDir, distributionDir, perPage }: Configuration = configuration;

export const PATH_ENTRY_DIR: string = `${import.meta.dir}/${entryDir}`
export const PATH_DIST_DIR: string = `${import.meta.dir}/${distributionDir}`;
export const PATH_CONTENT_DIR: string = `${PATH_ENTRY_DIR}/content`
