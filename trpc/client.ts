import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "./routes";

export const trpc = createTRPCReact<AppRouter>({});
