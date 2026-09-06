import type { TemplateConfig } from 'hummingbun';
import NotFoundPage from './NotFoundPage';
import PostList from './PostList';
import PostPage from './PostPage';
import TaxonomyIndex from './TaxonomyIndex';

const Template: TemplateConfig = {
  PostTemplate: PostPage,
  PostListTemplate: PostList,
  TaxonomyTemplate: TaxonomyIndex,
  NotFoundTemplate: NotFoundPage,
};

export default Template;
