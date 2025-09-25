'use client'
import Home from "./page";
import DonorRegistration from "./DonorRegistration";
import HospitalRegistration from "./HospitalRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DonorRegistration" element={<DonorRegistration />} />
        <Route path="/hospital-registration" element={<HospitalRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;