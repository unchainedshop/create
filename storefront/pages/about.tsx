import { useEffect, useState } from 'react';

import MetaTags from '../modules/common/components/MetaTags';
import Footer from '../modules/layout/components/Footer';
import Header from '../modules/layout/components/Header';

const AboutUs = () => {
  const [currentUrl, setcurrentUrl] = useState('');
  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title="About us" url={currentUrl} />
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1>About</h1>
            <p>Does the Pope shit in the woods? What in God’s holy name are you blathering about? I see you rolled your way into the semis. Dios mio, man. Seamus and me, we’re gonna fuck you up. Wal, I lost m’chain of thought here. But—aw hell, I done innerduced him enough. A dick, man! And let me tell you something: I dig your work. Playing one side against the other —in bed with everybody— fabulous stuff, man.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
