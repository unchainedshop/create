import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer container my-5">
      <div className="d-flex justify-content-center">
        <Link href="/conditions">
          <a className="link m-4">Conditions</a>
        </Link>
        <Link href="/privacy">
          <a className="link m-4">Privacy</a>
        </Link>
        <Link href="/imprint">
          <a className="link m-4">Imprint</a>
        </Link>
        <Link href="/about">
          <a className="link m-4">About</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
