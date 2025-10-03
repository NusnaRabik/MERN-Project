import { NotebookIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 max-w-lg mx-auto text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-full p-12 border border-slate-700/50">
          <NotebookIcon className="size-16 text-emerald-400" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-slate-100">Your canvas awaits</h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          Start capturing your ideas, thoughts, and inspirations.<br />
          Create your first note and begin your journey.
        </p>
      </div>
      
      <Link 
        to="/create" 
        className="group relative btn bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 px-8 py-3 text-lg"
      >
        <SparklesIcon className="size-5 group-hover:rotate-12 transition-transform duration-300" />
        <span>Create Your First Note</span>
      </Link>
    </div>
  );
};

export default NotesNotFound;
