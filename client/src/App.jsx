import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import PropertyDetail from './pages/PropertyDetail'
import AddEditListing from './pages/AddEditListing'
import Auth from './pages/Auth'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-transparent text-slate-800">
        <Navbar />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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

export default App