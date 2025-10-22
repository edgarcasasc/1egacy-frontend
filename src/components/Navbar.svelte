<script>
  import Logo from './Logo.svelte';

  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<header class:open={isMobileMenuOpen}>
  <a href="/" class="logo-link"
  aria-label="Ir a la página de inicio de 1egacy" >
    <Logo />
  </a>
  
  <!-- Menú para Escritorio -->
  <nav class="desktop-nav">
    <a href="/origins">Origins</a>
    <a href="/studio">Studio</a>
    <a href="/films">Films</a>
    <a href="/blog">El Códice</a>
  </nav>

  <!-- Botón de Hamburguesa para Móvil -->
  <button class="hamburger-menu" on:click={toggleMobileMenu} aria-label="Abrir menú">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<!-- Panel Lateral para Móvil -->
<nav class="mobile-nav" class:open={isMobileMenuOpen}>
  <a href="/origins" on:click={toggleMobileMenu}>Origins</a>
  <a href="/studio" on:click={toggleMobileMenu}>Studio</a>
  <a href="/films" on:click={toggleMobileMenu}>Films</a>
  <a href="/blog" on:click={toggleMobileMenu}>El Códice</a>
</nav>

<!-- Overlay para cerrar el menú al hacer clic fuera -->
<div class="mobile-nav-overlay" class:open={isMobileMenuOpen} on:click={toggleMobileMenu}></div>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .logo-link {
    display: block;
    width: 150px; /* Tamaño para escritorio */
    height: auto;
    z-index: 1001; /* Asegura que esté por encima del overlay del menú móvil */
    transition: width 0.3s ease;
  }

  .logo-link:hover :global(.cls-1) {
    fill: #c0a062;
  }
  .logo-link:hover :global(.cls-2) {
    fill: #ffffff;
  }

  .desktop-nav {
    list-style: none;
    display: flex;
    gap: 2rem;
  }

  .desktop-nav a {
    text-decoration: none;
    color: #e0e0e0;
    font-size: 1rem;
    position: relative;
  }

  .desktop-nav a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: #c0a062;
    transition: width 0.3s ease;
  }

  .desktop-nav a:hover::after {
    width: 100%;
  }
  
  /* --- ESTILOS PARA MÓVIL --- */
  .hamburger-menu {
    display: none; /* Oculto en escritorio */
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    background: transparent;
    border: none;
    z-index: 1001;
  }
  .hamburger-menu span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #e0e0e0;
    border-radius: 3px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  /* Animación de la hamburguesa a "X" */
  header.open .hamburger-menu span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
  }
  header.open .hamburger-menu span:nth-child(2) {
      opacity: 0;
  }
  header.open .hamburger-menu span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
  }

  .mobile-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: min(70vw, 300px);
    height: 100%;
    background-color: hsl(225, 20%, 12%);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    transition: right 0.4s ease-in-out;
  }
  .mobile-nav.open {
    right: 0;
  }
  .mobile-nav a {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 1.5rem;
  }

  .mobile-nav-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease, visibility 0.4s;
  }
  .mobile-nav-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  /* Media Query para activar la vista móvil */
  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }
    .hamburger-menu {
      display: flex;
    }
    .logo-link {
      width: 180px; /* <<< LOGO MÁS GRANDE EN MÓVIL */
    }
     header {
      padding: 1.5rem 1.5rem;
    }
  }
</style>

