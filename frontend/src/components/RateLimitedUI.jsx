import { ZapIcon, ClockIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>
        
        <div className="relative flex flex-col md:flex-row items-center p-8 gap-6">
          <div className="flex-shrink-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-6 rounded-2xl border border-amber-500/30">
            <ZapIcon className="size-12 text-amber-400" />
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-3">
            <h3 className="text-2xl font-bold text-slate-100 flex items-center justify-center md:justify-start gap-2">
              <ClockIcon className="size-6 text-amber-400" />
              Rate Limit Reached
            </h3>
            <p className="text-slate-300 text-lg">
              You've made too many requests in a short period. Please take a moment to breathe.
            </p>
            <p className="text-sm text-slate-400 flex items-center justify-center md:justify-start gap-2">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
