// app/components/profile/SkyboxBanner.tsx

'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface SkyboxBannerProps {
  hdriPath: string;
  onClick: () => void;
}

const SkyboxBanner: React.FC<SkyboxBannerProps> = ({ hdriPath, onClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef<number>(0); // Tracks rotation angle
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  useLayoutEffect(() => {
    if (!mountRef.current) return;

    console.log('hdriPath prop:', hdriPath);

    // Initialize Three.js Scene
    const scene = new THREE.Scene();

    // Initialize Camera with adjusted FOV for 175px height
    const camera = new THREE.PerspectiveCamera(
      65, // Reduced FOV for smaller height
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );

    // Position the camera to create a 45-degree upward angle
    const cameraDistance = 1.5; // Adjusted for smaller height
    camera.position.set(0, cameraDistance, cameraDistance);
    camera.lookAt(new THREE.Vector3(0, 1, 0)); // Looking upward at Y=1

    // Initialize Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mountRef.current.appendChild(renderer.domElement);

    // PMREM Generator for HDRI
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // Load HDRI
    const rgbeLoader = new RGBELoader();
    rgbeLoader.setDataType(THREE.HalfFloatType);

    rgbeLoader.load(
      hdriPath,
      (texture) => {
        console.log('HDRI loaded successfully from:', hdriPath);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.background = envMap;
        scene.environment = envMap;

        texture.dispose();
        pmremGenerator.dispose();

        setIsLoading(false); // HDRI loaded
      },
      (xhr) => {
        // Progress callback (optional)
        if (xhr.lengthComputable) {
          // console.log(`HDRI loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
        }
      },
      (error) => {
        console.error('Error loading HDRI:', error);
        setIsLoading(false); // Loading failed
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = true;
    controls.enableDamping = true;
    controls.enabled = true;

    controls.update();

    // Animation Loop for Camera Rotation
    const animate = () => {
      requestAnimationFrame(animate);

      // Increment rotation angle
      rotationRef.current += 0.0001; // Adjust speed as needed

      // Calculate new camera position in a circular path around Y-axis
      const radius = cameraDistance; // Distance from the center
      camera.position.x = radius * Math.cos(rotationRef.current);
      camera.position.z = radius * Math.sin(rotationRef.current);
      camera.lookAt(new THREE.Vector3(0, 3.75, 0)); // Keep looking upward at Y=1

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      console.log('Resized to:', {
        width: mountRef.current.clientWidth,
        height: mountRef.current.clientHeight,
      });
    };

    window.addEventListener('resize', handleResize);





    // Cleanup on Unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [hdriPath]);

  return (
    <div
      ref={mountRef}
      className="banner-skybox"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%', // Fill the parent container's height (175px)
        overflow: 'hidden',
        borderBottomLeftRadius: '20px', // Rounded bottom corners
        borderBottomRightRadius: '20px', // Rounded bottom corners
      }}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="text-white">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default SkyboxBanner;
