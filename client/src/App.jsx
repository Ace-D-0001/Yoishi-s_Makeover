import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Award, Phone, Mail, MapPin, Calendar, 
  Users, Check, ChevronLeft, ChevronRight, Star, 
  Menu, X, Heart 
} from 'lucide-react';

// Import local portfolio images
import bridal1 from './assets/bridal_1.png';
import reception1 from './assets/reception_1.png';
import engagement1 from './assets/engagement_1.png';
import party1 from './assets/party_1.png';

// Import past customer images
import past1 from './assets/past_1.png';
import past2 from './assets/past_2.png';
import past3 from './assets/past_3.png';

function App() {
  // Navigation & Scroll states
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Portfolio filters
  const [portfolioFilter, setPortfolioFilter] = useState('all');

  // Testimonials State
  const [reviews, setReviews] = useState([]);
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  // Booking Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventType: 'Bridal Makeup',
    guests: 0,
    location: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Monitor scroll for styling navbar and identifying active section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }

      // Check active section
      const sections = ['home', 'about', 'services', 'gallery', 'past-brides', 'testimonials', 'booking'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch reviews from Express API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  // Testimonials Navigation
  const prevReview = () => {
    if (reviews.length === 0) return;
    setCurrentReviewIdx((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    if (reviews.length === 0) return;
    setCurrentReviewIdx((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Click handler for Service Plan cards
  const handlePlanClick = (category) => {
    setPortfolioFilter(category);
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Form Submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your booking request has been submitted successfully. Yoishi will contact you shortly.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventDate: '',
          eventType: 'Bridal Makeup',
          guests: 0,
          location: '',
          message: ''
        });
      } else {
        setFormStatus({
          type: 'error',
          message: resData.message || 'Something went wrong. Please check your inputs and try again.'
        });
      }
    } catch (err) {
      setFormStatus({
        type: 'error',
        message: 'Could not connect to the booking server. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Service packages details
  const services = [
    {
      title: 'Traditional Bridal',
      price: '$250',
      category: 'bridal',
      description: 'The ultimate royal look for your big day, capturing class, grace, and flawless precision.',
      features: [
        'Premium High-Definition (HD) Makeup',
        'Bridal Hair Styling & Bun Designing',
        'Outfit / Dupatta Draping',
        'Jewelry & Veil Placement',
        'Luxury Mink Eyelashes Included',
      ]
    },
    {
      title: 'Reception Glam',
      price: '$200',
      category: 'reception',
      description: 'A modern, soft-glam look with glowing skin and eye-catching elegance, perfect for evening lights.',
      features: [
        'Airbrush or Ultra-HD Waterproof Finish',
        'Modern Waves or Textured Hair Styling',
        'Sari or Gown Draping',
        'Accessories & Jewelry Placement',
        'Premium Eyelashes Included',
      ]
    },
    {
      title: 'Engagement / Halud',
      price: '$150',
      category: 'engagement',
      description: 'A fresh, radiant dewy finish matching vibrant engagement or traditional mehendi themes.',
      features: [
        'Dewy Glow Finish Makeup',
        'Bohemian Braids or Floral Styling',
        'Lehenga / Sari Draping',
        'Soft Makeup Adjustments',
        'Classic Eyelashes Included',
      ]
    }
  ];

  // Portfolio items matching generated images
  const portfolioItems = [
    { id: 1, title: 'Traditional Royal Bride', category: 'bridal', img: "https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/720138515_122379005186004298_8708272130687617802_n.jpg?stp=dst-jpg_tt6&cstp=mx1068x1600&ctp=s590x590&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_rJOKd63uOsQ7kNvwFJ8ATI&_nc_oc=AdoPvP3ySyjKfjcbzjpVDX0UFHoUWWNwiCBwhJSQJTiMKRgKO79nulqgkn_5Rl2L_vg&_nc_zt=23&_nc_ht=scontent.fjsr6-1.fna&_nc_gid=eues7TPcRALsl6WEY7uprA&_nc_ss=7b289&oh=00_Af9rW_h3ByO3ie_PehM6SEHB6ALqPK3f_8Q2FhwqU8IvIQ&oe=6A3370B2" },
    { id: 2, title: 'Champagne Reception Glam', category: 'reception', img: "https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/723041285_122379005132004298_5467716165277868099_n.jpg?stp=c0.176.1066.1066a_dst-jpg_tt6&cstp=mx1066x1066&ctp=s160x160&_nc_cat=101&ccb=1-7&_nc_sid=8a6525&_nc_ohc=2HHxVZyBUcsQ7kNvwHVHipV&_nc_oc=Ado4XoD-cSx4vbpa9NrtRdvT75bDkkOsLyVm24ggFAMI7iLYhRLtvG3B3ZcdtX6OCaM&_nc_zt=23&_nc_ht=scontent.fjsr6-1.fna&_nc_gid=4gQFTgel66X8LVdXra52rw&_nc_ss=7b289&oh=00_Af_udK1dBJ7zB6fJxm8XFCA6hGP4QFS4i6ptsnrJm586ag&oe=6A335F86" },
    { id: 3, title: 'Dewy Summer Engagement', category: 'engagement', img: "https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/721996211_122378760476004298_5579847620323014017_n.jpg?stp=c0.297.1149.1149a_dst-jpg_tt6&cstp=mx1149x1149&ctp=s160x160&_nc_cat=104&ccb=1-7&_nc_sid=8a6525&_nc_ohc=A3EQoU58y28Q7kNvwFJ89mT&_nc_oc=AdqrDV8HwVXGgvgI35Y94t54Xbr_QY3jsmPxVrvhrZJs__eEQXuFl-h1ZmVgi2rmGFA&_nc_zt=23&_nc_ht=scontent.fjsr6-1.fna&_nc_gid=4gQFTgel66X8LVdXra52rw&_nc_ss=7b289&oh=00_Af_qD_ZZbC1M0nAGMO8uoxpGd5ex2OkUHnFXixF5xzeK8w&oe=6A335847" },
    { id: 4, title: 'Sophisticated Party Look', category: 'party', img: "https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/723162328_122379005234004298_9087777472374240771_n.jpg?stp=c0.176.1066.1066a_dst-jpg_tt6&cstp=mx1066x1066&ctp=s160x160&_nc_cat=111&ccb=1-7&_nc_sid=8a6525&_nc_ohc=fS0_m1eRB1MQ7kNvwEf9Xcp&_nc_oc=AdqQ9d11oNFGd0x8yC4TGIcRl-gYWKsWCFWUMVtWJRBFiF7YddHUdsbS7dqMDjcgprw&_nc_zt=23&_nc_ht=scontent.fjsr6-1.fna&_nc_gid=4gQFTgel66X8LVdXra52rw&_nc_ss=7b289&oh=00_Af-rkItmejjbTOxImjcv_QmDv6eRGRu-JP3K-v9LRc9EPQ&oe=6A338D38" },
  ];

  const filteredPortfolio = portfolioFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);

  return (
    <>
      {/* Header / Navbar */}
      <header className={navScrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav>
            <a href="#home" className="logo text-gold">
              <Sparkles size={22} className="text-gold" />
              Yoishi's Makeover
            </a>
            
            <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
              <li>
                <a 
                  href="#home" 
                  className={activeSection === 'home' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={activeSection === 'about' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  className={activeSection === 'services' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  className={activeSection === 'gallery' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </a>
              </li>
              <li>
                <a 
                  href="#past-brides" 
                  className={activeSection === 'past-brides' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Brides Album
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className={activeSection === 'testimonials' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reviews
                </a>
              </li>
              <li>
                <a 
                  href="#booking" 
                  className={activeSection === 'booking' ? 'active' : ''}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a href="#booking" className="btn-book btn-book-nav">Book Now</a>
              
              <button 
                className="nav-toggle" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-subtitle">Premium Artistry</span>
            <h1 className="hero-title">
              Enhance Your <br />
              <span className="text-gold">Natural Beauty</span>
            </h1>
            <p className="hero-desc">
              ✨Certified Makeup artist✨ Booking Us For Your Special Day. Specialized in bridal, reception, engagement, and party makeover looks.
            </p>
            <div className="hero-buttons">
              <a href="#booking" className="btn-primary">Book Consultation</a>
              <a href="#gallery" className="btn-secondary">Explore Work</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-container">
              <img 
                src="https://scontent.fjsr6-1.fna.fbcdn.net/v/t39.30808-6/720138515_122379005186004298_8708272130687617802_n.jpg?stp=dst-jpg_tt6&cstp=mx1068x1600&ctp=s590x590&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=_rJOKd63uOsQ7kNvwFJ8ATI&_nc_oc=AdoPvP3ySyjKfjcbzjpVDX0UFHoUWWNwiCBwhJSQJTiMKRgKO79nulqgkn_5Rl2L_vg&_nc_zt=23&_nc_ht=scontent.fjsr6-1.fna&_nc_gid=eues7TPcRALsl6WEY7uprA&_nc_ss=7b289&oh=00_Af9rW_h3ByO3ie_PehM6SEHB6ALqPK3f_8Q2FhwqU8IvIQ&oe=6A3370B2" 
                alt="Yoishi Artistry" 
                className="about-img-main" 
              />
              <div className="about-badge bg-glass">
                <div className="number">5K+</div>
                <div className="label">Happy Clients</div>
              </div>
            </div>
            
            <div className="about-content">
              <span className="section-subtitle">Meet Yoishi</span>
              <h3>Crafting Elegance for Your Most Precious Days</h3>
              <p>
                As a fully certified and experienced professional makeup artist, Yoishi believes that every bride deserves to radiate confidence on her wedding day. We do not just apply makeup—we design a custom look that complements your skin type, dress colors, and personal aesthetic.
              </p>
              <p>
                From clean, glowing soft-glam to traditional high-definition royal bride transforms, we use only high-end premium makeup brands to guarantee long-lasting, water-resistant, camera-ready perfection.
              </p>

              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon"><Award size={20} /></div>
                  <div className="feature-text">
                    <h4>Certified Professional</h4>
                    <p>Trained in high-definition airbrush bridal designs.</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon"><Heart size={20} /></div>
                  <div className="feature-text">
                    <h4>Luxury Products Only</h4>
                    <p>Using top premium brands for safety and longevity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Packages & Pricing</span>
            <h2 className="section-title">Bridal & Event Services</h2>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card bg-glass">
                <div className="service-header">
                  <div className="service-icon"><Sparkles size={20} /></div>
                  <div className="service-price">{service.price}</div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                
                <ul className="service-features">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx}>
                      <Check size={14} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: 'auto' }}>
                  <button 
                    onClick={() => handlePlanClick(service.category)}
                    className="btn-secondary" 
                    style={{ flex: 1, padding: '12px', fontSize: '13px', cursor: 'pointer' }}
                  >
                    View Gallery
                  </button>
                  <a 
                    href="#booking" 
                    className="btn-primary" 
                    style={{ flex: 1, padding: '12px', textAlign: 'center', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', borderRadius: '40px', textDecoration: 'none' }}
                  >
                    Book
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="gallery" className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Real Bride Looks</span>
            <h2 className="section-title">Featured Portfolio</h2>
          </div>

          {/* Filter Navigation */}
          <div className="gallery-filters">
            {['all', 'bridal', 'reception', 'engagement', 'party'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${portfolioFilter === filter ? 'active' : ''}`}
                onClick={() => setPortfolioFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredPortfolio.map((item) => (
              <div key={item.id} className="gallery-item">
                <img src={item.img} alt={item.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.category} Look</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Customers Gallery Section */}
      <section id="past-brides" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Brides Album</span>
            <h2 className="section-title">Past Customers Showcase</h2>
          </div>

          <div className="past-brides-grid">
            <div className="past-bride-card bg-glass">
              <div className="past-bride-img-wrapper">
                <img src={past1} alt="Fariha Rahman" className="past-bride-img" />
              </div>
              <div className="past-bride-info">
                <h4>Fariha Rahman</h4>
                <p className="event-date">December 12, 2025</p>
                <span className="look-tag">Traditional Royal Bridal</span>
                <p className="bride-quote">"The makeup didn't budge all night! Absolute magic."</p>
              </div>
            </div>

            <div className="past-bride-card bg-glass">
              <div className="past-bride-img-wrapper">
                <img src={past2} alt="Nisha Kabir" className="past-bride-img" />
              </div>
              <div className="past-bride-info">
                <h4>Nisha Kabir</h4>
                <p className="event-date">January 8, 2026</p>
                <span className="look-tag">Rose Gold Reception</span>
                <p className="bride-quote">"Exactly what I wanted—modern, lightweight, and glowy!"</p>
              </div>
            </div>

            <div className="past-bride-card bg-glass">
              <div className="past-bride-img-wrapper">
                <img src={past3} alt="Adiba Chowdhury" className="past-bride-img" />
              </div>
              <div className="past-bride-info">
                <h4>Adiba Chowdhury</h4>
                <p className="event-date">March 2, 2026</p>
                <span className="look-tag">Dewy Engagement Glow</span>
                <p className="bride-quote">"Felt so confident and natural. Thank you Yoishi!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider Section */}
      {reviews.length > 0 && (
        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-title-wrapper">
              <span className="section-subtitle">Client Love</span>
              <h2 className="section-title">Happy Brides Say</h2>
            </div>

            <div className="testimonials-slider bg-glass">
              <div className="testimonial-card">
                <div className="quote-icon">
                  <Star size={44} fill="currentColor" />
                </div>
                <p className="testimonial-text">
                  "{reviews[currentReviewIdx].reviewText}"
                </p>
                <div className="testimonial-author">
                  <h4>{reviews[currentReviewIdx].name}</h4>
                  <p>{reviews[currentReviewIdx].eventType} — {reviews[currentReviewIdx].weddingDate}</p>
                </div>
              </div>

              <div className="slider-controls">
                <button className="control-btn" onClick={prevReview} aria-label="Previous review">
                  <ChevronLeft size={20} />
                </button>
                <button className="control-btn" onClick={nextReview} aria-label="Next review">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Form Section */}
      <section id="booking" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="booking-grid">
            <div className="booking-info">
              <span className="section-subtitle">Consultation</span>
              <h3>Secure Your <br />Special Day</h3>
              <p>
                Ready to glow on your wedding or special day? Fill out the form details below to check availability for your event date and get a customized quote.
              </p>

              <div className="contact-details">
                <div className="contact-card">
                  <div className="contact-icon bg-glass"><Phone size={18} /></div>
                  <div className="contact-text">
                    <span>Call or WhatsApp</span>
                    <p>01629352569</p>
                  </div>
                </div>
                
                <div className="contact-card">
                  <div className="contact-icon bg-glass"><Mail size={18} /></div>
                  <div className="contact-text">
                    <span>Email Address</span>
                    <p>yoishinandi3@gmail.com</p>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-icon bg-glass"><MapPin size={18} /></div>
                  <div className="contact-text">
                    <span>Studio Location</span>
                    <p>Mymensingh, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-form-container bg-glass">
              <form onSubmit={handleFormSubmit}>
                {formStatus.message && (
                  <div className={`form-alert ${formStatus.type}`}>
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-control" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-control" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="form-control" 
                      required 
                      placeholder="+880"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input 
                      type="date" 
                      id="eventDate" 
                      name="eventDate" 
                      className="form-control" 
                      required 
                      value={formData.eventDate}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="eventType">Select Service</label>
                    <select 
                      id="eventType" 
                      name="eventType" 
                      className="form-control"
                      value={formData.eventType}
                      onChange={handleInputChange}
                    >
                      <option value="Bridal Makeup">Bridal Makeup</option>
                      <option value="Reception Glam">Reception Glam</option>
                      <option value="Engagement Makeup">Engagement / Halud</option>
                      <option value="Party Makeup">Party / Guest Makeup</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="guests">Number of Guests</label>
                    <input 
                      type="number" 
                      id="guests" 
                      name="guests" 
                      className="form-control" 
                      min="0"
                      value={formData.guests}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Event Venue Location</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    className="form-control" 
                    required 
                    placeholder="e.g. Hotel Westin, Gulshan"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Special Requests or Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-control" 
                    placeholder="Please specify if you need hair styling modifications, nail art, or multiple looks..."
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSubmitting}
                  style={{ width: '100%', padding: '16px' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <a href="#home" className="footer-logo text-gold">
              Yoishi's Makeover
            </a>
            
            <div className="social-links">
              <a 
                href="https://web.facebook.com/profile.php?id=61550128961488" 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn"
                aria-label="Facebook"
              >
                Fb
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                Ig
              </a>
              <a href="#" className="social-btn" aria-label="Pinterest">
                Pin
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Yoishi's Makeover. All Rights Reserved.</p>
            <p>Designed with Love for Brides & Beauty</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
