export const HomeButton = ({
  onClick,
}: {
  onClick: () => void;
}): JSX.Element => (
  <button
    onClick={onClick}
    className="absolute  z-50  rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md cursor-pointer"
    style={{
      top: "2rem",
      right: "1rem",
      padding: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  </button>
);
