import { Link } from 'react-router-dom'
import { PlusCircle, Building2 } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-[#1E1E1C] text-[#D8CBB3] p-8 sm:p-14 my-12 border border-[#383833] shadow-2xl">
      <div className="relative z-10 max-w-3xl">
        <span className="text-xs font-black uppercase tracking-widest text-[#2F6BFF]">
          Brokers & Institutional Owners
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-2 leading-[1.15]">
          Ready to List or Scale Your Commercial Assets?
        </h2>
        <p className="text-sm sm:text-base text-[#D8CBB3]/80 mt-4 leading-relaxed font-medium">
          Join leading developers, REITS, and enterprise tenants using NoWay to market Grade-A assets, verify pricing with AI, and accelerate transaction closing times.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/add-listing"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white transition-all shadow-lg shadow-[#2F6BFF]/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle size={16} />
            <span>List a Commercial Property</span>
          </Link>
          <Link
            to="/search"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider bg-[#282825] hover:bg-[#383833] text-[#D8CBB3] border border-[#383833] transition-all flex items-center justify-center gap-2"
          >
            <Building2 size={16} className="text-[#2F6BFF]" />
            <span>Browse All Available Spaces</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
