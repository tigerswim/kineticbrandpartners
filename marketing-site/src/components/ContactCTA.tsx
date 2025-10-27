// src/components/ContactCTA.tsx

import React from 'react';

interface ContactCTAProps {
  title: string;
  description: string;
  ctaText: string;
  emailAddress: string;
  directEmailAddress?: string;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ title, description, ctaText, emailAddress, directEmailAddress }) => {
  const generalEmail = directEmailAddress || emailAddress;
  return (
    <section id="contact" style={{ padding: '4rem 0' }}>
      <div className="container">
        <div className="spotlight">
          <h2>{title}</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.7' }}>
            {description}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <a href={`mailto:${emailAddress}`} className="btn btn-primary">
            {ctaText}
          </a>
        </div>
        <article style={{ textAlign: 'center', maxWidth: '700px', margin: '2.5rem auto 0' }}>
          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              {"Or email directly: "}
              <a href={`mailto:${generalEmail}`} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '600' }}>
                {generalEmail}
              </a>
            </p>
            <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '1rem' }}>
              {"Atlanta-based. Working with ambitious brands nationwide."}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ContactCTA;
