const Container = ({ width = '100%', height = '100%', position, class_name, children }) => {
  const style = {
    width: width,
    maxWidth: '100%',
    height,
    margin: 'auto',
  };

  if (position) {
    style.position = position;
  }

  return (
    <div className={class_name} style={style}>
      {children}
    </div>
  );
};

export { Container };
