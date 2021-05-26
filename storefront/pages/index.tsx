import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';

const Home = () => {
  return (
    <>
      <MetaTags title="Home" />
      <Header />

      <div className="container">
        <div className="header__bottom" />

        <div className="text-center py-5">
          <div className="row d-flex align-items-center">
            <div className="col-12">
              <h1 className="color-brand mt-2">Shop Startseite</h1>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
