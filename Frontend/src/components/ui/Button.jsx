export default function Button({
  variant = "secondary",
  size = "md", // <-- ÚJ
  block = false,
  className = "",
  ...props
}) {
  const base = "btn";
  const map = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
  };
  const width = block ? "btn-block" : "";

  // ÚJ méret osztályok
  const sizeMap = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg font-bold", // nagyobb, vastagabb
  };

  return (
    <button
      className={`${base} ${map[variant]} ${width} ${sizeMap[size]} ${className}`}
      {...props}
    />
  );
}
