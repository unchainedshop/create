import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';
import getConfig from 'next/config';
import CatagoriesList from '../modules/assortment/components/CatagoriesList';


const {
  publicRuntimeConfig: { theme },
} = getConfig();

const Home = () => {
  return (
    <>
      <MetaTags title="Home" />
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <img
              className="my-2 mr-2"
              src={theme.assets.hero}
              alt="Hero image"
            />
          </div>
          <div className="col-6">

          </div>
          <div className="col-6">

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
