// Bouton de bascule mode sombre/clair
function initialiserBasculeModeSombre() {
    // Détermine l'heure actuelle
    const heure = new Date().getHours();
    // Mode sombre de 19h à 7h, sinon mode clair
    const modeSombreParDefaut = (heure >= 19 || heure < 7);

    if (modeSombreParDefaut) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    const btn = document.createElement('button');
    Object.assign(btn.style, {
        position: 'fixed',
        top: '18px',
        right: '18px',
        zIndex: '2000',
        background: modeSombreParDefaut
            ? 'linear-gradient(135deg, #43c6ac 60%, #23272b 100%)'
            : 'linear-gradient(135deg, #23272b 60%, #43c6ac 100%)',
        color: '#fff',
        border: 'none',
        padding: '12px 18px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.5rem',
        boxShadow: '0 4px 16px rgba(67,198,172,0.18), 0 2px 8px rgba(0,0,0,0.12)',
        transition: 'background 0.3s, transform 0.2s'
    });
    btn.title = 'Changer le mode sombre/clair';
    btn.textContent = modeSombreParDefaut ? '☀️' : '🌙';
    btn.onmouseenter = () => btn.style.transform = 'scale(1.12)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        const actif = document.body.classList.toggle('dark-mode');
        btn.textContent = actif ? '☀️' : '🌙';
        btn.style.background = actif
            ? 'linear-gradient(135deg, #43c6ac 60%, #23272b 100%)'
            : 'linear-gradient(135deg, #23272b 60%, #43c6ac 100%)';
    });

    // Styles pour le mode sombre
    const style = document.createElement('style');
    style.textContent = `
        body.dark-mode {
            background: #181a1b !important;
            color: #f8f9fa !important;
        }
        body.dark-mode section,
        body.dark-mode .skill-card,
        body.dark-mode .certification-card,
        body.dark-mode #sidebar,
        body.dark-mode footer {
            background: #23272b !important;
            color: #f8f9fa !important;
            box-shadow: 0 2px 16px rgba(67,198,172,0.10);
        }
        body.dark-mode header {
            background: linear-gradient(180deg, #23272b, #43c6ac);
            color: #fff;
        }
        body.dark-mode a, body.dark-mode #sidebar nav ul li a {
            color: #43c6ac !important;
        }
        body.dark-mode .submit-btn {
            background: #43c6ac !important;
            color: #fff !important;
        }
        body.dark-mode .submit-btn:hover,
        body.dark-mode .submit-btn:focus {
            background:rgb(13, 71, 230) !important;
        }
    `;
    document.head.appendChild(style);
}
initialiserBasculeModeSombre();

//style pour le mode clair
const styleClair = document.createElement('style');
styleClair.textContent = `
    body {
        background: #f8f9fa !important;
        color: #212529 !important;
    }
    section,
    .skill-card,
    .certification-card,
    footer {
        background: #fff !important;
        color: #212529 !important;
        box-shadow: 0 2px 16px rgba(0,0,0,0.1);
    }
    #sidebar {
        background: #fff !important;
        color: #212529 !important;
        box-shadow: 0 2px 16px rgba(0,0,0,0.1);
        border-right: 1px solid #dee2e6;
    }
        #sidebar nav ul li {
        border-bottom: 1px solid #dee2e6;
    }
    #sidebar nav ul li:last-child {
        border-bottom: none;
    }
    #sidebar nav ul li a {
        padding: 12px 16px;
        display: block;
        text-decoration: none;
        transition: background 0.3s, color 0.3s;
    }

    header {
        background: linear-gradient(180deg, #f8f9fa, #43c6ac);
        color: #212529;
    }
    header h1, header h2 {
        color: #212529;
    }
    a, #sidebar nav ul li a {
        color: #43c6ac !important;
        text-decoration: none;
    }
    .submit-btn {
        background: #43c6ac !important;
        color: #fff !important;
    }
    .submit-btn:hover,
    .submit-btn:focus {
        background:rgb(11, 14, 227) !important;
    }
`;
document.head.appendChild(styleClair);


// Animation du texte dans le header (si #animated-text existe)
document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('animated-text');
    if (el) {
        // Relance l'animation à chaque chargement
        el.style.animation = 'none';
        void el.offsetWidth; // Force le reflow
        el.style.animation = '';
    }
});

// Animation de la barre de progression des compétences
function animerBarreProgression() {
    const barres = document.querySelectorAll('.skill-bar');
    barres.forEach(barre => {
        const pourcentage = barre.getAttribute('data-percentage');
        barre.style.width = '0%';
        setTimeout(() => {
            barre.style.width = pourcentage;
            barre.style.transition = 'width 1.5s ease-in-out';
        }, 100);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const sectionCompetences = document.getElementById('competences');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animerBarreProgression();
                observer.disconnect(); // Déconnecte l'observateur après l'animation
            }
        });
    }, { threshold: 0.1 });
    observer.observe(sectionCompetences);
});
// Appel de la fonction de Animation de la barre de progression des compétences
animerBarreProgression();

