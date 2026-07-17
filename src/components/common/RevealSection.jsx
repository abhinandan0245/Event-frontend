// components/common/RevealSection.jsx
const RevealSection = ({ children, className = "" }) => {
  const ref = useFadeUp(".reveal-child");
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
