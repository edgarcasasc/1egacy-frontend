<script>
    import { onMount } from 'svelte';

    // --- ESTADOS REACTIVOS (La forma Svelte) ---
    let activeSection = 'portada';
    let expandedTheory = null; // 'sevillano' o 'toponimico'
    let activeTimelineEvent = 'info-1248'; // Evento inicial seleccionado
    let chartCanvas; // Referencia al canvas

    // --- DATOS DE LA LÍNEA DE TIEMPO ---
    const timelineEvents = [
        { id: 'info-1248', year: '1248 d.C.', title: 'La Conquista de Sevilla', text: 'Los hermanos Guillén y Bartomeu de Casaus, caballeros franceses, responden a la llamada del rey Fernando III de Castilla y luchan valerosamente en el asedio y conquista de Sevilla. Este acto militar funda el linaje Casaus en suelo andaluz.' },
        { id: 'info-1250', year: 'Post-1248', title: 'El Repartimiento', text: 'Como recompensa por sus servicios, la familia Casaus recibe tierras y honores en el "Libro del Repartimiento de Sevilla". La aparición de "Francisco de Casaus" confirma su estatus como conquistadores y primeros pobladores.' },
        { id: 'info-1400', year: 'S. XIV-XV', title: 'Consolidación', text: 'El linaje Casaus se hispaniza como "de las Casas". Ocupan cargos de prestigio como Veinticuatro de Sevilla y Tesorero Mayor de Andalucía, fortaleciendo su posición mediante alianzas matrimoniales.' },
        { id: 'info-1484', year: '1484 d.C.', title: 'Fray Bartolomé', text: 'Nace Fray Bartolomé de las Casas. Como fraile dominico y obispo de Chiapas, se convierte en una figura central del siglo XVI por su defensa de los derechos indígenas, llevando el apellido a la historia mundial.' }
    ];

    // --- LÓGICA DEL CHART Y SCROLL ---
    onMount(async () => {
        // 1. Cargar Chart.js dinámicamente si no está en el proyecto
        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
        }

        // 2. Inicializar Gráfica
        if (chartCanvas) {
            new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: ['España', 'México', 'Argentina', 'Chile', 'EE.UU.'],
                    datasets: [{
                        label: 'Frecuencia del Apellido',
                        data: [135, 90, 85, 70, 65],
                        backgroundColor: '#C0A062',
                        borderColor: '#A08042',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { beginAtZero: true, grid: { display: false } },
                        y: { grid: { display: false }, ticks: { font: { family: "'EB Garamond', serif", size: 14 }, color: '#4B3F3A' } }
                    }
                }
            });
        }

        // 3. Observer para el Scroll Spy (Navegación lateral)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeSection = entry.target.id;
                }
            });
        }, { threshold: 0.4 });

        document.querySelectorAll('section').forEach(section => observer.observe(section));
    });

    // Función suave para scroll
    function scrollTo(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
</script>

<svelte:head>
    <title>La Crónica del Linaje Casas | 1egacy</title>
    <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="demo-wrapper font-serif bg-[#FDFBF5] text-[#4B3F3A]">

    <nav class="fixed top-0 right-0 h-screen bg-[#F7F2EC] z-50 hidden lg:flex flex-col items-center justify-center shadow-lg w-20 border-l border-[#EAE3D9]">
        {#each ['portada', 'origen', 'historia', 'heraldica', 'expansion'] as section}
            <button 
                class="nav-link text-xs font-bold tracking-widest uppercase py-8 px-2 writing-vertical transform rotate-180 transition-all duration-300 border-l-4 {activeSection === section ? 'bg-[#EAE3D9] border-[#C0A062] text-[#A08042]' : 'border-transparent text-gray-400 hover:text-[#A08042]'}"
                on:click={() => scrollTo(section)}
            >
                {section}
            </button>
        {/each}
    </nav>

    <main class="lg:mr-20">
        
        <section id="portada" class="min-h-screen flex flex-col justify-center items-center text-center p-8 bg-cover bg-center relative">
            <div class="absolute inset-0 bg-gradient-to-b from-[#FDFBF5]/90 via-[#FDFBF5]/80 to-[#FDFBF5]"></div>
            
            <div class="absolute inset-0 opacity-10 z-0" style="background-image: url('https://www.transparenttextures.com/patterns/aged-paper.png');"></div>

            <div class="relative z-10 flex flex-col items-center">
                <img src="/escudodemo_casas.webp" alt="Escudo del Linaje Casas" class="w-32 h-auto mb-6 drop-shadow-lg" />
                <span class="text-[#C0A062] text-sm tracking-[0.3em] uppercase mb-4 block">Códice Digital</span>
                <h1 class="text-6xl md:text-9xl font-bold text-[#4B3F3A] tracking-tight mb-6">LINAJE<br><span class="text-[#A08042]">CASAS</span></h1>
                <p class="text-xl md:text-2xl text-[#6D5F5A] italic max-w-2xl mx-auto border-t border-b border-[#C0A062]/30 py-4">
                    "De Caballeros Franceses a Solares de Aragón."
                </p>
                
                <div class="mt-16 animate-bounce cursor-pointer" on:click={() => scrollTo('origen')}>
                    <div class="w-6 h-10 border-2 border-[#C0A062] rounded-full flex justify-center p-1">
                        <div class="w-1 h-3 bg-[#C0A062] rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>

        <section id="origen" class="min-h-screen flex flex-col justify-center container mx-auto px-6 py-20">
            <div class="text-center mb-12">
                <span class="text-[#C0A062] text-xs font-bold tracking-widest uppercase">Etimología</span>
                <h2 class="text-4xl md:text-5xl font-bold text-[#A08042] mt-2">El Origen del Nombre</h2>
                <p class="max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
                    El apellido Casas es poligenético. No existe un único linaje, sino dos orígenes principales: una estirpe noble de Sevilla y un origen geográfico en Aragón.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
                <button 
                    class="text-left p-8 rounded-xl border-2 transition-all duration-500 hover:shadow-xl {expandedTheory === 'sevillano' ? 'bg-[#EAE3D9] border-[#C0A062] shadow-md' : 'bg-white border-gray-100'}"
                    on:click={() => expandedTheory = expandedTheory === 'sevillano' ? null : 'sevillano'}
                >
                    <div class="flex justify-between items-start">
                        <h3 class="text-2xl font-bold text-[#4B3F3A]">Linaje Franco-Sevillano</h3>
                        <span class="text-2xl text-[#C0A062]">{expandedTheory === 'sevillano' ? '−' : '+'}</span>
                    </div>
                    <p class="text-gray-500 italic mt-1">Origen noble y militar (Casaus)</p>
                    
                    {#if expandedTheory === 'sevillano'}
                        <div class="mt-4 text-gray-700 text-lg leading-relaxed border-t border-[#C0A062]/20 pt-4 animate-fade-in">
                            Proviene de los hermanos Guillén y Bartomeu de Casaus, caballeros franceses que participaron en la conquista de Sevilla (1248). Su apellido fue hispanizado a "de las Casas".
                        </div>
                    {/if}
                </button>

                <button 
                    class="text-left p-8 rounded-xl border-2 transition-all duration-500 hover:shadow-xl {expandedTheory === 'toponimico' ? 'bg-[#EAE3D9] border-[#C0A062] shadow-md' : 'bg-white border-gray-100'}"
                    on:click={() => expandedTheory = expandedTheory === 'toponimico' ? null : 'toponimico'}
                >
                    <div class="flex justify-between items-start">
                        <h3 class="text-2xl font-bold text-[#4B3F3A]">Origen Toponímico</h3>
                        <span class="text-2xl text-[#C0A062]">{expandedTheory === 'toponimico' ? '−' : '+'}</span>
                    </div>
                    <p class="text-gray-500 italic mt-1">Aragón y Castilla</p>
                    
                    {#if expandedTheory === 'toponimico'}
                        <div class="mt-4 text-gray-700 text-lg leading-relaxed border-t border-[#C0A062]/20 pt-4 animate-fade-in">
                            Deriva de vivir cerca de un grupo de "casas". Es muy común en Aragón (variantes como Lacasa). Estos linajes surgieron independientemente de los Casaus sevillanos.
                        </div>
                    {/if}
                </button>
            </div>
        </section>

        <section id="historia" class="min-h-screen flex flex-col justify-center container mx-auto px-6 py-20 bg-[#F7F2EC]">
            <h2 class="text-4xl font-bold text-center text-[#A08042] mb-16">Hitos del Linaje</h2>

            <div class="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto w-full">
                <div class="w-full md:w-1/3 relative border-l-2 border-dashed border-[#C0A062]/50 pl-8 ml-4 md:ml-0">
                    {#each timelineEvents as event}
                        <div 
                            class="mb-10 relative cursor-pointer group"
                            on:click={() => activeTimelineEvent = event.id}
                        >
                            <div class="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-[#C0A062] bg-[#FDFBF5] transition-all duration-300 {activeTimelineEvent === event.id ? 'scale-125 bg-[#C0A062]' : 'group-hover:scale-110'}"></div>
                            
                            <h4 class="font-bold text-lg {activeTimelineEvent === event.id ? 'text-[#A08042]' : 'text-[#4B3F3A]'} transition-colors">
                                {event.year}
                            </h4>
                            <p class="text-sm italic text-gray-500">{event.title}</p>
                        </div>
                    {/each}
                </div>

                <div class="w-full md:w-2/3 bg-white p-10 rounded-xl shadow-sm border border-[#EAE3D9] min-h-[300px] flex items-center">
                    {#each timelineEvents as event}
                        {#if activeTimelineEvent === event.id}
                            <div class="animate-fade-in">
                                <span class="text-[#C0A062] font-bold text-sm uppercase tracking-wider mb-2 block">{event.year}</span>
                                <h3 class="text-3xl font-bold text-[#4B3F3A] mb-6">{event.title}</h3>
                                <p class="text-lg text-gray-700 leading-relaxed">{event.text}</p>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </section>

        <section id="heraldica" class="min-h-screen flex flex-col justify-center container mx-auto px-6 py-20">
            <h2 class="text-4xl font-bold text-center text-[#A08042] mb-12">Símbolos del Linaje</h2>
            
            <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center bg-white p-8 md:p-16 rounded-xl shadow-sm border border-gray-100">
                <div class="flex flex-col items-center justify-center p-8 bg-[#FDFBF5] rounded-lg border border-[#EAE3D9]">
                    <div class="w-48 h-64 relative drop-shadow-xl">
                         <img src="/escudodemo_casas.webp" alt="Escudo del Linaje Casas" class="w-100 h-auto mb-6 drop-shadow-lg" />
                    </div>
                    <p class="mt-6 text-sm text-[#A08042] font-bold italic tracking-wide">Armas de los Casaus de Sevilla</p>
                </div>

                <div>
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-[#4B3F3A] mb-2">Cinco Roques de Gules</h3>
                        <p class="text-gray-600">El elemento central son cinco roques de ajedrez (torres) rojos sobre fondo dorado. Identifica inequívocamente la antigüedad de este linaje noble.</p>
                    </div>
                    <div class="mb-8">
                        <h3 class="text-2xl font-bold text-[#4B3F3A] mb-2">Bordura de Águilas</h3>
                        <p class="text-gray-600">La bordura azul contiene cabezas de águila de oro. Símbolo de triunfo militar sobre enemigos poderosos durante la Reconquista.</p>
                    </div>
                    <div class="p-4 bg-[#FDFBF5] rounded border-l-4 border-[#C0A062]">
                        <p class="text-sm italic text-gray-500">Nota: Los linajes toponímicos suelen usar castillos genéricos, sin relación con estos roques.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="expansion" class="min-h-screen flex flex-col justify-center container mx-auto px-6 py-20 bg-[#F7F2EC]">
            <h2 class="text-4xl font-bold text-center text-[#A08042]">Un Apellido Sin Fronteras</h2>
            <p class="text-center max-w-2xl mx-auto mt-4 text-lg text-gray-600 mb-12">
                Nacido en la Península Ibérica, el apellido Casas se expandió con fuerza durante la era del Imperio Español.
            </p>

            <div class="bg-white p-6 md:p-12 rounded-xl shadow-lg max-w-4xl mx-auto w-full">
                <div class="relative h-[400px] w-full">
                    <canvas bind:this={chartCanvas}></canvas>
                </div>
            </div>

            <div class="text-center mt-16">
                <a href="/origins" class="inline-block bg-[#C0A062] text-white font-bold uppercase tracking-widest py-4 px-10 rounded hover:bg-[#A08042] transition-colors shadow-lg">
                    Reclamar mi Códice
                </a>
                <p class="mt-4 text-sm text-gray-500">¿Listo para descubrir tu verdadera historia?</p>
            </div>
        </section>

    </main>
</div>

<style>
    .demo-wrapper {
        font-family: 'Playfair Display', serif; 
        background-color: #FDFBF5;
        color: #4B3F3A;
    }
    
    /* Resto de tus estilos... */
    .writing-vertical {
        writing-mode: vertical-rl;
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    /* Clases utilitarias para la animación y layout */
    .writing-vertical {
        writing-mode: vertical-rl;
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>