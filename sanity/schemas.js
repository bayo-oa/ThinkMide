const img = (name, title) => ({ name, title, type: 'image', options: { hotspot: true } })
const str = (name, title, type = 'string') => ({ name, title, type })

export default [
  { name: 'profile', title: 'Profile', type: 'document', fields: [
    str('name', 'Name'), str('headline', 'Headline'), str('bio', 'About me', 'text'),
    img('photo', 'Photo'), str('email', 'Email'), str('github', 'GitHub URL', 'url'), str('linkedin', 'LinkedIn URL', 'url'),
  ] },
  { name: 'project', title: 'Project', type: 'document', fields: [
    str('title', 'Title'), str('summary', 'Summary', 'text'), img('image', 'Cover image'),
    { name: 'tech', title: 'Tech used', type: 'array', of: [{ type: 'string' }] },
    str('liveUrl', 'Live link', 'url'), str('repoUrl', 'Repository link', 'url'),
  ] },
  { name: 'post', title: 'Blog post', type: 'document', fields: [
    str('title', 'Title'), { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    str('excerpt', 'Excerpt', 'text'), str('date', 'Date', 'date'), img('cover', 'Cover image'),
  ] },
  { name: 'skill', title: 'Skill', type: 'document', fields: [str('name', 'Name')] },
]
