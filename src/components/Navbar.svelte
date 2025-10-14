<script>
  import Logo from './Logo.svelte'; // 1. Importamos tu nuevo componente de logo
</script>

<nav>
  <a href="/" class="logo-link">
    <Logo />
  </a>
  <ul>
    <li><a href="/origins">Origins</a></li>
    <li><a href="/studio">Studio</a></li>
    <li><a href="/films">Films</a></li>
    <li><a href="/blog">El Códice</a></li> </ul>
</nav>

<style>
  nav {
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

  /* 3. Ajustamos el estilo para el contenedor del logo */
  .logo-link {
    display: block;
    width: 150px; /* Le damos un tamaño fijo al logo */
    height: auto;
  }

  /* Efecto sutil al pasar el mouse sobre el logo */
  .logo-link:hover :global(.cls-1) { /* :global() nos permite afectar los estilos DENTRO del SVG */
    fill: #c0a062; /* La parte blanca se vuelve dorada */
  }
  .logo-link:hover :global(.cls-2) {
    fill: #ffffff; /* La parte gris se vuelve blanca */
  }

  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
  }

  a {
    text-decoration: none;
    color: #e0e0e0;
    font-size: 1rem;
    position: relative;
  }

  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: #c0a062;
    transition: width 0.3s ease;
  }

  a:hover::after {
    width: 100%;
  }
</style>