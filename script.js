let audioCtx = null;
let musicNodes = null;
let musicMuted = false;
let musicStarted = false;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function startBackgroundMusic() {
  if (musicStarted) return;
  musicStarted = true;
  const ctx = getAudioCtx();
  const masterGain = ctx.createGain();
  masterGain.gain.value = musicMuted ? 0 : 0.18;
  masterGain.connect(ctx.destination);
  const melodyNotes = [261.63,293.66,329.63,392.00,440.00,392.00,329.63,293.66,261.63,246.94,220.00,246.94,261.63,293.66,329.63,261.63];
  const melodyDur = 0.35;
  function playMelodyLoop(startTime) {
    melodyNotes.forEach((freq,i) => {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.connect(g); g.connect(masterGain);
      osc.type = 'sine'; osc.frequency.value = freq;
      const t = startTime + i * melodyDur;
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.6,t+0.05); g.gain.linearRampToValueAtTime(0,t+melodyDur-0.05);
      osc.start(t); osc.stop(t+melodyDur);
    });
    const loopEnd = startTime + melodyNotes.length * melodyDur;
    setTimeout(() => playMelodyLoop(ctx.currentTime), (loopEnd-ctx.currentTime-0.5)*1000);
  }
  function playBass() {
    const bassNotes=[65.41,87.31,73.42,82.41]; const step=0.7; let i=0;
    function nextBass() {
      const ctx2=getAudioCtx(), osc=ctx2.createOscillator(), g=ctx2.createGain(), filter=ctx2.createBiquadFilter();
      filter.type='lowpass'; filter.frequency.value=200;
      osc.connect(filter); filter.connect(g); g.connect(masterGain);
      osc.type='sawtooth'; osc.frequency.value=bassNotes[i%bassNotes.length]*2;
      g.gain.setValueAtTime(0.8,ctx2.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx2.currentTime+step*0.9);
      osc.start(ctx2.currentTime); osc.stop(ctx2.currentTime+step); i++;
      setTimeout(nextBass,step*1000);
    }
    nextBass();
  }
  function playShimmer() {
    const shimmerFreqs=[523.25,659.25,783.99,1046.50]; let si=0;
    function nextShimmer() {
      const ctx3=getAudioCtx(), osc=ctx3.createOscillator(), g=ctx3.createGain();
      osc.connect(g); g.connect(masterGain); osc.type='triangle'; osc.frequency.value=shimmerFreqs[si%shimmerFreqs.length];
      g.gain.setValueAtTime(0.15,ctx3.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx3.currentTime+1.4);
      osc.start(ctx3.currentTime); osc.stop(ctx3.currentTime+1.5); si++;
      setTimeout(nextShimmer,1400);
    }
    setTimeout(nextShimmer,200);
  }
  playMelodyLoop(ctx.currentTime+0.1);
  setTimeout(playBass,200);
  setTimeout(playShimmer,400);
  musicNodes = { masterGain };
}

function toggleMusic() {
  musicMuted = !musicMuted;
  const btn = document.getElementById('music-btn');
  btn.textContent = musicMuted ? '🔇' : '🎵';
  btn.classList.toggle('muted', musicMuted);
  if (musicNodes) {
    const ctx = getAudioCtx();
    musicNodes.masterGain.gain.cancelScheduledValues(ctx.currentTime);
    musicNodes.masterGain.gain.linearRampToValueAtTime(musicMuted?0:0.18, ctx.currentTime+0.3);
  }
  if (!musicStarted && !musicMuted) startBackgroundMusic();
}

function playCorrectSound() {
  const ctx = getAudioCtx();
  [523.25,659.25,783.99,1046.50].forEach((freq,i) => {
    const osc=ctx.createOscillator(), g=ctx.createGain();
    osc.connect(g); g.connect(ctx.destination); osc.type='sine'; osc.frequency.value=freq;
    const t=ctx.currentTime+i*0.12;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(0.5,t+0.04); g.gain.exponentialRampToValueAtTime(0.001,t+0.4);
    osc.start(t); osc.stop(t+0.45);
  });
  showSoundRipple('correct');
}

function playWrongSound() {
  const ctx = getAudioCtx();
  const osc=ctx.createOscillator(), g=ctx.createGain();
  osc.connect(g); g.connect(ctx.destination); osc.type='sawtooth';
  osc.frequency.setValueAtTime(440,ctx.currentTime); osc.frequency.linearRampToValueAtTime(110,ctx.currentTime+0.6);
  g.gain.setValueAtTime(0.4,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.7);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime+0.75);
  showSoundRipple('wrong');
}

function showSoundRipple(type) {
  const el=document.createElement('div');
  el.className=`sound-ripple ${type}`;
  el.style.cssText='top:50%;left:50%;margin:-30px 0 0 -30px;';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),700);
}

