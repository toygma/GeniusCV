const Footer = () => {
  return (
    <>
      {/* Google Fonts import */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            * {
              font-family: 'Poppins', sans-serif;
            }
          `,
        }}
      />

      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
          {/* Logo + açıklama */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-sm leading-7 mt-6">
              GeniusCV is a free and open-source UI component library with over
              300+ beautifully crafted, customizable components built with
              Tailwind CSS.
            </p>
          </div>

          {/* Company links */}
          <div className="flex flex-col lg:items-center lg:justify-center">
            <div className="flex flex-col text-sm space-y-2.5">
              <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
              <a className="hover:text-slate-600 transition" href="#">
                About us
              </a>
              <a
                className="hover:text-slate-600 transition flex items-center"
                href="#"
              >
                Careers
                <span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">
                  We’re hiring!
                </span>
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Contact us
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Privacy policy
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-6 max-w-sm">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-50">
                <input
                  className="focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 py-2 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-indigo-600 px-4 py-2 text-white rounded hover:bg-indigo-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alt kısım */}
        <p className="py-4 text-center border-t mt-6 border-slate-200">
          Copyright 2025 © GeniusCV All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
