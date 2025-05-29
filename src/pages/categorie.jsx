import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { faDownload, faReplyAll, faSearch, faWarning} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import'./css/categorie.css'
import { supabase } from '../createClient';

function Categorie() {         
    const [listFiltre, setListFiltre] = useState([])
    const [data, setData] = useState([]);
    const [listcategorie, setListCategorie] = useState([]);
    
    async function fetchDocument(){
        const {data, error } = await supabase.from('documents').select('*');        
        if (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        } else {     
            console.log(data)                 
            setData(data);
        }        
    }    
    async function fetchCategorie(){
        const { data, error } = await supabase.from('categories').select('*');
        if (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        } else {       
            console.log(data)                 
            setListCategorie(data);
        }
    }

    useEffect(() => {                
        fetchDocument();
        fetchCategorie();
    }, []);                


    const [valeur, setValeur] = useState('')
    const [isRecherche, setIstRecherche] = useState(false)
    const handleChange = (event) => {
        setIstRecherche(false)
        const newValue = event.target.value;        
        if(newValue !== ""){
            setValeur(newValue);
        }else{
            setValeur('');
            setListFiltre([]);             
        }        
    };

    async function rechercher() {
        setListFiltre([]);        
        let d = [];        
        let val = valeur.trim();

        // Requête sur les documents (matière)
        const { data: docs1, error: error1 } = await supabase
            .from('documents')
            .select()
            .ilike('matiere', `%${val}%`);

        if (error1) {
            console.error("Erreur lors de la récupération des documents :", error1);
        } else {
            d.push(...docs1); // on ajoute tous les éléments à la liste
        }

        // Requête sur les catégories (nom)
        const { data: cats, error: error2 } = await supabase
            .from('categories')
            .select()
            .ilike('nom', `%${val}%`);

        if (error2) {
            console.error("Erreur lors de la récupération des catégories :", error2);
        } else if (cats && cats.length > 0) {
            // Pour chaque catégorie correspondante, chercher les documents liés
            for (let i = 0; i < cats.length; i++) {
                const idCat = cats[i].id;
                const { data: docs2, error: error3 } = await supabase
                    .from('documents')
                    .select()
                    .eq('categorie', idCat); // on suppose que "categorie" contient un ID

                if (error3) {
                    console.error(`Erreur lors de la récupération des documents pour la catégorie ${idCat} :`, error3);
                } else {
                    d.push(...docs2);
                }
            }
        }

        // Supprimer les doublons par ID
        const uniqueDocs = Array.from(new Map(d.map(item => [item.id, item])).values());

        setListFiltre(uniqueDocs);
        setIstRecherche(true);
    }

    
    const location = useLocation();
    const anchorId = location.hash?.slice(1); // extrait "section1" de "#section1"
    useEffect(() => {
        if (!anchorId) return;

        const scrollToAnchor = () => {
        const el = document.getElementById(anchorId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        };

        // Essaye de scroller après un petit délai (DOM déjà prêt ?)
        setTimeout(scrollToAnchor, 300);

        // En cas de chargement dynamique, on observe les changements du DOM
        const observer = new MutationObserver(() => {
        const el = document.getElementById(anchorId);
        if (el) {
            scrollToAnchor();
            observer.disconnect();
        }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, [anchorId]);

    function nomCat(id) {
        if (!Array.isArray(listcategorie)) return ''; // protection de base
        for (let index = 0; index < listcategorie.length; index++) {
            if (id === listcategorie[index].id) {
                return '[ ' + listcategorie[index].nom + ' ]';
            }
        }
        return ''; // au cas où aucun nom n'est trouvé
    }  
    
    const imgRefs = useRef({});
    
    const handleMouseEnter = (id) => {
        const img = imgRefs.current[id];
        if (!img) return;

        img.classList.remove('wiggle');
        void img.offsetWidth;
        img.classList.add('wiggle');
    };
    
    return (                 
        <div class="px-0 mx-0 pb-4 pt-3">                   
            <div className="container">                 
                <div className="row pb-4 align-items-center">
                    <div className="col-md-6 d-md-block d-none">
                        <div className="row">
                            <h5><strong>Recherche : </strong></h5>
                        </div>                        
                    </div>
                    <div className="col-md-6">                        
                        <form class="d-flex" role="search" onSubmit={(e)=>{e.preventDefault(); rechercher()}}>                        
                            <input id='recherche' class="form-control me-2" 
                                type="search" placeholder="Rechercher" aria-label="Search"
                                required                                                               
                                onChange={handleChange}                                                                                                                         
                            />
                            <button class="btn btn-outline-secondary d-flex me-1" type="submit">
                                <FontAwesomeIcon icon={faSearch} size="1x" className='me-md-2 mt-1'/> <small className='d-md-block d-none'>Rechercher</small>                                                                
                            </button>
                            <button 
                                class="btn border-none d-flex" type="reset" 
                                onClick={()=>setIstRecherche(false)}
                            >
                                <FontAwesomeIcon icon={faReplyAll} size="1x" className=' mt-1'/>
                            </button>
                        </form>                        
                    </div>
                </div>

                {(listFiltre.length > 0 || !isRecherche) &&
                    <div className="row">
                        <p>
                            Notre plateforme met à votre disposition un large éventail de documents juridiques, 
                            classés par domaines de droit : <strong>{listcategorie.map(cat => cat.nom).join(', ')}</strong>. Les 
                            documents <strong>gratuits</strong> couvrent les notions de base, tandis que les documents 
                            professionnels, <strong>payants</strong>, répondent à des besoins plus approfondis. Que vous soyez 
                            étudiant, professionnel ou en quête d’informations fiables, nos ressources sont 
                            conçues pour vous accompagner efficacement.
                        </p>
                    </div>
                }

                {!isRecherche ? <>
                    {listcategorie.map((cat) => (
                        <div className="row p-0 mb-4 mt-3" id={cat.ancre} key={cat.id}>
                            <div className="col px-0">
                                <div className="row">
                                    <div className="col">
                                        <div className="card text-center bd-body">
                                            <div className="card-header">                                                
                                                <div className="mt-0 row">                                                    
                                                    <div className="col-md-2">
                                                        <div className="row d-flex justify-content-center">
                                                            <div className="col-12 px-0">
                                                                <a
                                                                    className="nav-link active border-none py-3"
                                                                    aria-current="true"
                                                                    href={"#" + cat.ancre}
                                                                    style={{
                                                                        backgroundColor: "gold",
                                                                        borderRadius: "10px 10px 0px 0px",
                                                                        color: "black",
                                                                        width: "100%"
                                                                    }}
                                                                >
                                                                    <strong>{cat.nom}</strong>
                                                                </a>
                                                            </div>
                                                            <div className="col-md-12 col-auto px-0">
                                                                <img
                                                                    src={cat.image}
                                                                    className="img-fluid card-img-bottom rounded-0"
                                                                    alt="..."
                                                                    style={{ maxHeight: "300px", objectFit: "contain" }}
                                                                />                                                               
                                                            </div>
                                                        </div>                                                        
                                                    </div>
                                                    <div className="col-md-10 mt-md-0 mt-3 text-start">
                                                        <h5 className="card-title"><strong>Définition : </strong> {cat.definition} </h5>
                                                        <p className="card-text">
                                                            {cat.description}
                                                        </p>
                                                        <a href="#recherche" className="btn btn-outline-secondary">
                                                            Rechercher
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card-body text-start">
                                                <div className="row">
                                                    <div className="col">
                                                        {data.filter((item) => item.categorie === cat.id).slice(0, 5)
                                                        .map((item) => (
                                                            <div className="col-12 mb-3" key={item.id}>
                                                                <div className="card border-start border-0 py-0">
                                                                    <div className="card-body d-flex align-items-center py-0">
                                                                        <div
                                                                            className="flex-grow-1 text-start cur"
                                                                            onMouseEnter={()=>{ item.payant && handleMouseEnter(item.id)}}
                                                                        >
                                                                            <h5 className="mb-0">
                                                                                <strong>{item.matiere} </strong>
                                                                                <small className="text-secondary">{nomCat(item.categorie)}</small>

                                                                                {item.payant && (
                                                                                    <span ref={(el) => (imgRefs.current[item.id] = el)}>
                                                                                        <img                                                        
                                                                                            src="https://img.icons8.com/?size=20&id=3915&format=png&color=FAB005"
                                                                                            className="ms-3 mb-1 me-1"
                                                                                            alt=""
                                                                                            style={{ color: 'gold' }}
                                                                                        />
                                                                                        <strong className="fs-6 text-secondary">
                                                                                            Pro <span style={{ color: 'gold' }}>{item.prix}&euro;</span>
                                                                                        </strong>
                                                                                    </span>
                                                                                )}
                                                                            </h5>
                                                                            <p className="mb-0 text-grey lead fs-6">{item.description}</p>
                                                                        </div>

                                                                        <a
                                                                            href={item.url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="ms-3 text-decoration-none d-flex"
                                                                            title={
                                                                                "Télécharger le fichier pdf du livre " +
                                                                                item.matiere
                                                                            }  
                                                                            onMouseEnter={()=>{ item.payant && handleMouseEnter(item.id)}}                                                                    
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faDownload}
                                                                                size="1x"                                                                                
                                                                                className={`me-2 mt-md-1 ${item.payant ? 'text-warning' : ''}`}
                                                                            />
                                                                            <p className={`d-md-block d-none ${item.payant ? 'text-warning' : ''}`}>
                                                                                Télécharger
                                                                            </p>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row justify-content-center mb-3">
                                                <div className="col-md-5">
                                                    <a href='#recherche' className='btn btn-primary'>
                                                        Plus de documents sur {cat.nom}
                                                    </a>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </> 
                : 
                    <>{ listFiltre.length > 0 ? 
                        <div className="row mt-4">
                            <div className="col">
                                {listFiltre.map((item, index) => (
                                    <div className="col-12 mb-3" key={item.id || index}>
                                        <div className="card border-start border-0 py-0">
                                            <div className="card-body d-flex align-items-center py-0">                                
                                                <div
                                                    className="flex-grow-1 text-start cur"
                                                    onMouseEnter={()=>{ item.payant && handleMouseEnter(item.id)}}
                                                >
                                                    <h5 className="mb-0">
                                                        <strong>{item.matiere}</strong>
                                                        <small className='lead text-secondary'>{nomCat(item.categorie)}</small>
                                                        {item.payant && (
                                                            <span ref={(el) => (imgRefs.current[item.id] = el)}>
                                                                <img                                                        
                                                                    src="https://img.icons8.com/?size=20&id=3915&format=png&color=FAB005"
                                                                    className="ms-3 mb-1 me-1"
                                                                    alt=""
                                                                    style={{ color: 'gold' }}
                                                                />
                                                                <strong className="fs-6 text-secondary">
                                                                    Pro <span style={{ color: 'gold' }}>{item.prix}&euro;</span>
                                                                </strong>
                                                            </span>
                                                        )}   
                                                    </h5>
                                                    <p className="mb-0 text-grey lead fs-6">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ms-3 text-decoration-none d-flex"
                                                    title={
                                                        "Télécharger le fichier pdf du livre " +
                                                        item.matiere
                                                    }   
                                                    onMouseEnter={()=>{ item.payant && handleMouseEnter(item.id)}}                                                                         
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faDownload}
                                                        size="1x"                                                                                
                                                        className={`me-2 mt-md-1 ${item.payant && 'text-warning'}`}
                                                    />
                                                    <p className={`d-md-block d-none ${item.payant && 'text-warning'}`}>
                                                        Télécharger
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}  
                            </div>
                        </div>
                        :
                        <>
                            <div className="row d-flex align-items-center" style={{height:'250px'}}>
                                <div className="col text-center">
                                    <FontAwesomeIcon icon={faWarning} size="1x" className='me-2'/> Aucun trouvé
                                </div>
                            </div>
                        </>
                    }</>
                }                                             
            </div>
        </div>                        
    );
}
export default Categorie;