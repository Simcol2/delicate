export default function Ticker() {
  const items = [
    'Bespoke Florals',
    'Wedding & Event Design',
    'Luxury Installations',
    'Desert-Inspired Botanicals',
    'Private Residences',
    'Corporate Suites',
  ]

  // Double the items for seamless loop
  const allItems = [...items, ...items]

  return (
    <div className="bg-dark py-4 overflow-hidden">
      <div className="flex animate-ticker">
        {allItems.map((item, index) => (
          <span
            key={index}
            className="font-serif-sc text-xs font-light tracking-[0.3em] text-cream py-2 px-12 flex items-center gap-12 whitespace-nowrap"
          >
            {item}
            <span className="text-midnight text-[0.5rem]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