// Animation des cartes de certification
function animerCartesCertification() {
    const cartes = document.querySelectorAll('.certification-card');
    cartes.forEach((carte, index) => {
        carte.style.transform = 'translateY(20px)';
        carte.style.opacity = '0';
        setTimeout(() => {
            carte.style.transform = 'translateY(0)';
            carte.style.opacity = '1';
            carte.style.transition = `transform 0.5s ease-in-out ${index * 0.1}s, opacity 0.5s ease-in-out ${index * 0.1}s`;
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sectionCertifications = document.getElementById('certifications');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animerCartesCertification();
                observer.disconnect(); // Déconnecte l'observateur après l'animation
            }
        });
    }, { threshold: 0.1 });
    observer.observe(sectionCertifications);
});

animerCartesCertification();  // Appel de la fonction d'animation des cartes de certification
// Animation des cartes de compétences
function animerCartesCompetences() {
    const cartes = document.querySelectorAll('.skill-card');
    cartes.forEach((carte, index) => {
        carte.style.transform = 'translateY(20px)';
        carte.style.opacity = '0';
        setTimeout(() => {
            carte.style.transform = 'translateY(0)';
            carte.style.opacity = '1';
            carte.style.transition = `transform 0.5s ease-in-out ${index * 0.1}s, opacity 0.5s ease-in-out ${index * 0.1}s`;
        }, 100);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const sectionCompetences = document.getElementById('competences');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animerCartesCompetences();
                observer.disconnect(); // Déconnecte l'observateur après l'animation
            }
        });
    }, { threshold: 0.1 });
    observer.observe(sectionCompetences);
});

animerCartesCompetences();  // Appel de la fonction d'animation des cartes de compétences

// Animation des cartes de projet
function animerCartesProjets() {
    const cartes = document.querySelectorAll('.project-card');
    cartes.forEach((carte, index) => {
        carte.style.transform = 'translateY(20px)';
        carte.style.opacity = '0';
        setTimeout(() => {
            carte.style.transform = 'translateY(0)';
            carte.style.opacity = '1';
            carte.style.transition = `transform 0.5s ease-in-out ${index * 0.1}s, opacity 0.5s ease-in-out ${index * 0.1}s`;
        }, 100);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const sectionProjets = document.getElementById('projets');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animerCartesProjets();
                observer.disconnect(); // Déconnecte l'observateur après l'animation
            }
        });
    }, { threshold: 0.1 });
    observer.observe(sectionProjets);
});

animerCartesProjets()

/* --- Effets interactifs sidebar JS --- */

