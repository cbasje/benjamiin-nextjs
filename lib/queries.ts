import { groq } from "next-sanity";

const projectFields = groq`
  title,
  subTitle,
  mainImage,
  colour,
  publishedAt,
  "slug": slug.current,
  "locale": __i18n_lang
`;

const categoryFields = groq`
  title,
  description,
  "slug": slug.current,
  "locale": __i18n_lang
`;

export const projectQuery = groq`
{
  "project": *[_type == "project" && slug.current == $slug && __i18n_lang == $locale] | order(_updatedAt desc) [0] {
    description,
    content,
    seo,
    categories[] -> { title },
    ${projectFields}
  }
}`;

export const projectListQuery = groq`
*[_type == "project" && defined(slug.current) && __i18n_lang == $locale] | order(publishedAt desc) [0...3] {
    ${projectFields}
  }
`;

export const projectPathsQuery = groq`
*[_type == "project" && defined(slug.current) && defined(__i18n_lang)] {
  "slug": slug.current,
  "locale": __i18n_lang
}
`;

export const categoryQuery = groq`
{
  "category": *[_type == "category" && slug.current == $slug && __i18n_lang == $locale] | order(_updatedAt desc) [0] {
    ${categoryFields},
    "projects": *[_type=="project" && references(^._id)]{ ${projectFields} }
  }
}
`;

export const categoryPathsQuery = groq`
*[_type == "category" && defined(slug.current) && defined(__i18n_lang)] {
  "slug": slug.current,
  "locale": __i18n_lang
}
`;

export const homeQuery = groq`
*[_type == "home" && __i18n_lang == $locale] | order(_updatedAt desc) [0] {
  _id,
  title,
  description,
  headshot,
  "locale": __i18n_lang
}
`;

export const notFoundQuery = groq`
*[_type == "not-found" && __i18n_lang == $locale] | order(_updatedAt desc) [0] {
  title,
  "locale": __i18n_lang
}
`;

export const globalQuery = groq`
*[_type == "global" && defined(__i18n_lang)] {
  _id,
  siteName,
  siteDescription,
  defaultSeo,
  "locale": __i18n_lang
}
`;
