import { authRoutes } from "@/domain/auth/http/controllers/routes";

export const routes = [
  {
    prefix: "/auth",
    handler: authRoutes,
  },
];
