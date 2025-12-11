document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN ---
    const TELEFONO_NEGOCIO = "50377777777"; 
    
    // PEGA AQUÍ TUS LLAVES DE CONTENTFUL (Paso 2)
    const SPACE_ID = '0p51a415zjg9';
    const ACCESS_TOKEN = '8YZnNa42-Lq_QotpjEVlWeH4g4P747iNB2p6u-20bHU';

    const contenedor = document.getElementById('contenedor-productos');

    // --- 2. CONEXIÓN CON CONTENTFUL ---
    const client = contentful.createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN
    });

    // --- 3. FUNCIÓN PARA TRAER DATOS Y PINTARLOS ---
    function cargarProductos() {
        // Pedimos los productos ('entries') del tipo 'producto'
        client.getEntries({ content_type: 'producto' })
            .then((response) => {
                // Limpiamos el mensaje de "Cargando..."
                contenedor.innerHTML = '';

                // Recorremos cada producto que llegó de la nube
                response.items.forEach(item => {
                    const fields = item.fields;

                    // Extraemos la URL de la imagen (con seguridad por si no hay imagen)--
                    let imagenSrc = 'https://via.placeholder.com/300'; // Imagen gris por defecto si falla

                    if(fields.imagen && fields.imagen.fields && fields.imagen.fields.file) {
                        // Contentful nos da la url sin 'https:', se lo agregamos aquí
                        imagenSrc = 'https:' + fields.imagen.fields.file.url;
                    }

                    // Creamos la tarjeta HTML
                    const card = document.createElement('article');
                    card.classList.add('product-card');

                    card.innerHTML = `
                        <figure class="product-image-container">
                            <img src="${imagenSrc}" alt="${fields.nombre}" loading="lazy">
                        </figure>
                        <div class="product-info">
                            <span class="category-tag">${fields.categoria}</span>
                            <h3>${fields.nombre}</h3>
                            <p class="price">${fields.precio}</p>
                            <button 
                                class="btn btn-whatsapp" 
                                data-name="${fields.nombre}" 
                                data-price="${fields.precio}">
                                Pedir en WhatsApp
                            </button>
                        </div>
                    `;
                    contenedor.appendChild(card);
                });

                // Reactivamos los botones de WhatsApp para los nuevos elementos
                activarBotonesWhatsapp();
            })
            .catch((error) => {
                console.error("Error cargando productos:", error);
                contenedor.innerHTML = '<p>Hubo un error cargando el catálogo. Intenta recargar.</p>';
            });
    }

    // --- 4. LÓGICA DE WHATSAPP ---
    function activarBotonesWhatsapp() {
        const botones = document.querySelectorAll('.btn-whatsapp');
        botones.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                const nombre = boton.getAttribute('data-name');
                const precio = boton.getAttribute('data-price');
                const mensaje = `Hola IronFit, me interesa: ${nombre} (${precio}). ¿Está disponible?`;
                const url = `https://wa.me/${TELEFONO_NEGOCIO}?text=${encodeURIComponent(mensaje)}`;
                window.open(url, '_blank');
            });
        });
    }

    // --- 5. INICIALIZACIÓN ---
    // Cargamos los productos al iniciar
    cargarProductos();

    // Footer automático
    const anio = document.querySelector('.copyright p');
    if(anio) anio.innerHTML = `&copy; ${new Date().getFullYear()} IronFit Store.`;
});