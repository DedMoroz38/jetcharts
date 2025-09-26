const IconButton = ({ 
    icon, 
    isActive, 
    onClick, 
    alt 
  }: { 
    icon: string; 
    isActive: boolean; 
    onClick: () => void; 
    alt: string; 
  }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-[#58e054] shadow-md'
          : 'bg-secondary hover:bg-gray-700'
      }`}
    >
      <img 
        src={icon} 
        alt={alt}
        className="w-5 h-5"
        style={{
          filter: isActive 
            ? 'brightness(0) invert(1)'
            : 'brightness(0) invert(0.7)'
        }}
      />
    </button>
  );

export default IconButton;