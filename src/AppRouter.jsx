import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import LayananDetail from "./pages/LayananDetail.jsx";
import ScrollToHash from "./components/ScrollToHash.jsx";

import IGDPage from "./pages/medik/IGDPage.jsx";
import RawatJalanPage from "./pages/medik/RawatJalanPage.jsx";
import PoliPage from "./pages/medik/PoliPage.jsx";
import RawatInapPage from "./pages/medik/RawatInapPage.jsx";
import IntensiveCarePage from "./pages/medik/IntensiveCarePage.jsx";
import ICUPage from "./pages/medik/ICUPage.jsx";
import NICUPage from "./pages/medik/NICUPage.jsx";
import PICUPage from "./pages/medik/PICUPage.jsx";
import SejarahPage from "./pages/tentang/SejarahPage.jsx";
import VisiMisiPage from "./pages/tentang/VisiMisiPage.jsx";
import StrukturPage from "./pages/tentang/StrukturPage.jsx"; // route /truktur (ikut typo navbar)
import TupoksiPage from "./pages/tentang/TupoksiPage.jsx";
import KinerjaPage from "./pages/tentang/KinerjaPage.jsx";
import MutuUnitPage from "./pages/tentang/MutuUnitPage.jsx";
import KepuasanPage from "./pages/tentang/KepuasanPage.jsx";
import IBSPage from "./pages/penunjang/IBSPage.jsx";
import FarmasiPage from "./pages/penunjang/FarmasiPage.jsx";
import LabPage from "./pages/penunjang/LabPage.jsx";
import RadiologiPage from "./pages/penunjang/RadiologiPage.jsx";
import AmbulanceJenazahPage from "./pages/penunjang/AmbulanceJenazahPage.jsx";
import GiziPage from "./pages/penunjang/GiziPage.jsx";
import LaporanProgramPage from "./pages/tentang/LaporanProgramPage.jsx";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/layanan/:slug" element={<LayananDetail />} />
        {/* Pelayanan Medik (halaman terpisah) */}
        <Route path="/igd" element={<IGDPage />} />
        <Route path="/rawat-jalan" element={<RawatJalanPage />} />
        <Route path="/poli" element={<PoliPage />} />
        <Route path="/rain" element={<RawatInapPage />} />{" "}
        {/* biarkan typo sesuai navbar */}
        <Route path="/rawat-inap" element={<RawatInapPage />} />{" "}
        {/* alias optional */}
        <Route path="/intensive-care" element={<IntensiveCarePage />} />
        <Route path="/icu" element={<ICUPage />} />
        <Route path="/nicu" element={<NICUPage />} />
        <Route path="/picu" element={<PICUPage />} />
        <Route path="/sejarah" element={<SejarahPage />} />
        <Route path="/visi-misi" element={<VisiMisiPage />} />
        <Route path="/truktur" element={<StrukturPage />} />
        <Route path="/kinerja" element={<KinerjaPage />} />
        <Route path="/mutu" element={<MutuUnitPage />} />
        <Route path="/kepuasan" element={<KepuasanPage />} />
        <Route path="/ibs" element={<IBSPage />} />
        <Route path="/farmasi" element={<FarmasiPage />} />
        <Route path="/lab" element={<LabPage />} />
        <Route path="/radiologi" element={<RadiologiPage />} />
        <Route path="/ambulance-jenazah" element={<AmbulanceJenazahPage />} />
        <Route path="/gizi" element={<GiziPage />} />
        <Route path="/pelayanan" element={<LaporanProgramPage />} />
        <Route path="/tupoksi" element={<TupoksiPage />} />
      </Routes>
    </BrowserRouter>
  );
}
