import { authRoutes } from "@/domain/auth/controllers/routes";

export const routes = [
  {
    prefix: "/auth",
    handler: authRoutes,
  },
];
