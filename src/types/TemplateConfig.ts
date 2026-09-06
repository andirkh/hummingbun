import type { ComponentType } from "preact";
import type { NotFoundPageProps } from "./NotFoundPageProps";
import type { PostListProps } from "./PostListProps";
import type { PostPageProps } from "./PostPageProps";
import type { TaxonomyIndexProps } from "./TaxonomyIndexProps";

type TemplateConfig = {
  PostTemplate: ComponentType<PostPageProps>;
  PostListTemplate: ComponentType<PostListProps>;
  TaxonomyTemplate: ComponentType<TaxonomyIndexProps>;
  NotFoundTemplate: ComponentType<NotFoundPageProps>;
};

export type { TemplateConfig };