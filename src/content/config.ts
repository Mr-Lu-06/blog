import { defineCollection, z } from 'astro:content';

const diaryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    featured_image: z.string().optional(),
    mood: z.string().optional(),
    weather: z.string().optional(),
  }),
});

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string().optional(),
    photos: z.array(
      z.object({
        url: z.string(),
        caption: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  diary: diaryCollection,
  gallery: galleryCollection,
};
