import Link from 'next/link';

import Header from '../modules/layout/components/Header';
import Footer from '../modules/layout/components/Footer';
import MetaTags from '../modules/common/components/MetaTags';
import MegaDropdown from '../modules/assortment/components/MegaDropdown';
import getCatagoriesHierarchies from '../modules/assortment/utils/getCatagoriesHierarchies';
import useAssortmentsLinks from '../modules/assortment/hooks/useAssortmentsLinks';
import DesktopNavigation from '../modules/assortment/components/DesktopNavigation';

const Home = () => {
  const { assortments } = useAssortmentsLinks();

  const routes = getCatagoriesHierarchies(assortments);
  console.log(routes);
  return (
    <>
      <MetaTags title="Your Webshop" />
      <Header />
      <div className="color-bg-brand-lightest">
        <div className="container">
          <div className="d-flex">
            <DesktopNavigation />
            <Link href="/shop">
              <a>Shop</a>
            </Link>
          </div>
          <div className="text-center py-5">
            <div className="row d-flex align-items-center">
              <div className="col-lg-8">
                <h1 className="color-brand mt-2">Unchained Shop</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
