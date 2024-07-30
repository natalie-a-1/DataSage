import React, { useRef, useEffect } from 'react';
import $3Dmol from '3dmol';

const Molecule3DViewer = ({ moleculeData }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = window.$3Dmol.createViewer(viewerRef.current, {
      backgroundColor: 'white',
    });

    viewer.clear();
    viewer.addModel(moleculeData, 'sdf');
    viewer.setStyle({}, { stick: {} });
    viewer.zoomTo();
    viewer.render();

    return () => {
      viewer.removeAllModels();
    };
  }, [moleculeData]);

  return <div style={{ width: '200px', height: '200px', position: 'relative' }} ref={viewerRef}></div>;
};

export default Molecule3DViewer;