// Bouton d'ouverture/fermeture du sidebar (mobile/tablette)
function initialiserSidebarToggle() {
    // Crée le bouton si absent
    if (!document.querySelector('.sidebar-toggle-btn')) {
        const btn = document.createElement('button');
        btn.className = 'sidebar-toggle-btn';
        btn.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
        Object.assign(btn.style, {
            position: 'fixed',
            top: '18px',
            left: '18px',
            zIndex: '2100',
            width: '48px',
            height: '48px',
            background: 'linear-gradient(135deg, #23272b 60%, #43c6ac 100%)',
            border: 'none',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(67,198,172,0.18), 0 2px 8px rgba(0,0,0,0.12)',
            transition: 'background 0.3s, transform 0.2s'
        });
        Array.from(btn.children).forEach(bar => {
            Object.assign(bar.style, {
                display: 'block',
                width: '28px',
                height: '4px',
                margin: '3px 0',
                background: '#fff',
                borderRadius: '2px',
                transition: 'all 0.3s'
            });
        });
        btn.title = 'Ouvrir/fermer le menu';
        document.body.appendChild(btn);
    }
    const btn = document.querySelector('.sidebar-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main') || document.getElementById('main-content') || document.body;

    // Ajoute une classe CSS pour gérer l'espace du contenu principal
    function majLayoutSidebar() {
        if (sidebar.classList.contains('closed')) {
            mainContent.classList.add('sidebar-closed');
        } else {
            mainContent.classList.remove('sidebar-closed');
        }
    }

    btn.addEventListener('click', () => {
        sidebar.classList.toggle('closed');
        btn.classList.toggle('open');
        majLayoutSidebar();
    });

    document.addEventListener('click', (e) => {
        if (
            window.innerWidth <= 900 &&
            !sidebar.contains(e.target) &&
            !btn.contains(e.target) &&
            !sidebar.classList.contains('closed')
        ) {
            sidebar.classList.add('closed');
            btn.classList.remove('open');
            majLayoutSidebar();
        }
    });

    function majSidebarResponsive() {
        if (window.innerWidth <= 900) {
            sidebar.classList.add('closed');
            btn.classList.remove('open');
        } else {
            sidebar.classList.remove('closed');
            btn.classList.remove('open');
        }
        majLayoutSidebar();
    }
    window.addEventListener('resize', majSidebarResponsive);
    majSidebarResponsive();

    // Ajoute le style pour occuper tout l'espace quand le sidebar est fermé
    if (!document.getElementById('sidebar-closed-style')) {
        const style = document.createElement('style');
        style.id = 'sidebar-closed-style';
        style.textContent = `
            @media (max-width: 900px) {
                #sidebar.closed {
                    display: none !important;
                }
                main.sidebar-closed, #main-content.sidebar-closed, body.sidebar-closed {
                    margin-left: 0 !important;
                    width: 100vw !important;
                    max-width: 100vw !important;
                }
            }
            @media (min-width: 901px) {
                main.sidebar-closed, #main-content.sidebar-closed, body.sidebar-closed {
                    margin-left: 0 !important;
                    width: 100vw !important;
                    max-width: 100vw !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}
document.addEventListener('DOMContentLoaded', initialiserSidebarToggle);
// Appel de la fonction d'initialisation du sidebar
initialiserSidebarToggle();
// Effet de survol des liens du sidebar
function initialiserEffetSurvolSidebar() {
    const liens = document.querySelectorAll('#sidebar nav ul li a');
    liens.forEach(lien => {
        lien.addEventListener('mouseenter', () => {
            lien.style.backgroundColor = '#43c6ac';
            lien.style.color = '#fff';
        });
        lien.addEventListener('mouseleave', () => {
            lien.style.backgroundColor = '';
            lien.style.color = '';
        });
    });
}
document.addEventListener('DOMContentLoaded', initialiserEffetSurvolSidebar);
// Appel de la fonction d'effet de survol des liens du sidebar
initialiserEffetSurvolSidebar();
// Effet de survol des boutons submit
function initialiserEffetSurvolBoutonsSubmit() {
    const boutons = document.querySelectorAll('.submit-btn');
    boutons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#e0556b';
            btn.style.color = '#fff';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });
    });
}
document.addEventListener('DOMContentLoaded', initialiserEffetSurvolBoutonsSubmit);
// Appel de la fonction d'effet de survol des boutons submit
initialiserEffetSurvolBoutonsSubmit();
// Effet de survol des cartes de compétences
function initialiserEffetSurvolCartesCompetences() {
    const cartes = document.querySelectorAll('.skill-card');
    cartes.forEach(carte => {
        carte.addEventListener('mouseenter', () => {
            carte.style.transform = 'scale(1.05)';
            carte.style.boxShadow = '0 8px 32px rgba(67,198,172,0.18), 0 4px 16px rgba(0,0,0,0.12)';
        });
        carte.addEventListener('mouseleave', () => {
            carte.style.transform = 'scale(1)';
            carte.style.boxShadow = '';
        });
    });
}
document.addEventListener('DOMContentLoaded', initialiserEffetSurvolCartesCompetences);
// Appel de la fonction d'effet de survol des cartes de compétences
initialiserEffetSurvolCartesCompetences();
// Effet de survol des cartes de certification
function initialiserEffetSurvolCartesCertification() {
    const cartes = document.querySelectorAll('.certification-card');
    cartes.forEach(carte => {
        carte.addEventListener('mouseenter', () => {
            carte.style.transform = 'scale(1.05)';
            carte.style.boxShadow = '0 8px 32px rgba(67,198,172,0.18), 0 4px 16px rgba(0,0,0,0.12)';
        });
        carte.addEventListener('mouseleave', () => {
            carte.style.transform = 'scale(1)';
            carte.style.boxShadow = '';
        });
    });
}
document.addEventListener('DOMContentLoaded', initialiserEffetSurvolCartesCertification);
// Appel de la fonction d'effet de survol des cartes de certification
initialiserEffetSurvolCartesCertification();
// Effet de survol des cartes de projet
function initialiserEffetSurvolCartesProjets() {
    const cartes = document.querySelectorAll('.project-card');
    cartes.forEach(carte => {
        carte.addEventListener('mouseenter', () => {
            carte.style.transform = 'scale(1.05)';
            carte.style.boxShadow = '0 8px 32px rgba(67,198,172,0.18), 0 4px 16px rgba(0,0,0,0.12)';
        });
        carte.addEventListener('mouseleave', () => {
            carte.style.transform = 'scale(1)';
            carte.style.boxShadow = '';
        });
    });
}
document.addEventListener('DOMContentLoaded', initialiserEffetSurvolCartesProjets);
// Appel de la fonction d'effet de survol des cartes de projet
initialiserEffetSurvolCartesProjets();
