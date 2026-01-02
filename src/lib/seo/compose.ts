import { SEO_DEFAULTS } from "./defaults";

export function composeSEO(input: any) {
  const title = input.title 
    ? SEO_DEFAULTS.titleTemplate.replace("%s", input.title) 
    : SEO_DEFAULTS.defaultTitle;

  return {
    title,
    description: input.description?.replace(/\s+/g, ' ').trim() || SEO_DEFAULTS.defaultDescription,
    canonical: input.canonical || SEO_DEFAULTS.baseUrl,
    og: {
      type: input.ogType || "website",
      image: input.ogImage || SEO_DEFAULTS.defaultOgImage
    },
    robots: input.noindex ? "noindex,nofollow" : "index,follow"
  };
}