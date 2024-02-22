import ShopNestNavbar from '../../../components/shopnest/ShopNestNavbar';
import Productsdisplay from '../../../components/shopnest/Productsdisplay';
import SimilarProducts from '../../../components/shopnest/similarProducts';
import Footer from '../../../components/shopnest/Footer';
import ProductReviews from '../../../components/shopnest/ProductReviews';

const ProductReview = () => {
	return (
		<div>
			<ShopNestNavbar initialNavBar="" />
			<Productsdisplay productId={''} />
			<ProductReviews productId={''} />
			<SimilarProducts productId={''} />
			<Footer />
		</div>
	);
};

export default ProductReview;
