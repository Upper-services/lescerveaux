function Review({ date, text, header, name }) {
  return (
    <div className="min-w-full md:min-w-[370px] flex flex-col text-sm p-4">
      <div className="flex justify-between items-center mb-1.5">
        <img
          src="https://www.londonfilmed.com/wp-content/uploads/2021/02/5c73e733fd0819a265904d0c_trustpilot-stars-2018.png"
          alt=""
          className="h-6 object-contain"
        />
        <h6 className="opacity-60 text-xs">{date}</h6>
      </div>
      <h4 className="font-semibold mb-1">{header}</h4>
      <p className="font-light text-xs line-clamp-3 mb-1">{text}</p>
      <h4 className="text-xs opacity-60">{name}</h4>
    </div>
  )
}

export default Review
