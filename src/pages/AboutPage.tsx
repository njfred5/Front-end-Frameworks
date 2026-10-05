import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About</h1>
      <p>This is a movie app built with React.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}