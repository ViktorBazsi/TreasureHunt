export function Card({ className = "", ...props }) {
  return <div className={`card ${className}`} {...props} />;
}

export function InverseCard({ className = "", ...props }) {
  return <div className={`card-inverse ${className}`} {...props} />;
}
