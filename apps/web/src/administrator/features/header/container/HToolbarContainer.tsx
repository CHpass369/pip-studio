import './HToolbarContainer.scss';

const HSessionContainer = ({ children }) => (
  <div className="h-session-container">
    {children}
  </div>
);

const HToolbarContainer = ({ children }) => (
  <div className="h-toolbar-container">
    {children}
  </div>
);

const HToolbarTitle = ({ children }) => (
  <div className="h-toolbar-title">
    {children}
  </div>
);

const HToolbarCover = ({ children }) => (
  <div className="h-toolbar-cover">
    {children}
  </div>
);

const HToolbarFlex = ({ children }) => (
  <div className="h-toolbar-flex">
    {children}
  </div>
);

const HToolbarButton = ({ children }) => (
  <div className="h-toolbar-button">
    {children}
  </div>
);

export {
  HSessionContainer,
  HToolbarContainer,
  HToolbarButton,
  HToolbarCover,
  HToolbarFlex,
  HToolbarTitle,
};
