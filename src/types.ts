import type { ReactNode } from "react";
import { string, array, z } from "zod";
export type LoginInput = z.infer<typeof loginInput>;

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const loginOutput = z.boolean().or(z.literal("INVALID CREDENTIAL"));

export const RetrievePatternInput = z.object({
  pattern: z.string(),
});

export interface LibraryData {
  audio: string | undefined;
  link: string | undefined;
  artist: ReactNode;
  id: string;
  name: string;
  img: string;
  ArtistsOnAlbums?: any[];
  author?: any;
}

export const IdInput = z.object({
  id: z.string().optional(),
});

export enum FilterType {
  ByRecent = "recent",
  ByAdd = "add",
  ByName = "name",
  ByPattern = "pattern",
  ByRetrieve = "retrieve",
  ByAuthor = "author",
}

export type Filter = z.infer<typeof filter>;
export const filter = z.object({
  type: z.nativeEnum(FilterType),
  pattern: z.string().optional(),
  id: z.string().optional(),
});

export const NameInput = z.object({
  name: z.string(),
});
