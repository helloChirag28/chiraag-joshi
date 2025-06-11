"use client";

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Twitter, Download } from 'lucide-react';
import Image from 'next/image';

const FloatingCube = () => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#5c6ac4" />
      </mesh>
    </Float>
  );
};

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 pb-12 md:pb-16 grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-8 mb-6 md:mb-8">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-primary/20 shadow-lg">
              <Image
                src="/images/Profile-Photo1.jpeg"
                alt="Profile"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Chirag Joshi
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium">
                Full Stack Engineer & Freelancer
              </p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 md:mb-8 text-center sm:text-left max-w-xl">
                       I&#39;m currently focused on expanding my experience designing and developing high performing websites.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base"
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-base"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Me
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-6 md:mt-8 justify-center sm:justify-start items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => window.open('https://github.com/helloChirag28', '_blank')}
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => window.open('https://in.linkedin.com/in/chirag-joshi-b76153173', '_blank')}
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              onClick={() => window.open('https://x.com/chiraag414?s=21', '_blank')}
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-2"
              onClick={() => {
                // Create a temporary link element to trigger the download
                const link = document.createElement('a');
                link.href = '/images/Chiraag_Joshi.pdf';
                link.download = 'Chiraag_Joshi_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </motion.div>
        
        <div className="h-[300px] sm:h-[400px] lg:h-[600px] lg:order-last">
          <Canvas camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingCube />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;