import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFBX, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface FBXViewerProps {
  src: string;
  scale?: number[] | undefined;
}

interface FBXModelProps {
  src: string;
  scale?: number[] | undefined;
}

const FBXModel: React.FC<FBXModelProps> = ({ src, scale }) => {
  console.log(src, scale, "🐶🐶🐶🐶🐶")
  const modelRef = useRef<THREE.Object3D>(null);
  const fbx = useFBX(src);
  return fbx ? (
    <primitive
      object={fbx}
      ref={modelRef}
      scale={scale}
      position={[0, 0, 0]}
    />
  ) : null;
};

  const FBXViewer: React.FC<FBXViewerProps> = ({ src, scale }) => {
    console.log(src, scale, "🐶🐶🐶🐶🐶")
      return (
        <div className="fbx-viewer-container" style={{ width: '100%', height: '250px', position: 'relative' }}>
          <Canvas className="w-full h-full">
            <ambientLight intensity={4} />
            <pointLight position={[10, 10, 10]} />
            <FBXModel src={src} scale={scale} />
            <OrbitControls 
                enableZoom={true}
                minAzimuthAngle={-Math.PI / 4} // Limit left rotation
                maxAzimuthAngle={Math.PI / 4}  // Limit right rotation
                minPolarAngle={Math.PI / 4}    // Limit upward rotation
                maxPolarAngle={Math.PI / 2}    // Limit downward rotation
              />
          </Canvas>
        </div>
      );
    };

export default FBXViewer;
