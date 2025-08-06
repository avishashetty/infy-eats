function Footer({ footerRef, footerVisible }) {
  return (
    <footer
      ref={footerRef}
      className={`w-full py-6 bg-[#222] text-white text-center mt-10 transition-all duration-1000 ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ flexShrink: 0 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <span className="font-bold tracking-wide">&copy; {new Date().getFullYear()} Infy Eats. All rights reserved.</span>
        <span className="text-sm">Made with <span className="text-[#a94438]">&#10084;</span> for Infosys Employees</span>
      </div>
    </footer>
  );
}

export default Footer;
