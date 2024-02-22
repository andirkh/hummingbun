import configuration from './configuration.json';

import type { Configuration } from "./types/Configuration";

export const { blog, perPage }: Configuration = configuration;

export const PATH_ENTRY_DIR: string = `${import.meta.dir}/${blog}`
export const PATH_DIST_DIR: string = `${PATH_ENTRY_DIR}/dist`;
export const PATH_CONTENT_DIR: string = `${PATH_ENTRY_DIR}/content`

export const PORT: number = 11072;
