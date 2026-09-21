// MovieComponent.tsx
function MovieComponent({ title, year }: { title: string; year: number }) {
  return <li>{title} ({year})</li>;
}
export default MovieComponent;