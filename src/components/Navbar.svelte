<script>
  import Logo from './Logo.svelte';
  import { cartCount } from '$lib/stores/cart'; // <--- IMPORTANTE

  let isMobileMenuOpen = false;

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<header class:open={isMobileMenuOpen}>
  <a href="/" class="logo-link" aria-label="Ir a la página de inicio de 1egacy">
    <Logo />
  </a>
  
  <nav class="desktop-nav">
    <a href="/origins">Origins</a>
    <a href="/studio">Studio</a>
    <a href="/films">Films</a>
    <a href="/blog">El Códice</a>

    <a href="/carrito" class="cart-icon" aria-label="Ver carrito">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {#if $cartCount > 0}
        <span class="badge">{$cartCount}</span>
      {/if}
    </a>
  </nav>

  <button class="hamburger-menu" on:click={toggleMobileMenu} aria-label="Abrir menú">
    <span></span>
    <span></span>
    <span></span>
  </button>
</header>

<nav class="mobile-nav" class:open={isMobileMenuOpen}>
  <a href="/origins" on:click={toggleMobileMenu}>Origins</a>
  <a href="/studio" on:click={toggleMobileMenu}>Studio</a>
  <a href="/films" on:click={toggleMobileMenu}>Films</a>
  <a href="/blog" on:click={toggleMobileMenu}>El Códice</a>
  
  <a href="/carrito" on:click={toggleMobileMenu} class="mobile-cart-link">
    Tu Legado (Carrito) 
    {#if $cartCount > 0}<span class="mobile-badge">({$cartCount})</span>{/if}
  </a>
</nav>

<div 
    class="mobile-nav-overlay" 
    class:open={isMobileMenuOpen} 
    on:click={toggleMobileMenu}
    on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') toggleMobileMenu(); }} 
    role="button" 
    tabindex="0" 
    aria-label="Cerrar menú de navegación"
></div>

<style>
  /* ... TUS ESTILOS ANTERIORES ... */
  
  /* ESTILOS NUEVOS PARA EL CARRITO */
  .cart-icon {
    position: relative;
    color: #e0e0e0;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
  }
  .cart-icon:hover {
    color: #c0a062;
  }
  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #c0a062;
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mobile-cart-link {
    color: #c0a062 !important; /* Destacado en móvil */
    font-weight: bold;
  }

  /* ... PEGA AQUÍ EL RESTO DE TUS ESTILOS ORIGINALES ... */
  header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  
  /* CAMBIO: De absolute a sticky para que ocupe espacio real */
  position: sticky; 
  top: 0;
  
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(10px); /* Efecto de vidrio */
}
  .logo-link { display: block; width: 150px; height: auto; z-index: 1001; transition: width 0.3s ease; }
  .logo-link:hover :global(.cls-1) { fill: #c0a062; }
  .logo-link:hover :global(.cls-2) { fill: #ffffff; }
  .desktop-nav { list-style: none; display: flex; gap: 2rem; }
  .desktop-nav a { text-decoration: none; color: #e0e0e0; font-size: 1rem; position: relative; }
  .desktop-nav a::after { content: ''; position: absolute; width: 0; height: 1px; bottom: -5px; left: 0; background-color: #c0a062; transition: width 0.3s ease; }
  .desktop-nav a:hover::after { width: 100%; }
  .hamburger-menu { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: transparent; border: none; z-index: 1001; }
  .hamburger-menu span { display: block; width: 25px; height: 3px; background-color: #e0e0e0; border-radius: 3px; transition: transform 0.3s ease, opacity 0.3s ease; }
  header.open .hamburger-menu span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
  header.open .hamburger-menu span:nth-child(2) { opacity: 0; }
  header.open .hamburger-menu span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
  .mobile-nav { position: fixed; top: 0; right: -100%; width: min(70vw, 300px); height: 100%; background-color: hsl(225, 20%, 12%); z-index: 1000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; transition: right 0.4s ease-in-out; }
  .mobile-nav.open { right: 0; }
  .mobile-nav a { color: #e0e0e0; text-decoration: none; font-size: 1.5rem; }
  .mobile-nav-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999; opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s; }
  .mobile-nav-overlay.open { opacity: 1; visibility: visible; }
  @media (max-width: 768px) { .desktop-nav { display: none; } .hamburger-menu { display: flex; } .logo-link { width: 180px; } header { padding: 1.5rem 1.5rem; } }
</style>