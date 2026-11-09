import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import FilterPanel from './FilterPanel'

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  setFilters,
  onReset,
  totalResults,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#1E1E1C]/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer Content in Charcoal */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-full max-w-xs bg-[#1E1E1C] text-[#D8CBB3] h-full shadow-2xl flex flex-col z-10 overflow-y-auto border-r border-[#383833]"
          >
            <div className="p-4 border-b border-[#383833] flex items-center justify-between bg-[#282825]">
              <span className="text-sm font-black text-white uppercase tracking-wider">
                Refine Search
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#1E1E1C] border border-[#383833] flex items-center justify-center text-[#D8CBB3]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 flex-1">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                onReset={onReset}
                totalResults={totalResults}
              />
            </div>

            <div className="p-4 border-t border-[#383833] bg-[#282825]">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white shadow-md"
              >
                Apply Filters ({totalResults})
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
