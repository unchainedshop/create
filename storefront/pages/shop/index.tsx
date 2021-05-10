import CategoryListItem from '../../modules/assortment/components/CatagoryListItem';
import useAssortments from '../../modules/assortment/hooks/useAssortments';
import Footer from '../../modules/layout/components/Footer';
import Header from '../../modules/layout/components/Header';

const Products = () => {
  const { assortments } = useAssortments();
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          {assortments.map((catagory) => (
            <CategoryListItem
              category={catagory}
              className="col-md-6 col-lg-4"
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
