import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: "page",
      source: "news/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.string(),
      }),
    }),
    shows: defineCollection({
      type: "data",
      source: "shows.csv",
      schema: z.object({
        date: z.string(),
        venue: z.string(),
        city: z.string(),
        country: z.string(),
        info: z.string().optional(),
        "ticket-url": z.string().optional(),
        "ticket-url2": z.string().optional(),
      }),
    }),
  },
});
