<script>
  import Logo from './Logo.svelte';
  import { cartCount } from '$lib/stores/cart';
  import { fade } from 'svelte/transition';
  import { onDestroy, onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  let isMobileMenuOpen = false;
  let isScrolled = false;

  function setScrollLock(locked) {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = locked ? 'hidden' : '';
    // En móvil evitamos el rebote del scroll al estar abierto
    if (locked) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    setScrollLock(isMobileMenuOpen);
  }

  function closeMenu() {
    if (!isMobileMenuOpen) return;
    isMobileMenuOpen = false;
    setScrollLock(false);
  }

  onMount(() => {
    const onScroll = () => {
      isScrolled = window.scrollY > 20;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  afterNavigate(() => closeMenu());

  onDestroy(() => {
    if (typeof document !== 'undefined') setScrollLock(false);
  });
</script>

<header class="site-header" class:is-open={isMobileMenuOpen} class:is-scrolled={isScrolled}>
  <a href="/" class="logo-link" aria-label="Ir a inicio" on:click={closeMenu}>
    <Logo />
  </a>

  <nav class="desktop-nav">
    <a href="/origins">Origins</a>
    <a href="/blog">El Códice</a>
    <a href="/productos">Colección</a>
    <a href="/studio">Studio</a>
    <a href="/films">Films</a>

    <a href="/carrito" class="cart-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {#if $cartCount > 0}
        <span class="badge" in:fade>{$cartCount}</span>
      {/if}
    </a>
  </nav>

  <button type="button" class="hamburger" aria-label="Menu" on:click={toggleMobileMenu}>
    <span></span><span></span><span></span>
  </button>
</header>

<nav id="mobile-nav" class="mobile-nav" class:active={isMobileMenuOpen}>
  <a href="/origins" on:click={closeMenu}>Origins</a>
  <a href="/blog" on:click={closeMenu}>El Códice</a>
  <a href="/productos" on:click={closeMenu}>Colección</a>
  <a href="/studio" on:click={closeMenu}>Studio</a>
  <a href="/films" on:click={closeMenu}>Films</a>
  <a href="/carrito" on:click={closeMenu} class="mobile-cart">
    Tu Legado {#if $cartCount > 0}<span>({$cartCount})</span>{/if}
  </a>
</nav>

{#if isMobileMenuOpen}
  <div class="overlay" on:click={closeMenu} transition:fade={{ duration: 200 }}></div>
{/if}

<style>
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: var(--header-h);
    position: sticky;
    top: 0;
    z-index: 1002;
    background: rgba(18, 18, 18, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.4s ease;
  }

  /* LOGO ANIMATION */
  .logo-link { width: 130px; display: flex; align-items: center; transition: transform 0.3s ease; }
  .logo-link :global(svg) { width: 100%; height: auto; transition: all 0.4s ease; filter: grayscale(1) opacity(0.6); }
  .logo-link:hover :global(svg) { filter: grayscale(0) opacity(1); transform: scale(1.02); }

  /* NAV LINKS */
  .desktop-nav { display: flex; align-items: center; gap: 2rem; }
  .desktop-nav a { text-decoration: none; color: #aaa; font-size: 0.85rem; text-transform: uppercase; transition: color 0.3s; }
  .desktop-nav a:hover { color: var(--gold); }

  .cart-icon { position: relative; color: #fff; display: flex; }
  .badge {
    position: absolute; top: -8px; right: -8px; background: var(--gold);
    color: #000; font-size: 0.65rem; font-weight: 900; width: 18px; height: 18px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
  }

  /* HAMBURGER & X ANIMATION */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    z-index: 1003;
  }
  
  .hamburger span {
    width: 24px;
    height: 2px;
    background: var(--gold);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  /* La transformación a X */
  .site-header.is-open .hamburger span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .site-header.is-open .hamburger span:nth-child(2) {
    opacity: 0;
    transform: translateX(10px);
  }
  .site-header.is-open .hamburger span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }

  /* MOBILE NAV */
  .mobile-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100vh;
    background: var(--bg);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    padding: 120px 2.5rem;
    gap: 2rem;
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  }
  .mobile-nav.active { right: 0; }
  .mobile-nav a { color: #fff; text-decoration: none; font-size: 1.5rem; font-family: 'Playfair Display', serif; }
  .mobile-cart { color: var(--gold) !important; border-top: 1px solid #222; padding-top: 2rem; }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
  }

  @media (max-width: 1024px) {
    .desktop-nav { display: none; }
    .hamburger { display: flex; }
  }
</style>