import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon, CalendarIcon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center">
        <LoaderIcon className="animate-spin size-12 text-emerald-400 mb-4" />
        <p className="text-slate-400 text-lg">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-300 group"
            >
              <ArrowLeftIcon className="size-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Notes</span>
            </Link>
            
            <button 
              onClick={handleDelete} 
              className="btn bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300"
            >
              <Trash2Icon className="size-5" />
              <span>Delete Note</span>
            </button>
          </div>

          {/* Note Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-b border-slate-700/50 p-6">
              <h2 className="text-3xl font-bold text-slate-100">Edit Note</h2>
              {note?.createdAt && (
                <div className="flex items-center gap-2 text-slate-400 mt-2">
                  <CalendarIcon className="size-4" />
                  <span className="text-sm">
                    Created on {new Date(note.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-medium text-lg">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input bg-slate-900/50 border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder-slate-500 text-lg transition-all duration-300"
                  value={note?.title || ""}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-slate-300 font-medium text-lg">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea bg-slate-900/50 border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-100 placeholder-slate-500 h-96 text-lg leading-relaxed transition-all duration-300 resize-none"
                  value={note?.content || ""}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Link 
                  to="/" 
                  className="btn bg-slate-700 hover:bg-slate-600 border-0 text-slate-200"
                >
                  Cancel
                </Link>
                <button 
                  className="btn bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 border-0 text-white shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 min-w-[140px]" 
                  disabled={saving} 
                  onClick={handleSave}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon className="size-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Last Updated Info */}
          {note?.updatedAt && note.updatedAt !== note.createdAt && (
            <div className="mt-4 text-center text-slate-500 text-sm">
              Last updated: {new Date(note.updatedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
