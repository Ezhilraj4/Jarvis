import { lazy, Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Brain,
  Browser,
  Camera,
  ChartLineUp,
  Check,
  Cpu,
  DeviceMobile,
  FileText,
  GithubLogo,
  GlobeHemisphereEast,
  List,
  Memory,
  Microphone,
  Monitor,
  MoonStars,
  Play,
  PresentationChart,
  ShieldCheck,
  Sparkle,
  SpeakerHigh,
  Stack,
  X,
} from '@phosphor-icons/react'

const JarvisCore = lazy(() => import('./JarvisCore.jsx'))
const GodEyeGlobe = lazy(() => import('./GodEyeGlobe.jsx'))

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const capabilityGroups = [
  {
    label: 'Speak and understand',
    icon: Microphone,
    copy: 'Low latency Gemini Live voice, wake word, push to talk, multilingual replies, voice selection, self echo protection, and real lip sync.',
  },
  {
    label: 'See the screen',
    icon: Camera,
    copy: 'Screen and camera understanding flow into the active conversation, so JARVIS can inspect what you see and act with context.',
  },
  {
    label: 'Control the computer',
    icon: Monitor,
    copy: 'Open apps, manage windows, adjust system settings, navigate the browser, handle files, and undo supported actions by voice.',
  },
  {
    label: 'Research the web',
    icon: Browser,
    copy: 'Search, compare, inspect news, retrieve public academic evidence, and build source linked research briefs with uncertainty called out.',
  },
  {
    label: 'Create real files',
    icon: PresentationChart,
    copy: 'Generate editable Word papers, Excel workbooks, and PowerPoint decks with tables, charts, notes, transitions, figures, and source links.',
  },
  {
    label: 'Remember your world',
    icon: Memory,
    copy: 'Persistent local memory recalls preferences and projects while a visible memory panel lets you inspect or remove stored facts.',
  },
  {
    label: 'Run in the background',
    icon: Stack,
    copy: 'Routines, reminders, background tasks, topic monitors, morning briefings, and proactive check ins keep useful work moving.',
  },
  {
    label: 'Move between screens',
    icon: DeviceMobile,
    copy: 'A paired phone dashboard supports commands, file handoff, notifications, and a two way app call routed through the desktop assistant.',
  },
  {
    label: 'Open the observatory',
    icon: GlobeHemisphereEast,
    copy: 'God’s Eye brings ISS position, public space weather, NASA viewing links, live video when available, and a full three dimensional globe.',
  },
]

const studios = [
  { title: 'Research Studio', text: 'Move from a question to a proposal, literature review, study comparison, methods plan, dataset analysis, or defense outline.', icon: Brain },
  { title: 'Office Studio', text: 'Turn structured content into editable documents, workbooks, and presentation decks without flattening the result into an image.', icon: FileText },
  { title: 'Command Center', text: 'Watch system health, voice activity, tools, workflows, files, remote connections, and emergency controls from one surface.', icon: Cpu },
  { title: 'God’s Eye', text: 'Explore orbital and space weather data in a dedicated observatory, then open the immersive globe when the moment needs depth.', icon: GlobeHemisphereEast },
]

