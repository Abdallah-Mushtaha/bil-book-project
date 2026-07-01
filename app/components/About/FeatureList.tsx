export const FeaturesList = () => (
  <ul className="mt-10 space-y-4">
    {[
      "Identify your attachment patterns",
      "Master healthy communication",
      "Resolve conflict with empathy",
    ].map((item) => (
      <li key={item} className="flex items-center gap-3 text-white font-medium">
        <span className="text-red-600">✓</span>
        <span className="text-sm font-body-serif">{item}</span>
      </li>
    ))}
  </ul>
);
