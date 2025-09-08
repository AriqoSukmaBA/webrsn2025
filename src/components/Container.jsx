export default function Container({ className = "", children }) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-0 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
