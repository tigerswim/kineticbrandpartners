// src/components/ProcessTimeline.tsx

import React from 'react';

interface ProcessTimelineProps {
  variant?: 'consumer' | 'b2b';
}

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ variant = 'consumer' }) => {
  return (
    <div>
      <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>
        {"How This Actually Happens"}
      </h3>
      <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '2rem', lineHeight: '1.6' }}>
        {"No RFPs. No beauty pageants. No 40-page proposals that took three people to write."}
      </p>

      {/* Timeline-style process visualization */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Step 1 */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative' }}>
          <div style={{
            minWidth: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            boxShadow: '0 6px 16px rgba(59, 130, 246, 0.4)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 2
          }}>
            1
          </div>
          <div style={{ paddingTop: '0.5rem' }}>
            <h4 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>
              {"Brand Diagnostic"}
            </h4>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#555' }}>
              {variant === 'consumer'
                ? "60-minute conversation where I start to map your current position, identify the highest-leverage opportunities, and determine if we're the right fit. Consumer brand? I'll audit your retail presence and digital performance."
                : "60-minute conversation where I start to map your current position, identify the highest-leverage opportunities, and determine if we're the right fit. B2B brand? I'll analyze your competitive positioning and sales process."}
            </p>
          </div>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            left: '39px',
            top: '85px',
            width: '3px',
            height: 'calc(100% + 1.5rem)',
            background: 'linear-gradient(180deg, #3b82f6 0%, #f97316 100%)',
            opacity: 0.25,
            zIndex: 1
          }} />
        </div>

        {/* Step 2 */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative' }}>
          <div style={{
            minWidth: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            boxShadow: '0 6px 16px rgba(249, 115, 22, 0.4)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 2
          }}>
            2
          </div>
          <div style={{ paddingTop: '0.5rem' }}>
            <h4 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>
              {"Strategy & Roadmap"}
            </h4>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#555' }}>
              {"Clear deliverables, timeline, and investment. Fixed-price for projects. Monthly retainer for ongoing leadership. No surprises, no scope creep, no invoices for 'additional research.'"}
            </p>
          </div>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            left: '39px',
            top: '85px',
            width: '3px',
            height: 'calc(100% + 1.5rem)',
            background: 'linear-gradient(180deg, #f97316 0%, #ef4444 100%)',
            opacity: 0.25,
            zIndex: 1
          }} />
        </div>

        {/* Step 3 */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{
            minWidth: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
            flexShrink: 0,
            position: 'relative',
            zIndex: 2
          }}>
            3
          </div>
          <div style={{ paddingTop: '0.5rem' }}>
            <h4 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', color: 'var(--primary-dark)', fontWeight: '700' }}>
              {"Execution"}
            </h4>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#555' }}>
              {variant === 'consumer'
                ? "Weekly working sessions with you and your team. For consumer brands: campaigns, packaging, retail strategies built in real-time. You see progress every week, not at 'the big reveal.'"
                : "Weekly working sessions with you and your team. For B2B: positioning, sales tools, demand generation systems. You see progress every week, not at 'the big reveal.'"}
            </p>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '1.05rem', fontWeight: '600', marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', borderLeft: '4px solid var(--primary)' }}>
        {"You own everything. All strategies, creative frameworks, and tools transfer to you. No licensing fees. No dependencies. No being held hostage."}
      </p>
    </div>
  );
};

export default ProcessTimeline;
