'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Layers, Palette, ChevronLeft, ChevronRight, Globe, ShieldCheck, Twitter, Linkedin, Mail } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DesignExample {
  id: string
  title: string
  description: string
  component: React.ReactNode
}

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  icon: React.ReactNode
}

interface Social {
  id: string
  name: string
  icon: React.ReactNode
  link: string
}

export default function Home() {
  const [dateTime, setDateTime] = useState('')
  const [chatMessage, setChatMessage] = useState('')
  const [isDesignsVisible, setIsDesignsVisible] = useState(false)
  const [isProjectsVisible, setIsProjectsVisible] = useState(false)
  const [isSocialsVisible, setIsSocialsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0)

  const designExamples: DesignExample[] = [
    {
      id: "glassmorphism",
      title: "Glassmorphism",
      description: "Modern UI with frosted glass effects",
      component: (
        <div className="bg-gradient-to-br from-teal-900 to-teal-600 p-4 sm:p-8 rounded-lg">
          <div className="glass-card p-4 sm:p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5" />
              <h4 className="text-lg">AI Assistant</h4>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
                Welcome! How can I help you today?
              </div>
              <div className="bg-white/5 p-3 sm:p-4 rounded-lg ml-4 sm:ml-6">
                I need help with my project.
              </div>
            </div>
            <Input 
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-white/10 border-0 focus-visible:ring-1 focus-visible:ring-white/20"
            />
          </div>
        </div>
      )
    },
    {
      id: "neumorphism",
      title: "Neumorphism",
      description: "Soft UI with subtle shadows",
      component: (
        <div className="bg-[#e0e0e0] p-4 sm:p-8 rounded-lg">
          <div className="bg-[#e0e0e0] p-4 sm:p-6 rounded-xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] space-y-4">
            <div className="flex items-center gap-3 text-gray-800">
              <Layers className="w-5 h-5" />
              <h4 className="text-lg">Dashboard</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#e0e0e0] p-3 sm:p-4 rounded-lg shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
                <span className="text-gray-600">Projects</span>
                <p className="text-xl sm:text-2xl text-gray-800 font-semibold">24</p>
              </div>
              <div className="bg-[#e0e0e0] p-3 sm:p-4 rounded-lg shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff]">
                <span className="text-gray-600">Tasks</span>
                <p className="text-xl sm:text-2xl text-gray-800 font-semibold">12</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "gradient",
      title: "Gradient Mesh",
      description: "Complex gradients with mesh effects",
      component: (
        <div className="bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 p-4 sm:p-8 rounded-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5" />
              <h4 className="text-lg">Color Theme</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['bg-purple-900', 'bg-purple-600', 'bg-pink-500'].map((color) => (
                <div
                  key={color}
                  className={`${color} h-16 sm:h-20 rounded-lg backdrop-blur-sm bg-opacity-50 
                    flex items-center justify-center border border-white/10`}
                >
                  <span className="text-xs text-white/70">{color}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ]

  const projects: Project[] = [
    {
      id: "fish-fling",
      title: "fling.fish",
      description: "physics sandbox for throwing squares around. an adhd toy.",
      technologies: ["NextJS", "MatterJS", "TailwindCSS", "TypeScript"],
      icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
    }
  ]

  const socials: Social[] = [
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      link: "https://twitter.com/nocturnalthots"
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      link: "https://www.linkedin.com/in/arlissmcgugin"
    },
    {
      id: "email",
      name: "Email",
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:ajmcgugin@gmail.com"
    }
  ]

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      const date = now.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).toUpperCase()
      setDateTime(`${time}\n${date}`)
    }
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setIsDesignsVisible(scrollPosition > windowHeight * 0.2)
      setIsProjectsVisible(scrollPosition > windowHeight * 0.6)
      setIsSocialsVisible(scrollPosition > windowHeight * 1.0)
    }

    const handleHash = () => {
      if (window.location.hash === '#designs') {
        setIsDesignsVisible(true)
        const designsSection = document.getElementById('designs')
        if (designsSection) {
          designsSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (window.location.hash === '#projects') {
        setIsProjectsVisible(true)
        const projectsSection = document.getElementById('projects')
        if (projectsSection) {
          projectsSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (window.location.hash === '#socials') {
        setIsSocialsVisible(true)
        const socialsSection = document.getElementById('socials')
        if (socialsSection) {
          socialsSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    
    updateDateTime()
    const timeInterval = setInterval(updateDateTime, 1000)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('hashchange', handleHash)
    handleHash() // Check hash on initial load
    
    return () => {
      clearInterval(timeInterval)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('hashchange', handleHash)
    }
  }, [])

  const handlePrevDesign = () => {
    setCurrentDesignIndex((prev) => 
      (prev - 1 + designExamples.length) % designExamples.length
    )
  }

  const handleNextDesign = () => {
    setCurrentDesignIndex((prev) => 
      (prev + 1) % designExamples.length
    )
  }

  const currentDesign = designExamples[currentDesignIndex]

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="flex justify-end mb-6">
        <pre className="text-xs text-zinc-300 text-right whitespace-pre monospace">{dateTime}</pre>
      </div>
      
      <div className="max-w-4xl mx-auto mt-8 sm:mt-16">
        <div className="rounded-2xl glass-card p-6 sm:p-12 mb-16 sm:mb-24">
          <div className="mb-6 sm:mb-8">
            <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="4" fill="currentColor" />
              <rect x="4" y="10" width="16" height="4" fill="currentColor" opacity="0.7" />
              <rect x="4" y="16" width="16" height="4" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal mb-6 sm:mb-8 leading-tight tracking-tight">
            Welcome to my portfolio
            <br />
            exploring design & technology
          </h1>
          <p className="text-zinc-200 mb-6 sm:mb-8 max-w-xl leading-relaxed">
            Discover my journey through design and development, featuring projects that showcase 
            creative solutions and innovative approaches to modern challenges.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#designs"
              className="inline-block bg-white text-black px-4 sm:px-6 py-2 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              VIEW DESIGNS
            </a>
            <a 
              href="#projects"
              className="inline-block bg-white text-black px-4 sm:px-6 py-2 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              VIEW PROJECTS
            </a>
            <a 
              href="#socials"
              className="inline-block bg-white text-black px-4 sm:px-6 py-2 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              CONNECT
            </a>
          </div>
        </div>

        <div 
          id="designs"
          className={`transition-all duration-1000 transform ${
            isDesignsVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="mb-16 sm:mb-24">
            <div className="glass-card p-6 sm:p-8 mb-8 sm:mb-12 rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-normal mb-4 leading-tight tracking-tight">
                Design Patterns
                <br />
                & Components
              </h2>
              <p className="text-zinc-200 max-w-xl leading-relaxed">
                Explore a collection of modern design patterns and components. Each example showcases 
                different styling approaches and interactions.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-0 sm:left-[-60px] top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={handlePrevDesign}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              <div className="absolute right-0 sm:right-[-60px] top-1/2 transform -translate-y-1/2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={handleNextDesign}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              <div 
                key={currentDesign.id}
                className="rounded-2xl glass-card p-6 sm:p-8 transition-all duration-500"
              >
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-normal mb-2">{currentDesign.title}</h3>
                  <p className="text-zinc-300 text-sm">{currentDesign.description}</p>
                </div>
                {currentDesign.component}
              </div>
            </div>
          </div>
        </div>

        <div 
          id="projects"
          className={`transition-all duration-1000 transform ${
            isProjectsVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="mb-16 sm:mb-24">
            <div className="glass-card p-6 sm:p-8 mb-8 sm:mb-12 rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-normal mb-4 leading-tight tracking-tight">
                Featured Projects
              </h2>
              <p className="text-zinc-200 max-w-xl leading-relaxed">
                Explore a selection of my most impactful projects, showcasing a range of technologies and problem-solving approaches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="rounded-2xl glass-card p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {project.icon}
                    <h3 className="text-xl sm:text-2xl font-normal">{project.title}</h3>
                  </div>
                  <p className="text-zinc-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          id="socials"
          className={`transition-all duration-1000 transform ${
            isSocialsVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-20 opacity-0'
          }`}
        >
          <div className="mb-16 sm:mb-24">
            <div className="glass-card p-6 sm:p-8 mb-8 sm:mb-12 rounded-2xl">
              <h2 className="text-2xl sm:text-3xl font-normal mb-4 leading-tight tracking-tight">
                Connect with Me
              </h2>
              <p className="text-zinc-200 max-w-xl leading-relaxed">
                Let's stay connected! Feel free to reach out through any of these platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl glass-card p-6 sm:p-8 transition-all duration-500 hover:scale-[1.02] flex flex-col items-center justify-center"
                >
                  {social.icon}
                  <span className="mt-4 text-lg">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end text-sm">
          <div className="text-zinc-300 uppercase max-w-xs tracking-wide mb-4 sm:mb-0">
            UI/UX DESIGN, WEB DEVELOPMENT, CREATIVE SOLUTIONS.
          </div>
          <div className="text-left sm:text-right text-zinc-300">
            <div>Creating meaningful experiences</div>
            <div>through design and technology</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 text-xs text-zinc-300">
          <div className="mb-4 sm:mb-0">© 2024 ARLISS</div>
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="sm:max-w-[625px]">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl sm:text-2xl flex items-center gap-4">
                  {selectedProject.icon}
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <h4 className="text-base sm:text-lg font-semibold mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-base sm:text-lg font-semibold mb-2">key features:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>fun</li>
                  <li>flingable</li>
                  <li>distracting</li>
                  <li>https://www.fling.fish/</li>
                </ul>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

