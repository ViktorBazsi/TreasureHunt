export default function Button({
  variant = "secondary",
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
  return (
    <button
      className={`${base} ${map[variant]} ${width} ${className}`}
      {...props}
    />
  );
}
