'use client';
import { useState, useRef } from 'react';

export default function Home() {
  const [clipPercent, setClipPercent] = useState(50);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  // Calculate text visibility based on slider position
  const beforeVisibility = Math.max(0, 1 - (clipPercent / 30));
  const afterVisibility = Math.max(0, (clipPercent - 70) / 30);
  const percentVisibility = clipPercent > 25 && clipPercent < 75 ? 1 : 0;

  // Handle slider drag
  const handleSliderStart = () => setIsDragging(true);
  const handleSliderEnd = () => setIsDragging(false);

  const handleSliderMove = (e) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = e.clientX ? e.clientX - rect.left : e.touches[0].clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setClipPercent(percent);
  };

  // Handle form submission
  const handleFormSubmit = () => {
    const whatsappMessage = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nProject Type: ${formData.projectType}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/27719577249?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Send email via FormSubmit.co (free service)
    fetch('https://formspree.io/f/xyzabc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        message: formData.message
      })
    });

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
    setChatStep(0);
    setChatOpen(false);
  };

  const chatMessages = [
    "Hi! 👋 Welcome to Tee Custom Kitchens. What's your name?",
    "Nice to meet you! What's your email address?",
    "Thanks! And your phone number?",
    "What type of project are you interested in?",
    "Tell us more about your project!",
    "Perfect! Let me send this to Tee via WhatsApp and Email."
  ];

  return (
    <div className="min-h-screen bg-white">
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
        gap: '1rem',
        flexWrap: 'nowrap'
      }}>
        
        {/* LEFT: Logo - Rounded and Bigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#8b7355',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(139, 115, 85, 0.3)'
          }}>
            <img 
              src="/logo-circular-badge.svg" 
              alt="Tee Custom Kitchens" 
              style={{ height: '45px', width: '45px', borderRadius: '50%', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ fontSize: '15px', fontWeight: '700', color: '#2c2c2a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Tee
            </span>
            <span style={{ fontSize: '10px', color: '#999', letterSpacing: '0.5px' }}>
              CUSTOM WORKS
            </span>
          </div>
        </div>
        
        {/* RIGHT: Social Links + WhatsApp Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          
          {/* Facebook */}
          <a 
            href="https://facebook.com/teecustomkitchens" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              textDecoration: 'none',
              fontSize: '18px',
              color: '#8b7355',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center'
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
              fontSize: '18px',
              color: '#8b7355',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center'
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
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background 0.2s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.target.style.background = '#7a6349'}
            onMouseLeave={(e) => e.target.style.background = '#8b7355'}
          >
            💬 Chat
          </button>
          
        </div>
        
      </header>

      {/* Hero Section with Before/After Slider */}
      <section className="hero" style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#2c2c2a',
          fontFamily: 'serif'
        }}>
          Custom Kitchens & Wardrobes
        </h1>

        {/* Before/After Slider */}
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
          style={{
            maxWidth: '800px',
            margin: '0 auto 2rem',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            cursor: 'col-resize',
            height: '400px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            backgroundColor: '#fafaf8'
          }}
        >
          {/* AFTER IMAGE (Background) */}
          <img
            src="/after.jpg"
            alt="After: Transformed Space"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              top: 0,
              left: 0
            }}
          />

          {/* BEFORE IMAGE (Clipped) */}
          <div
            className="slider-before"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              clipPath: `polygon(0% 0%, ${clipPercent}% 0%, ${clipPercent}% 100%, 0% 100%)`
            }}
          >
            <img
              src="/before.jpg"
              alt="Before: Raw Space"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                top: 0,
                left: 0
              }}
            />
          </div>

          {/* Slider Handle (Vertical Line with Glow) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${clipPercent}%`,
              width: '4px',
              height: '100%',
              background: 'white',
              cursor: 'col-resize',
              boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(139,115,85,0.4)',
              transform: 'translateX(-50%)',
              zIndex: 10,
              transition: 'box-shadow 0.2s ease'
            }}
          />

          {/* BEFORE Label - Only appears on left side */}
          <span
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '700',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: beforeVisibility,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              transform: beforeVisibility > 0.5 ? 'translateX(0) scale(1)' : 'translateX(-15px) scale(0.9)',
              letterSpacing: '1px'
            }}
          >
            BEFORE
          </span>

          {/* AFTER Label - Only appears on right side */}
          <span
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '700',
              zIndex: 5,
              pointerEvents: 'none',
              opacity: afterVisibility,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              transform: afterVisibility > 0.5 ? 'translateX(0) scale(1)' : 'translateX(15px) scale(0.9)',
              letterSpacing: '1px'
            }}
          >
            AFTER
          </span>

          {/* Creative Percentage Indicator - Center Only */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.8)',
              color: '#d4a574',
              padding: '16px 28px',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '700',
              zIndex: 8,
              pointerEvents: 'none',
              opacity: percentVisibility,
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              textAlign: 'center',
              backdropFilter: 'blur(6px)',
              transform: percentVisibility > 0 ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.8)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ fontSize: '13px', opacity: 0.85, marginBottom: '6px', letterSpacing: '0.5px' }}>
              Drag to Compare
            </div>
            <div style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '1px' }}>
              {Math.round(clipPercent)}% • {Math.round(100 - clipPercent)}%
            </div>
          </div>

          {/* Subtle gradient overlay at top showing blend */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: `linear-gradient(to right, rgba(139,115,85,0.9) 0%, rgba(212,165,116,0.9) ${clipPercent}%, rgba(100,100,100,0.4) ${clipPercent}%, rgba(50,50,50,0.4) 100%)`,
              zIndex: 9,
              pointerEvents: 'none'
            }}
          />

          {/* Instructions at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontSize: '12px',
              zIndex: 5,
              opacity: 0.6,
              pointerEvents: 'none',
              background: 'rgba(0,0,0,0.3)',
              padding: '6px 12px',
              borderRadius: '4px'
            }}
          >
            ← Swipe or drag →
          </div>
        </div>

        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          marginBottom: '2rem',
          marginTop: '0.5rem'
        }}>
          Reveal the transformation
        </p>
      </section>

      {/* VIDEO SECTION - NEW */}
      <section style={{
        padding: '3rem 1rem',
        backgroundColor: '#fff',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#8B7355',
          fontFamily: 'serif'
        }}>
          Recent Project Videos
        </h2>

        {/* Video Upload/Display Area */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Video 1 */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              width: '100%',
              paddingBottom: '56.25%',
              position: 'relative',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <video
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                controls
              >
                <source src="/project-video-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Fallback if no video uploaded */}
              {!true && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: '#999'
                }}>
                  🎬
                </div>
              )}
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2c2c2a',
                margin: '0 0 0.5rem 0'
              }}>
                Custom Kitchen Installation
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                margin: 0
              }}>
                Watch our latest kitchen transformation project
              </p>
            </div>
          </div>

          {/* Video 2 */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              width: '100%',
              paddingBottom: '56.25%',
              position: 'relative',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <video
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                controls
              >
                <source src="/project-video-2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Fallback if no video uploaded */}
              {!true && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: '#999'
                }}>
                  🎬
                </div>
              )}
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2c2c2a',
                margin: '0 0 0.5rem 0'
              }}>
                Bedroom Wardrobe Design
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                margin: 0
              }}>
                Beautiful custom wardrobe installation process
              </p>
            </div>
          </div>

          {/* Video 3 */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              width: '100%',
              paddingBottom: '56.25%',
              position: 'relative',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <video
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                controls
              >
                <source src="/project-video-3.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Fallback if no video uploaded */}
              {!true && (
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: '#999'
                }}>
                  🎬
                </div>
              )}
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#2c2c2a',
                margin: '0 0 0.5rem 0'
              }}>
                Island Kitchen Build
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#666',
                margin: 0
              }}>
                Professional island kitchen construction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="featured-works" style={{ 
        padding: '3rem 1rem',
        backgroundColor: '#fafaf8'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '0.5rem',
          color: '#8B7355',
          fontFamily: 'serif'
        }}>
          Featured Works
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#999',
          marginBottom: '3rem',
          fontSize: '1.1rem'
        }}>
          Recent transformations that showcase our craftsmanship
        </p>

        {/* Project Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            { image: '/kitchen-1.jpg', title: 'Modern Kitchen', type: 'Kitchen Design' },
            { image: '/wardrobe-1.jpg', title: 'Custom Wardrobes', type: 'Bedroom Setup' },
            { image: '/kitchen-2.jpg', title: 'Island Kitchen', type: 'Kitchen Design' }
          ].map((project, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
              }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '1.5rem' }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#d4a574',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 0.5rem 0'
                }}>
                  {project.type}
                </p>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  margin: '0',
                  color: '#2c2c2a',
                  fontFamily: 'serif'
                }}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full Gallery Section */}
      <section style={{
        padding: '3rem 1rem',
        backgroundColor: '#fff',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#8B7355',
          fontFamily: 'serif'
        }}>
          Our Complete Portfolio
        </h2>

        {/* Gallery Grid - 3 columns responsive */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          padding: '0'
        }}>
          {[
            '/kitchen-1.jpg', '/kitchen-2.jpg', '/kitchen-3.jpg',
            '/wardrobe-1.jpg', '/wardrobe-2.jpg', '/wardrobe-3.jpg',
            '/island-1.jpg', '/island-2.jpg', '/other-1.jpg'
          ].map((image, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                aspectRatio: '1',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={image}
                alt={`Project ${i + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'filter 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.filter = 'brightness(0.8)'}
                onMouseLeave={(e) => e.target.style.filter = 'brightness(1)'}
              />
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: '#fafaf8',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '2rem',
          color: '#2c2c2a',
          fontFamily: 'serif',
          textAlign: 'center'
        }}>
          About Tee
        </h2>

        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#555',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          With over a decade of experience in custom cabinetry and wardrobe design, 
          Tee brings precision craftsmanship and innovative design to every project. 
          From modern kitchens to elegant wardrobes, each piece is built to perfection.
        </p>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          {[
            { skill: 'Custom Kitchens', icon: '🍳' },
            { skill: 'Bedroom Wardrobes', icon: '🛏️' },
            { skill: 'Modern Design', icon: '✨' },
            { skill: 'Quality Materials', icon: '🔨' }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {item.icon}
              </div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#8b7355',
                margin: 0
              }}>
                {item.skill}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION - NEW WITH EMAIL */}
      <section style={{
        padding: '3rem 1rem',
        backgroundColor: '#fff',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#8B7355',
          fontFamily: 'serif'
        }}>
          Get In Touch
        </h2>

        {/* Contact Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* WhatsApp */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>💬</div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#2c2c2a',
              marginBottom: '0.5rem'
            }}>
              WhatsApp
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#666',
              marginBottom: '1rem'
            }}>
              Quick responses and easy communication
            </p>
            <a 
              href="https://wa.me/27719577249"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#25D366',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#20BA58'}
              onMouseLeave={(e) => e.target.style.background = '#25D366'}
            >
              Send Message
            </a>
          </div>

          {/* Email */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#2c2c2a',
              marginBottom: '0.5rem'
            }}>
              Email
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#666',
              marginBottom: '1rem'
            }}>
              tee@teecustomkitchens.co.za
            </p>
            <a 
              href="mailto:tee@teecustomkitchens.co.za"
              style={{
                display: 'inline-block',
                background: '#8b7355',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#7a6349'}
              onMouseLeave={(e) => e.target.style.background = '#8b7355'}
            >
              Send Email
            </a>
          </div>

          {/* Phone */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: '600',
              color: '#2c2c2a',
              marginBottom: '0.5rem'
            }}>
              Phone
            </h3>
            <p style={{
              fontSize: '0.95rem',
              color: '#666',
              marginBottom: '1rem'
            }}>
              Call or text anytime
            </p>
            <a 
              href="tel:+27719577249"
              style={{
                display: 'inline-block',
                background: '#8b7355',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#7a6349'}
              onMouseLeave={(e) => e.target.style.background = '#8b7355'}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '3rem 1rem',
        backgroundColor: '#8b7355',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          fontFamily: 'serif'
        }}>
          Ready to Transform Your Space?
        </h2>
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          opacity: 0.95
        }}>
          Let&apos;s bring your vision to life with custom kitchens and wardrobes
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => window.open('https://wa.me/27719577249', '_blank')}
            style={{
              background: '#d4a574',
              color: '#2c2c2a',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            💬 WhatsApp Us
          </button>
          <button
            onClick={() => window.location.href = 'tel:+27719577249'}
            style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '12px 30px',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#8b7355';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'white';
            }}
          >
            📞 Call Us
          </button>
        </div>
      </section>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#8b7355',
          color: 'white',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(139, 115, 85, 0.4)',
          transition: 'all 0.3s ease',
          zIndex: 999
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 20px rgba(139, 115, 85, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.4)';
        }}
      >
        💬
      </button>

      {/* Chatbot Modal */}
      {chatOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '320px',
          maxHeight: '500px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          zIndex: 998,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Chat Header */}
          <div style={{
            background: '#8b7355',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px 12px 0 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Tee Custom Kitchens</h3>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            overflow: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            minHeight: '250px'
          }}>
            {/* Bot Message */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start'
            }}>
              <div style={{
                background: '#f0f0f0',
                color: '#2c2c2a',
                padding: '10px 14px',
                borderRadius: '10px',
                maxWidth: '80%',
                fontSize: '0.9rem'
              }}>
                {chatMessages[chatStep]}
              </div>
            </div>

            {/* User Input/Display */}
            {chatStep === 0 && (
              <input
                type="text"
                placeholder="Your name..."
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
            )}
            {chatStep === 1 && (
              <input
                type="email"
                placeholder="Your email..."
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
            )}
            {chatStep === 2 && (
              <input
                type="tel"
                placeholder="Your phone..."
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              />
            )}
            {chatStep === 3 && (
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem'
                }}
              >
                <option value="">Select project type...</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Wardrobe">Wardrobe</option>
                <option value="Both">Both</option>
                <option value="Other">Other</option>
              </select>
            )}
            {chatStep === 4 && (
              <textarea
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e0e0e0',
                  fontSize: '0.9rem',
                  minHeight: '80px',
                  fontFamily: 'inherit'
                }}
              />
            )}
          </div>

          {/* Chat Footer */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '0.5rem'
          }}>
            {chatStep < 5 ? (
              <>
                <button
                  onClick={() => {
                    if (chatStep === 0 && !formData.name) return;
                    if (chatStep === 1 && !formData.email) return;
                    if (chatStep === 2 && !formData.phone) return;
                    if (chatStep === 3 && !formData.projectType) return;
                    setChatStep(chatStep + 1);
                  }}
                  style={{
                    flex: 1,
                    background: '#8b7355',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  Next →
                </button>
                {chatStep > 0 && (
                  <button
                    onClick={() => setChatStep(chatStep - 1)}
                    style={{
                      width: '40px',
                      background: '#f0f0f0',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    ← Back
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={handleFormSubmit}
                style={{
                  flex: 1,
                  background: '#25D366',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Send to WhatsApp & Email ✓
              </button>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        padding: '2rem 1rem',
        backgroundColor: '#2c2c2a',
        color: 'white',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0.5rem 0' }}>© 2026 Tee Custom Kitchens. All rights reserved.</p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <a href="https://facebook.com/teecustomkitchens" target="_blank" rel="noopener noreferrer"
            style={{ color: '#d4a574', textDecoration: 'none', fontSize: '0.95rem' }}>
            Facebook
          </a>
          <a href="https://instagram.com/teecustomkitchens" target="_blank" rel="noopener noreferrer"
            style={{ color: '#d4a574', textDecoration: 'none', fontSize: '0.95rem' }}>
            Instagram
          </a>
          <a href="https://wa.me/27719577249" target="_blank" rel="noopener noreferrer"
            style={{ color: '#d4a574', textDecoration: 'none', fontSize: '0.95rem' }}>
            WhatsApp
          </a>
          <a href="mailto:tee@teecustomworks.co.za"
            style={{ color: '#d4a574', textDecoration: 'none', fontSize: '0.95rem' }}>
            Email
          </a>
        </div>
      </footer>
    </div>
  );
}
