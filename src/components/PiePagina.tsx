import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white/60 backdrop-blur-md border-t border-emerald-100/80 py-6 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p className="text-center sm:text-left">
          Inspirado en <span className="font-semibold text-slate-700">E-Tree</span> y <span className="font-semibold text-slate-700">Mi Primera Encarta</span> de Microsoft.
        </p>

        <div className="flex items-center gap-4">
          <a href="https://github.com/ivanfc/webgarden" target="_blank" rel="noreferrer" 
            className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
          </a>
          <span className="font-medium text-slate-400">© 2026 Webgarden</span>
        </div>
      </div>
    </footer>
  );
}