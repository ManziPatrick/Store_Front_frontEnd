import { useParams } from 'react-router-dom';
import ShopNestNavbar from '../../../components/shopnest/ShopNestNavbar';
import Productsdisplay from '../../../components/shopnest/Productsdisplay';
import ProductReviews from '../../../components/shopnest/ProductReviews';
import Footer from '../../../components/shopnest/Footer';
import SimilarProducts from '../../../components/shopnest/similarProducts';

export const SingleProduct = () => {
	const { id } = useParams();

	const productId = id || 'a1c86780-8802-4e65-8ac6-e1e2b2032c59';

	return (
		<div className=" flex flex-col items-center">
			<ShopNestNavbar initialNavBar="Shop" />
			<Productsdisplay productId={productId} />
			<ProductReviews productId={productId} />
			<SimilarProducts productId={productId} />
			<Footer />
		</div>
	);
};
