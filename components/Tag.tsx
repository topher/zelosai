interface TagProps {
    label: string;
  }
  
  const Tag: React.FC<TagProps> = ({ label }) => {
    return (
      <span className="inline-block bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:bg-gray-800 cursor-pointer">
        {label}
      </span>
    );
  };
  
  export default Tag;
  