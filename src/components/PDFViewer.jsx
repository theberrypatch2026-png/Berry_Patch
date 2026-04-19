import React, { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { pdfData } from '../pdf-data.js';

import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Setup worker locally via Vite asset imports
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

const PDFViewer = ({ pageNum }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let active = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const state = {
      s: 1.0,
      tx: 0,
      ty: 0,
      minS: 0.5,
      maxS: 5.0,
    };

    const applyTransform = () => {
      canvas.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.s})`;
      canvas.style.transformOrigin = 'center';
    };

    const loadPdf = async () => {
      try {
        const pdfDataBinary = atob(pdfData);
        const uint8Array = new Uint8Array(pdfDataBinary.length);
        for (let i = 0; i < pdfDataBinary.length; i++) {
          uint8Array[i] = pdfDataBinary.charCodeAt(i);
        }

        const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
        if (!active) return;
        const page = await pdf.getPage(pageNum);
        if (!active) return;

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;

        applyTransform();
      } catch (err) {
        console.error('Error loading PDF:', err);
        ctx.font = '20px React-Rendered';
        ctx.fillStyle = '#6B6868';
        ctx.textAlign = 'center';
        ctx.fillText('Could not load PDF document.', canvas.width / 2, canvas.height / 2);
      }
    };

    loadPdf();

    const container = canvas.parentElement;

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const rx = e.clientX - (rect.left + rect.width / 2);
        const ry = e.clientY - (rect.top + rect.height / 2);
        const s_old = state.s;
        const delta = -e.deltaY * 0.001;
        const s_new = Math.min(Math.max(state.s * (1 + delta), state.minS), state.maxS);

        if (s_new !== s_old) {
          state.tx = rx - s_new * (rx - state.tx) / s_old;
          state.ty = ry - s_new * (ry - state.ty) / s_old;
          state.s = s_new;
          applyTransform();
        }
      }
    };

    let isDragging = false;
    let startX = 0, startY = 0;

    const handleMouseDown = (e) => {
      if (state.s > 1) {
        isDragging = true;
        startX = e.clientX - state.tx;
        startY = e.clientY - state.ty;
        canvas.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        state.tx = e.clientX - startX;
        state.ty = e.clientY - startY;
        applyTransform();
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const handleDblClick = () => {
      state.s = 1.0;
      state.tx = 0;
      state.ty = 0;
      applyTransform();
    };

    let lastDist = 0;
    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        lastDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
        const midX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
        const midY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
        const rect = container.getBoundingClientRect();
        const rx = midX - (rect.left + rect.width / 2);
        const ry = midY - (rect.top + rect.height / 2);
        const s_old = state.s;
        const s_new = Math.min(Math.max(state.s * (dist / lastDist), state.minS), state.maxS);

        state.tx = rx - s_new * (rx - state.tx) / s_old;
        state.ty = ry - s_new * (ry - state.ty) / s_old;
        state.s = s_new;
        lastDist = dist;
        applyTransform();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('dblclick', handleDblClick);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      active = false;
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('dblclick', handleDblClick);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [pageNum]);

  return <canvas ref={canvasRef} style={{ cursor: 'grab', width: '100%', height: '100%', objectFit: 'contain' }}></canvas>;
};

export default PDFViewer;
