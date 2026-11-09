import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import PropertyDetail from './pages/PropertyDetail'
import AddEditListing from './pages/AddEditListing'
import Auth from './pages/Auth'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#D8CBB3] text-[#1E1E1C] flex flex-col font-sans selection:bg-[#2F6BFF] selection:text-white">
        <Navbar />

        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/add-listing" element={<AddEditListing />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
