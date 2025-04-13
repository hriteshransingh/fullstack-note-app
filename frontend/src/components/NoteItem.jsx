const NoteItem = ({ note, onEdit, onDelete }) => {
  return (
    <div className="relative bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
      {/* Color accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-t-xl"></div>
      
      {/* Action Buttons - Top right corner */}
      <div className="absolute top-3 right-3 flex space-x-1">
        <button 
          onClick={() => onEdit(note)}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          aria-label="Edit note"
          title="Edit note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button 
          onClick={() => onDelete(note._id)}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Delete note"
          title="Delete note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      {/* Note Content */}
      <div className="pr-6"> {/* Add padding to prevent text overlap with buttons */}
        {/* Note Header */}
        {note.title && (
          <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-1">
            {note.title}
          </h3>
        )}
        
        {/* Note Body */}
        <p className="text-gray-600 mb-4 whitespace-pre-wrap line-clamp-3">
          {note.content}
        </p>
      </div>
      
      {/* Note Footer */}
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-2 flex justify-between items-center">
        <span>
          Updated: {new Date(note.updatedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default NoteItem;