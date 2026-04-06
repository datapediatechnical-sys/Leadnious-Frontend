"use client";

import React, { useState } from 'react';

interface SignupPageProps {
  onBack: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);
  const [selectedPerk, setSelectedPerk] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      linkedin: formData.get('linkedin'),
      startupName: formData.get('startupName'),
      startupUrl: formData.get('startupUrl'),
      stage: formData.get('stage'),
      industry: formData.get('industry'),
      lookingFor: selectedLookingFor,
      betaPerk: selectedPerk
    };

    // Simulate registration for demo
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        onBack();
      }, 3000);
    }, 1500);
  };

  const toggleLookingFor = (value: string) => {
    setSelectedLookingFor(prev => 
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  if (success) {
    return (
      <div className="signup-page-success">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h2>Welcome Aboard!</h2>
          <p>Your application is being reviewed. We'll be in touch via LinkedIn soon.</p>
          <div className="success-loader">Redirecting to software...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <div className="signup-left">
          <div className="constellation-overlay" />
          <div className="constellation-content">
              <div className="constellation-header">
                  <h2 className="constellation-title">Start generating leads in minutes</h2>
              </div>
              <div className="constellation-features">
                  <div className="feature-row">
                      <i className="fas fa-crosshairs text-red-500"></i>
                      <p>Extract leads from LinkedIn profiles, groups & posts</p>
                  </div>
                  <div className="feature-row">
                      <i className="fas fa-envelope text-slate-400"></i>
                      <p>Enrich with verified emails and phone numbers</p>
                  </div>
                  <div className="feature-row">
                      <i className="fas fa-brain text-pink-500"></i>
                      <p>AI-powered lead scoring and persona matching</p>
                  </div>
                  <div className="feature-row">
                      <i className="fas fa-rocket text-orange-500"></i>
                      <p>Multi-channel outreach campaigns</p>
                  </div>
              </div>
          </div>
      </div>

      <div className="signup-right">
        <div className="signup-nav">
          <div className="app-logo-mini">
              <span className="logo-text-primary">Leadnius</span>
              <span className="logo-text-secondary">Community</span>
          </div>
          <button className="btn-back" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Back
          </button>
        </div>

        <div className="signup-form-scrollable">
          <div className="form-intro">
            <h2 className="form-title">Apply for Early Access</h2>
            <p className="form-subtitle">Verified early access to elite software tools.</p>
          </div>

          <form onSubmit={handleSubmit} className="community-form">
            <div className="social-login-row">
              <button type="button" className="btn-social">
                <i className="fab fa-google"></i> Google
              </button>
              <button type="button" className="btn-social">
                <i className="fab fa-linkedin"></i> LinkedIn
              </button>
            </div>

            <div className="form-separator">
              <span>OR APPLY MANUALLY</span>
            </div>

            <div className="form-block">
              <h4 className="block-title">IDENTITY & AUTHENTICITY</h4>
              <div className="block-row">
                 <div className="input-wrap">
                    <label>Full Name</label>
                    <input type="text" name="fullName" placeholder="e.g. John Doe" required />
                 </div>
                 <div className="input-wrap">
                    <label>Work Email</label>
                    <input type="email" name="email" placeholder="name@company.com" required />
                 </div>
              </div>
              <div className="block-row">
                 <div className="input-wrap">
                    <label>LinkedIn Profile</label>
                    <input type="url" name="linkedin" placeholder="https://linkedin.com/in/..." required />
                 </div>
                 <div className="input-wrap">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="••••••••" required />
                 </div>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
