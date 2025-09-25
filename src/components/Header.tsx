const Header = () => {
  return (
    <header className="bg-[#141616] h-[72px]">
      <div className="container h-full flex justify-start items-center">
        <div className="flex items-center gap-3">
          <img src="/src/assets/jetcharts.svg" alt="JetCharts" className="w-[50px]" />
          <h1 className="font-sans text-3xl font-[900]">JETCHARTS</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;