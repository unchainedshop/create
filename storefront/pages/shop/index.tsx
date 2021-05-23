import { useEffect, useState } from 'react';

import CategoryListItem from '../../modules/assortment/components/CategoryListItem';
import useAssortments from '../../modules/assortment/hooks/useAssortments';
import LoadingItem from '../../modules/common/components/LoadingItem';
import MetaTags from '../../modules/common/components/MetaTags';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const Products = () => {
  const { assortments, loading } = useAssortments();
  const [currentUrl, setcurrentUrl] = useState('');

  useEffect(() => {
    setcurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <MetaTags title="Product Categories" url={currentUrl} />
      <Header />
      <div className="container">
        {loading ? (
          <LoadingItem />
        ) : (
          <div className="row">
            {assortments.map((category) => (
              <CategoryListItem
                key={category._id}
                category={category}
                className="col-md-6 col-lg-4"
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;
