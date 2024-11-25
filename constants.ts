import configuration from './configuration.json';

import type { Configuration } from './src/types/Configuration';
import type { PageType, PostType } from './src/types/Content';

export const { blogDirectory, perPage, theme }: Configuration = configuration;

export const PATH_ENTRY_DIR: string = `${import.meta.dir}/${blogDirectory}`;
export const PATH_DIST_DIR: string = `${import.meta.dir}/dist`;
export const PATH_CONTENT_DIR: string = `${PATH_ENTRY_DIR}/content`;
export const PATH_UI_DIR: string = `${PATH_ENTRY_DIR}/ui`;

export const PATH_ASSET_DIR: string = `${PATH_ENTRY_DIR}/asset`;
export const PATH_ASSET_DIST_DIR: string = `${PATH_DIST_DIR}/asset`;

export const PORT: number = 11072;

export const TYPE_POST: PostType = 'post';
export const TYPE_PAGE: PageType = 'page';

export const RESERVED_SLUG: string[] = ['post', 'page', 'asset', 'categories'];
