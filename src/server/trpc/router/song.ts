import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const songRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      const song = ctx.prisma.song.findUnique({
        where: { id },
      });
      if (!song) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No song with id '${id}'`,
        });
      }
      return song;
    }),
  getByArtistId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      const songs = ctx.prisma.song.findMany({
        where: {
          artistId: id,
        },
      });
      if (!songs) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No songs with artist id '${id}'`,
        });
      }
      return songs;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.song.findMany();
  }),
  add: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        title: z.string().min(1).max(32),
        lyrics: z.string().min(1),
        artistId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.song.create({
        data: input,
      });
      return post;
    }),
});
