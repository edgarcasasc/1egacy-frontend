<script>
  // Recibimos clases para poder cambiar el tamaño en el Navbar vs Footer
  let { class: className = "w-32", alt = "1egacy" } = $$props;
</script>

<img 
  src="/logo1egacy.svg" 
  {alt} 
  class={className}
  width="150" 
  height="40" 
  loading="eager" 
  decoding="async" 
/>