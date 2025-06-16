"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, useTexture, Sphere, Box, Torus, Cone } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Twitter, Download } from 'lucide-react';
import Image from 'next/image';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// Mobile-optimized Particles System
const Particles = ({ mouse, isMobile }: { mouse: THREE.Vector2; isMobile: boolean }) => {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const temp = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    const particleCount = isMobile ? 30 : 100; // Reduce particles on mobile
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * (isMobile ? 6 : 10),
          (Math.random() - 0.5) * (isMobile ? 6 : 10),
          (Math.random() - 0.5) * (isMobile ? 6 : 10),
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: Math.random() * 0.2 + 0.1,
      });
    }
    return temp;
  }, [isMobile]);

  useFrame((state) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        temp.position.set(...(particle.position as [number, number, number]));
        temp.rotation.set(
          particle.rotation[0] + state.clock.elapsedTime * 0.1,
          particle.rotation[1] + state.clock.elapsedTime * 0.15,
          particle.rotation[2] + state.clock.elapsedTime * 0.1
        );
        temp.scale.setScalar(particle.scale + Math.sin(state.clock.elapsedTime + i) * 0.1);
        temp.updateMatrix();
        mesh.current.setMatrixAt(i, temp.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, isMobile ? 30 : 100]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} />
    </instancedMesh>
  );
};

// Mobile-optimized Tech Stack Icons
const TechIcon = ({ position, shape, color, label, isMobile }: { 
  position: [number, number, number]; 
  shape: 'box' | 'sphere' | 'torus' | 'cone'; 
  color: string;
  label: string;
  isMobile: boolean;
}) => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime + position[1]) * 0.3;
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  const renderShape = () => {
    const size = isMobile ? 0.8 : 1; // Smaller on mobile
    switch (shape) {
      case 'sphere':
        return <sphereGeometry args={[0.3 * size, isMobile ? 8 : 16, isMobile ? 8 : 16]} />;
      case 'torus':
        return <torusGeometry args={[0.3 * size, 0.1 * size, isMobile ? 6 : 8, isMobile ? 12 : 16]} />;
      case 'cone':
        return <coneGeometry args={[0.3 * size, 0.6 * size, isMobile ? 6 : 8]} />;
      default:
        return <boxGeometry args={[0.5 * size, 0.5 * size, 0.5 * size]} />;
    }
  };

  return (
    <Float speed={isMobile ? 1 : 2} rotationIntensity={isMobile ? 0.5 : 1} floatIntensity={isMobile ? 0.5 : 1}>
      <mesh ref={mesh} position={position}>
        {renderShape()}
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.1}
        />
        {!isMobile && (
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        )}
      </mesh>
    </Float>
  );
};

// Main Centerpiece - Enhanced Floating Object
const CenterPiece = ({ mouse }: { mouse: THREE.Vector2 }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation based on time and mouse position
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 + mouse.y * 0.1;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3 + mouse.x * 0.1;
      
      // Floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      
      // Scale animation when hovered
      const targetScale = hovered ? 1.2 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Main geometric shape */}
      <mesh>
        <dodecahedronGeometry args={[1]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#1e40af"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.05, 8, 32]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.7} />
      </mesh>
      
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.2, 0.03, 8, 32]} />
        <meshStandardMaterial color="#06b6d4" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// Mouse follower component
const MouseFollower = ({ mouse }: { mouse: THREE.Vector2 }) => {
  const sphereRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.position.x = mouse.x * 2;
      sphereRef.current.position.y = mouse.y * 2;
      sphereRef.current.position.z = 2;
    }
  });

  return (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.1]} />
      <meshStandardMaterial 
        color="#f59e0b" 
        emissive="#f59e0b"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// Mobile-optimized Dynamic Lighting
