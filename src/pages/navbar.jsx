import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faBars } from '@fortawesome/free-solid-svg-icons';
import'./css/navbar.css'
import { supabase } from '../createClient';

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef(null);

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        function handleClickOutside(event) {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsNavOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1000);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // SCROLL
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(window.scrollY);
    //const timeoutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {            
            setShowNavbar(false);
            // Nettoyer un éventuel ancien timeout
            //if (timeoutRef.current) clearTimeout(timeoutRef.current);
        } else {
            // Scrolling up
            setShowNavbar(true);                     
            /*if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => {
                setShowNavbar(true);
            }, 25); // Délai en ms*/
            }

        setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const [listcategorie, setListCategorie] = useState([]);
    async function fetchCategorie(){
        const { data, error } = await supabase.from('categories').select('*');
        if (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        } else {                      
            setListCategorie(data);
        }
    }
    useEffect(() => {
      fetchCategorie();
    }, [])

    return (
        <nav 
            className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top" 
            ref={navRef} id="nav"
            style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                background: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                zIndex: 1000,
                transform: showNavbar ? 'translateY(0)' : 'translateY(-20px)',
                opacity: showNavbar ? 1 : 0,
                pointerEvents: showNavbar ? 'auto' : 'none', // évite les clics invisibles
                transition: 'transform 0.5s ease, opacity 0.5s ease',
            }}
        >
            <div className="container">
                <Link className="navbar-brand text-primary" to="/">
                    <img src="images/logo.png" alt="" width={100} className='rounded'/>
                </Link>
                
                <button 
                    className="navbar-toggler border-0" 
                    type="button" 
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    aria-controls="navbarNav" 
                    aria-expanded={isNavOpen} 
                    aria-label="Toggle navigation"
                >                    
                    <FontAwesomeIcon icon={faBars} style={{fontSize: "1.5rem"}}/>                    
                </button>
                
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">                   
                    <ul className="navbar-nav ms-auto flex-column flex-md-row align-items-start align-items-md-center gap-3">
                        <li className="nav-item pt-1" onClick={() => setIsNavOpen(false)}>
                            <Link className="nav-link lead" to="/">Accueil</Link>
                        </li>
                        <li 
                            className="nav-item dropdown position-relative"
                            onMouseEnter={() => !isMobile && setShowDropdown(true)}
                            onMouseLeave={() => !isMobile && setShowDropdown(false)}
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <div className="nav-link" id="categorieDropdown" role="button">
                                Catégories <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                            </div>
                            {showDropdown && (
                                <ul className="dropdown-menu show" aria-labelledby="categorieDropdown" 
                                    style={{ 
                                        top: '100%',
                                        left: isMobile ? '0%' : '50%',
                                        transform: isMobile ? 'none' : 'translateX(-50%)',
                                        backgroundColor: '#000',
                                        zIndex: 1050,
                                        position: isMobile ? 'relative' : 'absolute'
                                    }}>
                                    {listcategorie.map((cat) => 
                                        <li onClick={() => setIsNavOpen(false)} key={cat.ancre}>
                                            <Link className="dropdown-item mb-2 hov" to={`/categorie#${cat.ancre}`}>{cat.nom}</Link>
                                        </li>    
                                    )}                                                                        
                                </ul>
                            )}
                        </li>                      
                        <li className="nav-item pt-1" onClick={() => setIsNavOpen(false)}>
                            <Link className="nav-link lead" to="/apropos">À propos</Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