let questions = [
  {text:"En el análisis del macroentorno, ¿cuál es el propósito principal de identificar factores económicos, políticos, sociales, tecnológicos, ecológicos y legales?",options:["Controlar únicamente las actividades internas de la empresa.","Analizar factores externos que pueden influir en las decisiones estratégicas.","Determinar únicamente los costos de producción.","Supervisar el desempeño de los empleados."],correct:1,difficulty:"easy",justification:"El análisis del macroentorno busca identificar factores externos que afectan a la empresa, permitiendo anticipar oportunidades y amenazas para tomar mejores decisiones estratégicas."},
  {text:"¿Cuáles de los siguientes elementos corresponden con mayor claridad al microentorno de una empresa?",options:["Clientes, proveedores y competidores.","Inflación y políticas gubernamentales.","Cambios climáticos globales.","Tendencias culturales internacionales."],correct:0,difficulty:"easy",justification:"El microentorno está formado por actores cercanos a la empresa que influyen directamente en sus operaciones y competitividad, como clientes, proveedores y competidores."},
  {text:"Al construir la matriz FODA, ¿qué combinación describe correctamente cada cuadrante?",options:["Factores internos y externos positivos y negativos.","Solo aspectos financieros y administrativos.","Elementos tecnológicos y legales únicamente.","Variables económicas y sociales exclusivamente."],correct:0,difficulty:"medium",justification:"La matriz FODA combina fortalezas y debilidades internas con oportunidades y amenazas externas, abarcando factores positivos y negativos de ambos entornos."},
  {text:"En la identificación de factores estratégicos externos, ¿cuál es el criterio más adecuado para considerar que un factor detectado es realmente estratégico?",options:["Que tenga impacto significativo en la empresa y sus objetivos.","Que sea fácil de controlar por la organización.","Que dependa solo de los empleados.","Que no afecte la competencia."],correct:0,difficulty:"medium",justification:"Un factor estratégico es aquel que puede influir considerablemente en el desempeño y éxito de la empresa, independientemente de si es controlable o no."},
  {text:"Respecto a los factores estratégicos internos, ¿cuál de los siguientes ejemplos ilustra mejor una fortaleza interna relevante para la estrategia?",options:["Alta rotación de personal.","Tecnología obsoleta.","Marca reconocida y buena reputación.","Disminución de ventas."],correct:2,difficulty:"easy",justification:"Una marca sólida representa una ventaja competitiva interna que fortalece la estrategia empresarial, diferenciándola de debilidades como rotación de personal o tecnología obsoleta."},
  {text:"Al formular objetivos estratégicos, ¿cuál de las siguientes características es esencial para que un objetivo sea útil en la gestión?",options:["Que sea ambiguo y flexible.","Que sea medible y específico.","Que no tenga límite de tiempo.","Que dependa del azar."],correct:1,difficulty:"easy",justification:"Los objetivos deben ser claros y medibles para facilitar el control y evaluación de resultados; esta es la base del enfoque SMART."},
  {text:"Las estrategias maestras (como crecimiento, estabilidad o reducción/recorte) se caracterizan por:",options:["Orientar la dirección general de la empresa.","Ser actividades operativas diarias.","Aplicarse solo en pequeñas empresas.","Limitar el desarrollo organizacional."],correct:0,difficulty:"medium",justification:"Las estrategias maestras definen el rumbo principal que seguirá la organización a largo plazo, no son actividades operativas del día a día."},
  {text:"¿Cuál es el rol principal de las políticas empresariales dentro del proceso de implementación estratégica?",options:["Guiar la toma de decisiones y acciones organizacionales.","Reemplazar los objetivos estratégicos.","Eliminar la necesidad de planificación.","Reducir únicamente costos."],correct:0,difficulty:"medium",justification:"Las políticas sirven como lineamientos que orientan las decisiones y la ejecución de estrategias, dando coherencia a la organización."},
  {text:"En la implementación del plan estratégico, ¿cuál de los siguientes aspectos es más crítico para asegurar que las estrategias formuladas se conviertan en resultados concretos?",options:["Falta de seguimiento.","Comunicación y coordinación efectiva.","Improvisación constante.","Ausencia de liderazgo."],correct:1,difficulty:"hard",justification:"Una buena coordinación y comunicación permiten ejecutar correctamente las estrategias, asegurando que todos los actores conozcan su rol y actúen alineados."},
  {text:"¿Cuál es la relación más adecuada entre el análisis FODA y la formulación de estrategias?",options:["El FODA ayuda a diseñar estrategias aprovechando fortalezas y oportunidades.","El FODA reemplaza la planificación estratégica.","El FODA solo analiza debilidades internas.","El FODA no influye en las decisiones estratégicas."],correct:0,difficulty:"medium",justification:"El análisis FODA proporciona información clave para formular estrategias adecuadas, conectando el diagnóstico con la acción."},
  {text:"Una empresa del sector minorista enfrenta incertidumbre por elecciones presidenciales que podrían cambiar las regulaciones laborales. ¿En qué etapa del proceso estratégico debe analizarse primero este factor?",options:["En el análisis del macroentorno, por ser un factor político externo.","En el control financiero interno.","En la capacitación de empleados.","En el análisis operativo diario."],correct:0,difficulty:"hard",justification:"Las elecciones y regulaciones son factores políticos externos que pertenecen al macroentorno y deben analizarse en esa etapa del proceso estratégico."},
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece a este nivel y no al microentorno?",options:["Políticas gubernamentales.","Competidores directos.","Clientes frecuentes.","Proveedores locales."],correct:0,difficulty:"medium",justification:"Las políticas gubernamentales afectan a todas las empresas del entorno general y forman parte del macroentorno, no del microentorno."},
  {text:"En formulación estratégica, ¿cuál es la principal diferencia funcional entre misión y visión que justifica incluir la visión ANTES de los objetivos SMART?",options:["La visión define el futuro deseado de la empresa.","La misión reemplaza los objetivos.","Los objetivos eliminan la visión.","La misión solo describe productos."],correct:0,difficulty:"medium",justification:"La visión marca el rumbo futuro y sirve como guía para establecer objetivos estratégicos concretos y medibles."},
  {text:"En la identificación de factores clave externos para un plan estratégico, ¿cuál de los siguientes ejemplos describe mejor una oportunidad?",options:["Crecimiento de la demanda del mercado.","Reducción de clientes.","Incremento de competidores.","Crisis económica nacional."],correct:0,difficulty:"easy",justification:"Una mayor demanda representa una posibilidad favorable para crecer, siendo un ejemplo claro de oportunidad externa."},
  {text:"¿Cuál de las siguientes alternativas representa mejor un factor clave interno de tipo fortaleza?",options:["Personal altamente capacitado.","Baja productividad.","Falta de recursos financieros.","Mala reputación corporativa."],correct:0,difficulty:"easy",justification:"Contar con personal capacitado fortalece el desempeño y competitividad de la empresa, siendo una ventaja interna clara."},
  {text:"En la construcción de la matriz FODA, ¿qué combinación describe correctamente una amenaza?",options:["Factor externo negativo.","Factor interno positivo.","Factor interno negativo.","Factor externo positivo."],correct:0,difficulty:"easy",justification:"Las amenazas son situaciones externas que pueden perjudicar a la organización, siendo factores del entorno fuera del control de la empresa."},
  {text:"¿Cuál es el principal propósito de la matriz FODA dentro del proceso de formulación estratégica?",options:["Facilitar el análisis integral para la toma de decisiones estratégicas.","Sustituir la misión empresarial.","Controlar únicamente las finanzas.","Eliminar riesgos totalmente."],correct:0,difficulty:"easy",justification:"La matriz FODA permite identificar condiciones internas y externas relevantes para tomar decisiones estratégicas fundamentadas."},
  {text:"Una empresa desea iniciar su proceso de formulación estratégica. ¿Cuál debería ser el primer foco principal para asegurar una base sólida del plan estratégico?",options:["Analizar la situación interna y externa de la empresa.","Incrementar precios inmediatamente.","Reducir personal sin evaluación.","Cambiar el logo corporativo."],correct:0,difficulty:"medium",justification:"El análisis situacional es la base para formular estrategias coherentes, pues sin diagnóstico no hay dirección clara."},
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece a este nivel y no al microentorno?",options:["Factores tecnológicos nacionales.","Clientes específicos.","Proveedores directos.","Distribuidores locales."],correct:0,difficulty:"medium",justification:"Los cambios tecnológicos nacionales afectan ampliamente a las organizaciones y pertenecen al macroentorno, no al microentorno inmediato."},
  {text:"En el análisis del microentorno, ¿cuál de los siguientes elementos es más relevante para identificar amenazas competitivas directas?",options:["Competidores actuales del mercado.","Cultura organizacional interna.","Clima político internacional.","Inflación global."],correct:0,difficulty:"easy",justification:"Los competidores directos representan amenazas inmediatas para la empresa en el microentorno, afectando su posición competitiva."},
  {text:"Una empresa tecnológica desea analizar cómo la regulación estatal futura sobre protección de datos podría afectar su modelo de negocio. ¿En qué parte del análisis del entorno estratégico debería ubicar principalmente este aspecto?",options:["En el análisis legal del macroentorno.","En el análisis del personal interno.","En el control operativo diario.","En la evaluación de inventarios."],correct:0,difficulty:"medium",justification:"Las regulaciones estatales forman parte de los factores legales del macroentorno, afectando a todas las empresas del sector."},
  {text:"En una formulación estratégica rigurosa, ¿cuál de los siguientes ejemplos describe mejor un objetivo SMART para incrementar la cuota de mercado?",options:["Mejorar las ventas algún día.","Incrementar la cuota de mercado en un 10% en el segmento juvenil durante los próximos 12 meses.","Tener más clientes sin plazo definido.","Ser la mejor empresa del país."],correct:1,difficulty:"medium",justification:"La opción B cumple con las características SMART: es específica, medible, alcanzable, relevante y temporal, a diferencia de las demás que son vagas."},
  {text:"En el marco de la matriz FODA, ¿cuál de las siguientes combinaciones representa mejor una estrategia FO (Fortalezas-Oportunidades) bien formulada?",options:["Aprovechar una marca reconocida para ingresar a nuevos mercados en crecimiento.","Reducir personal por crisis económica.","Minimizar pérdidas por falta de recursos.","Evitar competir en mercados internacionales."],correct:0,difficulty:"hard",justification:"Una estrategia FO utiliza fortalezas internas (marca reconocida) para aprovechar oportunidades externas (mercados en crecimiento), maximizando el potencial."},
  {text:"Al analizar el microentorno competitivo, una empresa identifica que tres nuevos competidores de bajo costo han entrado en su mercado local. ¿Cómo debería clasificar este hallazgo dentro de la matriz FODA?",options:["Fortaleza.","Oportunidad.","Amenaza.","Debilidad."],correct:2,difficulty:"easy",justification:"La entrada de nuevos competidores puede disminuir la participación de mercado y afectar la rentabilidad, siendo una amenaza externa clara."},
  {text:"Una compañía detecta que posee un equipo altamente calificado y buena reputación, pero su estructura organizativa es rígida y sus sistemas son obsoletos. ¿Cómo se clasifican estos elementos en el análisis interno?",options:["Solo como oportunidades externas.","Fortalezas y debilidades internas.","Amenazas del entorno.","Factores políticos y legales."],correct:1,difficulty:"medium",justification:"El personal calificado y la reputación son fortalezas internas, mientras que la rigidez organizativa y sistemas obsoletos son debilidades internas."},
  {text:"Una empresa con fuerte presencia en un mercado saturado decide vender más productos actuales a los mismos segmentos mediante promociones y fidelización. ¿Qué tipo de estrategia maestra describe mejor este enfoque?",options:["Diversificación.","Reducción.","Penetración de mercado.","Integración vertical."],correct:2,difficulty:"medium",justification:"La penetración de mercado busca aumentar las ventas de productos actuales en mercados actuales, sin necesidad de nuevos productos o mercados."},
  {text:"En un proceso de gestión del cambio, la dirección comunica la visión, capacita al personal y ajusta los sistemas de incentivos para apoyar los nuevos comportamientos. ¿Qué objetivo central persiguen estas acciones?",options:["Facilitar la adaptación organizacional al cambio estratégico.","Reducir únicamente los costos laborales.","Eliminar la competencia del mercado.","Sustituir la planificación estratégica."],correct:0,difficulty:"hard",justification:"Estas acciones buscan que los colaboradores adopten y apoyen la nueva estrategia, facilitando la transición organizacional."},
  {text:"Una empresa diseña políticas para descuentos máximos, niveles de autorización para inversiones y criterios de selección de proveedores. ¿Qué función principal cumplen estas políticas?",options:["Orientar y estandarizar la toma de decisiones.","Reemplazar los objetivos estratégicos.","Limitar totalmente la innovación.","Eliminar riesgos financieros."],correct:0,difficulty:"medium",justification:"Las políticas sirven como guías para actuar de forma coherente con la estrategia, estandarizando criterios de decisión en la organización."},
  {text:"La alta dirección quiere asegurarse de que los objetivos SMART estén alineados con los factores clave de éxito identificados en el análisis externo e interno. ¿Cuál es el enfoque más adecuado?",options:["Formular objetivos basados en fortalezas y oportunidades relevantes.","Crear objetivos sin análisis previo.","Ignorar las amenazas externas.","Definir metas únicamente financieras."],correct:0,difficulty:"hard",justification:"Los objetivos deben relacionarse directamente con el análisis estratégico realizado, conectando el diagnóstico con los resultados esperados."},
  {text:"En un taller de formulación estratégica, se discute la diferencia entre misión y visión. ¿Cuál afirmación refleja mejor el papel de la visión?",options:["Describe el futuro deseado y orienta el rumbo estratégico.","Define únicamente las tareas operativas diarias.","Sustituye la misión organizacional.","Solo explica la estructura financiera."],correct:0,difficulty:"medium",justification:"La visión representa el estado futuro al que la empresa aspira llegar, siendo la brújula que orienta todas las decisiones estratégicas."},
  {text:"En la etapa de valoración dentro de un proceso de planificación estratégica, ¿qué actividad agrega más valor para preparar un buen Cuadro de Mando Integral (CMI)?",options:["Definir indicadores y metas estratégicas.","Eliminar todos los procesos internos.","Cambiar el nombre de la empresa.","Reducir personal sin evaluación."],correct:0,difficulty:"hard",justification:"El CMI necesita indicadores claros para medir el cumplimiento de la estrategia; sin ellos no es posible controlar el avance."},
  {text:"¿Cuál es el propósito principal de los planes de acción derivados del Cuadro de Mando Integral (CMI)?",options:["Convertir los objetivos estratégicos en actividades concretas.","Sustituir la misión empresarial.","Eliminar la necesidad de control.","Reducir únicamente costos operativos."],correct:0,difficulty:"medium",justification:"Los planes de acción permiten ejecutar las estrategias mediante tareas específicas, convirtiendo los objetivos en resultados tangibles."},
  {text:"En un sistema de control basado en el CMI, ¿qué característica distingue al control estratégico de un simple control operativo?",options:["Evalúa el cumplimiento de objetivos estratégicos a largo plazo.","Solo controla actividades diarias.","Se enfoca únicamente en gastos menores.","No utiliza indicadores."],correct:0,difficulty:"medium",justification:"El control estratégico analiza el avance global de la estrategia organizacional, a diferencia del operativo que se centra en actividades del día a día."},
  {text:"¿Cuál de las siguientes afirmaciones describe mejor la perspectiva financiera en el Cuadro de Mando Integral (CMI)?",options:["Evalúa la rentabilidad y creación de valor económico.","Analiza exclusivamente la satisfacción laboral.","Mide solo procesos de producción.","Controla únicamente campañas publicitarias."],correct:0,difficulty:"easy",justification:"La perspectiva financiera busca medir resultados económicos y sostenibilidad, siendo el reflejo final del éxito de las otras perspectivas."},
  {text:"En la perspectiva del cliente del CMI, ¿qué tipo de indicador es más coherente con su propósito?",options:["Nivel de satisfacción y fidelización de clientes.","Consumo de energía eléctrica.","Tiempo de mantenimiento interno.","Rotación de inventarios."],correct:0,difficulty:"easy",justification:"Esta perspectiva mide cómo perciben los clientes a la empresa, siendo la satisfacción y fidelización los indicadores más relevantes."},
  {text:"¿Cuál es el enfoque central de la perspectiva de procesos internos en el CMI?",options:["Mejorar la eficiencia y calidad de los procesos clave.","Reducir únicamente salarios.","Cambiar la visión empresarial.","Analizar solo factores políticos externos."],correct:0,difficulty:"medium",justification:"Esta perspectiva busca optimizar los procesos que generan valor para clientes y empresa, siendo la eficiencia y calidad sus pilares."},
  {text:"¿Qué aspecto caracteriza principalmente a la perspectiva de aprendizaje y crecimiento en el CMI?",options:["Desarrollo del talento humano, innovación y tecnología.","Reducción exclusiva de costos.","Supervisión de impuestos gubernamentales.","Control de proveedores externos."],correct:0,difficulty:"medium",justification:"Esta perspectiva impulsa las capacidades internas necesarias para crecer y mejorar, siendo el talento humano e innovación sus elementos clave."},
  {text:"¿Qué función principal cumple el mapa estratégico dentro del enfoque del Cuadro de Mando Integral?",options:["Mostrar la relación causa-efecto entre objetivos estratégicos.","Sustituir el presupuesto anual.","Eliminar la necesidad de indicadores.","Controlar únicamente inventarios."],correct:0,difficulty:"medium",justification:"El mapa estratégico permite visualizar cómo se conectan los objetivos en las diferentes perspectivas del CMI, mostrando relaciones causa-efecto."},
  {text:"En el análisis de desarrollo organizacional asociado al CMI, ¿qué aspecto resulta más relevante evaluar?",options:["Las capacidades, cultura y competencias del personal.","Solo la infraestructura física.","Únicamente las ventas mensuales.","El tamaño del edificio corporativo."],correct:0,difficulty:"medium",justification:"El desarrollo organizacional se enfoca en las personas, capacidades y cultura necesarias para ejecutar la estrategia con éxito."},
  {text:"Durante la etapa de evaluación previa al diseño del CMI, ¿qué herramienta es más útil para identificar fortalezas y debilidades internas?",options:["Matriz FODA.","Balance financiero anual únicamente.","Organigrama empresarial.","Publicidad institucional."],correct:0,difficulty:"medium",justification:"La matriz FODA permite identificar fortalezas y debilidades internas de forma estructurada, siendo el insumo ideal para el diseño del CMI."},
  {text:"¿Cuál de las siguientes afirmaciones describe mejor la relación entre el CMI y el control de gestión?",options:["El CMI traduce la estrategia en indicadores para controlar el desempeño.","El CMI reemplaza totalmente la administración.","El CMI elimina la necesidad de supervisión.","El CMI solo sirve para temas financieros."],correct:0,difficulty:"medium",justification:"El CMI permite monitorear y controlar el cumplimiento estratégico mediante indicadores en cuatro perspectivas complementarias."},
  {text:"Cuando se diseñan planes de acción vinculados a la perspectiva del cliente, ¿qué criterio es más importante para seleccionar las acciones prioritarias?",options:["Su impacto en la satisfacción y fidelización del cliente.","La reducción exclusiva de costos internos.","La cantidad de empleados disponibles.","La antigüedad de la empresa."],correct:0,difficulty:"hard",justification:"Las acciones deben generar valor y mejorar la experiencia del cliente, siendo este impacto el criterio de priorización más importante."},
  {text:"¿Qué característica distingue a un indicador bien definido dentro de un CMI?",options:["Que sea claro, medible y alineado con los objetivos estratégicos.","Que sea ambiguo y general.","Que no tenga relación con la estrategia.","Que solo mida actividades diarias."],correct:0,difficulty:"medium",justification:"Un buen indicador debe facilitar la medición y seguimiento estratégico, siendo claro, medible y directamente vinculado a los objetivos."},
  {text:"En la construcción del mapa estratégico, ¿qué se busca al conectar objetivos de la perspectiva de aprendizaje y crecimiento con los de procesos internos?",options:["Mostrar cómo el desarrollo del talento mejora los procesos.","Eliminar la necesidad de capacitación.","Reducir únicamente costos operativos.","Sustituir la perspectiva financiera."],correct:0,difficulty:"hard",justification:"Las capacidades del personal impactan directamente en la mejora de procesos internos, siendo esta relación causa-efecto fundamental en el mapa estratégico."},
  {text:"En el contexto del CMI, ¿qué propósito cumple el análisis periódico de resultados en la etapa de control?",options:["Verificar avances y aplicar acciones correctivas.","Eliminar objetivos estratégicos.","Sustituir los indicadores financieros.","Evitar la planificación futura."],correct:0,difficulty:"medium",justification:"El control periódico permite evaluar resultados y corregir desviaciones, siendo un ciclo continuo de mejora estratégica."},
  {text:"Al diseñar objetivos para la perspectiva financiera del CMI, ¿qué enfoque es más coherente con la lógica del modelo?",options:["Crear valor económico y mejorar la rentabilidad.","Medir únicamente la satisfacción laboral.","Analizar solo factores externos políticos.","Controlar exclusivamente inventarios."],correct:0,difficulty:"medium",justification:"La perspectiva financiera se centra en resultados económicos sostenibles, siendo la creación de valor y rentabilidad sus objetivos naturales."},
  {text:"En la etapa de evaluación respecto al desarrollo organizacional, ¿qué pregunta es más útil formular para alimentar el diseño del CMI?",options:["¿La organización posee capacidades para ejecutar la estrategia?","¿Cuántas oficinas tiene la empresa?","¿Qué color tiene el logotipo?","¿Cuál es la antigüedad de los muebles?"],correct:0,difficulty:"hard",justification:"El CMI requiere evaluar si la organización está preparada para implementar la estrategia, siendo las capacidades el factor clave."},
  {text:"En la perspectiva de procesos internos, ¿qué tipo de indicador sería más apropiado para evaluar la eficacia de un proceso de atención al cliente?",options:["Tiempo promedio de respuesta al cliente.","Número de edificios de la empresa.","Cantidad de vehículos corporativos.","Total de campañas publicitarias."],correct:0,difficulty:"medium",justification:"El tiempo de respuesta mide directamente la eficiencia y calidad del proceso de atención, siendo el indicador más relevante para esta perspectiva."},
  {text:"En la perspectiva de aprendizaje y crecimiento, ¿qué indicador sería más adecuado para reflejar el desarrollo de competencias críticas?",options:["Horas de capacitación y nivel de competencias adquiridas.","Número de proveedores externos.","Total de ventas mensuales.","Cantidad de impuestos pagados."],correct:0,difficulty:"medium",justification:"Esta perspectiva busca fortalecer conocimientos y habilidades del personal, siendo las horas de capacitación y competencias los indicadores más directos."},
  {text:"¿Qué representa mejor la integración entre el CMI y el análisis de desarrollo organizacional?",options:["La alineación de personas, procesos y estrategia empresarial.","El reemplazo de la planificación estratégica.","La reducción automática de costos.","La eliminación de indicadores financieros."],correct:0,difficulty:"medium",justification:"El desarrollo organizacional fortalece la ejecución estratégica del CMI al alinear personas, procesos y dirección estratégica."},
  {text:"En una agroindustria de cacao que implementa un CMI, ¿cuál sería el principal propósito de un plan de acción en la etapa de valoración avanzada?",options:["Coordinar acciones estratégicas con responsables, tiempos e indicadores.","Sustituir el mapa estratégico.","Eliminar el control organizacional.","Reducir únicamente gastos operativos."],correct:0,difficulty:"hard",justification:"Un plan de acción organiza la ejecución detallada de la estrategia, asignando responsables, tiempos e indicadores para cada acción."},
  {text:"En un esquema de control estratégico iterativo del CMI de una empresa de cacao, ¿qué caracteriza mejor el enfoque iterativo?",options:["Evaluar resultados continuamente y ajustar estrategias según el desempeño.","Aplicar una sola evaluación al final del proceso.","Ignorar cambios del entorno.","Mantener indicadores sin modificaciones."],correct:0,difficulty:"hard",justification:"El enfoque iterativo implica mejora continua y retroalimentación constante, ajustando la estrategia según los resultados obtenidos."},
  {text:"Al diseñar el CMI en una agroindustria de cacao, ¿cuál formulación ilustra mejor la interrelación entre la perspectiva de procesos internos y la de clientes?",options:["Mejorar la calidad del procesamiento para aumentar la satisfacción del cliente.","Reducir únicamente salarios administrativos.","Incrementar impuestos corporativos.","Cambiar el logotipo empresarial."],correct:0,difficulty:"hard",justification:"Esta opción conecta mejoras en procesos internos (calidad del procesamiento) con beneficios percibidos por los clientes (satisfacción), mostrando la relación causa-efecto."},
  {text:"¿Qué mide la 'valoración previa' en un plan de acción del CMI?",options:["El estado inicial y la capacidad organizacional antes de implementar la estrategia.","Solo las ventas futuras.","Únicamente el presupuesto anual.","El número de oficinas disponibles."],correct:0,difficulty:"medium",justification:"La valoración previa analiza la situación inicial de la organización, siendo el punto de partida para diseñar acciones estratégicas realistas."},
  {text:"En control del CMI, si un indicador clave está al 60% de la meta, ¿qué debes hacer PRIMERO?",options:["Analizar las causas de la desviación y aplicar acciones correctivas.","Eliminar el proyecto inmediatamente.","Cambiar toda la estrategia sin análisis.","Ignorar el resultado obtenido."],correct:0,difficulty:"hard",justification:"El control estratégico requiere identificar causas antes de tomar decisiones; actuar sin análisis puede agravar el problema."},
  {text:"¿Por qué el CMI usa 4 perspectivas y no solo la financiera?",options:["Porque integra una visión equilibrada del desempeño organizacional.","Porque elimina la importancia de las finanzas.","Porque solo analiza clientes.","Porque reemplaza el análisis estratégico."],correct:0,difficulty:"medium",justification:"El CMI considera finanzas, clientes, procesos y aprendizaje para una visión integral del desempeño, evitando el enfoque miope de solo medir resultados financieros."},
  {text:"En la agroindustria de cacao, ¿cuál es el indicador financiero PRINCIPAL del CMI?",options:["Rentabilidad y crecimiento de ingresos.","Número de empleados capacitados.","Tiempo de respuesta al cliente.","Nivel de satisfacción laboral."],correct:0,difficulty:"medium",justification:"La perspectiva financiera mide resultados económicos y sostenibilidad, siendo la rentabilidad y crecimiento de ingresos los indicadores principales."},
  {text:"¿Qué FALTA en un mapa estratégico que solo muestra 'EBITDA ← NPS' (solo 2 flechas)?",options:["Las relaciones completas entre todas las perspectivas estratégicas.","Únicamente el logotipo empresarial.","Los nombres de los empleados.","El organigrama financiero."],correct:0,difficulty:"hard",justification:"Un mapa estratégico debe incluir relaciones causa-efecto completas entre todas las perspectivas del CMI, no solo dos indicadores aislados."},
  {text:"Los empleados NO quieren usar una nueva tecnología (60% vs 100% de la meta). ¿Qué haces?",options:["Capacitar, comunicar beneficios y gestionar el cambio organizacional.","Obligar sin explicación alguna.","Eliminar toda la tecnología.","Ignorar la resistencia del personal."],correct:0,difficulty:"hard",justification:"La gestión del cambio ayuda a lograr aceptación y adaptación del personal, siendo la capacitación y comunicación las herramientas clave."},
  {text:"¿Qué mide correctamente el aprendizaje y crecimiento en el CMI?",options:["Desarrollo de competencias, innovación y capacitación del personal.","Solo ingresos financieros.","Cantidad de oficinas corporativas.","Número de productos almacenados."],correct:0,difficulty:"hard",justification:"La perspectiva de aprendizaje mide capacidades que impulsan el crecimiento estratégico, incluyendo competencias, innovación y formación del personal."}
];

