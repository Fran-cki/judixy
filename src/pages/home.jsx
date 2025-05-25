import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import { faDownload, faBook, faCircle, faMessage, faExclamationTriangle, faListCheck, faFilePdf, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import'./css/home.css'
import { supabase } from '../createClient';
import { Link } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState([]);
    const [listcategorie, setListCategorie] = useState([]);

    async function fetchDocument(){
        const {data} = await supabase.from('documents').select('*');        
        setData(data)
    }    
    async function fetchCategorie(){
        const { data, error } = await supabase.from('categories').select('*');
        if (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        } else {                               
            setListCategorie(data);
        }
    }    

    const listimg = ["img1.jpg", "img2.avif", "img3.avif", "img4.jpg"]
    const [image, setImage] = useState(listimg[2]);                         

    function nomCat(id) {
        if (!Array.isArray(listcategorie)) return ''; // protection de base
        for (let index = 0; index < listcategorie.length; index++) {
            if (id === listcategorie[index].id) {
                return '[ ' + listcategorie[index].nom + ' ]';
            }
        }
        return ''; // au cas où aucun nom n'est trouvé
    }

    const [imageUrl, setImageUrl] = useState(null);
    const [imageUrl2, setImageUrl2] = useState(null);

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);


    const ACCESS_KEY = "LjO252Nx6QpIWRhNuEH3G6sKsNQMzbcyO2e5DR8rdH4"; // remplace par ta clé réelle
    //const linkdefault = "https://images.pexels.com/photos/6077797/pexels-photo-6077797.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"    
    const linkdefault = "https://images.pexels.com/photos/8112201/pexels-photo-8112201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    const linkdef2 = "https://images.unsplash.com/photo-1638537690581-dc2192bfc7dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGxvaXxlbnwwfHwwfHx8MA%3D%3D"

    const image1Def = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGF3fGVufDB8fDB8fHww"
    const image2Def = "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2F0fGVufDB8fDB8fHww"
    const image3Def = "https://images.unsplash.com/photo-1617203443952-6d2619f7ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhd3xlbnwwfHwwfHx8MA%3D%3D"
    const image4Def =  "https://plus.unsplash.com/premium_photo-1661333820879-517c5e808bfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXZvY2F0fGVufDB8fDB8fHww"

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(
                    `https://api.unsplash.com/photos/random?query=${'law'}&client_id=${ACCESS_KEY}`
                );
                const data = await response.json();
                if (data?.urls?.regular
                ) {
                    setImageUrl(data.urls.regular);                     
                } else {
                    setImageUrl(linkdefault);                       
                }
            } catch (error) {
                console.error("Erreur lors du chargement de l'image Unsplash :", error);            
                setImageUrl(linkdefault);                   
            }
            try{
                const response2 = await fetch(
                    `https://api.unsplash.com/photos/random?query=${'law'}&client_id=${ACCESS_KEY}`
                );                                               
                const data2 = await response2.json();
                if (data2?.urls?.regular
                ) {
                    setImageUrl2(data2.urls.regular);                     
                } else {
                    setImageUrl2(linkdef2);                       
                } 
            } catch (error) {
                console.error("Erreur lors du chargement de l'image Unsplash :", error);            
                setImageUrl(linkdef2);                   
            }
            try{
                const image1 = await fetch(
                    `https://api.unsplash.com/photos/random?query=${'law'}&client_id=${ACCESS_KEY}`
                );
                const data_image1 = await image1.json();
                if (data_image1?.urls?.regular
                ) {
                    setImage1(data_image1.urls.regular);                     
                } else {
                    setImage1(image1Def);                       
                } 
            } catch (error) {
                console.error("Erreur lors du chargement de l'image Unsplash :", error);            
                setImageUrl(image1Def);                   
            }
            try{
                const image2 = await fetch(
                    `https://api.unsplash.com/photos/random?query=${'law'}&client_id=${ACCESS_KEY}`
                );
                const data_image2 = await image2.json();
                if (data_image2?.urls?.regular
                ) {
                    setImage2(data_image2.urls.regular);                     
                } else {
                    setImage2(image2Def);                       
                } 
            } catch (error) {
                console.error("Erreur lors du chargement de l'image Unsplash :", error);            
                setImageUrl(image2Def);                   
            }
            try{
                const image3 = await fetch(
                    `https://api.unsplash.com/photos/random?query=${'law'}&client_id=${ACCESS_KEY}`
                );
                const data_image3 = await image3.json();
                if (data_image3?.urls?.regular
                ) {
                    setImage3(data_image3.urls.regular);                     
                } else {
                    setImage3(image3Def);                       
                } 
            } catch (error) {
                console.error("Erreur lors du chargement de l'image Unsplash :", error);            
                setImageUrl(image3Def);                   
            }
            try{
                const image4 = await fetch(
                    `https://api.unsplash.com/photos/random?query=${'law'}&client_id=${ACCESS_KEY}`
                );
                const data_image4 = await image4.json();
                if (data_image4?.urls?.regular
                ) {
                    setImage4(data_image4.urls.regular);                     
                } else {
                    setImage4(image4Def);                       
                }  
            } catch (error) {
                console.error("Erreur lors du chargement de l'image Unsplash :", error);            
                setImageUrl(image4Def);                   
            }                                                      
        };        

        fetchImage();
        fetchDocument();
        fetchCategorie();
    }, []); 
    
    const imgRefs = useRef({});
        
    const handleMouseEnter = (id) => {
        const img = imgRefs.current[id];
        if (!img) return;

        img.classList.remove('wiggle');
        void img.offsetWidth;
        img.classList.add('wiggle');
    };

    return (  
        <div className='px-0 mx-0 pb-4'>            
            <div className="row text-white border-0 mb-5 px-3 pt-3 fond bg-opacity-50 d-flex align-items-center"
                style={{
                    //width: "100%",
                    height: "450px",
                    backgroundImage: imageUrl? `url(${imageUrl})` : `url(${linkdefault})`,
                    //backgroundImage: imageUrl,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#333", // fallback
                }}
            >
                <div className="col">
                    <div className="container text-start">
                        <h1 className='display-2'><strong>Bienvenue sur Judixy !</strong></h1>
                        <h3 className='fs-3 display-5'>
                            <strong>
                                Plateforme dédiée à fournir des conseils juridiques et cours de droit
                            </strong>
                        </h3>
                        <div className='row'>
                            <div className="col">
                                <a href="/categorie" className='btn btn-outline-light mt-4 rounded-5 border-2'>                        
                                    <strong>Cours <FontAwesomeIcon icon={faFilePdf} className='ms-2'/></strong>
                                </a>    
                                {<a href="" className='btn btn-outline-light mt-4 ms-5 rounded-5 border-2'>                        
                                    <strong>Consulter</strong>
                                </a>}
                            </div>
                        </div>                        
                    </div>                    
                </div>                                
            </div>        

            <div className="container anime_vers_haut">
                <div className="row border-0 mb-4 px-3 pt-2 bg-opacity-50 d-flex align-items-center">
                    <div className="col px-0">
                        <p>
                            Il fut un temps où il fallait se rendre en cabinet pour obtenir un conseil juridique. 
                            Aujourd'hui, grâce à judixy, vous pouvez consulter des avocats et consillers juridiques 
                            qualifiés en ligne, où que vous soyez.
                        </p>
                        <p>
                            Notre réseau d'experts, accessible à tout moment, vous offre un accompagnement sur 
                            mesure, en toute confidentialité. Avec Judixy, le droit devient accessible, efficace et 
                            à portée de main.
                        </p>
                    </div>                                
                </div>
            </div>            
            <div className="container">
                <div className="row py-3">                    
                    <div className="col-md-3 col-6 mb-md-0 mb-2">
                        <img src={image1 ? image1 : image1Def} alt="" srcset="" className="rounded img-fluid" style={{ maxHeight: '177px', objectFit: 'cover', width: '100%' }}/>                         
                    </div>                    
                    <div className="col-md-3 col-6 mb-md-0 mb-2">
                        <img src={image2  ? image2 : image2Def} alt="" srcset="" className="rounded img-fluid" style={{ maxHeight: '177px', objectFit: 'cover', width: '100%' }}/>                         
                    </div>                    
                    <div className="col-md-3 col-6">
                        <img src={image3  ? image3 : image3Def} alt="" srcset="" className="rounded img-fluid" style={{ maxHeight: '177px', objectFit: 'cover', width: '100%' }}/>                         
                    </div>                    
                    <div className="col-md-3 col-6">
                        <img src={image4  ? image4 : image4Def} alt="" srcset="" className="rounded img-fluid" style={{ maxHeight: '177px', objectFit: 'cover', width: '100%' }}/>                         
                    </div>                    
                </div>                
            </div>
            
            {/*<AppearMessage>*/}
            <div className="container anime_message">
                <div className="row border-0 mb-4 px-3 pt-5 d-flex align-items-center">
                    <div className="col px-0">                                                
                        <h1 className='fs-1 mb-4'>
                            <strong>Les avantages de visiter notre site</strong>
                        </h1>
                        <ul class="list-unstyled">
                            <li className='mb-1'><strong>Accès gatuit au savoir juridique :</strong> Consultez des cours, fichiers et documents juridiques fiables, sans frais.</li>
                            <li className='mb-1'><strong>Conseils juridiques en ligne :</strong> Posez vos questions et obtenez des réponses rapides, claires et personnalisées.</li>
                            <li className='mb-1'><strong>Contenu adapté au monde Francophone :</strong> Nos ressources couvrent les grands principes du droit internationnal et français.</li>                            
                            <li className='mb-1'><strong>Une équipe passionnée par le droit :</strong> Judixy est animé par des juristes et étudiants engagés pour rendre le droit accessible à tous.</li>
                            <li className='mb-1'><strong>Bientôt : mise en relation aves des avocats :</strong> Préparez-vous à profiter d'un réseau de professionnel disponibles en quelques clics</li>
                            <li>
                                <strong>Nous vous donne accès à deux services essentiels :</strong>
                                <ul>
                                    <li>Des cours et documents juridiques pour apprendre, réviser et réussir vos examens.</li>
                                    <li>Des cours et documents juridiques personnalisés, en ligne, pour vous aider à comprendre vos droits et à faire les bons choix.</li>                                    
                                </ul>
                            </li>                            
                        </ul>
                    </div>                                
                </div>
            </div>
            {/*</AppearMessage>*/}

            <div className="container">
                <div className="row bg- py-3 rounded-5">
                <div className="col">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h1 className='fs-1'><strong>Comment Judixy fonctionne ?</strong></h1>
                            </div>
                        </div>
                        <div className="row mt-4 align-items-center">
                            <div className="col-md-4 col-12 mb-md-0 mb-4">
                                <div class="card border-0 shadow pt-3" style={{minHeight: 300}}>                                                
                                    <div class="card-body px-4 text-center">
                                        {/*<img src="images/globe.png" alt="" srcset="" width={150}/>*/}
                                        <p className='mt-3 fs-1 text-center'>
                                            <FontAwesomeIcon icon={faExclamationTriangle} className='mt-md-1 text-shadow'/>
                                        </p>
                                        <h5 class="card-title mt-1"><strong>Vous avez un problème juridique ?</strong></h5>
                                        <p class="card-text mt-3 text-muted">
                                            Une question, un litige ou un doute sur vos droits ? Judixy est là pour vous aider. 
                                        </p>
                                    </div>
                                </div>
                            </div>  
                            <div className="col-md-4 col-12 mb-md-0 mb-4">
                                <div class="card border-0 shadow pt-3" style={{minHeight: 300}}>                                                
                                    <div class="card-body px-4 text-center">                                
                                        <p className='mt-3 fs-1 text-center'>
                                            <FontAwesomeIcon icon={faListCheck} className='mt-md-1'/>
                                        </p>
                                        <h5 class="card-title mt-1"><strong>Vous choisissez un conseiller juridique</strong></h5>
                                        <p class="card-text mt-3 text-muted">
                                            Parcourez notre <a href="/apropos#consulter"> liste des juristes</a> partenaires et choisissez 
                                            celui qui correspond à vos besoins.                                            
                                        </p>
                                    </div>
                                </div>
                            </div> 
                            <div className="col-md-4 col-12">
                                <div class="card border-0 shadow pt-3" style={{minHeight: 300}}>                                                
                                    <div class="card-body px-4 text-center">
                                        <p className='mt-3 fs-1 text-center'>
                                            <FontAwesomeIcon icon={faMessage} className='mt-md-1'/>
                                        </p>
                                        <h5 class="card-title mt-1"><strong>Vous discutez et trouvez une solution</strong></h5>
                                        <p class="card-text mt-3 text-muted">
                                            Echangez en ligne avec le consiller sélectionné et obtenez des réponses claires et personnalisées
                                        </p>
                                    </div>
                                </div>
                            </div>            
                        </div>                      
                    </div>
                </div>
                </div> 
            </div>

            <div className="container mt-5">
                <div className="row lead fs-6 border-0 mb-4 px-3 pt-2 d-flex align-items-center">
                    <div className="col px-0">                        
                        <h1 className='fs-1 mb-4'>
                            <strong>Nos ressources juridiques</strong>
                        </h1>
                        <p className=''>
                            Découvrez nos extraits de cours et documents juridiques pour les juristes en formation,
                            ainsi que des documents pratiques pour les particuliers et les entreprises. <br />
                            N'hesitez pas de vous abonner à nos réseaux - Youtube, Facebook et TikTok - pour ne rien 
                            manquer de nos contenus.
                        </p>
                    </div>                                
                </div>
            </div>
            <div className="container mt-5">                
                <h4 className="text-start mb-3">
                    <FontAwesomeIcon icon={faBook} size="1x" className='me-2 mt-md-1'/> Documents
                </h4>
                <div className="row ">
                    <div className="col-md-9 col-12">                                        
                        {data.slice(0, 10).map((item, index) => (
                            <div className="col-12 mb-3" key={item.id || index}>
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
                                        
                                        <Link
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
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
 

                        <div className="row mb-4 d-md-none">                            
                            <div className="col d-flex justify-content-center">
                                <Link href="/categorie" title='Voir plus'>
                                    <FontAwesomeIcon icon={faCircle} style={{fontSize:'7px'}} className='me-2 mt-md-1 text-primary'/>
                                    <FontAwesomeIcon icon={faCircle} style={{fontSize:'7px'}} className='me-2 mt-md-1 text-primary'/>
                                    <FontAwesomeIcon icon={faCircle} style={{fontSize:'7px'}} className='me-2 mt-md-1 text-primary'/>
                                </Link>                                
                            </div>
                        </div>  
                    </div>  
                    
                    <div className="col-md-3 col-12">
                        <div className="row border rounded text-center" style={{borderColor:'white'}}>
                            <h5 className='py-2'>Autres documents</h5>
                            <div className='mb-3' style={{height:'0.5px', backgroundColor:'#f8f9fa'}}/>
                            <div className="col pb-3">
                                {listcategorie.map((cat) => (
                                    <div className='mb-2'>
                                        <a href={"/categorie#"+cat.ancre} className='text-decoration-none'>{cat.nom}</a>
                                    </div>
                                ))}                                                                
                            </div>
                        </div>

                        <div className="mt-3 mb-3 row text-center">
                            <div className="col p-0">                                
                                <img src={imageUrl2 ? imageUrl2 : linkdef2} alt="" srcset="" className="rounded img-fluid"/>
                            </div>                            
                        </div>
                    </div>                                                 
                </div>
            </div>

            <div className="row mb-4 d-md-block d-none">                            
                <div className="col d-flex justify-content-center">
                    <a href="/categorie" title='Voir plus'>
                        Voir plus <FontAwesomeIcon icon={faAdd} style={{fontSize:'15px'}} className='ms-1 mt-md-1 text-primary'/>                        
                    </a>                                
                </div>
            </div>             
        </div>              
    );
}
