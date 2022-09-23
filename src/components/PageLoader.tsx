import CircularProgress from "@mui/material/CircularProgress";

const PageLoader = () => (
	<div className='flex justify-center w-full p-20'>
		<CircularProgress size={100} thickness={1} />
	</div>
);

export default PageLoader;
