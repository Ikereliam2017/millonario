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

// ── PREGUNTAS EXTRAÍDAS DE LAS HOJAS MANUSCRITAS ────────────────────────────
let questions = [
  // 1
  {text:"En el análisis del macroentorno, ¿cuál es el propósito principal de identificar factores como los económicos, políticos, sociales, tecnológicos, ecológicos y legales?",
   options:["Controlar únicamente las actividades internas de la empresa","Determinar únicamente los costos de producción","Analizar factores externos que pueden influir en las decisiones estratégicas","Supervisar el desempeño de los empleados"],
   correct:2,difficulty:"easy",
   justification:"El análisis del macroentorno identifica factores externos que afectan a la empresa, permitiendo anticipar oportunidades y amenazas para tomar mejores decisiones estratégicas."},
  // 2
  {text:"¿Cuáles de los siguientes elementos corresponden con mayor claridad al microentorno de una empresa?",
   options:["Inflación y políticas gubernamentales","Cambios climáticos globales","Clientes, proveedores y competidores","Tendencias culturales internacionales"],
   correct:2,difficulty:"easy",
   justification:"El microentorno está formado por actores cercanos a la empresa que influyen directamente en sus operaciones: clientes, proveedores y competidores."},
  // 3
  {text:"Al construir la matriz FODA, ¿qué combinación describe correctamente cada cuadrante?",
   options:["Solo aspectos financieros y administrativos","Elementos tecnológicos y legales únicamente","Variables económicas y sociales exclusivamente","Factores internos y externos positivos y negativos"],
   correct:3,difficulty:"medium",
   justification:"La matriz FODA combina fortalezas y debilidades internas con oportunidades y amenazas externas, abarcando factores positivos y negativos de ambos entornos."},
  // 4
  {text:"En la identificación de factores estratégicos externos, ¿cuál es el criterio más adecuado para considerar que un factor detectado es realmente estratégico?",
   options:["Que sea fácil de controlar por la organización","Que dependa solo de los empleados","Que tenga impacto significativo en la empresa y sus objetivos","Que no afecte la competencia"],
   correct:2,difficulty:"medium",
   justification:"Un factor estratégico es aquel que puede influir considerablemente en el desempeño y éxito de la empresa, independientemente de si es controlable o no."},
  // 5
  {text:"Respecto a los factores estratégicos internos, ¿cuál de los siguientes ejemplos ilustra mejor una fortaleza interna relevante para la estrategia?",
   options:["Alta rotación de personal","Marca reconocida y buena reputación","Tecnología obsoleta","Disminución de ventas"],
   correct:1,difficulty:"easy",
   justification:"Una marca sólida representa una ventaja competitiva interna que fortalece la estrategia empresarial, diferenciándola de debilidades como rotación de personal o tecnología obsoleta."},
  // 6
  {text:"Al formular objetivos estratégicos, ¿cuál de las siguientes características es esencial para que un objetivo sea útil en la gestión?",
   options:["Que no tenga límite de tiempo","Que dependa del azar","Que sea ambiguo y flexible","Que sea medible y específico"],
   correct:3,difficulty:"easy",
   justification:"Los objetivos deben ser claros y medibles para facilitar el control y evaluación de resultados; esta es la base del enfoque SMART."},
  // 7
  {text:"Las estrategias maestras (como crecimiento, estabilidad o reducción/recorte) se caracterizan por:",
   options:["Ser actividades operativas diarias","Limitar el desarrollo organizacional","Orientar la dirección general de la empresa","Aplicarse solo en pequeñas empresas"],
   correct:2,difficulty:"medium",
   justification:"Las estrategias maestras definen el rumbo principal que seguirá la organización a largo plazo, no son actividades operativas del día a día."},
  // 8
  {text:"¿Cuál es el rol principal de las políticas empresariales dentro del proceso de implementación estratégica?",
   options:["Reemplazar los objetivos estratégicos","Guiar la toma de decisiones y acciones organizacionales","Eliminar la necesidad de planificación","Reducir únicamente costos"],
   correct:1,difficulty:"medium",
   justification:"Las políticas sirven como lineamientos que orientan las decisiones y la ejecución de estrategias, dando coherencia a la organización."},
  // 9
  {text:"En la implementación del plan estratégico, ¿cuál de los siguientes aspectos es más crítico para asegurar que las estrategias formuladas se conviertan en resultados concretos?",
   options:["Improvisación constante","Ausencia de liderazgo","Falta de seguimiento","Comunicación y coordinación efectiva"],
   correct:3,difficulty:"hard",
   justification:"Una buena coordinación y comunicación permiten ejecutar correctamente las estrategias, asegurando que todos los actores conozcan su rol y actúen alineados."},
  // 10
  {text:"¿Cuál es la relación más adecuada entre el análisis FODA y la formulación de estrategias?",
   options:["Reemplazar la planificación","Eliminar riesgos","Analizar únicamente debilidades","Diseñar estrategias basadas en el entorno"],
   correct:3,difficulty:"medium",
   justification:"El análisis FODA permite identificar fortalezas, oportunidades, debilidades y amenazas, proporcionando una visión integral para formular estrategias."},
  // 11
  {text:"Una empresa del sector minorista enfrenta incertidumbre por elecciones presidenciales que podrían cambiar las regulaciones laborales. ¿En qué etapa del proceso estratégico debe analizarse primero este factor y por qué?",
   options:["En la etapa de implementación, porque ahí se ejecutan las decisiones."," En el control estratégico, porque se evalúan resultados finales.","En el análisis interno, porque afecta directamente al personal.","En el análisis del macroentorno, porque es un factor político externo que no depende de la empresa."],
   correct:3,difficulty:"hard",
   justification:"Porque estos factores son externos y afectan a todas las empresas dentro de un país o región. Las elecciones y regulaciones forman parte del entorno político-legal, que influye en las condiciones del mercado, las reglas de operación y las oportunidades o limitaciones para las organizaciones."},
  // 12
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece parcialmente a este nivel y no al microentorno?",
   options:["Clientes","Competidores","Políticas gubernamentales","Proveedores"],
   correct:2,difficulty:"medium",
   justification:"Las políticas gubernamentales afectan a todas las empresas del entorno general y forman parte del macroentorno, no del microentorno."},
  // 13
  {text:"En formulación estratégica, ¿cuál es la principal diferencia funcional entre misión y visión que justifica incluir la visión antes de los objetivos SMART?",
   options:["Sustituye la misión","Define tareas diarias","Establece normas internas","Guiar el rumbo estratégico"],
   correct:3,difficulty:"medium",
   justification:"La visión establece hacia dónde quiere llegar la empresa en el futuro, orientando las decisiones estratégicas a largo plazo."},
  // 14
  {text:"En la identificación de factores clave externos para un plan estratégico, ¿cuál de los siguientes ejemplos describe mejor una oportunidad?",
   options:["Factor interno negativo","Factor externo negativo","Factor interno positivo","Factor externo favorable"],
   correct:3,difficulty:"easy",
   justification:"Una oportunidad es una condición del entorno externo que puede ser aprovechada por la empresa para mejorar su posición competitiva."},
  // 15
  {text:"¿Cuál de las siguientes alternativas representa mejor un factor clave interno de tipo fortaleza?",
   options:["Falta de recursos","Mala imagen","Baja productividad","Personal capacitado"],
   correct:3,difficulty:"easy",
   justification:"El personal capacitado representa una ventaja interna que permite a la empresa ser más eficiente, innovadora y competitiva."},
  // 16
  {text:"En la construcción de la matriz FODA, ¿qué combinación describe correctamente una amenaza?",
   options:["Factor interno positivo","Factor interno negativo","Factor externo positivo","Factor externo negativo"],
   correct:3,difficulty:"easy",
   justification:"Una amenaza proviene del entorno externo y puede afectar negativamente a la empresa, como crisis económicas o cambios regulatorios adversos."},
  // 17
  {text:"¿Cuál es el principal propósito de la matriz FODA dentro del proceso de formulación estratégica?",
   options:["Sustituir la misión","Controlar finanzas","Eliminar competencia","Analizar integralmente la empresa"],
   correct:3,difficulty:"easy",
   justification:"El FODA integra tanto el análisis interno como externo, permitiendo una visión completa de la situación organizacional."},
  // 18
  {text:"Una empresa desea iniciar su proceso de formulación estratégica. ¿Cuál debería ser el primer foco principal para asegurar una base sólida del plan estratégico?",
   options:["Ejecutar acciones","Evaluar resultados","Controlar procesos","Analizar el entorno"],
   correct:3,difficulty:"medium",
   justification:"Antes de tomar decisiones es necesario comprender el contexto en el que opera la empresa, identificando oportunidades y riesgos."},
  // 19
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece parcialmente a este nivel y no al microentorno?",
   options:["Clientes","Proveedores","Distribuidores","Tecnología del entorno"],
   correct:3,difficulty:"medium",
   justification:"La tecnología del entorno forma parte del macroentorno al ser un factor externo general que afecta a todas las organizaciones de una industria."},
  // 20
  {text:"En el análisis del microentorno, ¿cuál de los siguientes elementos es más relevante para identificar amenazas competitivas directas?",
   options:["Inflación","Política nacional","Cultura interna","Competidores"],
   correct:3,difficulty:"easy",
   justification:"Los competidores forman parte del microentorno al influir de manera directa en las decisiones estratégicas de la empresa."},
  // 21
  {text:"Una empresa tecnológica desea analizar cómo la regulación estatal futura sobre protección de datos podría afectar su modelo de negocio. ¿En qué parte del análisis del entorno estratégico debería ubicarse principalmente este aspecto?",
   options:["Interno","Operativo","Financiero","Legal externo"],
   correct:3,difficulty:"medium",
   justification:"Las leyes y regulaciones son factores externos que forman parte del entorno político-legal, impuesto por el Estado y condicionan la forma en que las empresas operan."},
  // 22
  {text:"En una formulación estratégica rigurosa, ¿cuál de los siguientes ejemplos describe mejor un objetivo SMART para incrementar la cuota de mercado en un segmento específico?",
   options:["Aumentar ventas algún día","Mejorar la empresa","Tener éxito en el mercado","Incrementar ventas en un 10% en un año"],
   correct:3,difficulty:"medium",
   justification:"La opción cumple con los criterios SMART: es específica, medible (10%), alcanzable, relevante y temporal (en un año)."},
  // 23
  {text:"En el marco de la matriz FODA, ¿cuál de las siguientes combinaciones representa mejor una estrategia FO (Fortalezas-Oportunidades) bien formulada?",
   options:["Reducir debilidades internas","Evitar amenazas externas","Minimizar riesgos","Utilizar fortalezas para aprovechar oportunidades"],
   correct:3,difficulty:"hard",
   justification:"Las estrategias FO buscan aprovechar las capacidades internas de la empresa para explotar condiciones favorables del entorno."},
  // 24
  {text:"Al analizar el microentorno competitivo, una empresa identifica que tres nuevos competidores de bajo costo han entrado en su mercado local. ¿Cómo debería clasificar este hallazgo dentro de la matriz FODA?",
   options:["Fortaleza","Amenaza","Debilidad","Oportunidad"],
   correct:3,difficulty:"hard",
   justification:"Nuevos competidores de bajo costo representan una amenaza externa que puede afectar la posición competitiva de la empresa en su mercado."},
  // 25
  {text:"Una compañía de servicios profesionales detecta que posee un equipo altamente calificado y una reputación sólida en el mercado, pero su estructura organizativa es rígida y sus sistemas de información son obsoletos. ¿Cómo deben clasificarse estos elementos en el análisis interno?",
   options:["Oportunidades y amenazas","Factores políticos","Factores económicos","Fortalezas y debilidades"],
   correct:3,difficulty:"medium",
   justification:"Las fortalezas y debilidades son aspectos propios de la organización que pueden ser controlados y gestionados, correspondiendo al análisis interno."},
  // 26
  {text:"Al definir estrategias maestras, una empresa con fuerte presencia en un mercado saturado decide enfocarse en vender más productos actuales a los mismos segmentos mediante promociones, fidelización y mejoras incrementales. ¿Qué tipo de estrategia maestra describe mejor este enfoque?",
   options:["Diversificación","Integración","Reducción","Penetración de mercado"],
   correct:3,difficulty:"medium",
   justification:"La estrategia de penetración de mercado se centra en incrementar las ventas de productos existentes dentro del mismo mercado objetivo."},
  // 27
  {text:"En un proceso de gestión del cambio asociado a la implementación estratégica, la dirección decide comunicar la visión, capacitar al personal en nuevas competencias y ajustar los sistemas de incentivos para apoyar los nuevos comportamientos. ¿Qué objetivo central persiguen estas acciones?",
   options:["Reducir costos","Eliminar la competencia","Sustituir la estrategia","Adaptar la organización a nuevas condiciones"],
   correct:3,difficulty:"hard",
   justification:"La gestión del cambio busca preparar y acompañar a la organización en procesos de transformación para que las personas los adopten de manera efectiva."},
  // 28
  {text:"Una empresa diseña políticas empresariales para descuentos máximos regulares, niveles de autorización para inversiones y criterios de selección de proveedores. En el contexto de implementación estratégica, ¿qué función principal cumplen estas políticas?",
   options:["Limitar la innovación","Sustituir objetivos","Eliminar riesgos","Orientar la toma de decisiones"],
   correct:3,difficulty:"medium",
   justification:"Las políticas organizacionales establecen directrices generales que guían el comportamiento y la toma de decisiones dentro de la empresa."},
  // 29
  {text:"Durante la formulación estratégica, la alta dirección quiere asegurarse de que los objetivos SMART estén alineados con los factores clave de éxito identificados en el análisis externo e interno. ¿Cuál es el enfoque más adecuado para lograr esta alineación?",
   options:["En decisiones improvisadas","Solo en metas financieras","Sin análisis previo","En el análisis FODA"],
   correct:3,difficulty:"hard",
   justification:"Los objetivos estratégicos deben surgir de un diagnóstico claro: el análisis FODA garantiza que sean realistas, coherentes y alineados con el entorno."},
  // 30
  {text:"Durante un taller de formulación estratégica avanzada, se discute la diferencia entre misión y visión. ¿Cuál de las siguientes afirmaciones refleja mejor el papel de la visión en la formulación estratégica?",
   options:["Actividades diarias","Normas internas","Presupuesto","Futuro deseado de la organización"],
   correct:3,difficulty:"medium",
   justification:"La visión describe el estado futuro al que aspira la organización, sirviendo como elemento motivador y orientador de las decisiones estratégicas."},
  // 31
  {text:"En la etapa de valoración dentro de un proceso de planificación estratégica, ¿qué actividad agrega más valor para preparar un buen Cuadro de Mando Integral (CMI)?",
   options:["Reducir costos","Eliminar procesos","Cambiar estructura","Medir el cumplimiento de objetivos"],
   correct:3,difficulty:"medium",
   justification:"Los indicadores permiten cuantificar el desempeño en relación con los objetivos estratégicos, facilitando la toma de decisiones y el control."},
  // 32
  {text:"¿Cuál es el propósito principal de los planos de acción derivados del Cuadro de Mando Integral (CMI)?",
   options:["Sustituir la misión","Eliminar control","Reducir costos automáticamente","Convertir objetivos en acciones concretas"],
   correct:3,difficulty:"medium",
   justification:"Los planes de acción traducen los objetivos estratégicos en actividades específicas, asignando responsables, recursos y plazos para su ejecución."},
  // 33
  {text:"En un sistema de control basado en el CMI, ¿qué característica distingue al control estratégico de un simple control operativo?",
   options:["Controlar tareas diarias","Medir solo gastos","Evitar el uso de indicadores","Evaluar el cumplimiento de los objetivos estratégicos"],
   correct:3,difficulty:"medium",
   justification:"El control estratégico verifica si la organización está avanzando hacia el logro de sus objetivos a largo plazo, detectando desviaciones y aplicando correctivos."},
  // 34
  {text:"¿Cuál de las siguientes afirmaciones describe mejor la perspectiva financiera en el Cuadro de Mando Integral (CMI)?",
   options:["Satisfacción del cliente","Procesos internos","Cultura organizacional","Rentabilidad económica"],
   correct:3,difficulty:"easy",
   justification:"La perspectiva financiera evalúa los resultados económicos de la empresa, como ingresos, costos, utilidades y rentabilidad."},
  // 35
  {text:"En la perspectiva del cliente del CMI, ¿qué tipo de indicador es más coherente con su propósito?",
   options:["Costos","Procesos","Inventarios","Satisfacción del cliente"],
   correct:3,difficulty:"easy",
   justification:"Esta perspectiva evalúa cómo los clientes perciben a la empresa, considerando calidad, servicio, fidelización y valor ofrecido."},
  // 36
  {text:"¿Cuál es el enfoque central de la perspectiva de procesos internos en el CMI?",
   options:["Reducir salarios","Cambiar visión","Analizar política","Mejorar la eficiencia de procesos"],
   correct:3,difficulty:"medium",
   justification:"Esta perspectiva analiza los procesos clave para optimizarlos, mejorar la calidad y aumentar la competitividad organizacional."},
  // 37
  {text:"¿Qué aspecto caracteriza principalmente a la perspectiva de aprendizaje y crecimiento en el CMI?",
   options:["Costos","Impuestos","Proveedores","Innovación y talento humano"],
   correct:3,difficulty:"medium",
   justification:"Esta perspectiva se enfoca en el desarrollo del capital humano, la innovación y la capacidad de adaptación, que sustentan el resto del CMI."},
  // 38
  {text:"¿Qué función principal cumple el mapa estratégico dentro del enfoque del Cuadro de Mando Integral?",
   options:["Presupuesto","Indicadores","Organigrama","Relación causa-efecto entre objetivos"],
   correct:3,difficulty:"medium",
   justification:"El mapa estratégico muestra cómo los objetivos de las diferentes perspectivas del CMI se conectan entre sí mediante relaciones de causa y efecto."},
  // 39
  {text:"En el análisis de desarrollo organizacional asociado al CMI, ¿qué aspecto resulta más relevante evaluar?",
   options:["Infraestructura","Ventas","Edificio","Cultura y capacidades organizacionales"],
   correct:3,difficulty:"medium",
   justification:"El desarrollo organizacional busca mejorar la cultura, el clima laboral y las capacidades del talento humano, impactando el desempeño empresarial."},
  // 40
  {text:"Durante la etapa de evaluación previa al diseño del CMI, ¿qué herramienta o enfoque es más útil para identificar fortalezas y debilidades internas de la organización?",
   options:["Balance general","Organigrama","Publicidad","Análisis FODA"],
   correct:3,difficulty:"medium",
   justification:"El análisis FODA evalúa factores internos (fortalezas y debilidades) y externos (oportunidades y amenazas), siendo el insumo clave para el diseño del CMI."},
  // 41
  {text:"¿Cuáles de las siguientes afirmaciones describen mejor la relación entre el CMI y el control de gestión?",
   options:["Eliminar la estrategia","Controlar únicamente las finanzas","Sustituir la misión","Traducir la estrategia en indicadores medibles"],
   correct:3,difficulty:"medium",
   justification:"El CMI convierte la estrategia en objetivos concretos e indicadores que pueden ser medidos y evaluados desde diferentes perspectivas."},
  // 42
  {text:"Cuando se diseñan planes de acción vinculados a la perspectiva del cliente, ¿qué criterio es más importante para seleccionar las acciones prioritarias?",
   options:["Costos operativos","Procesos internos","Infraestructura","Satisfacción del cliente"],
   correct:3,difficulty:"easy",
   justification:"Esta perspectiva mide cómo los clientes perciben a la empresa, evaluando calidad, servicio, fidelización y valor entregado."},
  // 43
  {text:"¿Qué característica distingue a un indicador bien definido dentro de un CMI?",
   options:["Generales y ambiguos","Sin relación con objetivos","Opcionales","Claros y medibles"],
   correct:3,difficulty:"medium",
   justification:"Los indicadores deben permitir evaluar de manera objetiva el desempeño; si no son claros ni medibles, no cumplen su función de control y seguimiento."},
  // 44
  {text:"En la construcción del mapa estratégico, ¿qué se busca al conectar objetivos de la perspectiva de aprendizaje y crecimiento con los procesos internos?",
   options:["Ninguna relación","Se sustituyen mutuamente","Se eliminan entre sí","El talento mejora la eficiencia de los procesos"],
   correct:3,difficulty:"hard",
   justification:"El talento humano ejecuta los procesos; cuando el personal está capacitado y motivado, los procesos mejoran en eficiencia y calidad."},
  // 45
  {text:"En el contexto del CMI, ¿qué propósito cumple el análisis periódico de resultados en la etapa de control?",
   options:["Eliminar objetivos","Evitar la planificación","Reducir personal","Detectar y corregir desviaciones"],
   correct:3,difficulty:"medium",
   justification:"El control estratégico compara los resultados con los objetivos planteados y permite tomar acciones correctivas para asegurar el cumplimiento de la estrategia."},
  // 46
  {text:"Al diseñar objetivos para la perspectiva financiera del CMI, ¿qué enfoque es más coherente con la lógica del modelo?",
   options:["Indicadores de cliente","Indicadores operativos","Indicadores sociales","Indicadores financieros"],
   correct:3,difficulty:"easy",
   justification:"Los indicadores financieros permiten evaluar el desempeño económico, incluyendo variables como ingresos, costos, utilidades y rentabilidad."},
  // 47
  {text:"En la etapa de evaluación, respecto al desarrollo organizacional, ¿qué pregunta es más útil formular para alimentar el diseño del CMI?",
   options:["Desorden organizacional","Trabajo aislado","Eliminación de procesos","Coherencia entre objetivos y acciones"],
   correct:3,difficulty:"medium",
   justification:"La alineación estratégica garantiza que todas las áreas trabajen en función de los mismos objetivos, evitando esfuerzos dispersos y mejorando la eficiencia."},
  // 48
  {text:"En la perspectiva de procesos internos, ¿qué tipo de indicador sería más apropiado para evaluar la eficacia de un proceso de atención al cliente?",
   options:["Definir el futuro","Sustituir la visión","Establecer normas","Definir la razón de ser de la organización en el presente"],
   correct:3,difficulty:"medium",
   justification:"La misión describe la razón de ser de la empresa en el presente, incluyendo su actividad principal, el público al que se dirige y el valor que ofrece."},
  // 49
  {text:"En la perspectiva de aprendizaje y crecimiento, ¿qué indicador sería más adecuado para reflejar el desarrollo de competencias críticas para la estrategia?",
   options:["Mantener errores","Reducir calidad","Eliminar clientes","Optimizar procesos constantemente"],
   correct:3,difficulty:"easy",
   justification:"La mejora continua es un proceso sistemático orientado a perfeccionar las actividades de la organización, incrementando eficiencia y calidad para mantener competitividad."},
  // 50
  {text:"¿Qué representa mejor la integración entre el CMI y el análisis de desarrollo organizacional?",
   options:["Falta de liderazgo","Improvisación","Compromiso organizacional","Alineación y compromiso organizacional"],
   correct:3,difficulty:"hard",
   justification:"No basta con el compromiso individual; se requiere alineación de toda la organización con los objetivos estratégicos para asegurar coherencia entre lo planificado y lo ejecutado."},
  // 51
  {text:"En una agroindustria de cacao que busca implementar un Cuadro de Mando Integral, ¿cuál sería el principal propósito de un plan de acción complejo en la etapa de valoración avanzada?",
   options:["Actuar sin dirección","Eliminar riesgos totalmente","Evitar decisiones","Definir objetivos y estrategias a largo plazo"],
   correct:3,difficulty:"easy",
   justification:"La planificación estratégica establece el rumbo de la organización, definiendo metas claras y las acciones necesarias para alcanzarlas."},
  // 52
  {text:"En un esquema de control estratégico iterativo aplicado al Cuadro de Mando Integral de una empresa de cacao, ¿qué caracteriza mejor el enfoque iterativo?",
   options:["Factor externo positivo","Factor externo negativo","Factor interno positivo","Factor interno negativo"],
   correct:3,difficulty:"easy",
   justification:"Una debilidad es una limitación interna que afecta el desempeño de la empresa; identificarlas es clave para corregirlas y evitar desventajas competitivas."},
  // 53
  {text:"Al diseñar el Cuadro de Mando Integral (CMI) en una agroindustria de cacao, ¿cuál de las siguientes formulaciones de objetivo ilustra mejor la interrelación entre la perspectiva de procesos internos y la de clientes?",
   options:["Es interna","Beneficia a la empresa","Representa un riesgo externo","Factor externo que puede afectar negativamente a la organización"],
   correct:3,difficulty:"medium",
   justification:"Una amenaza es un factor externo que puede perjudicar a la empresa, afectando su posición competitiva o su capacidad de operar."},
  // 54
  {text:"¿Qué mide la 'valoración previa' en un plan de acción del CMI?",
   options:["Ignorar cambios","Eliminar competencia","Evitar planificación","Anticipar oportunidades y riesgos"],
   correct:3,difficulty:"easy",
   justification:"El análisis del entorno identifica tanto oportunidades como amenazas, facilitando la toma de decisiones estratégicas y la adaptación a cambios externos."},
  // 55
  {text:"En control del CMI, si el blockchain está al 60% de la meta, ¿qué haces PRIMERO?",
   options:["Penetración","Desarrollo de mercado","Integración","Diversificación"],
   correct:3,difficulty:"medium",
   justification:"La diversificación implica expandirse tanto en productos como en mercados, siendo una estrategia de crecimiento con mayor nivel de riesgo pero también de oportunidad."},
  // 56
  {text:"¿Por qué el CMI usa 4 perspectivas y no solo la financiera?",
   options:["Uso inadecuado de recursos","Aumento de costos","Reducción de calidad","Uso óptimo de recursos para lograr resultados"],
   correct:3,difficulty:"easy",
   justification:"La eficiencia implica lograr los objetivos utilizando la menor cantidad de recursos posible, optimizando tiempo, costos y esfuerzo sin afectar la calidad."},
  // 57
  {text:"En la agroindustria de cacao, ¿cuál es el indicador financiero PRINCIPAL del CMI?",
   options:["Un objetivo general","Una política","Una misión","Una herramienta de medición del desempeño organizacional"],
   correct:3,difficulty:"medium",
   justification:"Un KPI permite evaluar el nivel de cumplimiento de objetivos específicos mediante datos cuantificables, facilitando el control y la toma de decisiones."},
  // 58
  {text:"¿Qué falta en este mapa? 'EBITDA ← NPS' (solo 2 flechas)",
   options:["Improvisación","Desorganización","Información clara y oportuna","Uso de información confiable, clara y oportuna para analizar escenarios"],
   correct:3,difficulty:"hard",
   justification:"La toma de decisiones estratégicas requiere información de calidad que permita analizar diferentes escenarios y elegir la mejor alternativa posible."},
  // 59
  {text:"Los empleados NO quieren usar blockchain (60% vs 100%). ¿Qué haces?",
   options:["Reducir calidad","Evitar innovación","Eliminar procesos","Superar a la competencia en el mercado mediante ventajas sostenibles"],
   correct:3,difficulty:"medium",
   justification:"La competitividad implica la capacidad de una empresa para diferenciarse y posicionarse mejor que sus competidores, ofreciendo mayor valor al cliente."},
  // 60
  {text:"¿Qué mide BIEN el aprendizaje en CMI?",
   options:["Improvisación","Falta de control","Desorganización","Seguimiento, control y evaluación constante de las acciones estratégicas"],
   correct:3,difficulty:"hard",
   justification:"La ejecución estratégica requiere monitoreo continuo para verificar avances, detectar desviaciones y aplicar correcciones oportunas para asegurar el cumplimiento de los objetivos."}
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
  shuffled=[...questions];
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