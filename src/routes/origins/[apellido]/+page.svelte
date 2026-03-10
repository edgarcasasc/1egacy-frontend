<script>
    import { PortableText } from "@portabletext/svelte";
    import { enhance } from "$app/forms";

    export let data;
    export let form; // Recibimos respuesta de servidor
    const { linaje } = data;

    let submitting = false;
    let consentChecked = false;

    const SITE = "https://somos1egacy.com";

    // --- HELPERS DE LIMPIEZA SEO ---
    const cleanText = (s = "") =>
        s.replace(/\s+/g, " ").replace(/[“”"]/g, "").trim();

    const truncate = (s, max = 160) => {
        const t = cleanText(s);
        if (t.length <= max) return t;
        const cut = t.slice(0, max + 1);
        const lastSpace = cut.lastIndexOf(" ");
        const end = lastSpace > 60 ? lastSpace : max;
        return cut.slice(0, end).trimEnd() + "...";
    };

    // --- VARIABLES REACTIVAS PARA EL HEAD ---
    $: slug = linaje?.slug || "";
    $: canonicalUrl = slug ? `${SITE}/origins/${slug}` : `${SITE}/origins`;

    $: seoDescription = truncate(
        linaje?.blasonTexto ||
            linaje?.introduccion ||
            `Explora el origen y heráldica del linaje ${linaje?.title || ""}.`,
        160,
    );

    // Breadcrumb Schema
    $: breadcrumbJsonLd = slug
        ? {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                  {
                      "@type": "ListItem",
                      position: 1,
                      name: "Inicio",
                      item: `${SITE}/`,
                  },
                  {
                      "@type": "ListItem",
                      position: 2,
                      name: "Origins",
                      item: `${SITE}/origins`,
                  },
                  {
                      "@type": "ListItem",
                      position: 3,
                      name: linaje.title,
                      item: canonicalUrl,
                  },
              ],
          }
        : null;

    // FAQ Schema
    $: faqSchema = linaje?.faqs?.length
        ? {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: linaje.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                  },
              })),
          }
        : null;

    // --- LÓGICA DE VIDEO YOUTUBE ---
    function getYouTubeId(url) {
        if (!url) return null;
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    }

    // Video Schema
    $: videoSchema = linaje?.videos?.length
        ? linaje.videos.map((video) => ({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: video.title,
              description: video.description,
              thumbnailUrl: [video.thumbnailUrl],
              uploadDate: video.uploadDate
                  ? new Date(video.uploadDate).toISOString()
                  : new Date().toISOString(),
              duration: video.duration || "PT1M00S",
              embedUrl: `https://www.youtube.com/embed/${getYouTubeId(video.youtubeUrl)}`,
              contentUrl: video.youtubeUrl,
          }))
        : null;

    // --- LÓGICA DE INTERFAZ ---
    let relatedProducts = linaje?.relatedProducts || [];
    let mostrarDetallesEscudo = false;
    function toggleEscudoDetails() {
        mostrarDetallesEscudo = !mostrarDetallesEscudo;
    }
</script>

