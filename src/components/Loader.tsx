const Loader = () => {
  return (
    <div className="flex items-center justify-center text-3xl font-extrabold">
      <div
        className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full"
        role="status"
      >
        <span className="visually-hidden">.</span>
      </div>
    </div>
  );
};

export default Loader;
