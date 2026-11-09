import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1C] text-[#D8CBB3] border-t border-[#D8CBB3]/15 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D8CBB3]/15">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" light={true} />
            <p className="text-xs text-[#D8CBB3]/80 max-w-sm leading-relaxed">
              NoWay is the next-generation commercial property intelligence platform.
              Bridging institutional capital, enterprise occupiers, and verified commercial assets with machine-learning valuations.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#1E1E1C] text-[#2F6BFF] border border-[#2F6BFF]/30">
                CatBoost ML Microservice
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#1E1E1C] text-[#D8CBB3] border border-[#D8CBB3]/25">
                Institutional Grade
              </span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#D8CBB3] mb-3">
              Commercial Assets
            </h4>
            <ul className="space-y-2 text-xs text-[#D8CBB3]/70">
              <li>
                <Link to="/search?type=office" className="hover:text-[#2F6BFF] transition-colors">
                  Office Campuses
                </Link>
              </li>
              <li>
                <Link to="/search?type=retail" className="hover:text-[#2F6BFF] transition-colors">
                  Retail & Shopping Centers
                </Link>
              </li>
              <li>
                <Link to="/search?type=warehouse" className="hover:text-[#2F6BFF] transition-colors">
                  Logistics & Fulfillment
                </Link>
              </li>
              <li>
                <Link to="/search?type=industrial" className="hover:text-[#2F6BFF] transition-colors">
                  Industrial Facilities
                </Link>
              </li>
              <li>
                <Link to="/search?type=land" className="hover:text-[#2F6BFF] transition-colors">
                  Commercial Land Parcels
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Hubs */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#D8CBB3] mb-3">
              Prime Indian Hubs
            </h4>
            <ul className="space-y-2 text-xs text-[#D8CBB3]/70">
              <li>
                <Link to="/search?city=Gurgaon" className="hover:text-[#2F6BFF] transition-colors">
                  Gurgaon (CyberCity)
                </Link>
              </li>
              <li>
                <Link to="/search?city=Bengaluru" className="hover:text-[#2F6BFF] transition-colors">
                  Bengaluru (Outer Ring Rd)
                </Link>
              </li>
              <li>
                <Link to="/search?city=Mumbai" className="hover:text-[#2F6BFF] transition-colors">
                  Mumbai (BKC)
                </Link>
              </li>
              <li>
                <Link to="/search?city=Hyderabad" className="hover:text-[#2F6BFF] transition-colors">
                  Hyderabad (HITEC City)
                </Link>
              </li>
              <li>
                <Link to="/search?city=Mohali" className="hover:text-[#2F6BFF] transition-colors">
                  Mohali & Chandigarh
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Action */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[#D8CBB3] mb-3">
              For Brokers & Owners
            </h4>
            <p className="text-xs text-[#D8CBB3]/70 mb-4">
              Market your commercial inventory directly to verified corporate occupiers.
            </p>
            <Link
              to="/add-listing"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#2F6BFF] hover:bg-[#1E55E6] text-white shadow-md shadow-[#2F6BFF]/25 transition-all"
            >
              <Plus size={14} />
              <span>List Commercial Space</span>
            </Link>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D8CBB3]/50 gap-4">
          <p>© 2026 NoWay Commercial Real Estate Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Enterprise Privacy</span>
            <span>Broker Standards</span>
            <span>Valuation Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
