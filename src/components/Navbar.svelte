<nav>
  <a href="/" class="logo">1egacy</a>
  <ul>
    <li><a href="/origins">Origins</a></li>
    <li><a href="/studio">Studio</a></li>
    <li><a href="/films">Films</a></li>
  </ul>
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: #e0e0e0;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 2rem; /* Espacio entre los elementos */
  }

  a {
    text-decoration: none;
    color: #e0e0e0;
    font-size: 1rem;
    position: relative; /* Necesario para la línea de abajo */
  }

  /* Efecto sutil al pasar el mouse */
  a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: #c0a062; /* Color dorado */
    transition: width 0.3s ease;
  }

  a:hover::after {
    width: 100%;
  }
</style>