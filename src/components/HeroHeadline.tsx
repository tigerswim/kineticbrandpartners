// Fixes the inline-block whitespace-collapse bug:
// each word is wrapped in .kw (display: inline-block, overflow: hidden)
// with an inner <i> that translates from below.
// The literal " " between words is rendered OUTSIDE the .kw spans so the
// browser preserves it.

import { Fragment } from "react";

type Props = {
  className?: string;
  lead: string;
  emphasis?: string;
};

function Word({ word, index }: { word: string; index: number }) {
  return (
    <span className="kw" style={{ ['--w' as string]: index }}>
      <i>{word}</i>
    </span>
  );
}

export default function HeroHeadline({ className, lead, emphasis }: Props) {
  const leadWords = lead.split(/\s+/).filter(Boolean);
  const emphasisWords = emphasis ? emphasis.split(/\s+/).filter(Boolean) : [];
  let i = 0;

  return (
    <h1 className={className}>
      <span>
        {leadWords.map((word, idx) => (
          <Fragment key={`l-${idx}`}>
            <Word word={word} index={i++} />
            {idx < leadWords.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
      {emphasis ? (
        <span className="kinetic-title-gradient">
          {emphasisWords.map((word, idx) => (
            <Fragment key={`e-${idx}`}>
              <Word word={word} index={i++} />
              {idx < emphasisWords.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ) : null}
    </h1>
  );
}
