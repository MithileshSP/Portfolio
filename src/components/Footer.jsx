export default function Footer() {
  return (
    <footer className="border-t border-border-soft">
      <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[11.5px] text-text-faint">
          Built with React + Tailwind. No template, no progress bars.
        </p>
        <p className="font-mono text-[11.5px] text-text-faint">
          © {new Date().getFullYear()} Mithilesh S P — status: <span className="text-signal">online</span>
        </p>
      </div>
    </footer>
  )
}
