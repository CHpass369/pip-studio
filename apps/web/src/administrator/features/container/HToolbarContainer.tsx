import React from 'react';
import PropTypes from 'prop-types';

import './HToolbarContainer.scss';

const HSessionContainer = ({ children }) => {
  return (
    <div className="h-session-container">
      {children}
    </div>
  );
};

HSessionContainer.propTypes = {
  children: PropTypes.node,
};

const HToolbarContainer = ({ children }) => {
  return (
    <div className="h-toolbar-container">
      {children}
    </div>
  );
};

HToolbarContainer.propTypes = {
  children: PropTypes.node,
};

const HToolbarTitle = ({ children }) => {
  return (
    <div className="h-toolbar-title">
      {children}
    </div>
  );
};

HToolbarTitle.propTypes = {
  children: PropTypes.node,
};

const HToolbarCover = ({ children }) => {
  return (
    <div className="h-toolbar-cover">
      {children}
    </div>
  );
};

HToolbarCover.propTypes = {
  children: PropTypes.node,
};

const HToolbarFlex = ({ children }) => {
  return (
    <div className="h-toolbar-flex">
      {children}
    </div>
  );
};

HToolbarFlex.propTypes = {
  children: PropTypes.node,
};

const HToolbarButton = ({ children }) => {
  return (
    <div className="h-toolbar-button">
      {children}
    </div>
  );
};

HToolbarButton.propTypes = {
  children: PropTypes.node,
};

export { HSessionContainer, HToolbarContainer, HToolbarButton, HToolbarCover, HToolbarFlex, HToolbarTitle };
