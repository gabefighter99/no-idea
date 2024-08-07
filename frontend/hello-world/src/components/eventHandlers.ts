const handleMouseOver = () => {
  document.body.style.cursor = "move";
};

const handleMouseOut = () => {
  document.body.style.cursor = "default";
};

export { handleMouseOver, handleMouseOut };
