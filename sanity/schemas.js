const img = (name, title) => ({ name, title, type: 'image', options: { hotspot: true } })
const str = (name, title, type = 'string', extra = {}) => ({ name, title, type, ...extra })

export const sectionKeys = ['work', 'about', 'skills', 'blog', 'contact']

export default [
  { name: 'siteSettings', title: 'Site settings', type: 'document', fields: [
    str('brandName', 'Brand name'),
    str('intro', 'Line above your name in the hero'),
    str('ctaPrimary', 'Hero main button text'),
    str('ctaSecondary', 'Hero second button text'),
    str('workTitle', 'Projects section heading'),
    str('aboutTitle', 'About section heading'),
    str('skillsTitle', 'Skills section heading'),
    str('blogTitle', 'Blog section heading'),
    str('contactTitle', 'Contact section heading'),
    str('footerNote', 'Footer text'),
    { name: 'sectionOrder', title: 'Page sections (drag to reorder, remove to hide)', type: 'array',
      of: [{ type: 'string', options: { list: sectionKeys } }],
      description: 'Choose from: work, about, skills, blog, contact.' },
  ] },
  { name: 'profile', title: 'Profile', type: 'document', fields: [
    str('name', 'Name'), str('headline', 'Hero headline'), str('bio', 'About me', 'text'),
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
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
  ] },
  { name: 'skill', title: 'Skill', type: 'document', fields: [str('name', 'Name')] },
]