const PRIZES=['$100','$200','$300','$500','$1.000','$2.000','$4.000','$8.000','$16.000','$32.000','$64.000','$125.000','$250.000','$500.000','$1.000.000'];
const LETTERS=['A','B','C','D'];
const DIFF_LABEL={easy:'Fácil',medium:'Media',hard:'Difícil'};
const DIFF_CLASS={easy:'diff-easy',medium:'diff-medium',hard:'diff-hard'};

let currentIdx=0,score=0,shuffled=[],gameRunning=false;
let lifeline5050Used=false,lifelineAudienceUsed=false,lifelinePhoneUsed=false;
let currentShuffledOrder=[],currentCorrectDisplay=0;

document.addEventListener('click',function initAudio(){if(!musicStarted&&!musicMuted)startBackgroundMusic();document.removeEventListener('click',initAudio);},{once:true});

function switchTab(t){
  document.getElementById('tab-play-btn').classList.toggle('active',t==='play');
  document.getElementById('tab-edit-btn').classList.toggle('active',t==='edit');
  document.getElementById('play-tab').classList.toggle('active',t==='play');
  document.getElementById('edit-tab').classList.toggle('active',t==='edit');
  if(t==='edit')renderEditor();
}

function showMenu(){
  document.getElementById('menu-total').textContent=questions.length;
  ['game-screen','result-screen'].forEach(id=>document.getElementById(id).style.display='none');
  document.getElementById('menu-screen').style.display='block';
}

