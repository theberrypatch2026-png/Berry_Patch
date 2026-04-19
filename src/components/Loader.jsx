import React from 'react';

const Loader = ({ isVisible }) => {
  return (
    <div className={`loader-screen ${!isVisible ? 'hidden' : ''}`}>
      <img src="/assets/logo.png" alt="The Berry Patch" className="loader-logo" />
    </div>
  );
};

export default Loader;
