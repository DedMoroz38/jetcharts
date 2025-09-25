const CategoryFilterSkeleton = () => {
  const mockItems = [
    'w-32', 'w-28', 'w-36', 'w-24', 'w-40', 'w-30', 'w-34', 'w-26', 'w-38', 'w-32'
  ];

  return (
    <div className="p-4 pl-0 pt-0 border-r border-r-border">
      <h3 className="text-2xl font-bold mb-10 text-center">Filter Categories</h3>
      
      <div className="rounded-full py-3 flex items-center justify-start pl-6 ml-2 mr-[18px] border-[3px] border-transparent animate-pulse">
        <div className="bg-gray-600 rounded h-4 w-28"></div>
      </div>
      
      <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-2 px-2">
        <div className="border-b border-border my-2"></div>
        
        {mockItems.map((width, index) => (
          <div
            key={index}
            className="rounded-full shrink-0 py-3 px-6 flex items-center justify-start border-[3px] border-transparent animate-pulse"
          >
            <div className={`bg-gray-600 rounded h-4 ${width}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterSkeleton;