function startGame(){
  if(!questions.length){alert('No hay preguntas cargadas.');return;}
  shuffled=[...questions].sort(()=>Math.random()-0.5);
  currentIdx=0;score=0;gameRunning=true;
  lifeline5050Used=false;lifelineAudienceUsed=false;lifelinePhoneUsed=false;
  document.getElementById('menu-screen').style.display='none';
  document.getElementById('result-screen').style.display='none';
  document.getElementById('game-screen').style.display='block';
  updateLifelineUI();renderQ();
  if(!musicStarted&&!musicMuted)startBackgroundMusic();
}

function updateLifelineUI(){
  const b5050=document.getElementById('ll-5050');
  b5050.disabled=lifeline5050Used;b5050.classList.toggle('used',lifeline5050Used);
  const bAud=document.getElementById('ll-audience');
  bAud.disabled=lifelineAudienceUsed;bAud.classList.toggle('used',lifelineAudienceUsed);
  const bPhone=document.getElementById('ll-phone');
  bPhone.disabled=lifelinePhoneUsed;bPhone.classList.toggle('used',lifelinePhoneUsed);
}

function renderPrize(){
  const bar=document.getElementById('prize-ladder');bar.innerHTML='';
  const steps=Math.min(shuffled.length,PRIZES.length);
  for(let i=0;i<steps;i++){
    const c=document.createElement('div');
    c.className='prize-chip'+(i===currentIdx?' current':(i<currentIdx?' done':''));
    c.textContent=PRIZES[i];bar.appendChild(c);
  }
}

