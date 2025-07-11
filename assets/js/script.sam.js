$(document).ready(function() {
    // ===================== HERO =====================
    $('#hero_title').css({opacity: 0, left: '-50px', position: 'relative'});
    $('#hero_text').css({opacity: 0, right: '-50px', position: 'relative'});
    $('#hero_btn').css({opacity: 0});

    $(window).on('load', function() {
        $('#hero_title').animate({opacity: 1, left: '0px'}, 800, function() {
            $('#hero_text').animate({opacity: 1, right: '0px'}, 800, function() {
                $('#hero_btn').animate({opacity: 1}, 800)
            })
        });
        // Anim emploi (interne à window load pour éviter problèmes de synchronisation)
        $('#emploi_title').animate({opacity: 1, left: '0px'}, 800);
        $('#emploi_img').animate({opacity: 1, right: '0px'}, 800, function() {
            $('#filter').animate({opacity: 1, top: '0px'}, 800);
            $('.anim-emploi').animate({opacity: 1, top: '0px'}, 800);
        });
    });

    // ==================== LOGO SERVICES ====================
    $('.logos img.anim-services').hover(
        function() {
            $(this).css({
                "transform": "scale(1.18) rotate(-3deg)",
                "filter": "brightness(1.08) saturate(1.15)",
                "transition": "transform 0.3s cubic-bezier(0.4,0,0.2,1), filter 0.3s cubic-bezier(0.4,0,0.2,1)",
                "z-index": 2
            });
        },
        function() {
            $(this).css({
                "transform": "",
                "filter": "",
                "z-index": ""
            });
        }
    );

    // ==================== ANIM TÉMOIGNAGES ====================
    $('.anim-testimonials').hover(
        function() {
            $(this).css({
                "transform": "scale(1.05)",
                "transition": "transform 0.3s cubic-bezier(0.4,0,0.2,1)"
            });
        },
        function() {
            $(this).css({
                "transform": ""
            })
        }
    );

    // Animation des partenaires quand la section entre dans la fenêtre
    function animatePartenaires() {
        $('.partenaire-anim').each(function(index) {
            $(this).css({
                opacity: 0,
                right: '50px',
                position: 'relative'
            });
            setTimeout(() => {
                $(this).animate({opacity: 1, right: '0px'}, 700);
            }, 200 + index * 130); // Effet décalé sur chaque colonne
        });
    }

    // Détecte si la section est visible à l'écran (avec un simple scroll listener)
    function isElementInViewport(el) {
        const rect = el.get(0).getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );
    }

    // Lancer l’animation une seule fois au premier scroll sur la section
    let partenairesAnimated = false;
    $(window).on('scroll load', function() {
        const $section = $('.partenaire-anim').first().parent().parent(); // remonte à la section
        if (!partenairesAnimated && isElementInViewport($section)) {
            animatePartenaires();
            partenairesAnimated = true;
        }
    });


    // ===================== OFFRE D'EMPLOI ======================
    // On rend les élements "invisible"
    $('#emploi_title').css({opacity: 0, left: '-50px', position: 'relative'});
    $('#emploi_img').css({opacity: 0, right: '-50px', position: 'relative'});
    $('#filter').css({opacity: 0, top: '50px', position: 'relative'});
    $('.anim-emploi').css({opacity: 0, top: '50px', position: 'relative'});

    // Filtrage des secteurs d'emploi
    function afficherSecteur(selection) {
        $('.secteur-block').each(function() {
            if (selection === 'all' || $(this).attr('id') === selection) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
    // Affichage initial selon la valeur sélectionnée
    afficherSecteur($('#secteurSelect').val());
    // Quand on change la sélection
    $('#secteurSelect').on('change', function() {
        afficherSecteur($(this).val());
    });

    // ===================== LEAFLET MAP ======================
    let coords = [50.8247416, 4.3489723];
    if ($('#map').length > 0) {
        let map = L.map('map').setView(coords, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker = L.marker(coords).addTo(map)
            .bindPopup('<strong>Chaussée de Waterloo 255 - 1060 Saint-Gilles</strong>');

        $('#adresse').on('click', function () {
            let $mapDiv = $('#map');
            if ($mapDiv.length) {
                $mapDiv[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                map.flyTo(coords, 18, {
                    animate: true,
                    duration: 1.8
                });
                marker.openPopup();
            }
        });
    }

    // Animation du click pour le mail
    $('#mail').on('click', function() {
        window.location.href = 'mailto:Sdarryy59@gmail.com';
    });

    // ===================== ANIM FORMULAIRE ======================
    // On cache les infos
    $('.anim-form').css({opacity: 0, left: '-50px', position: 'relative'});
    $('.anim-formulaire').css({opacity: 0, top: '50px', position: 'relative'});

    // Animation du formulaire
    $('.anim-formulaire').each(function(index) {
        setTimeout(() => {
            $(this).animate({opacity: 1, top: '0px'}, 1000);
        }, 400 + index * 100);
    });

    // Animation des coordonnées
    $('.anim-form').each(function(index) {
        setTimeout(() => {
            $(this).animate({opacity: 1, left: '0px'}, 1000);
        }, index * 100);
    });

    // ===================== FORMULAIRE VÉRIFICATION ======================
    function verifEmail(email) {
        const reg = /^([a-zA-Z0-9._-]+)@([a-z0-9.-]+)\.([a-zA-Z]{2,})$/;
        return reg.test(email);
    }
    function verifTelephone(telephone) {
        const reg = /^04\d{8}$/;
        return reg.test(telephone);
    }
    function verifCodePostal(postal) {
        const reg2 = /^\d{4}$/;
        return reg2.test(postal);
    }

    // Sélections jQuery des éléments
    const $email = $("#email");
    const $email2 = $("#verifEmail");
    const $telephone = $("#telephone");
    const $telephone2 = $("#verifTel");
    const $codePostal = $("#codepostal");
    const $codePostal2 = $("#verifCP");
    const $success = $("#succes");
    const $formulaire = $(".col-lg-6 form");

    $formulaire.on("submit", function(e) {
        e.preventDefault();

        $email2.html("");
        $telephone2.html("");
        $codePostal2.html("");
        $success.html("");
        $email.css("background-color", "white");
        $telephone.css("background-color", "white");
        $codePostal.css("background-color", "white");

        const mail = $email.val().trim();
        if (!verifEmail(mail)) {
            $email.css("background-color", "#f8d7da");
            $email2.html('<div class="alert alert-danger p-2 my-2">Veuillez entrer un email valide</div>');
            $email.focus();
            return;
        }

        const tel = $telephone.val().trim();
        if (!verifTelephone(tel)) {
            $telephone.css("background-color", "#f8d7da");
            $telephone2.html('<div class="alert alert-danger p-2 my-2">Veuillez entrer un numéro de téléphone correct (format belge 04...)</div>');
            $telephone.focus();
            return;
        }

        const postal = $codePostal.val().trim();
        if (!verifCodePostal(postal)) {
            $codePostal.css("background-color", "#f8d7da");
            $codePostal2.html('<div class="alert alert-danger p-2 my-2">Veuillez entrer un code postal belge valide (4 chiffres)</div>');
            $codePostal.focus();
            return;
        }

        $success.html('<div class="alert alert-success p-2 my-2">Formulaire validé avec succès !</div>');
        $email.css("background-color", "#d1e7dd");
        $telephone.css("background-color", "#d1e7dd");
        $codePostal.css("background-color", "#d1e7dd");

        setTimeout(function() {
            window.location.href = "contact.html";
        }, 3000);
    });
});