import re

def process_file(filepath, is_demo):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Change lead-capture-box lock icon & title
    old_lock_block = '''                                    <div class="lock-icon">
                                        {#if submitting}
                                            <div class="spinner"></div>
                                        {:else}
                                            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"><path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm9 13H6v-8h12v8z"/><circle cx="12" cy="15" r="1.5"/></svg>
                                        {/if}
                                    </div>
                                    <h4>Desbloquea el Legado Completo</h4>
                                    <p style="margin-bottom: 15px;">Ingresa tu correo para leer la <strong>historia completa</strong> de la familia {linaje.title} (sin costo).</p>
                                    <div class="free-content-badge">
                                        <span>?? Desliza hacia abajo: El Códice, Colección y FAQs son de libre acceso.</span>
                                    </div>'''
    
    new_lock_block = '''                                    <div class="lock-header">
                                        <div class="lock-icon">
                                            {#if submitting}
                                                <div class="spinner"></div>
                                            {:else}
                                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7zm9 13H6v-8h12v8z"/><circle cx="12" cy="15" r="1.5"/></svg>
                                            {/if}
                                        </div>
                                        <h4>Desbloquea el Legado Completo</h4>
                                    </div>
                                    <p style="margin-bottom: 15px;">Ingresa tu correo para leer la <strong>historia completa</strong> de la familia {linaje.title} (sin costo).</p>'''

    content = content.replace(old_lock_block, new_lock_block)

    # 2. Add historia-premium-bg CSS class to historia-seccion
    content = content.replace('<div class="historia-seccion">', '<div class="historia-seccion historia-premium-bg">')

    # 3. Modify CSS
    # Add new css classes
    css_addition = '''
    .historia-premium-bg {
        background-color: rgba(26, 24, 20, 0.6);
        border: 1px solid rgba(212, 175, 55, 0.15);
        border-radius: 12px;
        padding: 2.5rem 2rem;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
    }
    .lock-header { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 15px; }
    .lock-header h4 { margin: 0 !important; }
    .lock-icon { margin-bottom: 0 !important; }
'''
    if '.historia-premium-bg' not in content:
        content = content.replace('/* Estado Desbloqueado */', css_addition + '    /* Estado Desbloqueado */')
    
    # 4. Modify lead-capture-box max-width and padding
    content = content.replace('max-width: 500px;', 'max-width: 420px;')
    content = content.replace('padding: 40px;', 'padding: 30px;')

    # 5. Extract blocks and swap them
    # For demo:
    # Origen (if exists), Historia, Videos, Articulos(Codice), Boutique, FAQs
    # We want to swap Historia down. Right now in demo:
    #   Origen
    #   Historia (lines ~111 to ~194)
    #   Videos
    #   Articulos (Codice) (~227 to ~251)
    
    # This is complex with regex. Let's do it using finding balanced {/if}.
    import re
    def extract_if_block(text, start_pattern):
        match = re.search(start_pattern, text)
        if not match: return None, text
        start_idx = match.start()
        
        # simple brace counting
        nested = 0
        end_idx = start_idx
        # find the end of the matching {/if}
        lines = text[start_idx:].split('\\n')
        block_lines = []
        for line in lines:
            block_lines.append(line)
            if '{#if ' in line or '{#each ' in line:
                nested += 1
            if '{/if}' in line or '{/each}' in line:
                nested -= 1
            if nested == 0:
                break
                
        block = '\\n'.join(block_lines)
        return block, text.replace(block + '\\n', '').replace(block, '')

    historia_block, content = extract_if_block(content, r'[ \t]*{#if linaje.historia}')
    codice_block, content = extract_if_block(content, r'[ \t]*{#if linaje.articulosRelacionados && linaje.articulosRelacionados.length > 0}')
    
    # In both components we find the insertion marker.
    # Where to put codice? Where historia was in origins (above relatedProducts).
    # In demo: Origen -> Codice -> Historia -> Videos
    # Let's just assemble .contenido-columna manually
    
    # Splitting parts
    part1_split = content.split('<div class="contenido-columna">')
    header_part = part1_split[0] + '<div class="contenido-columna">\\n'
    
    part2_split = part1_split[1].split('</div> \\n        </div>')
    if len(part2_split) < 2:
        part2_split = part1_split[1].split('</div>\\n        </div>')
        
    inner_content = part2_split[0]
    tail_part = '\\n        </div>' + part2_split[1]

    # Now extract all blocks from inner_content
    origen_block, inner_content = extract_if_block(inner_content, r'[ \t]*{#if linaje.origen}')
    videos_block, inner_content = extract_if_block(inner_content, r'[ \t]*{#if linaje.videos && linaje.videos.length > 0}')
    productos_block, inner_content = extract_if_block(inner_content, r'[ \t]*{#if relatedProducts.length > 0}')
    faqs_block, inner_content = extract_if_block(inner_content, r'[ \t]*{#if linaje.faqs && linaje.faqs.length > 0}')

    # Reassemble:
    # Origen -> Codice -> Historia -> Videos -> Boutique -> FAQs
    new_inner = "\\n                "
    if origen_block: new_inner += origen_block + "\\n\\n"
    if codice_block: new_inner += codice_block + "\\n\\n"
    if historia_block: new_inner += historia_block + "\\n\\n"
    if videos_block: new_inner += videos_block + "\\n\\n"
    if productos_block: new_inner += productos_block + "\\n\\n"
    if faqs_block: new_inner += faqs_block + "\\n\\n"

    new_content = header_part + new_inner + tail_part
    
    # Save
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Processed:", filepath)

try:
    process_file(r'c:\Users\edyKzaz\1egacy-frontend\src\routes\origins\[apellido]\+page.svelte', False)
    process_file(r'c:\Users\edyKzaz\1egacy-frontend\src\routes\demo-innovacion\[apellido]\+page.svelte', True)
    print("Done")
except Exception as e:
    import traceback
    traceback.print_exc()

