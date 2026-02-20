import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient().$extends({
  query: {
    course: {
      async $allOperations({ operation, args, query }) {
        if (
          [
            'findMany',
            'findUnique',
            'findFirst',
            'count',
            'aggregate',
            'groupBy',
          ].includes(operation)
        ) {
          // @ts-ignore
          args.where = { ...args.where, deletedAt: null };
        }
        return query(args);
      },
    },
  },
});

export default prisma;
