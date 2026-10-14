import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles } from 'lucide-react';

interface GraniteSlab3DViewerProps {
  finish: 'polished' | 'lapotra';
  className?: string;
}

export const GraniteSlab3DViewer: React.FC<GraniteSlab3DViewerProps> = ({
  finish = 'polished',
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const slabMeshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null; // transparent background

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.6);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Lighting Setup for Luxury Architectural Stone
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    // Directional Key Light (Warm showroom spotlight)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Rim Light (VSAAD Signature Purple Violet rim light)
    const rimLight = new THREE.DirectionalLight(0xc084fc, 1.6);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // Fill Light (Soft cool architectural fill)
    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.8);
    fillLight.position.set(-3, 3, 2);
    scene.add(fillLight);

    // Moving Spot Light for specular glint
    const spotLight = new THREE.SpotLight(0xffffff, 2.0);
    spotLight.position.set(0, 4, 3);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // 4. Granite Slab Geometry (calibrated slab proportions 3.0 x 1.8 x 0.14)
    const slabWidth = 2.8;
    const slabHeight = 1.7;
    const slabDepth = 0.12;

    const geometry = new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth, 32, 32, 4);

    // 5. Textures & Materials
    const textureLoader = new THREE.TextureLoader();
    const polishedTexture = textureLoader.load('/images/product-steel-grey-polished.jpg');
    polishedTexture.wrapS = THREE.RepeatWrapping;
    polishedTexture.wrapT = THREE.RepeatWrapping;
    polishedTexture.repeat.set(1.2, 1.2);

    const lapotraTexture = textureLoader.load('/images/product-steel-grey-lapotra.jpg');
    lapotraTexture.wrapS = THREE.RepeatWrapping;
    lapotraTexture.wrapT = THREE.RepeatWrapping;
    lapotraTexture.repeat.set(1.2, 1.2);

    const activeTexture = finish === 'polished' ? polishedTexture : lapotraTexture;

    const material = new THREE.MeshStandardMaterial({
      map: activeTexture,
      roughness: finish === 'polished' ? 0.08 : 0.65,
      metalness: finish === 'polished' ? 0.15 : 0.04,
      bumpMap: activeTexture,
      bumpScale: finish === 'polished' ? 0.012 : 0.075,
    });
    materialRef.current = material;

    const slabMesh = new THREE.Mesh(geometry, material);
    slabMesh.rotation.x = 0.18;
    slabMesh.rotation.y = -0.35;
    scene.add(slabMesh);
    slabMeshRef.current = slabMesh;

    // 6. Interaction State
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0.18;
    let targetRotY = -0.35;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      pointerX = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        prevMouseX = clientX;
        prevMouseY = clientY;

        targetRotY += deltaX * 0.012;
        targetRotX += deltaY * 0.012;

        // Clamp vertical tilt to keep slab view architectural
        targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 7. Animation Loop with Gentle Auto-Turn & Smooth Damping
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging) {
        // Slow luxury showroom auto-rotation
        targetRotY += delta * 0.12;
      }

      // Smooth interpolation for rotation
      slabMesh.rotation.y += (targetRotY - slabMesh.rotation.y) * 0.08;
      slabMesh.rotation.x += (targetRotX + pointerY * 0.08 - slabMesh.rotation.x) * 0.08;

      // Subtle reactive camera parallax
      camera.position.x += (pointerX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (0.4 + pointerY * 0.15 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Move specular spotlight subtly to create living specular reflections
      spotLight.position.x = Math.sin(slabMesh.rotation.y) * 3;
      spotLight.position.z = Math.cos(slabMesh.rotation.y) * 3 + 2;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      geometry.dispose();
      material.dispose();
      polishedTexture.dispose();
      lapotraTexture.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update material properties dynamically when finish prop changes
  useEffect(() => {
    if (!materialRef.current) return;
    const mat = materialRef.current;
    const textureLoader = new THREE.TextureLoader();

    if (finish === 'polished') {
      mat.roughness = 0.08;
      mat.metalness = 0.16;
      mat.bumpScale = 0.012;
      mat.map = textureLoader.load('/images/product-steel-grey-polished.jpg');
      mat.needsUpdate = true;
    } else {
      mat.roughness = 0.68;
      mat.metalness = 0.03;
      mat.bumpScale = 0.08;
      mat.map = textureLoader.load('/images/product-steel-grey-lapotra.jpg');
      mat.needsUpdate = true;
    }
  }, [finish]);

  return (
    <div
      className={`relative w-full h-full min-h-[380px] lg:min-h-[460px] rounded-lg overflow-hidden bg-gradient-to-b from-[#13131A] via-[#0E0E14] to-[#0A0A0F] border border-[#232330] shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing select-none group ${className}`}
    >
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 z-10" />

      {/* Interactive Helper Overlay Pills */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A26]/80 border border-vsaad-purple/40 backdrop-blur-md text-[11px] font-sans tracking-wider text-vsaad-purple-light uppercase">
          <Sparkles className="w-3 h-3 text-vsaad-purple" />
          <span>{isInteracting ? 'Active 3D Orbit' : 'Real-Time 3D Slab'}</span>
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#121218]/70 border border-[#2A2A38] backdrop-blur-md text-[10px] font-sans text-vsaad-ivory-dark uppercase tracking-wider">
          <span>{finish === 'polished' ? 'Polished (Mirror)' : 'Lapotra (Leathered)'}</span>
        </div>
      </div>

      <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12121A]/85 border border-[#252535] backdrop-blur-md text-[11px] font-sans text-vsaad-ivory-muted shadow-lg">
          <RotateCw className="w-3 h-3 text-vsaad-purple animate-spin-slow" />
          <span>Drag to orbit slab in 3D</span>
        </div>
        <div className="text-[10px] font-sans tracking-widest text-vsaad-ivory-dark uppercase hidden sm:block">
          Calibrated 20mm Specimen
        </div>
      </div>
    </div>
  );
};
