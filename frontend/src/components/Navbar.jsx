import { Link } from "react-router";
import { PlusIcon, BookOpenIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-emerald-400 to-cyan-400 p-2 rounded-lg shadow-lg group-hover:shadow-emerald-400/50 transition-all duration-300">
              <BookOpenIcon className="size-6 text-slate-900" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
              ThinkBoard
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              to="/create" 
              className="btn bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
            >
              <PlusIcon className="size-5" />
              <span className="hidden sm:inline">New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
