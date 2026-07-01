export const AppFooter = () => (
  <footer
    className="py-12 px-4 border-t border-white/5"
    style={{ background: "var(--black)" }}
  >
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 text-center">
      <p
        className="font-display italic text-base"
        style={{ color: "var(--off-white)" }}
      >
        Book Landing Template
      </p>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
        {["Privacy Policy", "Terms", "Contact"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "var(--off-white)" }}
          >
            {link}
          </a>
        ))}
      </div>

      <div className="space-y-1">
        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          © 2025 Book Landing Template
        </p>
        <p
          className="text-[9px] max-w-[300px] leading-tight"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Demo project created for portfolio purposes. All names, images, and
          content are used for demonstration only.
        </p>
      </div>
    </div>
  </footer>
);
