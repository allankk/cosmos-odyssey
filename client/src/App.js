import MainSearch from "./Components/MainSearch";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookFlight from "./Components/BookFlight/BookFlight";
import Navigation from "./Components/Navigation";
import Bookings from "./Components/Bookings/Bookings";
import About from "./Components/About";

function App() {
  return (
    <div className="App place-content-center min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
      <header className="App-header">

        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<MainSearch />} />
            <Route path="/bookflight" element={<BookFlight />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
