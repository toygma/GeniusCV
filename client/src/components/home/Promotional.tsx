import React from "react";

const Promotional: React.FC = () => {
  return (
    <div className="flex items-center justify-center mt-12 mb-12">
      <div className="flex flex-col md:flex-row items-center justify-around text-sm border border-gray-300 rounded-md m-2 max-w-5xl w-full bg-white">
        <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
          <h2 className="md:text-4xl text-2xl font-semibold text-gray-800">
            Download Mobile App
          </h2>
          <p className="text-gray-700 mt-2 w-3/4">
            Mobile banking app for iOS & Android to manage your online money.
          </p>

          <div className="flex items-center gap-4 mt-6">
            <button
              aria-label="googlePlayBtn"
              className="active:scale-95 transition-all"
              type="button"
            >
              <img
                className="md:w-44 w-28"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/googlePlayBtn.svg"
                alt="googlePlayBtn"
              />
            </button>
            <button
              aria-label="appleStoreBtn"
              className="active:scale-95 transition-all"
              type="button"
            >
              <img
                className="md:w-44 w-28"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/appleStoreBtn.svg"
                alt="appleStoreBtn"
              />
            </button>
          </div>
        </div>

        <img
          className="max-w-[375px] pt-10 md:p-0"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/excitedWomenImage.png"
          alt="excitedWomenImage"
        />
      </div>
    </div>
  );
};

export default Promotional;
