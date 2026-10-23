import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/AI_prank_website/", // must match your GitHub repo name exactly, with slashes
});