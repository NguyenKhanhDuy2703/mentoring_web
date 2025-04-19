import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch  } from "react-redux";
import { fetchPosts } from "../../features/forum/forumSlice";
const Pagination = ({ currentPage = 1, totalPages = 1, }) => {
  // Calculate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if at boundaries
      if (currentPage <= 2) {
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };
  const dispatch = useDispatch();
 const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent out-of-bounds
    // Dispatch action to fetch posts for the new page
    dispatch(fetchPosts(page ));
   
 }

  return (
    <div className="flex flex-col items-center space-y-3 mt-8">
      <div className="flex items-center space-x-1">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                currentPage === page
                  ? "bg-blue-600 text-white font-medium"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50"
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="text-sm text-gray-500">
        Trang {currentPage} của {totalPages}
      </div>
    </div>
  );
};

export default Pagination;