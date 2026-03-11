export default function SentimentBar({ buy, sell }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1.5">
        <span className="text-buy font-semibold">{buy}% Buy</span>
        <span className="text-sell font-semibold">{sell}% Sell</span>
      </div>
      <div className="flex h-[6px] rounded-full overflow-hidden gap-[2px]">
        <div
          className="bg-buy rounded-l-full transition-all duration-700 ease-out"
          style={{ width: `${buy}%`, boxShadow: '0 0 8px rgba(14, 203, 129, 0.3)' }}
        />
        <div
          className="bg-sell rounded-r-full transition-all duration-700 ease-out"
          style={{ width: `${sell}%`, boxShadow: '0 0 8px rgba(246, 70, 93, 0.3)' }}
        />
      </div>
    </div>
  );
}
