import {React, useEffect, useState} from 'react';
import'./css/apropos.css';
import { faForward, faHistory, faQuestionCircle, faAdd, faClose, faPhone, faMailReply, faMailBulk} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { supabase } from '../createClient';

export default function Apropos() {  
  const [viewDetail, setViewDetail] = useState(false);
  const [dataView, setDataView] = useState(null);  
  
  const handleView = (data) => {
    setViewDetail(true)
    setDataView(data)
    window.location.href= "#btn"
  }  

  const handleClose = () => {
    setViewDetail(false)
    window.location.href= "#equipe"
  }

  const [isdescente, setIsdescente] = useState(window.innerWidth <= 1025 && window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsdescente(window.innerWidth <= 1025 && window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    const image = "https://plus.unsplash.com/premium_photo-1661729685861-6d1c647e71fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjA1fHxsb2l8ZW58MHx8MHx8fDA%3D"

    const [listequipe, setListEquipe] = useState([]);
    async function fetchEquipe(){
        const { data, error } = await supabase.from('equipes').select('*');
        if (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        } else {                      
            setListEquipe(data);
        }
    }    
    const [note, setNote] = useState([]);
    async function fetchNote(){
        const { data, error } = await supabase.from('notes').select('*');
        if (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        } else {                             
            setNote(data[0]);
        }
    }
    
    useEffect(() => {
      fetchEquipe();
      fetchNote();
    }, [])

    return (        
        <div className='px-0 mx-0 pb-3 bg-body'>              
          <div className="row position-relative justify-content-center d-md-flex d-none">
            <div className="col-12">
              <div className="row bg-light pt-md-5 pt-5 fotsy bombed-clip">  
                <div className="col-md-9">
                  <img src="images/logo.png" alt="" width={250} className='rounded-1'/> 
                  <p className='lead' style={{textAlign:'center'}}>
                    Nous visons à devenir la référence incontournable en ligne pour toute personne 
                    souhaitant se renseigner sur les lois, réglementations, droits et libertés. 
                    Nous sommes déterminés à créer un environnement où l'échange d'informations 
                    est ouvert, transparent et éthique.  
                  </p>
                </div>                                                                                  
              </div>              
            </div>  
            <div className={`${isdescente ? 'col-md-7' : 'col-md-5'} col-12 position-absolute d-md-block d-none`} 
              style={{top: isdescente ? "70%" : "60%"}}>   
              <div className="row">
                <img src={image} alt="" srcset="" className='rounded-5 shadow'/>                                            
              </div>              
            </div>       
          </div>   
          <div className="row d-md-none px-0 bg-danger">
            <div className="col-12">
              <div className="row bg-light pt-md-5 pt-5 text-center pb-3">  
                <div className="col-md-9">
                  <img src="images/logo.png" alt="" width={250} className='rounded-1'/> 
                  <p className='lead' style={{textAlign:'center'}}>
                    Nous visons à devenir la référence incontournable en ligne pour toute personne 
                    souhaitant se renseigner sur les lois, réglementations, droits et libertés. 
                    Nous sommes déterminés à créer un environnement où l'échange d'informations 
                    est ouvert, transparent et éthique.  
                  </p>
                </div>                                                                                  
              </div>              
            </div>     
            <div className="col-12 px-0">
              <div className="w-100">
                <img src={image} alt="" className="img-fluid w-100 d-block" />
              </div>
            </div>               
          </div>
          
          <div className="row mt-md-4 pt-md-5 mt-5">
              <div className="col mt-md-5 pt-md-5">
                <div className={`container mt-md-5 fs-6 ${isdescente ? 'pt-5' : ''}`}>   
                  <h1 className=""><strong>Qui sommes-nous ?</strong></h1> 
                  <p>
                    Judixy est une legaltech fondée avec une conviction simple : le droit doit être 
                    accessible à tous, partout.
                    Nous sommes une équipe de juristes, développeurs et communicants engagés à 
                    moderniser l’accès à l’information juridique. Grâce à notre plateforme, nous 
                    mettons en relation les particuliers, étudiants et entreprises avec des conseillers 
                    juridiques qualifiés, tout en proposant des ressources fiables et pédagogiques.
                  </p>  
                  <p>
                    Notre ambition : simplifier le droit, accompagner chaque situation avec rigueur, 
                    et créer un espace de confiance où chacun peut trouver des réponses claires à ses 
                    questions juridiques.
                  </p>  
                </div>  
              </div>
            </div>  

            <div className="row bg-dark mt-5 py-5">
              <div className="col py-3">
                <div className="container text-white fs-6">
                  <h1 className='mb-3'><strong>À qui s’adresse Judixy ?</strong></h1>
                  <p>
                    Judixy s’adresse à toutes celles et ceux qui ont besoin d’un conseil juridique fiable, 
                    d’un avocat ou d’un accompagnement personnalisé. Plus besoin de vous déplacer : posez 
                    vos questions, choisissez votre conseiller, et discutez de votre dossier en toute 
                    confidentialité. Et pour les juristes en formation, des ressources sont également 
                    disponibles pour réussir vos études et vos mémoires.                  
                  </p>                    
                </div>
              </div>
            </div>  

            <div className="row mt-5 py-1" id="consulter">
              <div className="col">
                <div className="container" style={{textAlign:"center"}}>
                  <h1 id="equipe"><strong>Notre équipe</strong></h1>                                   
                  <div className="row mt-5 mb-5 justify-content-md-center">
                    {listequipe.map((item) => (
                      <div className="col-md-3 col-6 mb-mb-0 mb-4" key={item.id}>
                        <div class="card-body pt-md-4 pt-2 pb-md-3 pb-2 px-md-4 px-2 bg-body rounded-4 shadow">
                          <img 
                            src={item.image} alt="" srcset="" className='rounded-4'
                            style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}
                          />
                          <p class="card-title mt-1 text-dark text-start"><strong>{item.nom}</strong></p>
                          <p class="card-text text-dark text-start lead fs-6">
                            {item.profession}
                          </p>
                          <div className="text-end">                          
                            <button type="button" id="btn" className='btn border-0 p-0' onClick={()=>handleView(item)}>
                              <FontAwesomeIcon icon={faAdd} className='text-black text-shadow'/>
                            </button>                          
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>  
            {viewDetail &&
              <div className="row mb-2" id={dataView.id}>
                <div className="col">
                  <div className="container bg-light rounded-4 px-4 pb-4">
                    <div className="row text-end">
                      <div className="col pt-1">
                        <FontAwesomeIcon
                          icon={faClose} 
                          className='mt-md-1 text-black fs-4 close' 
                          onClick={handleClose}                          
                        />
                      </div>                    
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <img 
                          src={dataView.image} alt="" srcset="" className='rounded-4'
                          style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                        />
                      </div>
                      <div className="col-md-8 col-12">                      
                        <div className="row mt-3 mt-md-0">                        
                          <h4>{dataView.nom}</h4>
                          <p>{dataView.profession}</p>
                        </div>
                        <div className="row mt-2">
                          <p>{dataView.description}</p>
                        </div> 
                        <div className="row pt-3">
                          <div className="col d-flex justify-content-end">                            
                            <a href={`https://wa.me/${dataView.whatsap}`} target="_blank" className="text-decoration-none">
                              <button className='btn btn-success'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp me-2" viewBox="0 0 16 16">
                                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                                Contacter sur WhatsApp
                              </button>                                
                            </a>
                          </div>
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            }            

            <div className="row bg-light py-4">
              <div className="col">
                <div className="container text-black">                                               
                  <div className="row" style={{fontSize:"25px"}}>
                    <div className="col-md-3 col-6 border-end text-center">
                      <h1><strong className='display-1'>{note.partenariats}</strong><small className='display-6'>+</small></h1>
                      <p className="fs-5">
                        <strong>partenariat</strong><br />dans le monde
                      </p>                      
                    </div>                    
                    <div className="col-md-3 col-6 border-md-end text-center">
                      <h1><strong className='display-1'>{note.documents}</strong><small className='display-6'>+</small></h1>
                      <p className="fs-5">
                        <strong>Documents</strong><br />dans notre base de données
                      </p>
                    </div>
                    <hr className='d-md-none d-block'/>
                    <div className="col-md-3 col-6 border-end text-center">
                      <h1><strong className='display-1'>{note.visiteurs}</strong><small className='display-6'>k</small></h1>
                      <p className="fs-5">
                        <strong>Visiteurs</strong><br />par mois
                      </p>
                    </div>                    
                    <div className="col-md-3 col-6 text-center">
                      <h1><strong className='display-1'>{note.articles}</strong><small className='display-6'>+</small></h1>
                      <p className="fs-5">
                        <strong>Articles</strong><br />en 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>            
        </div>
    )
}
