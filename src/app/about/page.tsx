// app/about/page.js
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About Page.</p>
      <nav>
        <ul>
          <li>
            <Link href="/">Go to Home Page</Link>
          </li>
          <li>
            <Link href="../register/contact/">Go to Contact Page</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
