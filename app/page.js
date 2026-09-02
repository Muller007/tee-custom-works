'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [clipPercent, setClipPercent] = useState(50)
  const containerRef = useRef(null)
  const isActive = useRef(false)

  const handleSliderStart = () => {
    isActive.current = true
  }

  const handleSliderEnd = () => {
    isActive.current = false
  }

  const handleSliderMove = (e) => {
    if (!isActive.current) return

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    let x
    if (e.type.includes('touch')) {
      x = e.touches[0].clientX - rect.left
    } else {
      x = e.clientX - rect.left
    }

    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setClipPercent(percent)
  }

  return (
    <>
      {/* Header */}
 <header style={{
  padding: '0.75rem 1rem',
  background: 'white',
  borderBottom: '0.5px solid #e8e3dc',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  gap: '0.5rem'
}}>
  
  {/* LEFT: Logo */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <img 
      src="/tee-logo.png" 
      alt="Tee Custom Works" 
      style={{ height: '35px', width: 'auto' }} 
    />
    <span style={{ fontSize: '14px', fontWeight: '700', color: '#2c2c2a' }}>
      Tee
    </span>
  </div>
  
  {/* RIGHT: Social Links + WhatsApp Button */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
    
    {/* Facebook */}
    <a 
      href="https://facebook.com/teecustomkitchens" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ 
        textDecoration: 'none',
        fontSize: '16px',
        color: '#8b7355'
      }}
    >
      f
    </a>
    
    {/* Instagram */}
    <a 
      href="https://instagram.com/teecustomkitchens" 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ 
        textDecoration: 'none',
        fontSize: '16px',
        color: '#8b7355'
      }}
    >
      📷
    </a>
    
    {/* WhatsApp Button */}
    <button
      onClick={() => window.open('https://wa.me/27719577249', '_blank')}
      style={{
        background: '#8b7355',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        cursor: 'pointer'
      }}
    >
      💬
    </button>
    
  </div>
  
</header>

      {/* Hero Section */}
      <div
  className="hero-slider-container"
  ref={containerRef}
  onMouseDown={handleSliderStart}
  onMouseUp={handleSliderEnd}
  onMouseLeave={handleSliderEnd}
  onMouseMove={handleSliderMove}
  onTouchStart={handleSliderStart}
  onTouchEnd={handleSliderEnd}
  onTouchMove={handleSliderMove}
>
  <div className="slider-wrapper">
    <div className="slider-inner">
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #B89968 0%, #8B7355 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          color: 'white',
          fontWeight: '500',
          textAlign: 'center',
        }}
      >
        Before: Raw Space
      </div>

      <div
        className="slider-before"
        style={{ '--clip': `${clipPercent}%` }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(135deg, #6B5D4F 0%, #4A3F38 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: 'white',
            fontWeight: '500',
            textAlign: 'center',
          }}
        >
          After: Transformed
        </div>
      </div>

      <div
        className="slider-handle"
        style={{ '--clip': `${clipPercent}%` }}
      />

      <span className="slider-label before">Before</span>
      <span className="slider-label after">After</span>
    </div>
  </div>
</div>
      {/* Featured Projects */}
      <section className="projects" id="projects">
        <div className="section-title">
          <h2>Featured Works</h2>
          <p className="section-subtitle">
            Recent transformations that showcase our craftsmanship
          </p>
        </div>

        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">🍳</div>
            <div className="project-info">
              <div className="project-type">Custom Kitchen</div>
              <div className="project-name">Modern Minimalist Kitchen</div>
              <div className="project-desc">
                Sleek cabinetry with integrated appliances and premium finishes.
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">🚪</div>
            <div className="project-info">
              <div className="project-type">Built-in Wardrobe</div>
              <div className="project-name">Master Bedroom Wardrobe</div>
              <div className="project-desc">
                Floor-to-ceiling custom storage with sliding doors and
                soft-close hinges.
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">🏠</div>
            <div className="project-info">
              <div className="project-type">Kitchen Island</div>
              <div className="project-name">Custom Island with Seating</div>
              <div className="project-desc">
                Functional centerpiece with waterfall countertop and integrated
                storage.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Tee */}
      <section className="about" id="about">
        <h2>Meet Tee</h2>
        <p>
          With over a decade of experience in bespoke carpentry, Tee
          specializes in creating custom kitchens, wardrobes, and built-in
          furniture that blend functionality with timeless design. Every
          project is crafted with attention to detail and a commitment to
          excellence.
        </p>

        <div className="skills">
          <div className="skill-badge">Custom Kitchens</div>
          <div className="skill-badge">Wardrobes</div>
          <div className="skill-badge">Built-ins</div>
          <div className="skill-badge">Kitchen Islands</div>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--warm-taupe)', fontWeight: '500' }}>
          Trusted by families and businesses across the region
        </p>
      </section>

      {/* CTA Section */}
      <section className="cta" id="contact">
        <h2>Let&apos;s Create Your Dream Space</h2>
        <p>
          Message Tee on WhatsApp to discuss your project, get a consultation,
          and see how we can transform your home.
        </p>
        <div className="cta-buttons">
          <button
            className="btn-primary"
            onClick={() =>
              window.open('https://wa.me/27719577249', '_blank')
            }
          >
            Message on WhatsApp
          </button>
          <button
            className="btn-secondary"
            onClick={() => alert('Phone: +27719577249')}
          >
            Call for Details
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p style={{ marginBottom: '0.5rem' }}>
          Tee Custom Works © {new Date().getFullYear()}
        </p>
        <p style={{ margin: 0, fontSize: '12px' }}>
          Crafting excellence, one project at a time.
        </p>
      </footer>
    </>
  )
}
