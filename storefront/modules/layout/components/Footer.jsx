import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer container my-5">
      <div className="d-flex justify-content-center">
        <Link href="agb">
          <a className="link m-4">AGB</a>
        </Link>
        <Link href="datenschutz">
          <a className="link m-4">Datenschutz</a>
        </Link>
        <Link href="impressum">
          <a className="link m-4">Impressum</a>
        </Link>
        <Link href="ueber-uns">
          <a className="link m-4">Über uns</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