const faqs = [
  ['Is this only a chat interface?', 'No. The project combines live voice, screen and camera context, computer actions, local memory, studios, monitoring, remote phone control, and plugin tools.'],
  ['Does it work on more than Windows?', 'The project targets Windows, macOS, and Linux. Some system integrations use the native scheduling and startup tools provided by each operating system.'],
  ['Can JARVIS make PowerPoint files?', 'Yes. Office Studio can create editable PPTX decks with themes, speaker notes, source links, transitions, charts, and supplied or licensed images.'],
  ['What happens when an AI model is unavailable?', 'One shot requests use a measured nine model ladder with deadlines and cooldowns. Live voice uses a smaller compatible fallback path.'],
  ['Is phone access exposed to the public internet?', 'No. The included dashboard is designed to pair with the authenticated desktop server on the same local network. A public relay would need separate security work.'],
  ['Can it remember private information?', 'Memory is stored locally and can be inspected or deleted. Machine issued credentials are refused or masked so they do not become ordinary remembered facts.'],
  ['Can I add another capability?', 'Yes. Python plugins can declare a tool and handler, while trusted MCP servers can add local or remote tools to the live assistant.'],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Capabilities', '#capabilities'],
    ['Studios', '#studios'],
    ['Architecture', '#architecture'],
    ['FAQ', '#faq'],
  ]
  return (
    <nav className="nav-shell" aria-label="Primary navigation">
      <a href="#top" className="brand" aria-label="JARVIS home"><span className="brand-mark">J</span><span>JARVIS</span></a>
      <div className="desktop-nav">
        {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </div>
      <a className="nav-cta desktop-nav" href="#capabilities">Explore the system <ArrowRight size={16} weight="bold" /></a>
      <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
        {open ? <X size={24} /> : <List size={24} />}
      </button>
      {open && (
        <motion.div id="mobile-menu" className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {links.map(([label, href], index) => (
            <motion.a key={label} href={href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>{label}</motion.a>
          ))}
        </motion.div>
      )}
    </nav>
  )
}

function TaglineReveal() {
  const words = 'One voice to understand the moment. One system to move the work forward.'.split(' ')
  return (
    <section className="tagline-section" aria-label="JARVIS promise">
      <p>
        {words.map((word, index) => (
          <motion.span key={`${word}-${index}`} initial={{ color: 'rgba(255,255,255,0.28)' }} whileInView={{ color: '#ffffff' }} viewport={{ once: true, amount: 1 }} transition={{ duration: 0.5, delay: index * 0.045, ease: [0.22, 1, 0.36, 1] }}>{word}{' '}</motion.span>
        ))}
      </p>
    </section>
  )
}

function App() {
  const [activeFaq, setActiveFaq] = useState(0)

  useEffect(() => {
    document.documentElement.classList.add('loaded')
    return () => document.documentElement.classList.remove('loaded')
  }, [])

  return (
    <div id="top">
      <Nav />
      <main id="main">
        <section className="hero">
          <img className="hero-image" src="/assets/jarvis-command-core.png" alt="A luminous artificial intelligence core above Earth inside a futuristic command chamber" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <motion.div {...reveal}>
              <p className="eyebrow"><span /> Personal AI system</p>
              <h1>Your digital world.<br />One command away.</h1>
              <p className="hero-copy">JARVIS can hear, see, speak, remember, research, create real files, control your computer, and stay with you from desktop to phone.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#capabilities">Explore every capability <ArrowRight size={18} weight="bold" /></a>
                <a className="button button-secondary" href="#architecture"><Play size={18} weight="fill" /> See how it works</a>
              </div>
              <div className="proof-line"><ShieldCheck size={20} /><span>Local first memory</span><span>Three operating systems</span><span>Extensible tools</span></div>
            </motion.div>
          </div>
          <div className="hero-core"><Suspense fallback={<div className="scene-skeleton" aria-label="Loading three dimensional scene" />}><JarvisCore /></Suspense></div>
          <div className="hero-status" aria-label="System status"><span className="status-dot" /> System online <span>Gemini Live</span></div>
        </section>

        <section className="signal-strip" aria-label="Project highlights">
          <div><strong>9</strong><span>model fallback ladder</span></div>
          <div><strong>3</strong><span>editable Office formats</span></div>
          <div><strong>5</strong><span>native voice choices</span></div>
          <div><strong>24/7</strong><span>background routines</span></div>
        </section>

        <TaglineReveal />

        <section className="section" id="capabilities">
          <motion.div className="section-heading" {...reveal}>
            <p className="eyebrow"><span /> Capabilities</p>
            <h2>Built to act, not just answer.</h2>
            <p>Every surface connects to the same assistant context, tools, memory, and safety controls.</p>
          </motion.div>
          <div className="capability-grid">
            {capabilityGroups.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.article key={item.label} className={`capability-card ${index === 0 ? 'featured-card' : ''}`} {...reveal} transition={{ ...reveal.transition, delay: (index % 3) * 0.08 }}>
                  <div className="icon-box"><Icon size={24} /></div>
                  <span className="card-number">0{index + 1}</span>
                  <h3>{item.label}</h3>
                  <p>{item.copy}</p>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section className="section studios" id="studios">
          <motion.div className="section-heading split-heading" {...reveal}>
            <div><p className="eyebrow"><span /> Workspaces</p><h2>Four rooms.<br />One intelligence.</h2></div>
            <p>JARVIS changes its surface to match the work while the conversation, tools, and context stay connected.</p>
          </motion.div>
          <div className="studio-layout">
            <motion.div className="studio-visual" {...reveal}>
              <img src="/assets/jarvis-command-core.png" alt="A detailed JARVIS command core visualization" />
              <div className="studio-overlay">
                <span>Active workspace</span>
                <strong>Command Center</strong>
                <div className="wave-bars" aria-hidden="true">{Array.from({ length: 18 }).map((_, i) => <i key={i} style={{ '--bar': `${20 + ((i * 17) % 70)}%` }} />)}</div>
              </div>
            </motion.div>
            <div className="studio-list">
              {studios.map((studio, index) => {
                const Icon = studio.icon
                return (
                  <motion.article className="studio-item" key={studio.title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}>
                    <span className="studio-index">0{index + 1}</span>
                    <div><Icon size={22} /><h3>{studio.title}</h3><p>{studio.text}</p></div>
                    <ArrowRight size={20} />
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="observatory section">
          <div className="observatory-copy">
            <motion.div {...reveal}>
              <p className="eyebrow"><span /> God’s Eye observatory</p>
              <h2>Look beyond the desktop.</h2>
              <p>Track the public ISS position, inspect NOAA space weather, open NASA viewing sources, and move into an immersive orbital globe.</p>
              <ul>
                <li><Check size={18} weight="bold" /> Public orbital telemetry</li>
                <li><Check size={18} weight="bold" /> K index and GOES X ray readings</li>
                <li><Check size={18} weight="bold" /> NASA live viewing when available</li>
                <li><Check size={18} weight="bold" /> Informational market charts</li>
              </ul>
            </motion.div>
          </div>
          <motion.div className="globe-shell" {...reveal}>
            <div className="globe-label top-label"><span className="status-dot" /> Orbital link active</div>
            <Suspense fallback={<div className="scene-skeleton" aria-label="Loading orbital scene" />}><GodEyeGlobe /></Suspense>
            <div className="telemetry-row"><span>ISS</span><span>Altitude live</span><span>Velocity live</span></div>
          </motion.div>
        </section>

        <section className="architecture section" id="architecture">
          <motion.div className="section-heading centered-heading" {...reveal}>
            <p className="eyebrow"><span /> Architecture</p>
            <h2>One context across every surface.</h2>
            <p>A live voice core coordinates memory, tools, and task modules, then returns the result to the surface you are using.</p>
          </motion.div>
          <motion.div className="architecture-map" {...reveal}>
            <div className="architecture-node edge-node"><Microphone size={22} /><span>Voice</span></div>
            <div className="architecture-node edge-node"><Monitor size={22} /><span>Desktop</span></div>
            <div className="architecture-node edge-node"><DeviceMobile size={22} /><span>Phone</span></div>
            <div className="architecture-node core-node"><Sparkle size={28} weight="fill" /><strong>JARVIS core</strong><span>Live context</span></div>
            <div className="architecture-node edge-node"><Brain size={22} /><span>Models</span></div>
            <div className="architecture-node edge-node"><Memory size={22} /><span>Memory</span></div>
            <div className="architecture-node edge-node"><Stack size={22} /><span>Tools</span></div>
            <svg className="architecture-lines" viewBox="0 0 1000 480" preserveAspectRatio="none" aria-hidden="true">
              <path d="M145 90 C280 90 335 215 475 240"/><path d="M145 240 C300 240 350 240 475 240"/><path d="M145 390 C280 390 335 265 475 240"/>
              <path d="M525 240 C665 215 720 90 855 90"/><path d="M525 240 C650 240 700 240 855 240"/><path d="M525 240 C665 265 720 390 855 390"/>
            </svg>
          </motion.div>
          <div className="architecture-notes">
            <div><ShieldCheck size={22} /><strong>Confirm the serious actions</strong><p>Power, network, and other sensitive controls wait for a real user confirmation.</p></div>
            <div><MoonStars size={22} /><strong>Keep working quietly</strong><p>Routines and monitors run with visible status and return a useful result when ready.</p></div>
            <div><SpeakerHigh size={22} /><strong>Route each reply once</strong><p>Audio follows the active surface so the desktop and phone do not speak over each other.</p></div>
          </div>
        </section>

        <section className="section flow-section">
          <motion.div className="section-heading" {...reveal}>
            <p className="eyebrow"><span /> From request to result</p>
            <h2>Speak naturally. Get finished work.</h2>
          </motion.div>
          <div className="flow-grid">
            {[
              ['01', 'Ask', 'Speak, type, share a file, show the screen, or call from the paired phone.'],
              ['02', 'Reason', 'JARVIS keeps the live context, selects tools, checks memory, and plans the steps.'],
              ['03', 'Act', 'The system controls the computer, researches, creates a file, or runs a background task.'],
              ['04', 'Return', 'You receive one spoken reply, a visible result, an editable artifact, or a timely alert.'],
            ].map(([number, title, text], index) => (
              <motion.article key={title} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}><span>{number}</span><h3>{title}</h3><p>{text}</p></motion.article>
            ))}
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <motion.div className="section-heading" {...reveal}><p className="eyebrow"><span /> Questions</p><h2>What people ask first.</h2></motion.div>
          <div className="faq-layout">
            <div className="faq-list">
              {faqs.map(([question, answer], index) => (
                <article className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={question}>
                  <button onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}><span>{question}</span><span>{activeFaq === index ? '−' : '+'}</span></button>
                  {activeFaq === index && <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{answer}</motion.p>}
                </article>
              ))}
            </div>
            <aside className="faq-aside"><ChartLineUp size={32} /><h3>Built from a working project</h3><p>Every capability on this page maps to an action, interface, integration, or documented subsystem in the JARVIS codebase.</p><a href="#architecture">Review the architecture <ArrowRight size={17} /></a></aside>
          </div>
        </section>

        <section className="final-cta section">
          <motion.div {...reveal}>
            <span className="cta-orbit"><Sparkle size={28} weight="fill" /></span>
            <p className="eyebrow">System ready</p>
            <h2>A personal AI should feel personal.</h2>
            <p>One assistant. Your voice, your files, your tools, your memory, and your preferred way to work.</p>
            <div className="hero-actions"><a className="button button-primary" href="#top">Enter the command center <ArrowRight size={18} weight="bold" /></a><a className="button button-secondary" href="https://github.com/Ezhilraj4/Jarvis/tree/main/portfolio-site" target="_blank" rel="noreferrer"><GithubLogo size={18} /> View the source</a></div>
          </motion.div>
        </section>
      </main>

      <footer>
        <div className="footer-brand"><span className="brand-mark">J</span><div><strong>JARVIS</strong><p>Your digital world, one command away.</p></div></div>
        <div className="footer-links"><a href="#capabilities">Capabilities</a><a href="#studios">Studios</a><a href="#architecture">Architecture</a><a href="#privacy">Privacy</a><a href="#terms">Terms</a></div>
        <a className="footer-source" href="https://github.com/Ezhilraj4/Jarvis/tree/main/portfolio-site" target="_blank" rel="noreferrer"><GithubLogo size={20} /><span>Built with React and Three.js</span></a>
        <div className="legal" id="privacy"><strong>Privacy</strong><p>This portfolio does not collect personal data. The JARVIS desktop project keeps its own local memory and configuration on the user’s computer.</p></div>
        <div className="legal" id="terms"><strong>Terms</strong><p>This site describes the project as built. AI outputs, academic research, system actions, and public data sources should be reviewed before important use.</p></div>
      </footer>
    </div>
  )
}

export default App
