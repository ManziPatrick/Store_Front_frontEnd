import notFound from '../../assets/animations/notfound.gif';
const Notfound = () => {
	return (
		<div className="h-screen w-screen flex flex-col justify-start items-center">
			<img src={notFound} alt="oops" width="150" height="200" />
			<div className=" flex  items-center gap-4 ">
				<p className="text-2xl font-bold  text-blue-600">404</p>
				<div className="h-2 w-6 bg-blue-600"></div>
				<p className="text-2xl font-semibold  text-blue-600">Page Not Found</p>
			</div>
		</div>
	);
};

export default Notfound;
