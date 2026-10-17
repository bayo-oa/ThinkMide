import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import schemaTypes from './sanity/schemas'

const singles = ['siteSettings', 'profile']

const structure = (S) =>
  S.list().title('Content').items([
    ...singles.map((id) =>
      S.listItem().title(id === 'siteSettings' ? 'Site settings' : 'Profile').id(id)
        .child(S.document().schemaType(id).documentId(id))
    ),
    S.divider(),
    ...S.documentTypeListItems().filter((i) => !singles.includes(i.getId())),
  ])

export default defineConfig({
  name: 'thinkmide',
  title: 'ThinkMide',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes, templates: (t) => t.filter(({ schemaType }) => !singles.includes(schemaType)) },
  document: { actions: (prev, { schemaType }) => (singles.includes(schemaType) ? prev.filter(({ action }) => action !== 'delete' && action !== 'duplicate') : prev) },
})
