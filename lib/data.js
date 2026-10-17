import { createClient } from 'next-sanity'

const photo = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

const defaultSettings = {
  brandName: 'ThinkMide',
  intro: 'Web developer, available for jobs and freelance',
  ctaPrimary: 'See my work',
  ctaSecondary: 'Start a project',
  workTitle: 'Selected work',
  aboutTitle: 'About me',
  skillsTitle: 'Skills and tech stack',
  blogTitle: 'Writing',
  contactTitle: 'Have a project in mind?',
  footerNote: 'Built with ThinkMide.',
  sectionOrder: ['work', 'about', 'skills', 'blog', 'contact'],
}

const clean = (o) => Object.fromEntries(Object.entries(o || {}).filter(([, v]) => v && !(Array.isArray(v) && !v.length)))

const fallback = {
  profile: {
    name: 'Adebayo Victor',
    headline: 'I build fast, bold websites for people who want to be remembered.',
    bio: 'Placeholder: tell your story here. How you started coding, what you care about building, and the kind of problems you enjoy solving.',
    photo: photo('photo-1531297484001-80022131f5a1'),
    email: 'hello@thinkmide.com',
    github: 'https://github.com/bayo-oa',
    linkedin: '#',
  },
  projects: [
    { title: 'Project one', summary: 'A short line about what it does and who it helps.', tech: ['Next.js', 'Sanity'], liveUrl: '#', repoUrl: '#', image: photo('photo-1461749280684-dccba630e2f6') },
    { title: 'Project two', summary: 'A short line about what it does and who it helps.', tech: ['React', 'Node'], liveUrl: '#', repoUrl: '#', image: photo('photo-1555066931-4365d14bab8c') },
    { title: 'Project three', summary: 'A short line about what it does and who it helps.', tech: ['TypeScript', 'Postgres'], liveUrl: '#', repoUrl: '#', image: photo('photo-1498050108023-c5249f4df085') },
  ],
  posts: [
    { title: 'Placeholder post title', excerpt: 'A one or two sentence summary of the post.', date: '2026-10-01', slug: 'one', image: photo('photo-1517694712202-14dd9538aa97') },
    { title: 'Another placeholder post', excerpt: 'A one or two sentence summary of the post.', date: '2026-09-12', slug: 'two', image: photo('photo-1507238691740-187a5b1d37b8') },
  ],
  skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Sanity', 'Git'].map((name) => ({ name })),
}

const query = `{
  "settings": *[_type=="siteSettings"][0],
  "profile": *[_type=="profile"][0]{name,headline,bio,email,github,linkedin,"photo":photo.asset->url},
  "projects": *[_type=="project"]|order(_createdAt desc){title,summary,tech,liveUrl,repoUrl,"image":image.asset->url},
  "posts": *[_type=="post"]|order(date desc){title,excerpt,date,"slug":slug.current,"image":cover.asset->url},
  "skills": *[_type=="skill"]|order(name){name}
}`

export async function getData() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return { ...fallback, settings: defaultSettings }
  try {
    const client = createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2024-10-01', useCdn: true })
    const d = await client.fetch(query)
    return {
      settings: { ...defaultSettings, ...clean(d.settings) },
      profile: { ...fallback.profile, ...clean(d.profile) },
      projects: d.projects?.length ? d.projects : fallback.projects,
      posts: d.posts?.length ? d.posts : fallback.posts,
      skills: d.skills?.length ? d.skills : fallback.skills,
    }
  } catch {
    return { ...fallback, settings: defaultSettings }
  }
}

export async function getPost(slug) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const local = fallback.posts.find((p) => p.slug === slug)
  if (!projectId) return local || null
  try {
    const client = createClient({ projectId, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production', apiVersion: '2024-10-01', useCdn: true })
    const post = await client.fetch('*[_type=="post"&&slug.current==$slug][0]{title,date,excerpt,body,"image":cover.asset->url}', { slug })
    return post || local || null
  } catch {
    return local || null
  }
}
