import FormatQuoteRoundedIcon from "@material-ui/icons/FormatQuoteRounded";

function Quote({ book, author, quote }) {
  return (
    <div className="relative group">
      <div class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative bg-black w-[300px] h-48 sm:w-[600px] md:w-[750px] lg:w-[900px] sm:h-40  rounded-lg flex hover:scale-[1.01] transition duration-300">
        {/* <span className="h-full w-1 absolute left-0 bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] rounded-tl rounded-bl" /> */}
        <FormatQuoteRoundedIcon
          fontSize="large"
          className="text-pink-600 m-2"
        />
        <div className="flex flex-col justify-between p-4 md:p-6 text-sm md:text-base">
          <p className="italic font-medium text-gray-100">{quote}</p>
          <div className="font-semibold">
            <h4 className="italic text-indigo-400">{book}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