const DynamicLights = ({ isMobile }: { isMobile: boolean }) => {
  const lightRef = useRef<THREE.PointLight>(null!);
  
  useFrame((state) => {
    if (lightRef.current && !isMobile) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime) * 3;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime) * 3;
      lightRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <>
      <ambientLight intensity={isMobile ? 0.6 : 0.4} />
      <pointLight 
        ref={lightRef} 
        position={[0, 5, 0]} 
        color="#3b82f6" 
        intensity={isMobile ? 0.8 : 1} 
      />
      {!isMobile && (
        <>
          <pointLight position={[-5, -5, 5]} color="#8b5cf6" intensity={0.5} />
          <pointLight position={[5, 5, -5]} color="#06b6d4" intensity={0.7} />
        </>
      )}
      <directionalLight position={[0, 10, 5]} intensity={isMobile ? 0.3 : 0.5} />
    </>
  );
};

// Main 3D Scene with mobile optimization
const ThreeScene = ({ isMobile }: { isMobile: boolean }) => {
  const [mouse, setMouse] = useState(new THREE.Vector2());
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse(new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      ));
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        setMouse(new THREE.Vector2(
          (touch.clientX / window.innerWidth) * 2 - 1,
          -(touch.clientY / window.innerHeight) * 2 + 1
        ));
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile]);

  // Tech stack configurations - reduced for mobile
  const techIcons = isMobile 
    ? [
        { position: [-2, 1, -1] as [number, number, number], shape: 'box' as const, color: '#61dafb', label: 'React' },
        { position: [2, 0, 0] as [number, number, number], shape: 'sphere' as const, color: '#000000', label: 'Next.js' },
        { position: [0, -1, 1] as [number, number, number], shape: 'torus' as const, color: '#3178c6', label: 'TypeScript' },
      ]
    : [
        { position: [-3, 2, -2] as [number, number, number], shape: 'box' as const, color: '#61dafb', label: 'React' },
        { position: [3, 1, -1] as [number, number, number], shape: 'sphere' as const, color: '#000000', label: 'Next.js' },
        { position: [-2, -1, 1] as [number, number, number], shape: 'torus' as const, color: '#3178c6', label: 'TypeScript' },
        { position: [2, -2, 0] as [number, number, number], shape: 'cone' as const, color: '#38bdf8', label: 'Tailwind' },
        { position: [0, 3, -3] as [number, number, number], shape: 'box' as const, color: '#10b981', label: 'Node.js' },
        { position: [-4, 0, 1] as [number, number, number], shape: 'sphere' as const, color: '#8b5cf6', label: 'Three.js' },
      ];

  return (
    <>
      <DynamicLights isMobile={isMobile} />
      <CenterPiece mouse={mouse} />
      <Particles mouse={mouse} isMobile={isMobile} />
      {!isMobile && <MouseFollower mouse={mouse} />}
      
      {/* Tech Stack Icons */}
      {techIcons.map((tech, index) => (
        <TechIcon
          key={index}
          position={tech.position}
          shape={tech.shape}
          color={tech.color}
          label={tech.label}
          isMobile={isMobile}
        />
      ))}
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2.5}
        autoRotate
        autoRotateSpeed={isMobile ? 0.3 : 0.5}
        enableDamping={true}
        dampingFactor={isMobile ? 0.1 : 0.05}
      />
    </>
  );
};

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
                src="/images/profile-photo1.jpeg"
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
            I&#39;m currently focused on expanding my experience designing and developing high performing websites with cutting-edge 3D technology.
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
        
        <div className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px] lg:order-last relative">
          <div className="absolute top-2 right-2 z-10 bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1 md:px-3 md:py-1">
            <p className="text-xs text-white/80">
              {isMobile ? "Touch to interact!" : "Interactive 3D Scene - Try moving your mouse!"}
            </p>
          </div>
          <Canvas 
            camera={{ 
              position: isMobile ? [3, 1, 3] : [5, 2, 5], 
              fov: isMobile ? 70 : 60 
            }}
            gl={{ 
              antialias: !isMobile, 
              alpha: true,
              powerPreference: isMobile ? "low-power" : "high-performance",
              stencil: false,
              depth: true
            }}
            onCreated={(state) => {
              state.gl.setClearColor('#000000', 0);
              if (isMobile) {
                state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
              }
            }}
            performance={{
              min: isMobile ? 0.2 : 0.5,
              max: 1,
              debounce: 200
            }}
          >
            <ThreeScene isMobile={isMobile} />
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;