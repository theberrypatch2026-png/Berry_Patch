import React from 'react';
import { Link } from 'react-router-dom';
import SnapSection from '../components/SnapSection';
import PDFViewer from '../components/PDFViewer';

const Process = () => {
  return (
    <>
      <div className="container" style={{ paddingTop: '120px' }}>
        <Link to="/#story" className="back-btn">&larr; Back</Link>

        {/* Section 1: Farm to Table */}
        <SnapSection className="process" id="process" showText={true}>
          <span className="eyebrow">BEHIND THE SCENES</span>
          <h2>From Farm to Table</h2>
          
          <div className="process-grid">
            <div className="process-step">
              <div className="step-icon">🌱</div>
              <div>
                <h3>Organically Grown</h3>
                <p>Camarosa variety cultivated in Kodaikanal's cool climate with zero synthetic inputs.</p>
              </div>
            </div>
            <div className="process-step green">
              <div className="step-icon">✋</div>
              <div>
                <h3>Hand-Harvested</h3>
                <p>Each berry is hand picked — never machine-harvested.</p>
              </div>
            </div>
            <div className="process-step green">
              <div className="step-icon">📦</div>
              <div>
                <h3>Inspected & Sorted</h3>
                <p>Every batch is visually inspected and sorted for size, colour, and quality.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-icon">🚚</div>
              <div>
                <h3>Delivered in 24 hrs</h3>
                <p>Packed in food-grade boxes and dispatched the same day — farm fresh at your door.</p>
              </div>
            </div>
          </div>
        </SnapSection>
      </div>

      {/* Section 2: Lab Report Summary */}
      <SnapSection className="lab-summary">
        <span className="eyebrow" style={{ color: 'var(--blue-accent)' }}>🧪 LAB CERTIFIED</span>
        <h2>Lab Report</h2>
        <span className="lab-metadata">Report No: FSRL2026-40 · 13 Apr 2026</span>
        <span className="lab-metadata">Sample: Strawberry (1 kg) · Analysed 08–11 Apr 2026</span>

        <div className="lab-cards">
          <div className="lab-card">
            <h4>PESTICIDE RESIDUE</h4>
            <p className="note">Below limit of quantification</p>
            <span className="badge">Effectively zero</span>
          </div>
          <div className="lab-card">
            <h4>LCMS-MS PANEL</h4>
            <p className="note">70+ Compounds Tested</p>
            <span className="badge">None Detected - All Clear</span>
          </div>
          <div className="lab-card">
            <h4>GCMS-MS PANEL</h4>
            <p className="note">60+ Compounds Tested</p>
            <span className="badge">None Detected - All Clear</span>
          </div>
          <div className="lab-card">
            <h4>TEST METHOD</h4>
            <p className="note">ICAR-IIHR accredited protocol</p>
          </div>
        </div>

        <div className="lab-attribution">
          <div className="lab-icon">🧪</div>
          <div>
            <h3>Food Safety Referral Laboratory</h3>
            <p style={{ color: 'var(--muted-text)', fontSize: '14px' }}>ICAR-IIHR, Bangalore · TC-16406 Accredited</p>
          </div>
        </div>
      </SnapSection>

      {/* Section 3: Lab PDF Page 1 */}
      <SnapSection className="pdf-section">
        <div className="pdf-header">
          <span className="pdf-label">PAGE 1 OF 2</span>
          <h3>FSRL2026-40 · Ctrl+scroll or pinch to zoom</h3>
        </div>
        
        <div className="pdf-container">
          <PDFViewer pageNum={1} />
        </div>
        <p className="pdf-footnote">TC-16406 Accredited · Analysed 08 Apr 2026</p>
      </SnapSection>

      {/* Section 4: Lab PDF Page 2 */}
      <SnapSection className="pdf-section">
        <div className="pdf-header">
          <span className="pdf-label" style={{ color: 'var(--blue-accent)' }}>PAGE 2 OF 2</span>
          <h3>FSRL2026-40 · Ctrl+scroll or pinch to zoom</h3>
        </div>
        
        <div className="pdf-container">
          <PDFViewer pageNum={2} />
        </div>
        <p className="pdf-footnote">TC-16406 Accredited · Report issued 13 Apr 2026</p>
      </SnapSection>

      {/* Section 5: Commitment */}
      <SnapSection className="commitment" hideArrow={true}>
        <span className="eyebrow">OUR PROMISE</span>
        <h2>Our Commitment</h2>
        <p className="body">Every strawberry reflects a commitment to clean and healthy food for our valuable families.</p>

        <div className="promise-cards">
          <div className="promise-card">
            <div className="icon">🌱</div>
            <div className="divider"></div>
            <div className="promise-content">
              <span className="stat">Organically<br/>Grown</span>
              <span className="label">No Chemicals</span>
              <p className="desc">No pesticides, herbicides, or synthetic fertilisers.</p>
            </div>
          </div>
          <div className="promise-card">
            <div className="icon"><img src="/assets/ICAR.png" alt="ICAR Logo" /></div>
            <div className="divider"></div>
            <div className="promise-content">
              <span class="stat">ICAR</span>
              <span className="label">Certified</span>
              <p className="desc">Farming practices validated by ICAR-recommended guidelines.</p>
            </div>
          </div>
          <div className="promise-card">
            <div className="icon">🍃</div>
            <div className="divider"></div>
            <div className="promise-content">
              <span className="stat">24 hr</span>
              <span className="label">Farm to Table</span>
              <p className="desc">Shortest possible supply chain — no middlemen.</p>
            </div>
          </div>
        </div>

        <div className="back-to-home">
          <Link to="/#story" className="btn-pill btn-green">&larr; Back to Strawberries</Link>
        </div>
      </SnapSection>
    </>
  );
};

export default Process;
