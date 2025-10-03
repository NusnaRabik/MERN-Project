import { PenSquareIcon, Trash2Icon, CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 
      hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 
      border border-slate-700/50 hover:border-emerald-500/50 overflow-hidden"
    >
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
      
      <div className="relative">
        <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
          {note.title}
        </h3>
        <p className="text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {note.content}
        </p>
        
        <div className="flex justify-between items-center pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarIcon className="size-4" />
            <span>{formatDate(new Date(note.createdAt))}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-700/50 text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300">
              <PenSquareIcon className="size-4" />
            </div>
            <button
              className="p-2 rounded-lg bg-slate-700/50 text-red-400 hover:bg-red-500/20 transition-all duration-300"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
