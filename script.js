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

// ── PREGUNTAS ────────────────────────────────────────────────────────────────
let questions = [
  // 1
  {text:"En el análisis del macroentorno, ¿cuál es el propósito principal de identificar factores como los económicos, políticos, sociales, tecnológicos, ecológicos y legales?",
   options:["Controlar únicamente las actividades internas de la empresa","Determinar únicamente los costos de producción","Analizar factores externos que pueden influir en las decisiones estratégicas","Supervisar el desempeño de los empleados"],
   correct:2,difficulty:"easy",
   justification:"Porque el análisis del macroentorno busca identificar factores externos que afectan a la empresa, permitiendo anticipar oportunidades y amenazas para tomar mejores decisiones estratégicas."},
  // 2
  {text:"¿Cuáles de los siguientes elementos corresponden con mayor claridad al microentorno de una empresa?",
   options:["Inflación y políticas gubernamentales","Cambios climáticos globales","Clientes, proveedores y competidores","Tendencias culturales internacionales"],
   correct:2,difficulty:"easy",
   justification:"Ya que el microentorno está formado por actores cercanos a la empresa que influyen directamente en sus operaciones y competitividad."},
  // 3
  {text:"Al construir la matriz FODA, ¿qué combinación describe correctamente cada cuadrante?",
   options:["Solo aspectos financieros y administrativos","Elementos tecnológicos y legales únicamente","Variables económicas y sociales exclusivamente","Factores internos y externos positivos y negativos"],
   correct:3,difficulty:"medium",
   justification:"Porque la matriz FODA combina fortalezas y debilidades internas con oportunidades y amenazas externas."},
  // 4
  {text:"En la identificación de factores estratégicos externos, ¿cuál es el criterio más adecuado para considerar que un factor detectado es realmente estratégico?",
   options:["Que sea fácil de controlar por la organización","Que dependa solo de los empleados","Que tenga impacto significativo en la empresa y sus objetivos","Que no afecte la competencia"],
   correct:2,difficulty:"medium",
   justification:"Porque un factor estratégico es aquel que puede influir considerablemente en el desempeño y éxito de la empresa."},
  // 5
  {text:"Respecto a los factores estratégicos internos, ¿cuál de los siguientes ejemplos ilustra mejor una fortaleza interna relevante para la estrategia?",
   options:["Alta rotación de personal","Marca reconocida y buena reputación","Tecnología obsoleta","Disminución de ventas"],
   correct:1,difficulty:"easy",
   justification:"Ya que una marca sólida representa una ventaja competitiva interna que fortalece la estrategia empresarial."},
  // 6
  {text:"Al formular objetivos estratégicos, ¿cuál de las siguientes características es esencial para que un objetivo sea útil en la gestión?",
   options:["Que no tenga límite de tiempo","Que dependa del azar","Que sea ambiguo y flexible","Que sea medible y específico"],
   correct:3,difficulty:"easy",
   justification:"Porque los objetivos deben ser claros y medibles para facilitar el control y evaluación de resultados."},
  // 7
  {text:"Las estrategias maestras (como crecimiento, estabilidad o reducción/recorte) se caracterizan por:",
   options:["Ser actividades operativas diarias","Limitar el desarrollo organizacional","Orientar la dirección general de la empresa","Aplicarse solo en pequeñas empresas"],
   correct:2,difficulty:"medium",
   justification:"Debido a que las estrategias maestras definen el rumbo principal que seguirá la organización."},
  // 8
  {text:"¿Cuál es el rol principal de las políticas empresariales dentro del proceso de implementación estratégica?",
   options:["Reemplazar los objetivos estratégicos","Guiar la toma de decisiones y acciones organizacionales","Eliminar la necesidad de planificación","Reducir únicamente costos"],
   correct:1,difficulty:"medium",
   justification:"porque las políticas sirven como lineamientos que orientan las decisiones y la ejecución de estrategias."},
  // 9
  {text:"En la implementación del plan estratégico, ¿cuál de los siguientes aspectos es más crítico para asegurar que las estrategias formuladas se conviertan en resultados concretos?",
   options:["Improvisación constante","Ausencia de liderazgo","Falta de seguimiento","Comunicación y coordinación efectiva"],
   correct:3,difficulty:"hard",
   justification:"porque la ejecución de una estrategia no depende únicamente de su diseño, sino de cómo se implementa dentro de la organización. La comunicación clara permite que todos los miembros comprendan los objetivos, mientras que la coordinación asegura que las diferentes áreas trabajen de forma alineada."},
  // 10
  {text:"¿Cuál es la relación más adecuada entre el análisis FODA y la formulación de estrategias?",
   options:["Reemplazar la planificación","Eliminar riesgos","Analizar únicamente debilidades","Diseñar estrategias basadas en el entorno"],
   correct:3,difficulty:"medium",
   justification:"porque el análisis FODA permite identificar fortalezas, oportunidades, debilidades y amenazas, lo que proporciona una visión integral de la situación de la empresa."},
  // 11
  {text:"Una empresa del sector minorista enfrenta incertidumbre por elecciones presidenciales que podrían cambiar las regulaciones laborales. ¿En qué etapa del proceso estratégico debe analizarse primero este factor y por qué?",
   options:["En la etapa de implementación, porque ahí se ejecutan las decisiones."," En el control estratégico, porque se evalúan resultados finales.","En el análisis interno, porque afecta directamente al personal.","En el análisis del macroentorno, porque es un factor político externo que no depende de la empresa."],
   correct:3,difficulty:"hard",
   justification:"Porque estos factores son externos y afectan a todas las empresas dentro de un país o región. Las elecciones y regulaciones forman parte del entorno político-legal, que influye en las condiciones del mercado, las reglas de operación y las oportunidades o limitaciones para las organizaciones."},
  // 12
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece parcialmente a este nivel y no al microentorno?",
   options:["Clientes","Competidores","Políticas gubernamentales","Proveedores"],
   correct:2,difficulty:"medium",
   justification:"porque las políticas gubernamentales son factores externos que impactan a todas las empresas de manera general. A diferencia de clientes o proveedores, que pertenecen al microentorno, estas decisiones no pueden ser controladas por la empresa y requieren adaptación estratégica."},
  // 13
  {text:"En formulación estratégica, ¿cuál es la principal diferencia funcional entre misión y visión que justifica incluir la visión antes de los objetivos SMART?",
   options:["Sustituye la misión","Define tareas diarias","Establece normas internas","Guiar el rumbo estratégico"],
   correct:3,difficulty:"medium",
   justification:"porque la visión establece hacia dónde quiere llegar la empresa en el futuro. No se enfoca en el presente ni en tareas operativas, sino en orientar las decisiones estratégicas a largo plazo, motivando a la organización a avanzar en una dirección clara."},
  // 14
  {text:"En la identificación de factores clave externos para un plan estratégico, ¿cuál de los siguientes ejemplos describe mejor una oportunidad?",
   options:["Factor interno negativo","Factor externo negativo","Factor interno positivo","Factor externo favorable"],
   correct:3,difficulty:"easy",
   justification:"porque una oportunidad es una condición del entorno externo que puede ser aprovechada por la empresa para mejorar su posición competitiva. Estas pueden surgir de cambios en el mercado, avances tecnológicos o tendencias favorables."},
  // 15
  {text:"¿Cuál de las siguientes alternativas representa mejor un factor clave interno de tipo fortaleza?",
   options:["Falta de recursos","Mala imagen","Baja productividad","Personal capacitado"],
   correct:3,difficulty:"easy",
   justification:"porque el personal capacitado representa una ventaja interna que permite a la empresa ser más eficiente, innovadora y competitiva. Las demás opciones representan debilidades."},
  // 16
  {text:"En la construcción de la matriz FODA, ¿qué combinación describe correctamente una amenaza?",
   options:["Factor interno positivo","Factor interno negativo","Factor externo positivo","Factor externo negativo"],
   correct:3,difficulty:"easy",
   justification:"porque una amenaza proviene del entorno externo y puede afectar negativamente a la empresa, como crisis económicas o cambios regulatorios adversos."},
  // 17
  {text:"¿Cuál es el principal propósito de la matriz FODA dentro del proceso de formulación estratégica?",
   options:["Sustituir la misión","Controlar finanzas","Eliminar competencia","Analizar integralmente la empresa"],
   correct:3,difficulty:"easy",
   justification:"porque el FODA integra tanto el análisis interno como externo, permitiendo una visión completa de la situación organizacional."},
  // 18
  {text:"Una empresa desea iniciar su proceso de formulación estratégica. ¿Cuál debería ser el primer foco principal para asegurar una base sólida del plan estratégico?",
   options:["Ejecutar acciones","Evaluar resultados","Controlar procesos","Analizar el entorno"],
   correct:3,difficulty:"medium",
   justification:"porque antes de tomar decisiones es necesario comprender el contexto en el que opera la empresa, identificando oportunidades y riesgos."},
  // 19
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece parcialmente a este nivel y no al microentorno?",
   options:["Clientes","Proveedores","Distribuidores","Tecnología del entorno"],
   correct:3,difficulty:"medium",
   justification:"porque la tecnología forma parte del macroentorno al ser un factor externo general que afecta a todas las organizaciones de una industria o incluso de un país. Los avances tecnológicos, como la digitalización o la automatización, no dependen de una sola empresa y obligan a las organizaciones a adaptarse para mantenerse competitivas."},
  // 20
  {text:"En el análisis del microentorno, ¿cuál de los siguientes elementos es más relevante para identificar amenazas competitivas directas?",
   options:["Inflación","Política nacional","Cultura interna","Competidores"],
   correct:3,difficulty:"easy",
   justification:"porque los competidores forman parte del microentorno al influir de manera directa en las decisiones estratégicas de la empresa, como precios, calidad o posicionamiento. A diferencia de factores como la inflación o la política, que afectan de manera general a todas las empresas (macroentorno), los competidores interactúan directamente en el mercado en el que opera la organización."},
  // 21
  {text:"Una empresa tecnológica desea analizar cómo la regulación estatal futura sobre protección de datos podría afectar su modelo de negocio. ¿En qué parte del análisis del entorno estratégico debería ubicarse principalmente este aspecto?",
   options:["Interno","Operativo","Financiero","Legal externo"],
   correct:3,difficulty:"medium",
   justification:"porque las leyes y regulaciones son factores externos que forman parte del entorno político-legal. Estas normas son impuestas por el Estado y condicionan la forma en que las empresas operan, estableciendo límites, obligaciones y oportunidades. La empresa no puede controlarlas, pero sí debe analizarlas para adaptarse estratégicamente y evitar sanciones."},
  // 22
  {text:"En una formulación estratégica rigurosa, ¿cuál de los siguientes ejemplos describe mejor un objetivo SMART para incrementar la cuota de mercado en un segmento específico?",
   options:["Aumentar ventas algún día","Mejorar la empresa","Tener éxito en el mercado","Incrementar ventas en un 10% en un año"],
   correct:3,difficulty:"medium",
   justification:"porque cumple con los criterios SMART: es específico (incrementar ventas), medible (10%), alcanzable (depende del contexto), relevante (relacionado con el crecimiento empresarial) y temporal (en un año). Las demás opciones son demasiado generales o ambiguas, por lo que no permiten evaluar su cumplimiento."},
  // 23
  {text:"En el marco de la matriz FODA, ¿cuál de las siguientes combinaciones representa mejor una estrategia FO (Fortalezas-Oportunidades) bien formulada?",
   options:["Reducir debilidades internas","Evitar amenazas externas","Minimizar riesgos","Utilizar fortalezas para aprovechar oportunidades"],
   correct:3,difficulty:"hard",
   justification:"porque las estrategias FO (Fortalezas-Oportunidades) buscan aprovechar las capacidades internas de la empresa para explotar condiciones favorables del entorno. Este tipo de estrategia es proactiva y orientada al crecimiento, ya que combina lo que la empresa hace bien con las oportunidades externas disponibles, generando una ventaja competitiva sostenible."},
  // 24
  {text:"Al analizar el microentorno competitivo, una empresa identifica que tres nuevos competidores de bajo costo han entrado en su mercado local. ¿Cómo debería clasificar este hallazgo dentro de la matriz FODA?",
   options:["Fortaleza","Amenaza","Debilidad","Oportunidad"],
   correct:3,difficulty:"hard",
   justification:"porque en el análisis FODA una oportunidad corresponde a un factor externo positivo que la empresa puede aprovechar para mejorar su desempeño. Estos cambios pueden estar relacionados con el mercado, la tecnología o tendencias favorables, y representan posibilidades de crecimiento o ventaja competitiva."},
  // 25
  {text:"Una compañía de servicios profesionales detecta que posee un equipo altamente calificado y una reputación sólida en el mercado, pero su estructura organizativa es rígida y sus sistemas de información son obsoletos. ¿Cómo deben clasificarse estos elementos en el análisis interno?",
   options:["Oportunidades y amenazas","Factores políticos","Factores económicos","Fortalezas y debilidades"],
   correct:3,difficulty:"medium",
   justification:"ya que las fortalezas y debilidades son aspectos propios de la organización que pueden ser controlados y gestionados. Estos elementos permiten identificar en qué áreas la empresa tiene ventajas y en cuáles necesita mejorar."},
  // 26
  {text:"Al definir estrategias maestras, una empresa con fuerte presencia en un mercado saturado decide enfocarse en vender más productos actuales a los mismos segmentos mediante promociones, fidelización y mejoras incrementales. ¿Qué tipo de estrategia maestra describe mejor este enfoque?",
   options:["Diversificación","Integración","Reducción","Penetración de mercado"],
   correct:3,difficulty:"medium",
   justification:"porque la estrategia de penetración de mercado se centra en incrementar las ventas de productos existentes dentro del mismo mercado objetivo. Esto se logra mediante acciones como promociones, mejoras en el servicio, estrategias de precios o fortalecimiento de la marca."},
  // 27
  {text:"En un proceso de gestión del cambio asociado a la implementación estratégica, la dirección decide comunicar la visión, capacitar al personal en nuevas competencias y ajustar los sistemas de incentivos para apoyar los nuevos comportamientos. ¿Qué objetivo central persiguen estas acciones?",
   options:["Reducir costos","Eliminar la competencia","Sustituir la estrategia","Adaptar la organización a nuevas condiciones"],
   correct:3,difficulty:"hard",
   justification:"porque la gestión del cambio busca preparar y acompañar a la organización en procesos de transformación, ya sea por factores internos o externos. Esto incluye cambios tecnológicos, estructurales o estratégicos. Su objetivo no es solo implementar cambios, sino lograr que las personas los adopten de manera efectiva, reduciendo la resistencia y asegurando la continuidad del negocio."},
  // 28
  {text:"Una empresa diseña políticas empresariales para descuentos máximos regulares, niveles de autorización para inversiones y criterios de selección de proveedores. En el contexto de implementación estratégica, ¿qué función principal cumplen estas políticas?",
   options:["Limitar la innovación","Sustituir objetivos","Eliminar riesgos","Orientar la toma de decisiones"],
   correct:3,difficulty:"medium",
   justification:"porque las políticas organizacionales establecen directrices generales que guían el comportamiento y la toma de decisiones dentro de la empresa. Estas permiten mantener coherencia con la estrategia y asegurar que las acciones individuales estén alineadas con los objetivos institucionales. No eliminan riesgos, pero sí ayudan a gestionarlos de forma estructurada."},
  // 29
  {text:"Durante la formulación estratégica, la alta dirección quiere asegurarse de que los objetivos SMART estén alineados con los factores clave de éxito identificados en el análisis externo e interno. ¿Cuál es el enfoque más adecuado para lograr esta alineación?",
   options:["En decisiones improvisadas","Solo en metas financieras","Sin análisis previo","En el análisis FODA"],
   correct:3,difficulty:"hard",
   justification:"porque los objetivos estratégicos deben surgir de un diagnóstico claro de la situación de la empresa. El análisis FODA permite identificar fortalezas que se pueden potenciar, debilidades que deben corregirse, oportunidades que se pueden aprovechar y amenazas que deben mitigarse. Basarse en este análisis garantiza que los objetivos sean realistas, coherentes y alineados con el entorno."},
  // 30
  {text:"Durante un taller de formulación estratégica avanzada, se discute la diferencia entre misión y visión. ¿Cuál de las siguientes afirmaciones refleja mejor el papel de la visión en la formulación estratégica?",
   options:["Actividades diarias","Normas internas","Presupuesto","Futuro deseado de la organización"],
   correct:3,difficulty:"medium",
   justification:"porque la visión describe el estado futuro al que aspira la organización. Sirve como un elemento motivador y orientador que guía la toma de decisiones estratégicas a largo plazo. No se enfoca en el presente ni en tareas operativas, sino en establecer una dirección clara hacia donde se quiere llegar."},
  // 31
  {text:"En la etapa de valoración dentro de un proceso de planificación estratégica, ¿qué actividad agrega más valor para preparar un buen Cuadro de Mando Integral (CMI)?",
   options:["Reducir costos","Eliminar procesos","Cambiar estructura","Medir el cumplimiento de objetivos"],
   correct:3,difficulty:"medium",
   justification:"porque los indicadores son herramientas que permiten cuantificar el desempeño de la organización en relación con los objetivos estratégicos. Sin indicadores, no es posible evaluar si las acciones implementadas están generando los resultados esperados. Además, facilitan la toma de decisiones basada en datos y el control estratégico."},
  // 32
  {text:"¿Cuál es el propósito principal de los planos de acción derivados del Cuadro de Mando Integral (CMI)?",
   options:["Sustituir la misión","Eliminar control","Reducir costos automáticamente","Convertir objetivos en acciones concretas"],
   correct:3,difficulty:"medium",
   justification:"porque los planes de acción traducen los objetivos estratégicos en actividades específicas, asignando responsables, recursos y plazos. Esto permite pasar de la planificación a la ejecución, asegurando que la estrategia no se quede en un nivel teórico, sino que se implemente de manera práctica."},
  // 33
  {text:"En un sistema de control basado en el CMI, ¿qué característica distingue al control estratégico de un simple control operativo?",
   options:["Controlar tareas diarias","Medir solo gastos","Evitar el uso de indicadores","Evaluar el cumplimiento de los objetivos estratégicos"],
   correct:3,difficulty:"medium",
   justification:"porque el control estratégico se enfoca en verificar si la organización está avanzando hacia el logro de sus objetivos a largo plazo. Este proceso permite detectar desviaciones, analizar sus causas y aplicar acciones correctivas. A diferencia del control operativo, no se centra en el día a día, sino en los resultados globales de la estrategia."},
  // 34
  {text:"¿Cuál de las siguientes afirmaciones describe mejor la perspectiva financiera en el Cuadro de Mando Integral (CMI)?",
   options:["Satisfacción del cliente","Procesos internos","Cultura organizacional","Rentabilidad económica"],
   correct:3,difficulty:"easy",
   justification:"porque la perspectiva financiera evalúa los resultados económicos de la empresa, como ingresos, costos, utilidades y rentabilidad. Esta dimensión es clave porque refleja si la estrategia implementada está generando valor para la organización y sus accionistas."},
  // 35
  {text:"En la perspectiva del cliente del CMI, ¿qué tipo de indicador es más coherente con su propósito?",
   options:["Costos","Procesos","Inventarios","Satisfacción del cliente"],
   correct:3,difficulty:"easy",
   justification:"porque esta perspectiva se enfoca en evaluar cómo los clientes perciben a la empresa, considerando aspectos como calidad, servicio, fidelización y valor ofrecido. Una alta satisfacción del cliente suele traducirse en mejores resultados financieros a largo plazo."},
  // 36
  {text:"¿Cuál es el enfoque central de la perspectiva de procesos internos en el CMI?",
   options:["Reducir salarios","Cambiar visión","Analizar política","Mejorar la eficiencia de procesos"],
   correct:3,difficulty:"medium",
   justification:"porque esta perspectiva analiza los procesos clave de la organización con el objetivo de optimizarlos. Mejorar la eficiencia y calidad de los procesos internos permite ofrecer mejores productos o servicios, reducir costos y aumentar la competitividad."},
  // 37
  {text:"¿Qué aspecto caracteriza principalmente a la perspectiva de aprendizaje y crecimiento en el CMI?",
   options:["Costos","Impuestos","Proveedores","Innovación y talento humano"],
   correct:3,difficulty:"medium",
   justification:"porque esta perspectiva se enfoca en el desarrollo del capital humano, la innovación y la capacidad de adaptación de la empresa. Sin una base sólida en aprendizaje y crecimiento, es difícil sostener mejoras en procesos, satisfacción del cliente y resultados financieros."},
  // 38
  {text:"¿Qué función principal cumple el mapa estratégico dentro del enfoque del Cuadro de Mando Integral?",
   options:["Presupuesto","Indicadores","Organigrama","Relación causa-efecto entre objetivos"],
   correct:3,difficulty:"medium",
   justification:"porque el mapa estratégico muestra cómo los objetivos de las diferentes perspectivas del CMI se conectan entre sí. Estas relaciones de causa y efecto permiten entender cómo las mejoras en aprendizaje impactan en procesos, luego en clientes y finalmente en resultados financieros."},
  // 39
  {text:"En el análisis de desarrollo organizacional asociado al CMI, ¿qué aspecto resulta más relevante evaluar?",
   options:["Infraestructura","Ventas","Edificio","Cultura y capacidades organizacionales"],
   correct:3,difficulty:"medium",
   justification:"porque el desarrollo organizacional busca mejorar la cultura, el clima laboral y las capacidades del talento humano, lo cual impacta directamente en el desempeño y la sostenibilidad de la empresa."},
  // 40
  {text:"Durante la etapa de evaluación previa al diseño del CMI, ¿qué herramienta o enfoque es más útil para identificar fortalezas y debilidades internas de la organización?",
   options:["Balance general","Organigrama","Publicidad","Análisis FODA"],
   correct:3,difficulty:"medium",
   justification:"porque el análisis FODA es una herramienta estratégica que permite evaluar tanto factores internos (fortalezas y debilidades) como externos (oportunidades y amenazas). En este caso, se enfoca en el análisis interno, facilitando la identificación de capacidades y limitaciones que influyen directamente en el desempeño organizacional."},
  // 41
  {text:"¿Cuáles de las siguientes afirmaciones describen mejor la relación entre el CMI y el control de gestión?",
   options:["Eliminar la estrategia","Controlar únicamente las finanzas","Sustituir la misión","Traducir la estrategia en indicadores medibles"],
   correct:3,difficulty:"medium",
   justification:"porque el CMI convierte la estrategia en objetivos concretos e indicadores que pueden ser medidos y evaluados. Esto permite hacer seguimiento al desempeño organizacional desde diferentes perspectivas y asegurar que la estrategia se esté implementando correctamente."},
  // 42
  {text:"Cuando se diseñan planes de acción vinculados a la perspectiva del cliente, ¿qué criterio es más importante para seleccionar las acciones prioritarias?",
   options:["Costos operativos","Procesos internos","Infraestructura","Satisfacción del cliente"],
   correct:3,difficulty:"easy",
   justification:"porque esta perspectiva mide cómo los clientes perciben a la empresa, evaluando aspectos como calidad, servicio, fidelización y valor entregado. La satisfacción del cliente es clave para garantizar la permanencia y crecimiento en el mercado."},
  // 43
  {text:"¿Qué característica distingue a un indicador bien definido dentro de un CMI?",
   options:["Generales y ambiguos","Sin relación con objetivos","Opcionales","Claros y medibles"],
   correct:3,difficulty:"medium",
   justification:"porque los indicadores deben permitir evaluar de manera objetiva el desempeño. Si no son claros ni medibles, no cumplen su función de control y seguimiento, lo que dificulta la toma de decisiones."},
  // 44
  {text:"En la construcción del mapa estratégico, ¿qué se busca al conectar objetivos de la perspectiva de aprendizaje y crecimiento con los procesos internos?",
   options:["Ninguna relación","Se sustituyen mutuamente","Se eliminan entre sí","El talento mejora la eficiencia de los procesos"],
   correct:3,difficulty:"hard",
   justification:"porque el talento humano es el encargado de ejecutar los procesos. Cuando el personal está capacitado y motivado, los procesos se desarrollan de manera más eficiente, mejorando la calidad y productividad de la organización."},
  // 45
  {text:"En el contexto del CMI, ¿qué propósito cumple el análisis periódico de resultados en la etapa de control?",
   options:["Eliminar objetivos","Evitar la planificación","Reducir personal","Detectar y corregir desviaciones"],
   correct:3,difficulty:"medium",
   justification:"porque el control estratégico permite comparar los resultados obtenidos con los objetivos planteados. Si existen diferencias, se pueden tomar acciones correctivas para mejorar el desempeño y asegurar el cumplimiento de la estrategia."},
  // 46
  {text:"Al diseñar objetivos para la perspectiva financiera del CMI, ¿qué enfoque es más coherente con la lógica del modelo?",
   options:["Indicadores de cliente","Indicadores operativos","Indicadores sociales","Indicadores financieros"],
   correct:3,difficulty:"easy",
   justification:"porque estos indicadores permiten evaluar el desempeño económico de la empresa, incluyendo variables como ingresos, costos, utilidades y rentabilidad."},
  // 47
  {text:"En la etapa de evaluación, respecto al desarrollo organizacional, ¿qué pregunta es más útil formular para alimentar el diseño del CMI?",
   options:["Desorden organizacional","Trabajo aislado","Eliminación de procesos","Coherencia entre objetivos y acciones"],
   correct:3,difficulty:"medium",
   justification:"porque la alineación estratégica garantiza que todas las áreas y actividades de la empresa trabajen en función de los mismos objetivos, evitando esfuerzos dispersos y mejorando la eficiencia organizacional."},
  // 48
  {text:"En la perspectiva de procesos internos, ¿qué tipo de indicador sería más apropiado para evaluar la eficacia de un proceso de atención al cliente?",
   options:["Definir el futuro","Sustituir la visión","Establecer normas","Definir la razón de ser de la organización en el presente"],
   correct:3,difficulty:"medium",
   justification:"porque la misión describe la razón de ser de la empresa en el momento actual, incluyendo su actividad principal, el público al que se dirige y el valor que ofrece. Aunque la opción b) se acerca, la definición más completa y precisa de misión es la que incluye explícitamente su identidad y propósito actual, lo que la convierte en la base para la toma de decisiones estratégicas."},
  // 49
  {text:"En la perspectiva de aprendizaje y crecimiento, ¿qué indicador sería más adecuado para reflejar el desarrollo de competencias críticas para la estrategia?",
   options:["Mantener errores","Reducir calidad","Eliminar clientes","Optimizar procesos constantemente"],
   correct:3,difficulty:"easy",
   justification:"porque la mejora continua implica un proceso sistemático orientado a perfeccionar constantemente las actividades de la organización. Este enfoque busca incrementar la eficiencia, reducir errores y mejorar la calidad, permitiendo a la empresa adaptarse a los cambios y mantenerse competitiva en el tiempo."},
  // 50
  {text:"¿Qué representa mejor la integración entre el CMI y el análisis de desarrollo organizacional?",
   options:["Falta de liderazgo","Improvisación","Compromiso organizacional","Alineación y compromiso organizacional"],
   correct:3,difficulty:"hard",
   justification:"porque no basta con el compromiso individual, sino que se requiere una alineación general de toda la organización con los objetivos estratégicos. Esto implica que todos los niveles trabajen en la misma dirección, asegurando coherencia entre lo planificado y lo ejecutado."},
  // 51
  {text:"En una agroindustria de cacao que busca implementar un Cuadro de Mando Integral, ¿cuál sería el principal propósito de un plan de acción complejo en la etapa de valoración avanzada?",
   options:["Actuar sin dirección","Eliminar riesgos totalmente","Evitar decisiones","Definir objetivos y estrategias a largo plazo"],
   correct:3,difficulty:"easy",
   justification:"porque la planificación estratégica establece el rumbo de la organización, definiendo metas claras y las acciones necesarias para alcanzarlas. Además, permite anticipar escenarios futuros y tomar decisiones fundamentadas."},

  // ── PREGUNTAS 52–60 CORREGIDAS (respuesta correcta = opción A = índice 0) ──

  // 52
  {text:"En un esquema de control estratégico iterativo aplicado al Cuadro de Mando Integral de una empresa de cacao, ¿qué caracteriza mejor el enfoque iterativo?",
   options:[
     "Evaluar resultados continuamente y ajustar estrategias según el desempeño.",
     "Aplicar una sola evaluación al final del proceso.",
     "Ignorar cambios del entorno.",
     "Mantener indicadores sin modificaciones."
   ],
   correct:0,difficulty:"easy",
   justification:"Porque el enfoque iterativo implica mejora continua y retroalimentación constante."},

  // 53
  {text:"Al diseñar el Cuadro de Mando Integral (CMI) en una agroindustria de cacao, ¿cuál de las siguientes formulaciones de objetivo ilustra mejor la interrelación entre la perspectiva de procesos internos y la de clientes?",
   options:[
     "Mejorar la calidad del procesamiento para aumentar la satisfacción del cliente.",
     "Reducir únicamente salarios administrativos.",
     "Incrementar impuestos corporativos.",
     "Cambiar el logotipo empresarial."
   ],
   correct:0,difficulty:"medium",
   justification:"Porque refleja claramente la lógica de causa-efecto del Cuadro de Mando Integral, donde las mejoras en la perspectiva de procesos internos (como optimizar la calidad del procesamiento del cacao) generan un impacto directo en la perspectiva del cliente (mayor satisfacción, confianza y fidelización)."},

  // 54
  {text:"¿Qué mide la 'valoración previa' en un plan de acción del CMI?",
   options:[
     "El estado inicial y la capacidad organizacional antes de implementar la estrategia.",
     "Solo las ventas futuras.",
     "Únicamente el presupuesto anual.",
     "El número de oficinas disponibles."
   ],
   correct:0,difficulty:"easy",
   justification:"Porque la 'valoración previa' en el Cuadro de Mando Integral permite diagnosticar la situación actual de la organización antes de ejecutar el plan. Esto incluye recursos, capacidades, procesos y nivel de preparación."},

  // 55
  {text:"En control del CMI, si el blockchain está al 60% de la meta, ¿qué haces PRIMERO?",
   options:[
     "Analizar las causas de la desviación y aplicar acciones correctivas.",
     "Eliminar el proyecto inmediatamente.",
     "Cambiar toda la estrategia sin análisis.",
     "Ignorar el resultado obtenido."
   ],
   correct:0,difficulty:"medium",
   justification:"Porque en el control estratégico del Cuadro de Mando Integral no basta con detectar que una meta no se cumple (60%), sino que lo primero es entender por qué ocurre la desviación. Este análisis permite tomar decisiones informadas y aplicar acciones correctivas efectivas, en lugar de reaccionar de forma impulsiva o sin fundamento."},

  // 56
  {text:"¿Por qué el CMI usa 4 perspectivas y no solo la financiera?",
   options:[
     "Porque integra una visión equilibrada del desempeño organizacional.",
     "Porque elimina la importancia de las finanzas.",
     "Porque solo analiza clientes.",
     "Porque reemplaza el análisis estratégico."
   ],
   correct:0,difficulty:"easy",
   justification:"Ya que el CMI considera finanzas, clientes, procesos y aprendizaje para una visión integral."},

  // 57
  {text:"En la agroindustria de cacao, ¿cuál es el indicador financiero PRINCIPAL del CMI?",
   options:[
     "Rentabilidad y crecimiento de ingresos.",
     "Número de empleados capacitados.",
     "Tiempo de respuesta al cliente.",
     "Nivel de satisfacción laboral."
   ],
   correct:0,difficulty:"medium",
   justification:"En la perspectiva financiera del Cuadro de Mando Integral, los indicadores principales están orientados a medir la creación de valor económico. La rentabilidad (como EBITDA o margen) y el crecimiento de ingresos reflejan directamente el éxito de la estrategia y permiten evaluar si las demás perspectivas están contribuyendo a resultados financieros positivos."},

  // 58
  {text:"¿Qué falta en este mapa estratégico? 'EBITDA ← NPS' (solo 2 flechas)",
   options:[
     "Las relaciones completas entre todas las perspectivas estratégicas.",
     "Únicamente el logotipo empresarial.",
     "Los nombres de los empleados.",
     "El organigrama financiero."
   ],
   correct:0,difficulty:"hard",
   justification:"Un mapa estratégico del Cuadro de Mando Integral debe mostrar una red completa de relaciones causa-efecto entre todas las perspectivas, no solo una conexión aislada como 'EBITDA ← NPS'. Falta incluir cómo el aprendizaje impulsa los procesos, cómo estos impactan al cliente y finalmente cómo se reflejan en lo financiero, logrando una visión estratégica completa."},

  // 59
  {text:"Los empleados NO quieren usar blockchain (60% vs 100%). ¿Qué haces?",
   options:[
     "Capacitar, comunicar beneficios y gestionar el cambio organizacional.",
     "Obligar sin explicación alguna.",
     "Eliminar toda la tecnología.",
     "Ignorar la resistencia del personal."
   ],
   correct:0,difficulty:"medium",
   justification:"La resistencia al cambio es un factor común en la implementación de nuevas tecnologías como blockchain. En el contexto del Cuadro de Mando Integral, la perspectiva de aprendizaje y crecimiento enfatiza la capacitación, la comunicación y la alineación cultural para asegurar que los empleados adopten la estrategia, en lugar de imponer cambios sin preparación."},

  // 60
  {text:"¿Qué mide BIEN el aprendizaje en CMI?",
   options:[
     "Desarrollo de competencias, innovación y capacitación del personal.",
     "Solo ingresos financieros.",
     "Cantidad de oficinas corporativas.",
     "Número de productos almacenados."
   ],
   correct:0,difficulty:"hard",
   justification:"En el Cuadro de Mando Integral, la perspectiva de aprendizaje y crecimiento mide los factores que permiten la mejora continua de la organización, como las habilidades del talento humano, la innovación y el uso de tecnología. Estos elementos son la base para fortalecer procesos internos y lograr mejores resultados estratégicos a largo plazo."}
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