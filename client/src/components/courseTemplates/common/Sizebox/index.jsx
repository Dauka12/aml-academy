
function Sizebox({ height }) {
  const sizeInPx = height || 100;
  return (
    <div 
      className="w-full transition-all duration-300 ease-in-out"
      style={{ height: `${sizeInPx}px` }}
      aria-hidden="true"
    >
      {/* Optional debug indicator - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="opacity-0 hover:opacity-30 transition-opacity duration-200 text-xs text-gray-400 text-center leading-none pt-2">
          Spacer: {sizeInPx}px
        </div>
      )}
    </div>
  );
}

export default Sizebox;
