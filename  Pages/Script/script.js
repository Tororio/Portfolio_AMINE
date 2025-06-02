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
animerCartesCertification(); // Appel de la fonction d'animation des cartes de certification


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
// Bouton d'ouverture et de fermeture du sidebar (mobile/tablette/Ordinateur/Moniteur)
function initialiserSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    const btn = document.createElement('button');
    Object.assign(btn.style, {
        position: 'fixed',
        top: '18px',
        left: '18px',
        zIndex: '2000',
        background: 'linear-gradient(135deg, #43c6ac 60%, #23272b 100%)',
        color: '#fff',
        border: 'none',
        padding: '12px 18px',
        borderRadius: '50%',
        cursor: 'pointer',
        fontSize: '1.5rem',
        boxShadow: '0 4px 16px rgba(67,198,172,0.18), 0 2px 8px rgba(0,0,0,0.12)',
        transition: 'background 0.3s, transform 0.2s'
    });
    btn.title = 'Basculer le menu';
    btn.textContent = '☰';
    btn.onmouseenter = () => btn.style.transform = 'scale(1.12)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
    document.body.appendChild(btn);
    sidebar.classList.add('closed'); // Ferme le sidebar par défaut
    mainContent.classList.add('sidebar-closed'); // Ajoute la classe pour gérer l'espace du contenu principal




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
    majLayoutSidebar();

    
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
    }

    // Ajoute une classe CSS pour gérer l'espace du contenu principal

document.addEventListener('DOMContentLoaded', initialiserSidebarToggle);
// Appel de la fonction d'initialisation du sidebar
initialiserSidebarToggle();

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