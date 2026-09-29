import './Screen.scss';

const Screen = ({ children, background }) => {
  const style = {
    background,
  };

  return (
    <div className="screen" style={style}>
      {children}
    </div>
  );
};

export { Screen };
