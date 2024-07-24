import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from "./components/ThemeContext";
import { AnimatePresence } from 'framer-motion';
import "./components/main.css"
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from "./components/LandingPage";
import CreateComputer from "./components/computadores/Ccomputadores";
import ComputadoresList from "./components/computadores/Vercomputadores";
import ComputadorDetails from "./components/computadores/Computadordetails";
import EditComputador from "./components/computadores/EditComputador";
import CreateCPU from "./components/CPU/CreateCpu";
import CPUDetalle from "./components/CPU/CpuDetails";
import CPUList from "./components/CPU/CpuList";
import EditCPU from "./components/CPU/EditCpu";
import CreateGPU from "./components/GPU/CreateGpu";
import GPUDetalle from "./components/GPU/GpuDetails";
import GPUList from "./components/GPU/GpuList";
import EditGPU from "./components/GPU/EditGpu";
import CreateRAM from "./components/RAM/CreateRam";
import RAMDetalle from "./components/RAM/RamDetails";
import RAMList from "./components/RAM/RamList";
import EditRAM from "./components/RAM/EditRam";
import CreateStorage from "./components/Almacenamiento/CreateStorage";
import StorageDetalle from "./components/Almacenamiento/StorageDetails";
import StorageList from "./components/Almacenamiento/StorageList";
import EditStorage from "./components/Almacenamiento/EditStorage";
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content-wrapper">
            <Sidebar />
            <main className="mainn">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route exact path="/" Component={LandingPage} />
                  <Route path="/Ccomputador" Component={CreateComputer} />
                  <Route path="/computadores" Component={ComputadoresList} />
                  <Route
                    path="/computadores/:id"
                    Component={ComputadorDetails}
                  />
                  <Route
                    path="/Editcomputadores/:id"
                    Component={EditComputador}
                  />
                  <Route path="/CrearCPU" Component={CreateCPU} />
                  <Route path="/cpus/:id" Component={CPUDetalle} />
                  <Route path="/cpus" Component={CPUList} />
                  <Route path="/editcpu/:id" Component={EditCPU} />
                  <Route path="/CrearGPU" Component={CreateGPU} />
                  <Route path="/gpus/:id" Component={GPUDetalle} />
                  <Route path="/gpus" Component={GPUList} />
                  <Route path="/editgpu/:id" Component={EditGPU} />
                  <Route path="/CrearRAM" Component={CreateRAM} />
                  <Route path="/rams/:id" Component={RAMDetalle} />
                  <Route path="/rams" Component={RAMList} />
                  <Route path="/editram/:id" Component={EditRAM} />
                  <Route path="/CrearAlmacenamiento" Component={CreateStorage} />
                  <Route path="/storages/:id" Component={StorageDetalle} />
                  <Route path="/storages" Component={StorageList} />
                  <Route path="/editstorage/:id" Component={EditStorage} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
