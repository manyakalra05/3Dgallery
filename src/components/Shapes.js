import * as THREE from 'three';

export const ShapeComponent = ({ shape, size, color }) => {
  switch (shape) {
    case 'sphere':
      return (
        <sphereGeometry args={size} />
      );
    case 'torus':
      return (
        <torusGeometry args={size} />
      );
    case 'cone':
      return (
        <coneGeometry args={size} />
      );
    case 'plane':
      return (
        <planeGeometry args={size} />
      );
    default:
      return (
        <boxGeometry args={size} />
      );
  }
};