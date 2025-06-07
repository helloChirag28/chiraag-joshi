"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Package, BookOpen, ShoppingCart, LucideIcon, ChevronLeft, ChevronRight, X, Shrink } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';
import { Inter } from 'next/font/google'
import { useTheme } from 'next-themes';

const inter = Inter({ subsets: ['latin'] })

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots: string[];
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  icon: LucideIcon;
}

const projects: Project[] = [
  {
    title: 'AI Persona',
    description: 'A modern analytics dashboard with real-time data visualization, user management, and subscription handling.',
    longDescription: `A sleek, animated AI web app where users build digital personas by selecting moods, professions, and interests — and AI generates a visual + textual 
    representation of that persona. Think of it as a blend of an interactive toy, design showcase, and smart AI
    🧠 AI Features
    1. OpenAI (GPT-4) generates personality bio, strengths, career path.
    2. Local memory — shows previous generated personas in a card grid.`,
    image: '/images/AIPersona1.png',
    screenshots: [
      '/images/AIPersona1.png',
      '/images/AIPersona2.png',
      '/images/AIPersona3.png',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'OpenAI', 'Framer Motion'],
    demoUrl: 'https://ai-persona-delta.vercel.app',
    githubUrl: 'https://github.com/helloChirag28/AIPersona',
    icon: Package,
  },
  {
    title: 'StrideX – Redefining Indian Streetwear',
    description: 'Inspired by Nike x Adidas, designed for cool, fast, and fearless branding.',
    longDescription: `This premium landing page showcases StrideX's urban fashion identity through rich animations, video campaigns, and bold typography.
     Built with Next.js 14 and Framer Motion, the site delivers an
     immersive brand experience with product highlights, hype-building sections, and interactive visuals — designed to captivate fashion-forward users.`,
    image: '/images/Stridex1.png',
    screenshots: [
      '/images/Stridex2.png',
      '/images/Stridex3.png',
      '/images/Stridex4.png',
    ],
  tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'ShadCN/UI', 'GSAP', 'Vercel', 'Bebas Neue', 'Modern UI'],
    demoUrl: 'https://strid-ex.vercel.app/',
    githubUrl: 'https://github.com/helloChirag28/stridEx',
    icon: Package,
  },
  {
    title: 'Cine Prompt Generator',
    description: 'A cinematic prompt builder for AI video tools — built for product lovers, creators.',
    longDescription: `Create cinematic AI video prompts for your products instantly.
Add product details, choose style & mood — get ready-to-use prompts for RunwayML, Pika, or Sora.
🔍 Key Highlights:
🎯 Product name, features & slogan input
🎨 Visual & music style selection
⚡ Instant prompt preview & copy
🧱 Built with Next.js, TailwindCSS, ShadCN
🎥 Perfect for ads, demos, and reels`,
    image: '/images/Cine1.png',
    screenshots: [
      '/images/Cine1.png',
      '/images/Cine2.png',
      '/images/Cine3.png',
    ],
    tags: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'ShadCN/UI',
      'Framer Motion',
      'Prompt Engineering',
      'AI Tools',
      'RunwayML',
      'Pika Labs',  
    ],
    demoUrl: 'https://cine-prompt-generator.vercel.app',
    githubUrl: 'https://github.com/helloChirag28/CinePromptGenerator',
    icon: Shrink,
  },
  {
    title: 'Modern E-commerce Platform',
    description: 'Full-featured e-commerce solution with product management, cart functionality, and payment integration.',
    longDescription: `A complete e-commerce solution built with modern technologies and best practices. Features include:

• Product catalog with categories and filters
• Shopping cart and wishlist functionality
• Secure payment processing with Stripe
• Order management and tracking
• Admin dashboard for inventory management
• Analytics and sales reporting
• Responsive design and optimized performance`,
    image: '/images/ecommerce.jpg',
    screenshots: [
      '/images/ecommerce-1.jpg',
      '/images/ecommerce-2.jpg',
      '/images/ecommerce-3.jpg',
    ],
    tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'Supabase', 'TypeScript', 'Redux'],
    demoUrl: '#',
    githubUrl: '#',
    icon: ShoppingCart,
  },
];

