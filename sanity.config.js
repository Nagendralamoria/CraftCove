import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from './sanity/schemas';

const config = defineConfig({
  projectId: "c1vlgi7c",
  dataset: "production",
  title: "ecommerce",
  apiVersion: "2024-03-08",
  basePath: "/admin",
  plugins: [deskTool()],
  schema: { types: schemas },
})

export default config