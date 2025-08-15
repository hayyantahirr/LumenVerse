const Loading = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Navbar here */}

        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500"></div>
          <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Universe of light about to Unveil ....
          </p>
        </div>

        {/* Footer here */}
      </div>
    </>
  );
};

export default Loading;
