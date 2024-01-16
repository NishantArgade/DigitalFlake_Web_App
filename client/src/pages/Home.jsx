const Home = () => {
  return (
    <div className="flex justify-center items-center w-full md:h-full h-screen ">
      <div className="flex flex-col gap-2 justify-center items-center">
        <img
          src="/assets/brandBigLogo.svg"
          alt="logo"
          className="w-44 md:w-52"
        />
        <p className="md:text-lg text-sm text-gray-600">
          Welcome to DigitalFlake Admin
        </p>
      </div>
    </div>
  );
};

export default Home;
