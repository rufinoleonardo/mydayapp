import type { Config } from "drizzle-kit";

export default {
  schema: "./src/data/database/schemas/*",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "expo",
} satisfies Config;
