const SvgIcon = ({ icon, className }) => {
  return (
    <div
      className={`svgIcon ${className ? className : ""}`}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};

export default SvgIcon;