<svelte:head>
    <title>{linaje?.title || "Linaje"} | 1egacy Origins</title>
    <meta name="description" content={seoDescription} />

    <meta
        property="og:title"
        content={`Apellido ${linaje?.title || "Linaje"}: origen, significado y escudo | 1egacy`}
    />
    <meta property="og:description" content={seoDescription} />
    <meta property="og:type" content="website" />

    {#if linaje?.escudoUrl}
        <meta property="og:image" content={linaje.escudoUrl} />
        <meta
            property="og:image:alt"
            content={`Escudo del apellido ${linaje?.title || "Linaje"}`}
        />
        <meta name="twitter:image" content={linaje.escudoUrl} />
    {/if}

    <meta
        name="twitter:title"
        content={`Apellido ${linaje?.title || "Linaje"}: origen, significado y escudo | 1egacy`}
    />
    <meta name="twitter:description" content={seoDescription} />

    {#if breadcrumbJsonLd}
        {@html `<script type="application/ld+json">${JSON.stringify(breadcrumbJsonLd)}<\/script>`}
    {/if}

    {#if faqSchema}
        {@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}<\/script>`}
    {/if}

    {#if videoSchema}
        {@html `<script type="application/ld+json">${JSON.stringify(videoSchema)}</script>`}
    {/if}
</svelte:head>

<div class="linaje-container">
    {#if linaje}
        <div class="linaje-header">
            <h1 class="apellido-titulo">
                Apellido {linaje.title}: origen, significado y escudo | 1egacy
            </h1>
        </div>

        <div class="linaje-contenido">
            <div class="escudo-columna">
                {#if linaje.escudoUrl}
                    <div class="escudo-wrapper">
                        <img
                            src={linaje.escudoUrl}
                            alt={`Escudo heráldico y blasón del linaje ${linaje.title}`}
                            title={`Escudo de armas de la familia ${linaje.title}`}
                            loading="eager"
                        />
                    </div>
                {/if}

                {#if linaje.blason}
                    <div
                        class="escudo-descripcion-wrapper"
                        class:expanded={mostrarDetallesEscudo}
                        id="escudo-details"
                    >
                        <div class="texto-blason">
                            <p class="intro-contexto">
                                Una versión heráldica atribuida al linaje <strong
                                    >{linaje.title}</strong
                                > en fuentes tradicionales.
                            </p>

                            <PortableText value={linaje.blason} />

                            <div class="disclaimer-box">
                                <p class="nota-precision">
                                    <strong>Nota:</strong> Un mismo apellido puede
                                    tener múltiples linajes y escudos según región
                                    y época. Para precisión por rama familiar, se
                                    requiere investigación a medida.
                                </p>
                                <a
                                    href="/solicitar-consulta"
                                    class="cta-investigacion"
                                >
                                    Solicitar investigación a medida &rarr;
                                </a>
                            </div>
                        </div>
                    </div>

                    <button
                        class="boton-toggle-escudo"
                        on:click={toggleEscudoDetails}
                        aria-expanded={mostrarDetallesEscudo}
                        aria-controls="escudo-details"
                    >
                        {#if mostrarDetallesEscudo}
                            Ver Menos Info &uarr;
                        {:else}
                            Ver Descripción del Escudo &darr;
                        {/if}
                    </button>
                {/if}
            </div>

            <div class="contenido-columna">
                {#if linaje.articulosRelacionados && linaje.articulosRelacionados.length > 0}
                    <div class="articulos-seccion">
                        <h3 class="subtitulo-seccion">
                            El Códice de {linaje.title}
                        </h3>
                        <div class="articulos-grid">
                            {#each linaje.articulosRelacionados as articulo}
                                <a
                                    href="/blog/{articulo.slug}"
                                    class="articulo-card"
                                >
                                    <div class="articulo-imagen-wrapper">
                                        {#if articulo.mainImageUrl}
                                            <img
                                                src={articulo.mainImageUrl}
                                                alt={articulo.title}
                                                loading="lazy"
                                            />
                                        {:else}
                                            <div
                                                class="placeholder-image-article"
                                            ></div>
                                        {/if}
                                    </div>
                                    <div class="articulo-info">
                                        <h4>{articulo.title}</h4>
                                        <span>Leer más &rarr;</span>
                                    </div>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}

                {#if linaje.historia}
                    <div class="historia-seccion historia-premium-bg">
                        <h3 class="subtitulo-seccion">
                            Historia Completa del Linaje
                        </h3>

                        {#if data.isUnlocked || form?.success}
                            <!-- ESTADO 3: DESBLOQUEADO GLOBALMENTE -->
                            {#if form?.success}
                                <div class="success-message">
                                    <div class="icon-success">✨</div>
                                    <h4>¡Identidad Confirmada!</h4>
                                    <p>
                                        El candado del Códice se ha abierto.
                                        Este dispositivo recordando tu acceso
                                        para toda la colección.
                                    </p>
                                </div>
                            {/if}
                            <div class="texto-rico-base desbloqueado">
                                <PortableText value={linaje.historia} />
                            </div>
                        {:else if form?.pendingVerification}
                            <!-- ESTADO 2: ESPERANDO VERIFICACIÓN DE CORREO -->
                            <div class="historia-bloqueada">
                                <div class="fade-out-text">
                                    <p>
                                        A lo largo de los siglos, los portadores
                                        del nombre {linaje.title} han dejado una
                                        marca indeleble en la historia...
                                    </p>
                                </div>
                                <div class="lead-capture-box verification-mode">
                                    <div class="icon-mail">✉️</div>
                                    <h4>Revisa tu Bandeja</h4>
                                    <p>
                                        Hemos enviado un enlace sellado a <strong
                                            >{form.email}</strong
                                        >. <br />{form.message}
                                    </p>
                                </div>
                            </div>
                        {:else}
                            <!-- ESTADO 1: BLOQUEADO (LEAD GEN) -->
                            <div class="historia-bloqueada">
                                <!-- Texto simulado desvaneciéndose (teaser) -->
                                <div class="fade-out-text">
                                    <p>
                                        A lo largo de los siglos, los portadores
                                        del nombre {linaje.title} han dejado una
                                        marca indeleble en la historia. Los primeros
                                        registros de este linaje se remontan a las
                                        antiguas crónicas donde se describe cómo
                                        sus fundadores participaron en...
                                    </p>
                                </div>

                                <div class="lead-capture-box">
                                    <div class="lock-header">
                                        <div class="lock-icon">
                                            {#if submitting}
                                                <div class="spinner"></div>
                                            {:else}
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="24"
                                                    height="24"
                                                    fill="currentColor"
                                                    ><path
                                                        d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm9 13H6v-8h12v8z"
                                                    /><circle
                                                        cx="12"
                                                        cy="15"
                                                        r="1.5"
                                                    /></svg
                                                >
                                            {/if}
                                        </div>
                                        <h4>Desbloquea el Legado</h4>
                                    </div>
                                    <p style="margin-bottom: 15px;">
                                        Ingresa tu correo para leer la <strong
                                            >historia completa</strong
                                        >
                                        de la familia {linaje.title} (sin costo).
                                    </p>

                                    <!-- Formulario SvelteKit Mejorado -->
                                    <form
                                        method="POST"
                                        action="?/unlockStory"
                                        use:enhance={() => {
                                            submitting = true;
                                            return async ({ update }) => {
                                                submitting = false;
                                                update();
                                            };
                                        }}
                                        class="unlock-form"
                                    >
                                        <input
                                            type="hidden"
                                            name="linaje"
                                            value={linaje.slug}
                                        />
                                        <input
                                            type="hidden"
                                            name="titulo"
                                            value={linaje.title}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="tu@correo.com"
                                            class="email-input"
                                            disabled={submitting}
                                        />

                                        <!-- Casilla de Consentimiento (Obligatoria) -->
                                        <label class="consent-label">
                                            <input
                                                type="checkbox"
                                                name="consent"
                                                bind:checked={consentChecked}
                                                required
                                                disabled={submitting}
                                                class="consent-checkbox"
                                            />
                                            <span
                                                >Acepto recibir la historia en
                                                mi correo y comunicaciones
                                                esporádicas del legado familiar.
                                                Entiendo que puedo darme de baja
                                                en cualquier momento.</span
                                            >
                                        </label>

                                        <button
                                            type="submit"
                                            class="cta-unlock"
                                            disabled={submitting ||
                                                !consentChecked}
                                        >
                                            {submitting
                                                ? "Abriendo Códice..."
                                                : "Ver historia completa →"}
                                        </button>
                                    </form>
                                    <p class="micro-note">
                                        Tus datos están seguros con nosotros.
                                        Solo historia, cero spam.
                                    </p>
                                </div>
                            </div>
                        {/if}
                    </div>
                {/if}

                {#if relatedProducts.length > 0}
                    <div class="productos-seccion">
                        <h3 class="subtitulo-seccion">
                            Materializa el Legado {linaje.title}
                        </h3>
                        <div class="productos-grid">
                            {#each relatedProducts as product (product.slug)}
                                <a
                                    href="/productos/{product.slug}"
                                    class="product-card-origin"
                                >
                                    <div class="product-image-container-origin">
                                        {#if product.mainImageUrl}
                                            <img
                                                src={product.mainImageUrl}
                                                alt={product.title}
                                                loading="lazy"
                                            />
                                        {:else}
                                            <div
                                                class="placeholder-image-origin"
                                            >
                                                <span>Imagen Próx.</span>
                                            </div>
                                        {/if}
                                    </div>
                                    <div class="product-info-origin">
                                        <h4>{product.title}</h4>
                                        <div class="product-price-origin">
                                            {product.price
                                                ? `$MXN ${product.price.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                                : "Consultar"}
                                        </div>
                                    </div>
                                </a>
                            {/each}
                        </div>
                        <div class="ver-mas-productos">
                            <a
                                href="/productos?linaje={linaje.slug}"
                                class="button-secondary-outline"
                                >Ver todos los productos {linaje.title}</a
                            >
                        </div>
                    </div>
                {/if}

                {#if linaje.videos && linaje.videos.length > 0}
                    <div class="videos-seccion">
                        {#each linaje.videos as video}
                            {@const videoId = getYouTubeId(video.youtubeUrl)}
                            {#if videoId}
                                <div class="video-card">
                                    <div class="video-responsive">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={video.title}
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                        >
                                        </iframe>
                                    </div>
                                    <div class="video-info">
                                        <h3>{video.title}</h3>
                                        <p>{video.description}</p>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>
                {/if}

                {#if linaje.faqs && linaje.faqs.length > 0}
                    <div class="faq-seccion">
                        <h3 class="subtitulo-seccion">Preguntas Frecuentes</h3>
                        <div class="faq-list">
                            {#each linaje.faqs as faq}
                                <details class="faq-item">
                                    <summary class="faq-question">
                                        {faq.question}
                                        <span class="faq-icon">+</span>
                                    </summary>
                                    <div class="faq-answer">
                                        <p>{faq.answer}</p>
                                    </div>
                                </details>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {:else}
        <p>Cargando información del linaje...</p>
    {/if}
</div>

<style>
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    /* --- ESTILOS DEL TEXTO BLASÓN Y NOTAS --- */
    .texto-blason {
        color: #aaa;
        line-height: 1.6;
        text-align: left;
        font-size: 0.95rem;
    }

    .texto-blason :global(p) {
        margin-bottom: 1rem;
    }
    .texto-blason :global(strong) {
        color: #c0a062;
        font-weight: 700;
    }

    .intro-contexto {
        font-style: italic;
        color: #e0e0e0;
        margin-bottom: 1.5rem !important;
        border-left: 2px solid #c0a062;
        padding-left: 1rem;
    }

    .disclaimer-box {
        margin-top: 2rem;
        padding: 1.5rem;
        background-color: rgba(255, 255, 255, 0.03);
        border: 1px solid #333;
        border-radius: 4px;
    }

    .nota-precision {
        font-size: 0.85rem;
        color: #888;
        margin-bottom: 1rem !important;
    }

    .cta-investigacion {
        display: inline-block;
        color: #c0a062;
        font-weight: 600;
        font-size: 0.9rem;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: all 0.3s ease;
    }
    .cta-investigacion:hover {
        color: #fff;
        border-bottom-color: #fff;
    }

    /* --- ESTILOS GENERALES --- */
    .linaje-container {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 2rem 60px 2rem;
        color: #e0e0e0;
        font-family: "Source Sans 3", sans-serif;
    }

    .apellido-titulo {
        font-size: clamp(3rem, 8vw, 4.5rem);
        font-weight: 700;
        text-align: center;
        color: #c0a062;
        margin-bottom: 3rem;
        text-transform: capitalize;
        font-family: "Palatino Linotype", serif;
    }
    .linaje-contenido {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 4rem;
        align-items: start;
    }
    .subtitulo-seccion {
        font-size: 1.8rem;
        font-weight: 600;
        border-bottom: 1px solid #333;
        padding-bottom: 0.8rem;
        margin-bottom: 2rem;
        color: #e0e0e0;
        font-family: "Source Sans 3", sans-serif;
    }

    /* --- ESTILOS DEL ESCUDO (DISEÑO RECTANGULAR PREMIUM) --- */
    .escudo-columna {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: sticky;
        top: 120px;
    }

    .escudo-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
        margin-bottom: 1.5rem;

        /* DISEÑO CUADRADO/MARCO (No Redondo) */
        border-radius: 8px;
        background: #121212;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        border: 1px solid #333;
    }

    .escudo-wrapper img {
        width: 100%;
        max-width: 280px; /* Tamaño ajustado para formato rectangular */
        height: auto;
        display: block;

        /* Efecto UX */
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

        /* Protección BÁSICA de UX (No deja arrastrar, pero sí indexar) */
        user-drag: none;
        -webkit-user-drag: none;
    }

    /* Zoom suave al pasar el mouse */
    .escudo-wrapper:hover img {
        transform: scale(1.05);
    }

    /* Efecto Brillo Dorado */
    .escudo-wrapper::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 50%;
        height: 100%;
        background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(192, 160, 98, 0.15) 50%,
            rgba(255, 255, 255, 0) 100%
        );
        transform: skewX(-25deg);
        transition: left 0.8s;
        z-index: 1;
        pointer-events: none;
    }
    .escudo-wrapper:hover::before {
        left: 150%;
    }

    .escudo-descripcion-wrapper {
        max-height: 250px;
        overflow: hidden;
        margin-bottom: 0.5rem;
        padding: 0 1rem;
        transition: max-height 0.5s ease-in-out;
        width: 100%;
    }
    .escudo-descripcion-wrapper.expanded {
        max-height: 2000px;
    }

    .boton-toggle-escudo {
        background: none;
        border: none;
        color: #c0a062;
        cursor: pointer;
        font-weight: bold;
        font-size: 0.9rem;
        text-transform: uppercase;
        margin-bottom: 2rem;
        transition: color 0.2s;
    }
    .boton-toggle-escudo:hover {
        color: #ffffff;
    }

    .contenido-columna {
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }
    .articulos-grid,
    .productos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
    }

    .articulo-card,
    .product-card-origin {
        background-color: #1a1a1a;
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid #333;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease;
    }
    .articulo-card:hover,
    .product-card-origin:hover {
        transform: translateY(-5px);
        border-color: #c0a062;
    }

    .articulo-imagen-wrapper,
    .product-image-container-origin {
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background-color: #222;
        position: relative;
    }
    .product-image-container-origin {
        aspect-ratio: 1/1;
    }
    .articulo-card img,
    .product-card-origin img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    .articulo-info,
    .product-info-origin {
        padding: 1rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }
    .articulo-info h4,
    .product-info-origin h4 {
        font-size: 1.1rem;
        font-weight: 600;
        color: #e0e0e0;
        margin: 0 0 8px 0;
        line-height: 1.3;
    }
    .articulo-info span {
        color: #c0a062;
        font-weight: bold;
        margin-top: auto;
        font-size: 0.9em;
    }
    .product-price-origin {
        font-size: 1rem;
        font-weight: bold;
        color: #c0a062;
        margin-top: auto;
        text-align: right;
    }

    .ver-mas-productos {
        text-align: center;
        margin-top: 2.5rem;
    }
    .button-secondary-outline {
        display: inline-block;
        padding: 10px 25px;
        background-color: transparent;
        color: #c0a062;
        border: 1px solid #c0a062;
        text-decoration: none;
        border-radius: 5px;
        font-weight: 600;
        font-size: 0.9em;
        transition: all 0.3s ease;
    }
    .button-secondary-outline:hover {
        background-color: #c0a062;
        color: #121212;
    }

    /* --- ESTILOS TEXTO RICO BASE (Origen e Historia) --- */
    .texto-rico-base {
        font-size: 1.15rem;
        line-height: 1.8;
        color: #bbb;
    }
    .texto-rico-base :global(p) {
        margin-bottom: 1.5rem;
    }
    .texto-rico-base :global(strong) {
        color: #fff;
        font-weight: 600;
    }
    .texto-rico-base :global(h4) {
        color: #d4af37;
        font-size: 1.3rem;
        margin: 2rem 0 1rem 0;
        font-family: "Palatino Linotype", serif;
    }
    .texto-rico-base :global(ul) {
        margin-bottom: 1.5rem;
        padding-left: 2rem;
    }
    .texto-rico-base :global(li) {
        margin-bottom: 0.5rem;
    }

    /* --- NUEVO: LEAD CAPTURE (Historia) --- */
    .historia-premium-bg {
        background-color: #161512;
        border: 1px solid #2a2416;
        border-radius: 12px;
        padding: 2.5rem 2rem;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
    }
    .historia-bloqueada {
        position: relative;
        margin-top: 1rem;
    }

    .fade-out-text {
        font-size: 1.15rem;
        line-height: 1.8;
        color: #bbb;
        mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
        -webkit-mask-image: linear-gradient(
            to bottom,
            black 20%,
            transparent 100%
        );
        padding-bottom: 80px;
        filter: blur(1px);
        user-select: none;
    }

    .lead-capture-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 420px;
        background: rgba(18, 18, 18, 0.95);
        border: 1px solid #c0a062;
        border-radius: 12px;
        padding: 30px;
        text-align: center;
        box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.8),
            inset 0 0 0 1px rgba(212, 175, 55, 0.2);
        backdrop-filter: blur(10px);
    }
    .lock-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-bottom: 15px;
    }
    .lock-header h4 {
        color: #fff;
        font-family: "Palatino Linotype", serif;
        font-size: 1.6rem;
        margin: 0 !important;
    }
    .lock-icon {
        color: #c0a062;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24px;
        margin-bottom: 0 !important;
    }

    .spinner {
        width: 24px;
        height: 24px;
        border: 3px solid rgba(212, 175, 55, 0.3);
        border-top-color: #d4af37;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }

    .lead-capture-box h4 {
        color: #fff;
        font-family: "Palatino Linotype", serif;
        font-size: 1.6rem;
        margin: 0 0 10px 0;
    }
    .lead-capture-box p {
        color: #aaa;
        font-size: 0.95rem;
        margin-bottom: 25px;
        line-height: 1.5;
    }

    .unlock-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-bottom: 15px;
    }
    .email-input {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid #444;
        color: #fff;
        padding: 12px 16px;
        border-radius: 6px;
        font-size: 1rem;
        transition: border-color 0.3s;
    }
    .email-input:focus {
        outline: none;
        border-color: #c0a062;
    }
    .email-input:disabled {
        opacity: 0.5;
    }

    .cta-unlock {
        background: linear-gradient(135deg, #d4af37 0%, #aa8529 100%);
        color: #000;
        border: none;
        padding: 14px;
        font-size: 1rem;
        font-weight: bold;
        text-transform: uppercase;
        border-radius: 6px;
        cursor: pointer;
        transition: transform 0.2s;
        letter-spacing: 1px;
    }
    .cta-unlock:hover:not(:disabled) {
        transform: scale(1.02);
    }
    .cta-unlock:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(100%);
    }

    /* Estilos de la casilla de consentimiento */
    .consent-label {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        text-align: left;
        margin-top: 5px;
        margin-bottom: 5px;
        cursor: pointer;
    }
    .consent-checkbox {
        margin-top: 4px;
        accent-color: #d4af37;
        width: 16px;
        height: 16px;
        flex-shrink: 0;
    }
    .consent-label span {
        font-size: 0.8rem;
        color: #888;
        line-height: 1.4;
    }

    .micro-note {
        font-size: 0.8rem !important;
        color: #666 !important;
        margin: 0 !important;
    }

    /* Estado Desbloqueado */
    .success-message {
        background: rgba(212, 175, 55, 0.1);
        border-left: 4px solid #d4af37;
        padding: 20px;
        border-radius: 0 8px 8px 0;
        margin-bottom: 30px;
    }
    .icon-success {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
    .success-message h4 {
        color: #d4af37;
        font-family: "Palatino Linotype", serif;
        font-size: 1.4rem;
        margin: 0 0 10px 0;
    }
    .success-message p {
        color: #ddd;
        margin: 0;
        line-height: 1.5;
    }

    .desbloqueado {
        animation: fade-in 1s ease-out forwards;
    }

    /* Estado de Verificación (Simulación) */
    .verification-mode {
        border-color: #666;
    }
    .icon-mail {
        font-size: 2rem;
        margin-bottom: 10px;
    }
    .magic-link-simulator {
        margin-top: 25px;
        padding-top: 20px;
        border-top: 1px dashed #444;
    }
    .micro-note-dev {
        font-size: 0.8rem;
        color: #888;
        margin-bottom: 10px;
        font-style: italic;
    }
    .verified-btn {
        background: #222;
        color: #d4af37;
        border: 1px solid #d4af37;
    }
    .verified-btn:hover {
        background: #d4af37;
        color: #000;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* --- ESTILOS FAQs --- */
    .faq-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .faq-item {
        background-color: rgba(255, 255, 255, 0.03);
        border: 1px solid #333;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
    }
    .faq-item[open] {
        border-color: #c0a062;
        background-color: rgba(255, 255, 255, 0.05);
    }
    .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.2rem;
        cursor: pointer;
        font-weight: 600;
        color: #e0e0e0;
        list-style: none;
        font-size: 1.1rem;
    }
    .faq-question::-webkit-details-marker {
        display: none;
    }
    .faq-icon {
        font-size: 1.5rem;
        color: #c0a062;
        transition: transform 0.3s ease;
    }
    .faq-item[open] .faq-icon {
        transform: rotate(45deg);
    }
    .faq-answer {
        padding: 0 1.2rem 1.2rem 1.2rem;
        color: #aaa;
        line-height: 1.6;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        margin-top: 0.5rem;
        padding-top: 1rem;
    }

    /* --- ESTILOS DE VIDEO --- */
    .videos-seccion {
        margin-bottom: 3rem;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 2rem;
    }
    .video-card {
        background: #1a1a1a;
        border: 1px solid #333;
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        max-width: 320px;
        flex-shrink: 0;
    }
    .video-responsive {
        position: relative;
        width: 100%;
        padding-bottom: 177.77%;
        height: 0;
        overflow: hidden;
    }
    .video-responsive iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .video-info {
        padding: 1.5rem;
    }
    .video-info h3 {
        color: #c0a062;
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }
    .video-info p {
        color: #aaa;
        font-size: 0.95rem;
        margin: 0;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .linaje-container {
            padding: 40px 1rem 40px 1rem;
        }
        .apellido-titulo {
            font-size: clamp(2.5rem, 10vw, 3.5rem);
        }
        .linaje-contenido {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        .escudo-columna {
            order: 1;
            position: static;
            margin-bottom: 2rem;
        }
        .escudo-wrapper img {
            max-width: 200px;
        }
        .contenido-columna {
            order: 2;
        }
        .subtitulo-seccion {
            text-align: center;
        }
        .boton-toggle-escudo {
            display: block;
        }
    }
    @media (min-width: 769px) {
        .boton-toggle-escudo {
            display: none;
        }
        .escudo-descripcion-wrapper {
            max-height: none;
        }
    }
</style>