function renderQ(){
  const q=shuffled[currentIdx];const total=shuffled.length;
  const pct=Math.round((currentIdx/total)*100);
  document.getElementById('prog-fill').style.width=pct+'%';
  document.getElementById('prog-text').textContent=`Pregunta ${currentIdx+1}`;
  document.getElementById('prog-pct').textContent=pct+'%';
  document.getElementById('q-num-label').textContent=`Pregunta ${currentIdx+1} de ${total}`;
  const db=document.getElementById('diff-badge');
  db.textContent=DIFF_LABEL[q.difficulty]||'Media';
  db.className='diff-badge '+(DIFF_CLASS[q.difficulty]||'diff-medium');
  document.getElementById('q-text').textContent=q.text;
  currentShuffledOrder=[0,1,2,3].sort(()=>Math.random()-0.5);
  currentCorrectDisplay=currentShuffledOrder.indexOf(q.correct);
  const grid=document.getElementById('opts-grid');grid.innerHTML='';
  currentShuffledOrder.forEach((origIdx,displayPos)=>{
    const btn=document.createElement('button');
    btn.className='opt-btn';btn.id=`opt-display-${displayPos}`;
    btn.innerHTML=`<span class="opt-letter">${LETTERS[displayPos]}</span><span>${q.options[origIdx]}</span>`;
    btn.onclick=()=>selectAnswer(displayPos,btn);
    grid.appendChild(btn);
  });
  const fb=document.getElementById('feedback');fb.className='feedback';
  document.getElementById('next-btn').style.display='none';
  updateLifelineUI();renderPrize();
}

