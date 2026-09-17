export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl: string;
};

export type ArticleCategory = {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  articles: Article[];
};
