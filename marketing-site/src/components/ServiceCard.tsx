// src/components/ServiceCard.tsx

import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  outcomes: string;
  ctaText: string;
  ctaLink: string;
  colorScheme: 'consumer' | 'b2b';
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  outcomes,
  ctaText,
  ctaLink,
  colorScheme
}) => {
  const isConsumer = colorScheme === 'consumer';

  const cardStyle = {
    padding: '2.5rem',
    borderRadius: '16px',
    background: isConsumer
      ? 'linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(239, 68, 68, 0.05) 100%)'
      : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.05) 100%)',
    border: '2px solid',
    borderColor: isConsumer ? 'rgba(249, 115, 22, 0.2)' : 'rgba(59, 130, 246, 0.2)',
    boxShadow: isConsumer
      ? '0 8px 24px rgba(249, 115, 22, 0.1)'
      : '0 8px 24px rgba(59, 130, 246, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const
  };

  const accentColor = isConsumer ? '#f97316' : '#3b82f6';

  return (
    <article style={cardStyle} className="service-card">
      <h3 style={{
        fontSize: '2rem',
        marginBottom: '1.5rem',
        color: accentColor,
        fontWeight: '700'
      }}>
        {title}
      </h3>

      <p style={{
        fontSize: '1.1rem',
        lineHeight: '1.7',
        marginBottom: '1.5rem',
        color: '#555',
        flexGrow: 1
      }}>
        {description}
      </p>

      <div style={{
        padding: '1.25rem',
        background: 'rgba(0,0,0,0.03)',
        borderRadius: '8px',
        marginBottom: '2rem',
        borderLeft: `4px solid ${accentColor}`
      }}>
        <p style={{
          fontSize: '0.95rem',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          {outcomes}
        </p>
      </div>

      <Link
        href={ctaLink}
        className="btn"
        style={{
          background: isConsumer
            ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          padding: '0.875rem 2rem',
          borderRadius: '8px',
          textDecoration: 'none',
          display: 'inline-block',
          fontWeight: '600',
          fontSize: '1.05rem',
          textAlign: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isConsumer
            ? '0 4px 12px rgba(249, 115, 22, 0.3)'
            : '0 4px 12px rgba(59, 130, 246, 0.3)'
        }}
      >
        {ctaText}
      </Link>
    </article>
  );
};

export default ServiceCard;
