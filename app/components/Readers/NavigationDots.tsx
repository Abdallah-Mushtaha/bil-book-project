import { reviews } from "./Readers.constants";

export const NavigationDots = ({
  active,
  setActive,
}: {
  active: number;
  setActive: (i: number) => void;
}) => (
  <div className="flex justify-center gap-3 mt-16">
    {reviews.map((_, i) => (
      <button
        key={i}
        onClick={() => setActive(i)}
        className="transition-all duration-500 rounded-full focus:outline-none"
        style={{
          width: i === active ? "40px" : "10px",
          height: "10px",

          backgroundColor:
            i === active ? "#dc2626" : "rgba(255, 255, 255, 0.2)",
        }}
        aria-label={`Go to review ${i + 1}`}
      />
    ))}
  </div>
);
