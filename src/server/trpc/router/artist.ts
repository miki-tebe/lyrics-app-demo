import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const artistRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const { id } = input;
      const artist = ctx.prisma.artist.findUnique({
        where: { id },
      });
      if (!artist) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No artist with id '${id}'`,
        });
      }
      return artist;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.artist.findMany();
  }),
});
