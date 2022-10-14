import React from 'react';

export const About = () => {
  return (
    <div css={{ display: 'flex', height: '100%' }}>
      <div css={{ width: '50%', height: '100%' }}>
        <h4>Alex Zisis</h4>
        <p>Software Engineer / Frontend Developer with an interest in design and visual culture</p>
      </div>
      <div css={{ width: '50%', borderLeft: '2px solid black', height: '100%' }}></div>
    </div>
  );
};
