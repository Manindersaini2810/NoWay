import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

export default function PropertyGallery({ images = [], title = 'Property Image' }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const imageList = images.length
    ? images
    : ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80']

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="space-y-3">
      {/* Main Image Frame */}
      <div className="relative h-80 sm:h-96 md:h-[460px] rounded-3xl overflow-hidden bg-[#12151a] shadow-lg group">
        <img
          src={imageList[currentIndex]}
          alt={`${title} - view ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1C]/70 via-transparent to-transparent pointer-events-none" />

        {/* Controls */}
        {imageList.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E1E1C]/85 hover:bg-[#2F6BFF] text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-md"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1E1E1C]/85 hover:bg-[#2F6BFF] text-white flex items-center justify-center transition-all backdrop-blur-md cursor-pointer shadow-md"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Counter and Fullscreen Toggle */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1E1E1C]/85 text-[#D8CBB3] backdrop-blur-md border border-[#D8CBB3]/20">
            {currentIndex + 1} / {imageList.length}
          </span>
          <button
            type="button"
            onClick={() => setFullscreen(true)}
            aria-label="Fullscreen view"
            className="w-8 h-8 rounded-full bg-[#1E1E1C]/85 hover:bg-[#2F6BFF] text-[#D8CBB3] hover:text-white flex items-center justify-center backdrop-blur-md cursor-pointer transition-colors"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      {imageList.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {imageList.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`relative h-20 w-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                currentIndex === i
                  ? 'border-[#2F6BFF] ring-2 ring-[#2F6BFF]/30 scale-102'
                  : 'border-[#1E1E1C]/20 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`thumbnail ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Overlay */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={imageList[currentIndex]}
            alt={title}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl"
          />
        </div>
      )}
    </div>
  )
}