function selectAnswer(displayPos,clickedBtn){
  if(!gameRunning)return;
  const q=shuffled[currentIdx];
  document.querySelectorAll('.opt-btn').forEach(b=>b.disabled=true);
  const fb=document.getElementById('feedback');
  const correct=displayPos===currentCorrectDisplay;
  if(correct){
    clickedBtn.classList.add('correct');fb.className='feedback ok show';
    document.getElementById('fb-icon').textContent='✓';
    document.getElementById('fb-verdict').textContent='¡Correcto!';
    score++;playCorrectSound();
  }else{
    clickedBtn.classList.add('wrong');
    document.getElementById(`opt-display-${currentCorrectDisplay}`).classList.add('correct');
    fb.className='feedback bad show';
    document.getElementById('fb-icon').textContent='✗';
    document.getElementById('fb-verdict').textContent='Incorrecto';
    playWrongSound();
  }
  const correctOrigIdx = currentShuffledOrder[currentCorrectDisplay];
  document.getElementById('fb-answer').textContent = `${LETTERS[currentCorrectDisplay]}`;
  // *** CAMBIO: se muestra el literal de la respuesta correcta en lugar de "Opción X)" ***
  document.getElementById('fb-just').innerHTML=`<strong style="color:var(--gold)">${q.options[correctOrigIdx]}</strong> — ${q.justification}`;
  const nb=document.getElementById('next-btn');
  nb.style.display='block';
  nb.textContent=currentIdx+1<shuffled.length?'Siguiente pregunta →':'Ver resultados →';
}

