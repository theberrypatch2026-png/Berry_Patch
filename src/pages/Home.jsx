import React from 'react';
import { Link } from 'react-router-dom';
import SnapSection from '../components/SnapSection';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
  return (
    <>


      {/* Section 1: Hero */}
      <section className="hero fade-in">
        <div className="container hero-content">
          <div className="hero-left">
            <span className="eyebrow">KODAIKANAL, INDIA</span>
            <h1>The Berry Patch</h1>
            <p className="subheading">Organic Goodness, Berry By Berry.</p>
            <p className="description">
              Grown in the cool hills of Kodaikanal without pesticides or shortcuts.
              Camarosa strawberries, lab-tested by ICAR-IIHR Bangalore — zero residue across 130+ compounds.
            </p>
            <div className="hero-ctas">
              <a href="https://wa.me/919176540077" className="btn-pill btn-green">Order on WhatsApp</a>
              <Link to="/process" className="btn-pill btn-outline">Our Process &rarr;</Link>
            </div>
          </div>
          <div className="hero-right">
            <HeroCarousel />
          </div>
        </div>
        <div className="scroll-indicator">
          SCROLL DOWN
          <span className="arrow">⌄</span>
        </div>
      </section>

      {/* Section 2: Story */}
      <SnapSection id="story" className="story">
        <div className="story-layout">
          <div className="story-left">
            <span className="eyebrow">THE ORIGIN</span>
            <h2>Our Story</h2>
            <p className="body">
              Nestled at 7,000 ft in Kodaikanal, our farm started with a simple belief: strawberries should taste like nature intended. No chemical washes, no synthetic boosters, just pure mountain air and rich red soil.
            </p>
            <p className="body">
              For generations, commercial farming has prioritized shelf life over taste and safety. We're rejecting that. The Berry Patch is a return to authentic, organic cultivation.
            </p>
            <blockquote className="blockquote">
              "When you eat our berries, you aren't just tasting fruit. You're tasting the Kodaikanal mist."
            </blockquote>
          </div>
          <div className="story-right">
            <img src="/assets/real-berries2.jpg" alt="Strawberry Farm in Kodaikanal" />
          </div>
        </div>
      </SnapSection>

      {/* Section 3: Coming Soon */}
      <SnapSection className="coming-soon">
        <span className="eyebrow" style={{ color: 'var(--amber-accent)' }}>COMING SOON</span>
        <h2>Strawberry Preserve</h2>
        <p className="subtext">
          Made exclusively with our harvest.<br/>
          No refined sugar. No preservatives. Pure Kodaikanal strawberries.
        </p>
      </SnapSection>

      {/* Section 4: Contact */}
      <SnapSection id="contact" className="contact text-center" hideArrow={true}>
        <span className="eyebrow">GET IN TOUCH</span>
        <h2>Order fresh strawberries or just say hello.</h2>
        
        <div className="contact-cards">
          <a href="https://wa.me/919176540077" className="contact-card whatsapp">
            <img src="/assets/whatsapp-icon.jpg" alt="WhatsApp" className="contact-icon" />
            <h3>WhatsApp</h3>
            <p>Chat with us to place an order</p>
            <span className="card-arrow">&rarr;</span>
          </a>
          <a href="https://instagram.com/theberrypatch.in" className="contact-card instagram">
            <img src="/assets/instagram-icon.jpg" alt="Instagram" className="contact-icon" />
            <h3>Instagram</h3>
            <p>Follow our farm journey & updates</p>
            <span className="card-arrow">&rarr;</span>
          </a>
        </div>
        
        <footer className="footer-simple">
          <img src="/assets/logo.png" alt="The Berry Patch" className="footer-logo" />
        </footer>
      </SnapSection>
    </>
  );
};

export default Home;
