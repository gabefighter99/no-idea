const handleMouseOver = (cursor: string) => {
  document.body.style.cursor = cursor;
};

const handleMouseOut = () => {
  document.body.style.cursor = "default";
};

export { handleMouseOver, handleMouseOut };