function use5050(){
  if(lifeline5050Used||!gameRunning)return;
  const wrongDP=[0,1,2,3].filter(i=>i!==currentCorrectDisplay);
  wrongDP.sort(()=>Math.random()-0.5);
  wrongDP.slice(0,2).forEach((displayPos,idx)=>{
    setTimeout(()=>{
      const btn=document.getElementById(`opt-display-${displayPos}`);
      if(btn){btn.classList.add('hiding');setTimeout(()=>btn.classList.add('hidden-5050'),500);}
    },idx*300);
  });
  lifeline5050Used=true;updateLifelineUI();
  const toast=document.getElementById('ll-toast');
  toast.textContent='🎯 ¡Comodín 50/50 activado!';toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2200);
  const ctx=getAudioCtx();
  [400,600,800].forEach((freq,i)=>{
    const osc=ctx.createOscillator(),g=ctx.createGain();
    osc.connect(g);g.connect(ctx.destination);osc.type='sine';osc.frequency.value=freq;
    const t=ctx.currentTime+i*0.1;
    g.gain.setValueAtTime(0.25,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.3);
    osc.start(t);osc.stop(t+0.35);
  });
}

function useAudience(){
  if(lifelineAudienceUsed||!gameRunning)return;
  lifelineAudienceUsed=true;updateLifelineUI();
  const correctPct=45+Math.floor(Math.random()*28);
  const remaining=100-correctPct;
  const wrongs=[0,1,2,3].filter(i=>i!==currentCorrectDisplay);
  const a=Math.floor(Math.random()*(remaining-2));
  const b=Math.floor(Math.random()*(remaining-a-1));
  const c=remaining-a-b;
  const wrongPcts=[a,b,c].sort(()=>Math.random()-0.5);
  const pcts=[0,0,0,0];pcts[currentCorrectDisplay]=correctPct;
  wrongs.forEach((wi,i)=>pcts[wi]=wrongPcts[i]);
  const chart=document.getElementById('aud-chart');chart.innerHTML='';
  pcts.forEach((pct,displayPos)=>{
    const col=document.createElement('div');col.className='aud-col';
    const isCorrect=displayPos===currentCorrectDisplay;
    col.innerHTML=`<div class="aud-pct">${pct}%</div><div class="aud-bar-wrap"><div class="aud-bar ${isCorrect?'highlight':''}" id="aud-bar-${displayPos}" style="height:0px;"></div></div><div class="aud-letter">${LETTERS[displayPos]}</div>`;
    chart.appendChild(col);
  });
  document.getElementById('modal-audience').style.display='flex';
  setTimeout(()=>{pcts.forEach((pct,displayPos)=>{const bar=document.getElementById(`aud-bar-${displayPos}`);if(bar)bar.style.height=pct+'px';});},80);
  playLifelineSound([300,500,700,900,1100]);
  const toast=document.getElementById('ll-toast');
  toast.textContent='👥 ¡El público ha votado!';toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2000);
}

const expertNames=['Dra. Marlene Vargas','Ing. Roberto Silva','Lic. Andrea Torres','Dr. Carlos Mendoza','Prof. Isabel Ramírez'];
const phoneResponses=[
  answer=>`Mira, en estos temas de planificación estratégica tengo bastante claro que la respuesta correcta es la opción <strong>${answer}</strong>. Te lo digo con seguridad, esa es la que aplica aquí.`,
  answer=>`Hmm, déjame pensar… sí, estoy bastante seguro de que es la <strong>${answer}</strong>. Recuerdo haberlo estudiado bien. ¡Confía en mí!`,
  answer=>`Sin duda alguna, la <strong>${answer}</strong>. Estos conceptos los trabajé en mi tesis doctoral. Es la respuesta correcta, apuesta por ella.`,
  answer=>`Oye, creo que es la <strong>${answer}</strong>. El análisis que estudiamos juntos apunta directamente a esa opción. ¡Suerte!`,
  answer=>`Ah, conozco este tema. La respuesta es la <strong>${answer}</strong>. Se relaciona con los fundamentos que revisamos en el curso. ¡Vamos!`
];

function usePhone(){
  if(lifelinePhoneUsed||!gameRunning)return;
  lifelinePhoneUsed=true;updateLifelineUI();
  const name=expertNames[Math.floor(Math.random()*expertNames.length)];
  const responseTemplate=phoneResponses[Math.floor(Math.random()*phoneResponses.length)];
  const answer=LETTERS[currentCorrectDisplay];
  document.getElementById('phone-name').textContent=name;
  document.getElementById('phone-status').textContent='Llamando…';
  document.getElementById('phone-dots').style.display='flex';
  document.getElementById('phone-bubble').style.display='none';
  document.getElementById('modal-phone').style.display='flex';
  playPhoneRingSound();
  setTimeout(()=>{
    document.getElementById('phone-status').textContent='✅ En línea — 30 segundos';
    document.getElementById('phone-dots').style.display='none';
    const bubble=document.getElementById('phone-bubble');
    bubble.innerHTML=responseTemplate(answer);bubble.style.display='block';
    playLifelineSound([600,800,1000]);
  },2500);
  const toast=document.getElementById('ll-toast');
  toast.textContent='📞 ¡Conectando con tu amigo!';toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2200);
}

