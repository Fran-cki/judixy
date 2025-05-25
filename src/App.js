import Navbar from './pages/navbar';  // Assure-toi de mettre le bon chemin d'importation
import Home from './pages/home';  // Exemple de page d'accueil
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Apropos from './pages/apropos';
import Footer from './pages/footer';
import Categorie from './pages/categorie';

import './App.css'

function App() {
    return (
        <Router>            
            <Navbar />
            <div smooth-wrapper className="container-fluid mt-5 pt-4">                
                <Routes>
                    <Route path="/" element={<Home />} />               
                    <Route path="*" element={<Home />} /> 

                    <Route path="/apropos" element={<Apropos />} />  
                    <Route path="/categorie" element={<Categorie />} />                                   
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;
