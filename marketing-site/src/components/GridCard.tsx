// src/components/GridCard.tsx

'use client';

import React, { useState } from 'react';

interface GridCardProps {
  title: string;
  description: string;
}

const GridCard: React.FC<GridCardProps> = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      style={{
        background: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isHovered
          ? '0 8px 24px rgba(0, 0, 0, 0.12)'
          : '0 2px 8px rgba(0, 0, 0, 0.04)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'default',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: 'var(--primary-dark)'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '1rem',
        lineHeight: '1.7',
        color: '#555',
        margin: 0
      }}>
        {description}
      </p>
    </article>
  );
};

export default GridCard;
