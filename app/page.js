import Reveal from '../components/Reveal'
import { getData } from '../lib/data'

export const revalidate = 60
const links = [['Work', '#work'], ['About', '#about'], ['Skills', '#skills'], ['Blog', '#blog'], ['Contact', '#contact']]

export default async function Home() {
  const { profile: p, projects, posts, skills } = await getData()
  const [first, ...rest] = p.name.split(' ')
  const loop = [...skills, ...skills]

  return (
    <>
      <header className="topnav">
        <a className="logo" href="#top">ThinkMide</a>
        <nav>{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        <a className="btn small" href="#contact">Hire me</a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="intro">Web developer, available for jobs and freelance</p>
            <h1><span className="line"><span>{first}</span></span><span className="line"><span>{rest.join(' ')}</span></span></h1>
            <p className="lead">{p.headline}</p>
            <div className="cta"><a className="btn" href="#work">See my work</a><a className="btn ghost" href="#contact">Start a project</a></div>
          </div>
          <div className="hero-photo"><div className="block" /><img src={p.photo} alt={p.name} /></div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="track">{loop.map((s, i) => <span key={i}>{s.name}</span>)}</div></div>

        <section id="work" className="section">
          <h2>Selected work</h2>
          <div className="projects">
            {projects.map((pr) => (
              <Reveal key={pr.title} className="project">
                <div className="thumb"><img src={pr.image} alt={pr.title} loading="lazy" /></div>
                <div className="pbody">
                  <h3>{pr.title}</h3>
                  <p>{pr.summary}</p>
                  <ul>{(pr.tech || []).map((t) => <li key={t}>{t}</li>)}</ul>
                  <div className="plinks"><a href={pr.liveUrl}>Live site</a><a href={pr.repoUrl}>Source code</a></div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="about" className="section light">
          <div className="about">
            <img src={p.photo} alt="" loading="lazy" />
            <div><h2>About me</h2><p>{p.bio}</p></div>
          </div>
        </section>

        <section id="skills" className="section">
          <h2>Skills and tech stack</h2>
          <div className="chips">{skills.map((s) => <span key={s.name}>{s.name}</span>)}</div>
        </section>

        <section id="blog" className="section orange">
          <h2>Writing</h2>
          <div className="posts">
            {posts.map((po) => (
              <article key={po.slug} className="post">
                <img src={po.image} alt="" loading="lazy" />
                <div><time>{po.date}</time><h3>{po.title}</h3><p>{po.excerpt}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2>Have a project in mind?</h2>
          <a className="mail" href={`mailto:${p.email}`}>{p.email}</a>
          <div className="plinks"><a href={p.github}>GitHub</a><a href={p.linkedin}>LinkedIn</a></div>
        </section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} {p.name}. Built with ThinkMide.</footer>

      <nav className="tabbar" aria-label="Sections">{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
    </>
  )
}
