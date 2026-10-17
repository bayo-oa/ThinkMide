import Reveal from '../components/Reveal'
import { getData } from '../lib/data'

export const revalidate = 60
const navLabel = { work: 'Work', about: 'About', skills: 'Skills', blog: 'Blog', contact: 'Contact' }

export default async function Home() {
  const { settings: s, profile: p, projects, posts, skills } = await getData()
  const [first, ...rest] = p.name.split(' ')
  const loop = [...skills, ...skills]
  const order = s.sectionOrder.filter((k) => navLabel[k])
  const links = order.map((k) => [navLabel[k], `#${k}`])

  const sections = {
    work: (
      <section id="work" className="section">
        <h2>{s.workTitle}</h2>
        <div className="projects">
          {projects.map((pr) => (
            <Reveal key={pr.title} className="project">
              <div className="thumb"><img src={pr.image} alt={pr.title} loading="lazy" /></div>
              <div className="pbody">
                <h3>{pr.title}</h3>
                <p>{pr.summary}</p>
                <ul>{(pr.tech || []).map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="plinks">{pr.liveUrl && <a href={pr.liveUrl}>Live site</a>}{pr.repoUrl && <a href={pr.repoUrl}>Source code</a>}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    ),
    about: (
      <section id="about" className="section light">
        <div className="about">
          <img src={p.photo} alt="" loading="lazy" />
          <div><h2>{s.aboutTitle}</h2><p>{p.bio}</p></div>
        </div>
      </section>
    ),
    skills: (
      <section id="skills" className="section">
        <h2>{s.skillsTitle}</h2>
        <div className="chips">{skills.map((k) => <span key={k.name}>{k.name}</span>)}</div>
      </section>
    ),
    blog: (
      <section id="blog" className="section orange">
        <h2>{s.blogTitle}</h2>
        <div className="posts">
          {posts.map((po) => (
            <a key={po.slug} href={`/blog/${po.slug}`} className="post">
              <img src={po.image} alt="" loading="lazy" />
              <div><time>{po.date}</time><h3>{po.title}</h3><p>{po.excerpt}</p></div>
            </a>
          ))}
        </div>
      </section>
    ),
    contact: (
      <section id="contact" className="section contact">
        <h2>{s.contactTitle}</h2>
        <a className="mail" href={`mailto:${p.email}`}>{p.email}</a>
        <div className="plinks">{p.github && <a href={p.github}>GitHub</a>}{p.linkedin && <a href={p.linkedin}>LinkedIn</a>}</div>
      </section>
    ),
  }

  return (
    <>
      <header className="topnav">
        <a className="logo" href="#top">{s.brandName}</a>
        <nav>{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        <a className="btn small" href="#contact">Hire me</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="intro">{s.intro}</p>
            <h1><span className="line"><span>{first}</span></span><span className="line"><span>{rest.join(' ')}</span></span></h1>
            <p className="lead">{p.headline}</p>
            <div className="cta"><a className="btn" href="#work">{s.ctaPrimary}</a><a className="btn ghost" href="#contact">{s.ctaSecondary}</a></div>
          </div>
          <div className="hero-photo"><div className="block" /><img src={p.photo} alt={p.name} /></div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="track">{loop.map((k, i) => <span key={i}>{k.name}</span>)}</div></div>

        {order.map((k) => <div key={k}>{sections[k]}</div>)}
      </main>

      <footer className="foot">© {new Date().getFullYear()} {p.name}. {s.footerNote}</footer>

      <nav className="tabbar" aria-label="Sections">{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
    </>
  )
}
