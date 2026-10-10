"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

type TestimonialGalleryProps = {
  testimonials: Testimonial[];
};

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export function TestimonialGallery({ testimonials }: TestimonialGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const pointerStart = useRef<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const navigate = useCallback((step: number) => {
    setDirection(step);
    setCurrent((index) => wrapIndex(index + step, testimonials.length));
  }, [testimonials.length]);

  const visible = [0, 1, 2].map((offset) => {
    const index = wrapIndex(current + offset, testimonials.length);
    return { item: testimonials[index], index };
  });

  const openLightbox = (index: number, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    window.setTimeout(() => lastTrigger.current?.focus(), 0);
  }, []);

  const navigateLightbox = useCallback((step: number) => {
    setLightboxIndex((index) => index === null ? null : wrapIndex(index + step, testimonials.length));
  }, [testimonials.length]);

  return (
    <>
      <div
        className="testimonial-gallery"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos autorizados"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") navigate(-1);
          if (event.key === "ArrowRight") navigate(1);
        }}
        onPointerDown={(event) => { pointerStart.current = event.clientX; }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          if (Math.abs(distance) > 45) navigate(distance > 0 ? -1 : 1);
          pointerStart.current = null;
        }}
        onPointerCancel={() => { pointerStart.current = null; }}
      >
        <div className="testimonial-toolbar">
          <button type="button" className="testimonial-arrow" onClick={() => navigate(-1)} aria-label="Ver depoimentos anteriores">
            <ChevronLeft />
          </button>
          <div className="testimonial-position" role="status" aria-live="polite">
            <span>{current + 1} de {testimonials.length}</span>
            <div className="testimonial-progress" aria-hidden="true"><i style={{ width: `${((current + 1) / testimonials.length) * 100}%` }} /></div>
          </div>
          <button type="button" className="testimonial-arrow" onClick={() => navigate(1)} aria-label="Ver próximos depoimentos">
            <ChevronRight />
          </button>
        </div>

        <div className="testimonial-viewport">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              className="testimonial-track"
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 36 : -36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -36 : 36 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {visible.map(({ item, index }, position) => (
                <button
                  type="button"
                  className={`testimonial-card testimonial-card-${position + 1}`}
                  key={item.id}
                  onClick={(event) => openLightbox(index, event.currentTarget)}
                  aria-label={`Ampliar ${item.alt.toLowerCase()}`}
                >
                  <Image src={item.image} alt={item.alt} width={828} height={1472} sizes="(max-width: 760px) 88vw, (max-width: 1050px) 44vw, 30vw" />
                  <span><Expand /> Ampliar</span>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <p className="testimonial-swipe-hint">Use as setas do teclado ou arraste para navegar.</p>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <TestimonialLightbox
            testimonial={testimonials[lightboxIndex]}
            position={lightboxIndex + 1}
            total={testimonials.length}
            onClose={closeLightbox}
            onPrevious={() => navigateLightbox(-1)}
            onNext={() => navigateLightbox(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

type LightboxProps = {
  testimonial: Testimonial;
  position: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

function TestimonialLightbox({ testimonial, position, total, onClose, onPrevious, onNext }: LightboxProps) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <motion.div
      className="testimonial-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className="testimonial-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Depoimento ${position} de ${total}`}
        initial={{ scale: 0.97, y: 18 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 18 }}
      >
        <button ref={closeButton} type="button" className="testimonial-close" onClick={onClose} aria-label="Fechar depoimento ampliado"><X /></button>
        <button type="button" className="testimonial-lightbox-arrow previous" onClick={onPrevious} aria-label="Depoimento anterior"><ChevronLeft /></button>
        <div className="testimonial-full-image">
          <Image src={testimonial.image} alt={testimonial.alt} width={828} height={1472} priority sizes="90vw" />
        </div>
        <button type="button" className="testimonial-lightbox-arrow next" onClick={onNext} aria-label="Próximo depoimento"><ChevronRight /></button>
        <span className="testimonial-lightbox-count">{position} / {total}</span>
      </motion.div>
    </motion.div>
  );
}
