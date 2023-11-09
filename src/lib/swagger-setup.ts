import dotenv from "dotenv";
dotenv.config();

export const swaggerOptions = {
  swagger: {
    info: {
      title: "KL Backend Builder",
      description: "Documentation for the KL Backend Builder tools.",
      version: "1.0.0",
    },
    host: "localhost",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
};

export const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};
