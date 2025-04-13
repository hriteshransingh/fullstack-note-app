import NoteItem from './NoteItem.jsx';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="mt-6">
      {notes.length === 0 ? (
        <div>
        <p className="text-gray-600 text-center py-4">No notes yet. Add your first note!</p>
        </div>
      ) : (
        notes.map(note => (
          <NoteItem 
            key={note._id} 
            note={note}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default NoteList;