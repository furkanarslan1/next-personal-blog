import { CategoryLink } from "@/types/header_type";

export const category: CategoryLink[] = [
  {
    slug: "travel",
    href: "/categories/travel",
    name: "Travel",
    children: [],
  },
  {
    slug: "books",
    href: "/categories/books",
    name: "Books",
  },
  {
    slug: "movies",
    href: "/categories/movies",
    name: "Movies",
    children: [
      {
        slug: "watch-list",
        href: "/categories/movies/watch-list",
        name: "Watch List",
      },
    ],
  },
  {
    slug: "life",
    href: "/categories/life",
    name: "Life",
  },
  {
    slug: "music",
    href: "/categories/music",
    name: "Music",
  },
  {
    slug: "podcasts",
    href: "/categories/podcasts",
    name: "Podcasts",
  },
  {
    slug: "photography",
    href: "/categories/photography",
    name: "Photography",
  },

  {
    slug: "career",
    href: "/categories/career",
    name: "Career",
  },

  {
    slug: "learnings",
    href: "/categories/learnings",
    name: "Learnings",
  },
];
