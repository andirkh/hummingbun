import configuration from './configuration.json';

import type { Configuration } from "./types/Configuration";
import type { PageType, PostType } from './types/Content';

export const { blog, perPage }: Configuration = configuration;

export const PATH_ENTRY_DIR: string = `${import.meta.dir}/${blog}`
export const PATH_DIST_DIR: string = `${PATH_ENTRY_DIR}/dist`;
export const PATH_CONTENT_DIR: string = `${PATH_ENTRY_DIR}/content`;

export const PATH_ASSET_DIR: string = `${PATH_ENTRY_DIR}/asset`;
export const PATH_ASSET_DIST_DIR: string = `${PATH_DIST_DIR}/asset`;

export const PORT: number = 11072;

export const TYPE_POST: PostType = 'post';
export const TYPE_PAGE: PageType = 'page';

export const RESERVED_SLUG: string[] = ['post', 'page', 'asset', 'categories'];
