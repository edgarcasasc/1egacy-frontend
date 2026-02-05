<script>
  import '../app.css'; 
  import Navbar from '../components/Navbar.svelte';
  import Footer from '../components/Footer.svelte';
</script>

<div class="app-shell">
  <Navbar />
  <main id="main-content">
    <slot />
  </main>
  <Footer /> 
</div>