const WaveBackground = () => {
  const mesh = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null);
  const uniforms = useRef({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#0f172a') },
    uColorB: { value: new THREE.Color('#1e293b') },
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateColors = (isDark: boolean) => {
      if (mesh.current) {
        if (isDark) {
          mesh.current.material.uniforms.uColorA.value = new THREE.Color('#0f172a');
          mesh.current.material.uniforms.uColorB.value = new THREE.Color('#1e293b');
        } else {
          mesh.current.material.uniforms.uColorA.value = new THREE.Color('#ffffff');
          mesh.current.material.uniforms.uColorB.value = new THREE.Color('#f8fafc');
        }
      }
    };

    // Initial check
    updateColors(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => updateColors(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -2]} scale={[15, 15, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 5.0 + uTime) * 0.1;
            pos.z += sin(pos.y * 6.0 + uTime) * 0.1;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          uniform float uTime;

          void main() {
            vec3 color = mix(uColorA, uColorB, vUv.y + sin(vUv.x * 5.0 + uTime) * 0.1);
            gl_FragColor = vec4(color, 0.5);
          }
        `}
        transparent={true}
      />
    </mesh>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onImageClick: (image: string) => void;
}

const ProjectCard = ({ project, index, onImageClick }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group"
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <div className="relative rounded-xl overflow-hidden bg-card backdrop-blur-sm border border-primary/10 shadow-xl transform-gpu transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.02]" style={{ transform: "translateZ(75px)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index === 0}
                  className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="text-white w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <project.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" style={{ transform: "translateZ(50px)" }} />
                  <h3 className="text-lg md:text-xl font-semibold" style={{ transform: "translateZ(50px)" }}>{project.title}</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4" style={{ transform: "translateZ(25px)" }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5 md:gap-2" style={{ transform: "translateZ(35px)" }}>
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 md:py-1 bg-primary/10 text-primary rounded-md text-xs md:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[95vw] md:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-lg md:text-xl">
              <project.icon className="w-4 h-4 md:w-5 md:h-5" />
              {project.title}
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex-1">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-video cursor-pointer group"
                    onClick={() => onImageClick(screenshot)}
                  >
                    <Image
                      src={screenshot}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="rounded-lg shadow-md object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Click to preview</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="prose prose-sm dark:prose-invert">
                <p className="whitespace-pre-line text-sm md:text-base">{project.longDescription}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 md:py-1 bg-primary/10 text-primary rounded-md text-xs md:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 pt-4 border-t bg-background/95 backdrop-blur-sm flex-shrink-0">
            <Button asChild className="w-full sm:w-auto">
              <a 
                href={project.demoUrl}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projectsPerPage, setProjectsPerPage] = useState(1);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const { theme } = useTheme();

  useEffect(() => {
    const calculateProjectsPerPage = () => {
      if (typeof window !== 'undefined') {
        setProjectsPerPage(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
      }
    };

    calculateProjectsPerPage();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', calculateProjectsPerPage);
      return () => window.removeEventListener('resize', calculateProjectsPerPage);
    }
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return totalPages - 1;
      if (newIndex >= totalPages) return 0;
      return newIndex;
    });
  };

  const currentProjects = projects.slice(
    currentIndex * projectsPerPage,
    (currentIndex + 1) * projectsPerPage
  );

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <section id="projects" className="py-12 md:py-20 relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="absolute inset-0 h-full w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <WaveBackground />
        </Canvas>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 md:mb-12 gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={() => paginate(1)}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                aria-label="Next projects"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="min-h-[500px] md:min-h-[600px] relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 perspective-1000"
                >
                  {currentProjects.map((project, index) => (
                    <ProjectCard 
                      key={index} 
                      project={project} 
                      index={index} 
                      onImageClick={handleImageClick}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6 md:mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary w-4' : 'bg-primary/20'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Full-screen Image Preview */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <Image
              src={selectedImage}
              alt="Full preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              className="object-contain"
              priority
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;