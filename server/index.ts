import { db, publicProcedure, router } from "./trpc";
import {
  RetrievePatternInput,
  loginInput,
  loginOutput,
  IdInput,
  filter,
  FilterType,
} from "../src/types";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

const appRouter = router({
  retrieveUsers: publicProcedure.query(async () => {
    const users = await db.user.findMany();
    return users;
  }),

  login: publicProcedure
    .input(loginInput)
    .output(loginOutput)
    .query(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { email: input.email },
      });

      if (user) {
        return user.password === input.password;
      }

      return "INVALID CREDENTIAL";
    }),

  artistByFilter: publicProcedure.input(filter).query(async ({ input }) => {
    switch (input.type) {
      case FilterType.ByRecent:
        return db.artist.findMany({
          orderBy: {
            updatedAt: "asc",
          },
        });

      case FilterType.ByAdd:
        return db.artist.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });

      case FilterType.ByName:
        return db.artist.findMany({
          orderBy: {
            name: "asc",
          },
        });

      case FilterType.ByPattern:
        return await db.artist.findMany({
          where: {
            name: {
              contains: input.pattern,
            },
          },
        });

      case FilterType.ByRetrieve:
        return await db.artist.findMany();
    }
  }),

  /*retrieveArtists: publicProcedure.query(async () => {
      const artists = await db.artist.findMany();
      return artists;
    }),
  
    artistNameById: publicProcedure.input(IdInput).query(async ({ input }) => {
      const artist = await db.artist.findFirst({
        where: {
          id: input.id,
        },
      });
      return artist!.name;
    }),

    artistByRecent: publicProcedure.query(async () => {
    const artists = await db.artist.findMany({
      orderBy: {
        updatedAt: "asc",
      },
    });
    return artists;
  }),

  
  artistByName: publicProcedure.query(async () => {
    const artists = await db.artist.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return artists;
  }),

  artistByAdd: publicProcedure.query(async () => {
    const artists = await db.artist.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return artists;
  }),

  retrieveArtistByPattern: publicProcedure
    .input(RetrievePatternInput)
    .query(async ({ input }) => {
      const artists = await db.artist.findMany({
        where: {
          name: {
            contains: input.pattern,
          },
        },
      });
      return artists;
    }),*/

  albumByFilter: publicProcedure.input(filter).query(async ({ input }) => {
    switch (input.type) {
      case FilterType.ByRecent:
        return db.album.findMany({
          orderBy: {
            updatedAt: "asc",
          },
          include: {
            ArtistsOnAlbums: {
              select: {
                artist: true,
              },
            },
          },
        });

      case FilterType.ByAdd:
        return db.album.findMany({
          orderBy: {
            createdAt: "desc",
          },
          include: {
            ArtistsOnAlbums: {
              select: {
                artist: true,
              },
            },
          },
        });

      case FilterType.ByName:
        return db.album.findMany({
          orderBy: {
            name: "asc",
          },
          include: {
            ArtistsOnAlbums: {
              select: {
                artist: true,
              },
            },
          },
        });

      case FilterType.ByPattern:
        return await db.album.findMany({
          where: {
            name: {
              contains: input.pattern,
            },
          },
          include: {
            ArtistsOnAlbums: {
              select: {
                artist: true,
              },
            },
          },
        });

      case FilterType.ByAuthor: {
        if (input.id) {
          return db.album.findMany({
            orderBy: {
              ArtistsOnAlbums: {},
            },
            include: {
              ArtistsOnAlbums: { select: { artist: true } },
            },
          });
        } else
          return db.album.findMany({
            where: {
              ArtistsOnAlbums: {
                some: {
                  artist: { id: input.id },
                },
              },
            },
            include: {
              ArtistsOnAlbums: { select: { artist: true } },
            },
          });
      }
    }
  }),

  /*retrieveAlbums: publicProcedure.query(async () => {
    const albums = await db.album.findMany();
    return albums;
  }),

  albumById: publicProcedure.input(IdInput).query(async ({ input }) => {
    const albums = await db.album.findFirst({
      where: {
        id: input.id,
      },
    });
    return albums!.name;
  }),

  albumByRecent: publicProcedure.query(async () => {
    const albums = await db.album.findMany({
      include: { ArtistsOnAlbums: { select: { artist: true } } },
      orderBy: {
        updatedAt: "asc",
      },
    });
    return albums;
  }),

  albumByAdd: publicProcedure.query(async () => {
    const albums = await db.album.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return albums;
  }),

  albumByName: publicProcedure.query(async () => {
    const albums = await db.album.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return albums;
  }),

  albumByAuthor: publicProcedure.input(IdInput).query(async ({ input }) => {
    let albums;
    if (input.id) {
      albums = await db.album.findMany({
        orderBy: {
          ArtistsOnAlbums: {},
        },
      });
    } else {
      albums = await db.album.findMany({
        where: {
          ArtistsOnAlbums: {
            some: {
              artist: { id: input.id },
            },
          },
        },
      });
    }
    return albums;
  }),

  retrieveAlbumByPattern: publicProcedure
    .input(RetrievePatternInput)
    .query(async ({ input }) => {
      const albums = await db.album.findMany({
        where: {
          name: {
            contains: input.pattern,
          },
        },
      });
      return albums;
    }),*/

  retrievePlaylists: publicProcedure.query(async () => {
    const playlists = await db.playlist.findMany();
    return playlists;
  }),

  playlistById: publicProcedure.input(IdInput).query(async ({ input }) => {
    const playlists = await db.playlist.findFirst({
      where: {
        id: input.id,
      },
    });
    return playlists!.name;
  }),

  playlistByRecent: publicProcedure.query(async () => {
    const playlists = await db.playlist.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });
    return playlists;
  }),

  playlistByAdd: publicProcedure.query(async () => {
    const playlists = await db.playlist.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return playlists;
  }),

  playlistByName: publicProcedure.query(async () => {
    const playlists = await db.playlist.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        author: true,
      },
    });
    return playlists;
  }),

  playlistByAuthor: publicProcedure.query(async () => {
    const playlists = await db.playlist.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        author: true,
      },
    });
    return playlists;
  }),

  retrievePlaylistByPattern: publicProcedure
    .input(RetrievePatternInput)
    .query(async ({ input }) => {
      const playlists = await db.playlist.findMany({
        where: {
          name: {
            contains: input.pattern,
          },
        },
      });
      return playlists;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  middleware: cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
});

server.listen(3000);
