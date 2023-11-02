import { httpBatchLink } from "@trpc/client";
import { appRouter } from "./routes";
import { getBaseUrl } from "@/lib/utils";

export const trpc = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
