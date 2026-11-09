import { Sparkles, ShieldCheck, MailCheck, FileSpreadsheet } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'AI Commercial Valuation',
    description:
      'Our microservice estimates fair market asset value and cap rates using hedonic regression trained on real commercial leases and zoning datasets.',
    icon: Sparkles,
  },
  {
    step: '02',
    title: 'Verified Engineering Specs',
    description:
      'Every listing is cataloged with certified clear ceiling heights, floor-load capacities, 3-phase power allocations, HVAC ratings, and road frontage.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Interactive Spatial Inspection',
    description:
      'Preview multi-angle photographic galleries, inspect zoning classifications, and schedule physical site visits directly with accredited asset managers.',
    icon: FileSpreadsheet,
  },
  {
    step: '04',
    title: 'Direct Broker Deal Execution',
    description:
      'Connect directly to institutional brokers with zero intermediaries. Submit structured inquiries, receive digital memorandums, and finalize lease terms.',
    icon: MailCheck,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 my-8 rounded-[2.5rem] bg-[#EDE4D4] border border-[#C8BAA0] p-8 sm:p-12">
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-black uppercase tracking-widest text-[#2F6BFF]">
          Institutional Efficiency
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-[#1E1E1C] tracking-tight mt-1">
          How NoWay Transforms Commercial Real Estate
        </h2>
        <p className="text-sm text-[#1E1E1C]/75 mt-2 leading-relaxed font-medium">
          Traditional commercial leasing is slow, fragmented, and opaque. NoWay combines machine learning valuation with verified engineering blueprints to accelerate transaction velocity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.step}
              className="p-6 rounded-3xl bg-[#D8CBB3] border border-[#C8BAA0] shadow-sm flex flex-col justify-between hover:border-[#1E1E1C] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#1E1E1C] text-[#2F6BFF] border border-[#383833] flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <span className="text-2xl font-black text-[#1E1E1C]/40">{item.step}</span>
                </div>

                <h3 className="text-base font-black text-[#1E1E1C] mb-2">{item.title}</h3>
                <p className="text-xs text-[#1E1E1C]/75 leading-relaxed font-medium">{item.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#C8BAA0] text-[11px] font-black text-[#2F6BFF]">
                Enterprise Grade
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
