    document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN WHATSAPP---
    const TELEFONO_NEGOCIO = "50370980487"; 

    // --- LÓGICA DE WHATSAPP ---
    const botonesWhatsapp = document.querySelectorAll('.btn-whatsapp');

    botonesWhatsapp.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault(); 

            // 1. Obtener datos del producto 
            const producto = boton.getAttribute('data-name');
            const precio = boton.getAttribute('data-price');

            // 2. Construir el mensaje
            const mensaje = `Hola IronFit, me interesa comprar: ${producto} - Precio: ${precio}. ¿Está disponible?`;

            // 3. Codificar el mensaje para URL 
            const mensajeCodificado = encodeURIComponent(mensaje);

            // 4. Crear la URL final
            const urlWhatsapp = `https://wa.me/${TELEFONO_NEGOCIO}?text=${mensajeCodificado}`;

            // 5. Abrir en una nueva pestaña
            window.open(urlWhatsapp, '_blank');
        });

        const btnContactoGeneral = document.getElementById('btn-contacto-general');

        if (btnContactoGeneral) {
        btnContactoGeneral.addEventListener('click', () => {
            // Mensaje diferente para contacto general
            const mensaje = "Hola IronFit, tengo una consulta general sobre sus productos.";
            const mensajeCodificado = encodeURIComponent(mensaje);
            
            // Reutilizamos la constante TELEFONO_NEGOCIO
            const urlWhatsapp = `https://wa.me/${TELEFONO_NEGOCIO}?text=${mensajeCodificado}`;
            
            window.open(urlWhatsapp, '_blank');
        });
        }
    });

    // --- AÑO AUTOMÁTICO (Mantenemos esto del código anterior) ---
    const elementoAnio = document.querySelector('.copyright p');
    if(elementoAnio) {
        const anioActual = new Date().getFullYear();
        elementoAnio.innerHTML = `&copy; ${anioActual} IronFit Store. Todos los derechos reservados.`;
    }
});