'use client'

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PMREMGenerator } from 'three/src/extras/PMREMGenerator';

interface SkyboxBannerProps {
  hdriPath: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const SkyboxBanner: React.FC<SkyboxBannerProps> = ({ hdriPath, onClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  console.log(hdriPath, 'SkyboxBanner 💦');

  useEffect(() => {
    let frameId: number | null = null;
    let localMount = mountRef.current;

    if (localMount) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, localMount.clientWidth / localMount.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(localMount.clientWidth, localMount.clientHeight);
      localMount.appendChild(renderer.domElement);

      // PMREM Generator for HDR Environment
      const pmremGenerator = new PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      // HDRI Skybox
      const rgbeLoader = new RGBELoader();
      rgbeLoader.setDataType(THREE.UnsignedByteType);

      rgbeLoader.load(
        hdriPath,
        (texture) => {
          if (texture) {
            console.log(texture, 'texture');
            // Correctly set the environment texture
            texture.mapping = THREE.EquirectangularReflectionMapping;
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
            scene.background = envMap;

            // Clean up
            texture.dispose();
            pmremGenerator.dispose();
          } else {
            console.error('Texture is not defined.');
          }
        },
        undefined,
        (error) => {
          console.error('An error occurred while loading the HDRI:', error);
        }
      );

      // Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.enabled = false;

      camera.position.set(0, 0, 2.5);
      controls.update();

      const animate = () => {
        frameId = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      frameId = requestAnimationFrame(animate);
      localMount.addEventListener('click', onClick);
    }

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      if (localMount) {
        localMount.removeEventListener('click', onClick);
      }
    };
  }, [hdriPath, onClick]);

  return <div ref={mountRef} className="banner-skybox" style={{ width: '100%', height: '100%' }} />;
};

export default SkyboxBanner;
