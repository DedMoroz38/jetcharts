import { decodeName } from "../halpers/decodeName";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <div className="p-4 pl-0 pt-0 border-r border-r-border">
      <h3 className="text-2xl font-bold mb-10 text-center">Filter Categories</h3>
      <div
        onClick={() => setSelectedCategory(null)}
          className={`rounded-full cursor-pointer py-3 flex items-center justify-start pl-6 ml-2 mr-[18px] border-[3px] duration-200 hover:bg-[#6f5ff8]/20 ${
            selectedCategory === null ? 'border-[#6f5ff8]' : 'border-transparent'
          }`}
      >
        All Categories
      </div>
      <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-2 px-2">
        <div className="border-b border-border my-2"></div>
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => setSelectedCategory(category)}
             className={`rounded-full shrink-0 cursor-pointer py-3 px-6 flex items-center justify-start border-[3px] duration-200 hover:bg-[#6f5ff8]/20 ${
               selectedCategory === category ? 'border-[#6f5ff8]' : 'border-transparent'
             }`}
          >
            {decodeName(category)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
