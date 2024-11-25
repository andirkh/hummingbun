import configuration from '../configuration.json';

import { Page } from './enums/Page';
import { Post } from './enums/Post';

import type { Configuration } from './types/Configuration';

export const { blogDirectory, perPage, theme }: Configuration = configuration;

export const PATH_ENTRY_DIR: string = `${import.meta.dir}/${blogDirectory}`;
export const PATH_DIST_DIR: string = `${import.meta.dir}/dist`;
export const PATH_CONTENT_DIR: string = `${PATH_ENTRY_DIR}/content`;
export const PATH_UI_DIR: string = `${PATH_ENTRY_DIR}/ui`;

export const PATH_ASSET_DIR: string = `${PATH_ENTRY_DIR}/asset`;
export const PATH_ASSET_DIST_DIR: string = `${PATH_DIST_DIR}/asset`;

export const PORT: number = 11072;

export const RESERVED_SLUG: string[] = [
  Post.text,
  Page.text,
  'asset',
  'categories',
];
