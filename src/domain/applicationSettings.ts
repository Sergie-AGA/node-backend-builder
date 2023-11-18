import cron from "node-cron";
import deleteExpiredTokens from "./auth/cronJobs/deleteExpiredTokens";

export const applicationSettings = {
  title: "My Application",
  services: [createCronJobs],
};

function createCronJobs() {
  cron.schedule("0 57 * * * *", () => {
    deleteExpiredTokens();
  });
}