function closeModal(id){
  const el=document.getElementById(id);
  el.style.animation='none';el.style.opacity='0';el.style.transition='opacity 0.2s';
  setTimeout(()=>{el.style.display='none';el.style.opacity='';el.style.transition='';el.style.animation='';},200);
}

function playLifelineSound(freqs){
  const ctx=getAudioCtx();
  freqs.forEach((freq,i)=>{
    const osc=ctx.createOscillator(),g=ctx.createGain();
    osc.connect(g);g.connect(ctx.destination);osc.type='sine';osc.frequency.value=freq;
    const t=ctx.currentTime+i*0.08;
    g.gain.setValueAtTime(0.22,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.35);
    osc.start(t);osc.stop(t+0.4);
  });
}

function playPhoneRingSound(){
  const ctx=getAudioCtx();
  function ring(startT){
    [880,1100].forEach((freq,i)=>{
      const osc=ctx.createOscillator(),g=ctx.createGain();
      osc.connect(g);g.connect(ctx.destination);osc.type='sine';osc.frequency.value=freq;
      const t=startT+i*0.15;
      g.gain.setValueAtTime(0.2,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.25);
      osc.start(t);osc.stop(t+0.3);
    });
  }
  ring(ctx.currentTime);ring(ctx.currentTime+0.7);ring(ctx.currentTime+1.4);
}

function nextQ(){currentIdx++;if(currentIdx>=shuffled.length){showResult();return;}renderQ();}

function showResult(){
  gameRunning=false;
  document.getElementById('game-screen').style.display='none';
  document.getElementById('result-screen').style.display='block';
  const total=shuffled.length,pct=Math.round((score/total)*100);
  const circle=document.getElementById('res-circle');
  circle.className='result-circle '+(pct>=60?'win':'lose');
  circle.textContent=pct>=80?'🏆':pct>=60?'🌟':'📚';
  document.getElementById('res-score').textContent=`${score}/${total}`;
  document.getElementById('res-pct').textContent=`${pct}% de respuestas correctas`;
  document.getElementById('res-msg').textContent=pct>=80?'¡Excelente dominio del tema!':pct>=60?'Buen desempeño, sigue reforzando.':'Revisa los temas y vuelve a intentarlo.';
  document.getElementById('rs-ok').textContent=score;
  document.getElementById('rs-bad').textContent=total-score;
  document.getElementById('rs-total').textContent=total;
  const ctx=getAudioCtx();
  if(pct>=60){
    [523,659,784,1047,784,1047,1319].forEach((freq,i)=>{
      const osc=ctx.createOscillator(),g=ctx.createGain();
      osc.connect(g);g.connect(ctx.destination);osc.type='sine';osc.frequency.value=freq;
      const t=ctx.currentTime+i*0.18;
      g.gain.setValueAtTime(0.3,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.5);
      osc.start(t);osc.stop(t+0.55);
    });
  }else{
    const osc=ctx.createOscillator(),g=ctx.createGain();
    osc.connect(g);g.connect(ctx.destination);osc.type='sawtooth';
    osc.frequency.setValueAtTime(300,ctx.currentTime);osc.frequency.linearRampToValueAtTime(80,ctx.currentTime+1.5);
    g.gain.setValueAtTime(0.3,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+1.6);
    osc.start(ctx.currentTime);osc.stop(ctx.currentTime+1.7);
  }
}

function renderEditor(){
  document.getElementById('editor-count').textContent=`Preguntas: ${questions.length}`;
  const list=document.getElementById('editor-list');list.innerHTML='';
  questions.forEach((q,qi)=>{
    const card=document.createElement('div');card.className='eq-card';
    const optsHtml=q.options.map((o,oi)=>`<div><label style="margin-top:0;">${LETTERS[oi]})</label><input type="text" value="${esc(o)}" oninput="questions[${qi}].options[${oi}]=this.value;updateSelect(${qi})"></div>`).join('');
    const selectOpts=q.options.map((o,oi)=>`<option value="${oi}" ${q.correct===oi?'selected':''}>${LETTERS[oi]}) ${esc(o)}</option>`).join('');
    card.innerHTML=`<div class="eq-header"><span class="eq-num">PREGUNTA ${qi+1}</span><button class="eq-del" onclick="delQ(${qi})">✕ Eliminar</button></div><label>Enunciado</label><textarea rows="3" oninput="questions[${qi}].text=this.value">${esc(q.text)}</textarea><label>Opciones</label><div class="opts-2col">${optsHtml}</div><label>Respuesta correcta</label><select id="sel-${qi}" onchange="questions[${qi}].correct=parseInt(this.value)">${selectOpts}</select><label>Justificación</label><textarea rows="3" oninput="questions[${qi}].justification=this.value">${esc(q.justification)}</textarea><label>Dificultad</label><select onchange="questions[${qi}].difficulty=this.value"><option value="easy" ${q.difficulty==='easy'?'selected':''}>Fácil</option><option value="medium" ${q.difficulty==='medium'?'selected':''}>Media</option><option value="hard" ${q.difficulty==='hard'?'selected':''}>Difícil</option></select>`;
    list.appendChild(card);
  });
}

function updateSelect(qi){
  const sel=document.getElementById('sel-'+qi);if(!sel)return;
  sel.innerHTML=questions[qi].options.map((o,oi)=>`<option value="${oi}" ${questions[qi].correct===oi?'selected':''}>${LETTERS[oi]}) ${esc(o)}</option>`).join('');
}

function addQ(){
  questions.push({text:'',options:['','','',''],correct:0,difficulty:'medium',justification:''});
  renderEditor();
  setTimeout(()=>{const l=document.getElementById('editor-list');l.scrollTop=l.scrollHeight;},80);
}

function delQ(qi){
  if(questions.length<=1){alert('Debe haber al menos una pregunta.');return;}
  if(confirm('¿Eliminar esta pregunta?')){questions.splice(qi,1);renderEditor();}
}

function saveAndPlay(){
  const incomplete=questions.filter(q=>!q.text.trim()||q.options.some(o=>!o.trim())||!q.justification.trim());
  if(incomplete.length){alert(`Hay ${incomplete.length} pregunta(s) con campos vacíos.`);return;}
  switchTab('play');startGame();
}

function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

showMenu();