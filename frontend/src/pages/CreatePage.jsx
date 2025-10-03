import { ArrowLeftIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-300 mb-8 group"
          >
            <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Notes</span>
          </Link>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-b border-slate-700/50 p-6">
              <h2 className="text-3xl font-bold text-slate-100">Create New Note</h2>
              <p className="text-slate-400 mt-2">Capture your thoughts and ideas</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-medium text-lg">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter a compelling title..."
                  className="input bg-slate-900/50 border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder-slate-500 text-lg transition-all duration-300"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-medium text-lg">Content</span>
                </label>
                <textarea
                  placeholder="Write your thoughts here..."
                  className="textarea bg-slate-900/50 border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder-slate-500 h-64 text-lg leading-relaxed transition-all duration-300 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Link 
                  to="/" 
                  className="btn bg-slate-700 hover:bg-slate-600 border-0 text-slate-200"
                >
                  Cancel
                </Link>
                <button 
                  type="submit" 
                  className="btn bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 min-w-[140px]" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="size-5" />
                      Create Note
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
