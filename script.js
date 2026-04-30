/* ══════════════════════════════════════════
   60 PREGUNTAS — Planificación Estratégica
   Dra. Rugina Elidea Quiñonez
══════════════════════════════════════════ */
let questions = [
  {text:"En el análisis del macroentorno, ¿cuál es el propósito principal de identificar factores económicos, políticos, sociales, tecnológicos, ecológicos y legales?",options:["Controlar únicamente las actividades internas de la empresa.","Analizar factores externos que pueden influir en las decisiones estratégicas.","Determinar únicamente los costos de producción.","Supervisar el desempeño de los empleados."],correct:1,difficulty:"easy",justification:"La respuesta correcta es la b, porque el análisis del macroentorno busca identificar factores externos que afectan a la empresa, permitiendo anticipar oportunidades y amenazas para tomar mejores decisiones estratégicas."},
  {text:"¿Cuáles de los siguientes elementos corresponden con mayor claridad al microentorno de una empresa?",options:["Clientes, proveedores y competidores.","Inflación y políticas gubernamentales.","Cambios climáticos globales.","Tendencias culturales internacionales."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, ya que el microentorno está formado por actores cercanos a la empresa que influyen directamente en sus operaciones y competitividad."},
  {text:"Al construir la matriz FODA, ¿qué combinación describe correctamente cada cuadrante?",options:["Factores internos y externos positivos y negativos.","Solo aspectos financieros y administrativos.","Elementos tecnológicos y legales únicamente.","Variables económicas y sociales exclusivamente."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque la matriz FODA combina fortalezas y debilidades internas con oportunidades y amenazas externas."},
  {text:"En la identificación de factores estratégicos externos, ¿cuál es el criterio más adecuado para considerar que un factor detectado es realmente estratégico?",options:["Que tenga impacto significativo en la empresa y sus objetivos.","Que sea fácil de controlar por la organización.","Que dependa solo de los empleados.","Que no afecte la competencia."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque un factor estratégico es aquel que puede influir considerablemente en el desempeño y éxito de la empresa."},
  {text:"Respecto a los factores estratégicos internos, ¿cuál de los siguientes ejemplos ilustra mejor una fortaleza interna relevante para la estrategia?",options:["Alta rotación de personal.","Tecnología obsoleta.","Marca reconocida y buena reputación.","Disminución de ventas."],correct:2,difficulty:"easy",justification:"La respuesta correcta es la c, ya que una marca sólida representa una ventaja competitiva interna que fortalece la estrategia empresarial."},
  {text:"Al formular objetivos estratégicos, ¿cuál de las siguientes características es esencial para que un objetivo sea útil en la gestión?",options:["Que sea ambiguo y flexible.","Que sea medible y específico.","Que no tenga límite de tiempo.","Que dependa del azar."],correct:1,difficulty:"easy",justification:"La respuesta correcta es la b, porque los objetivos deben ser claros y medibles para facilitar el control y evaluación de resultados."},
  {text:"Las estrategias maestras (como crecimiento, estabilidad o reducción/recorte) se caracterizan por:",options:["Orientar la dirección general de la empresa.","Ser actividades operativas diarias.","Aplicarse solo en pequeñas empresas.","Limitar el desarrollo organizacional."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, debido a que las estrategias maestras definen el rumbo principal que seguirá la organización."},
  {text:"¿Cuál es el rol principal de las políticas empresariales dentro del proceso de implementación estratégica?",options:["Guiar la toma de decisiones y acciones organizacionales.","Reemplazar los objetivos estratégicos.","Eliminar la necesidad de planificación.","Reducir únicamente costos."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque las políticas sirven como lineamientos que orientan las decisiones y la ejecución de estrategias."},
  {text:"En la implementación del plan estratégico, ¿cuál de los siguientes aspectos es más crítico para asegurar que las estrategias formuladas se conviertan en resultados concretos?",options:["Falta de seguimiento.","Comunicación y coordinación efectiva.","Improvisación constante.","Ausencia de liderazgo."],correct:1,difficulty:"hard",justification:"La respuesta correcta es la b, ya que una buena coordinación y comunicación permiten ejecutar correctamente las estrategias."},
  {text:"¿Cuál es la relación más adecuada entre el análisis FODA y la formulación de estrategias?",options:["El FODA ayuda a diseñar estrategias aprovechando fortalezas y oportunidades.","El FODA reemplaza la planificación estratégica.","El FODA solo analiza debilidades internas.","El FODA no influye en las decisiones estratégicas."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque el análisis FODA proporciona información clave para formular estrategias adecuadas."},
  {text:"Una empresa del sector minorista enfrenta incertidumbre por elecciones presidenciales que podrían cambiar las regulaciones laborales. ¿En qué etapa del proceso estratégico debe analizarse primero este factor y por qué?",options:["En el análisis del macroentorno, por ser un factor político externo.","En el control financiero interno.","En la capacitación de empleados.","En el análisis operativo diario."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque las elecciones y regulaciones son factores políticos externos que pertenecen al macroentorno."},
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece parcialmente a este nivel y no al microentorno?",options:["Políticas gubernamentales.","Competidores directos.","Clientes frecuentes.","Proveedores locales."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque las políticas gubernamentales afectan a todas las empresas y forman parte del entorno general."},
  {text:"En formulación estratégica, ¿cuál es la principal diferencia funcional entre misión y visión que justifica incluir la visión ANTES de los objetivos SMART?",options:["La visión define el futuro deseado de la empresa.","La misión reemplaza los objetivos.","Los objetivos eliminan la visión.","La misión solo describe productos."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que la visión marca el rumbo futuro y sirve como guía para establecer objetivos estratégicos."},
  {text:"En la identificación de factores clave externos para un plan estratégico, ¿cuál de los siguientes ejemplos describe mejor una oportunidad?",options:["Crecimiento de la demanda del mercado.","Reducción de clientes.","Incremento de competidores.","Crisis económica nacional."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, porque una mayor demanda representa una posibilidad favorable para crecer."},
  {text:"¿Cuál de las siguientes alternativas representa mejor un factor clave interno de tipo fortaleza?",options:["Personal altamente capacitado.","Baja productividad.","Falta de recursos financieros.","Mala reputación corporativa."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, ya que contar con personal capacitado fortalece el desempeño y competitividad de la empresa."},
  {text:"En la construcción de la matriz FODA, ¿qué combinación describe correctamente una amenaza?",options:["Factor externo negativo.","Factor interno positivo.","Factor interno negativo.","Factor externo positivo."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, porque las amenazas son situaciones externas que pueden perjudicar a la organización."},
  {text:"¿Cuál es el principal propósito de la matriz FODA dentro del proceso de formulación estratégica?",options:["Facilitar el análisis integral para la toma de decisiones estratégicas.","Sustituir la misión empresarial.","Controlar únicamente las finanzas.","Eliminar riesgos totalmente."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, porque la matriz FODA permite identificar condiciones internas y externas relevantes."},
  {text:"Una empresa desea iniciar su proceso de formulación estratégica. ¿Cuál debería ser el primer foco principal para asegurar una base sólida del plan estratégico?",options:["Analizar la situación interna y externa de la empresa.","Incrementar precios inmediatamente.","Reducir personal sin evaluación.","Cambiar el logo corporativo."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que el análisis situacional es la base para formular estrategias coherentes."},
  {text:"En el análisis del macroentorno, ¿cuál de las siguientes variables pertenece a este nivel y no al microentorno?",options:["Factores tecnológicos nacionales.","Clientes específicos.","Proveedores directos.","Distribuidores locales."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque los cambios tecnológicos afectan ampliamente a las organizaciones y pertenecen al macroentorno."},
  {text:"En el análisis del microentorno, ¿cuál de los siguientes elementos es más relevante para identificar amenazas competitivas directas?",options:["Competidores actuales del mercado.","Cultura organizacional interna.","Clima político internacional.","Inflación global."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, porque los competidores directos representan amenazas inmediatas para la empresa."},
  {text:"Una empresa tecnológica desea analizar cómo la regulación estatal futura sobre protección de datos podría afectar su modelo de negocio. ¿En qué parte del análisis del entorno estratégico debería ubicar principalmente este aspecto?",options:["En el análisis legal del macroentorno.","En el análisis del personal interno.","En el control operativo diario.","En la evaluación de inventarios."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que las regulaciones estatales forman parte de los factores legales del macroentorno."},
  {text:"En una formulación estratégica rigurosa, ¿cuál de los siguientes ejemplos describe mejor un objetivo SMART para incrementar la cuota de mercado en un segmento específico?",options:["Mejorar las ventas algún día.","Incrementar la cuota de mercado en un 10% en el segmento juvenil durante los próximos 12 meses.","Tener más clientes sin plazo definido.","Ser la mejor empresa del país."],correct:1,difficulty:"medium",justification:"La respuesta correcta es la b, porque cumple con las características SMART: es específica, medible, alcanzable, relevante y temporal."},
  {text:"En el marco de la matriz FODA, ¿cuál de las siguientes combinaciones representa mejor una estrategia FO (Fortalezas-Oportunidades) bien formulada?",options:["Aprovechar una marca reconocida para ingresar a nuevos mercados en crecimiento.","Reducir personal por crisis económica.","Minimizar pérdidas por falta de recursos.","Evitar competir en mercados internacionales."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, ya que una estrategia FO utiliza fortalezas internas para aprovechar oportunidades externas."},
  {text:"Al analizar el microentorno competitivo, una empresa identifica que tres nuevos competidores de bajo costo han entrado en su mercado local. ¿Cómo debería clasificar este hallazgo dentro de la matriz FODA?",options:["Fortaleza.","Oportunidad.","Amenaza.","Debilidad."],correct:2,difficulty:"easy",justification:"La respuesta correcta es la c, porque la entrada de nuevos competidores puede disminuir participación de mercado y afectar la rentabilidad."},
  {text:"Una compañía de servicios profesionales detecta que posee un equipo altamente calificado y una reputación sólida en el mercado, pero su estructura organizativa es rígida y sus sistemas de información son obsoletos. ¿Cómo deben clasificarse estos elementos en el análisis interno?",options:["Solo como oportunidades externas.","Fortalezas y debilidades internas.","Amenazas del entorno.","Factores políticos y legales."],correct:1,difficulty:"medium",justification:"La respuesta correcta es la b, porque el personal calificado y la reputación son fortalezas, mientras que la rigidez organizativa y sistemas obsoletos son debilidades."},
  {text:"Al definir estrategias maestras, una empresa con fuerte presencia en un mercado saturado decide enfocarse en vender más productos actuales a los mismos segmentos mediante promociones, fidelización y mejoras incrementales. ¿Qué tipo de estrategia maestra describe mejor este enfoque?",options:["Diversificación.","Reducción.","Penetración de mercado.","Integración vertical."],correct:2,difficulty:"medium",justification:"La respuesta correcta es la c, porque la penetración de mercado busca aumentar ventas de productos actuales en mercados actuales."},
  {text:"En un proceso de gestión del cambio asociado a la implementación estratégica, la dirección decide comunicar la visión, capacitar al personal en nuevas competencias y ajustar los sistemas de incentivos para apoyar los nuevos comportamientos. ¿Qué objetivo central persiguen estas acciones?",options:["Facilitar la adaptación organizacional al cambio estratégico.","Reducir únicamente los costos laborales.","Eliminar la competencia del mercado.","Sustituir la planificación estratégica."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, ya que estas acciones buscan que los colaboradores adopten y apoyen la nueva estrategia."},
  {text:"Una empresa diseña políticas empresariales para descuentos máximos, niveles de autorización para inversiones y criterios de selección de proveedores. En el contexto de implementación estratégica, ¿qué función principal cumplen estas políticas?",options:["Orientar y estandarizar la toma de decisiones.","Reemplazar los objetivos estratégicos.","Limitar totalmente la innovación.","Eliminar riesgos financieros."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque las políticas sirven como guías para actuar de forma coherente con la estrategia."},
  {text:"Durante la formulación estratégica, la alta dirección quiere asegurarse de que los objetivos SMART estén alineados con los factores clave de éxito identificados en el análisis externo e interno. ¿Cuál es el enfoque más adecuado para lograr esta alineación?",options:["Formular objetivos basados en fortalezas y oportunidades relevantes.","Crear objetivos sin análisis previo.","Ignorar las amenazas externas.","Definir metas únicamente financieras."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, ya que los objetivos deben relacionarse directamente con el análisis estratégico realizado."},
  {text:"Durante un taller de formulación estratégica avanzada, se discute la diferencia entre misión y visión. ¿Cuál de las siguientes afirmaciones refleja mejor el papel de la visión en la formulación estratégica?",options:["Describe el futuro deseado y orienta el rumbo estratégico.","Define únicamente las tareas operativas diarias.","Sustituye la misión organizacional.","Solo explica la estructura financiera."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque la visión representa el estado futuro al que la empresa aspira llegar."},
  {text:"En la etapa de valoración dentro de un proceso de planificación estratégica, ¿qué actividad agrega más valor para preparar un buen Cuadro de Mando Integral (CMI)?",options:["Definir indicadores y metas estratégicas.","Eliminar todos los procesos internos.","Cambiar el nombre de la empresa.","Reducir personal sin evaluación."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque el CMI necesita indicadores claros para medir el cumplimiento de la estrategia."},
  {text:"¿Cuál es el propósito principal de los planes de acción derivados del Cuadro de Mando Integral (CMI)?",options:["Convertir los objetivos estratégicos en actividades concretas.","Sustituir la misión empresarial.","Eliminar la necesidad de control.","Reducir únicamente costos operativos."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que los planes de acción permiten ejecutar las estrategias mediante tareas específicas."},
  {text:"En un sistema de control basado en el CMI, ¿qué característica distingue al control estratégico de un simple control operativo?",options:["Evalúa el cumplimiento de objetivos estratégicos a largo plazo.","Solo controla actividades diarias.","Se enfoca únicamente en gastos menores.","No utiliza indicadores."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque el control estratégico analiza el avance global de la estrategia organizacional."},
  {text:"¿Cuál de las siguientes afirmaciones describe mejor la perspectiva financiera en el Cuadro de Mando Integral (CMI)?",options:["Evalúa la rentabilidad y creación de valor económico.","Analiza exclusivamente la satisfacción laboral.","Mide solo procesos de producción.","Controla únicamente campañas publicitarias."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, porque la perspectiva financiera busca medir resultados económicos y sostenibilidad."},
  {text:"En la perspectiva del cliente del CMI, ¿qué tipo de indicador es más coherente con su propósito?",options:["Nivel de satisfacción y fidelización de clientes.","Consumo de energía eléctrica.","Tiempo de mantenimiento interno.","Rotación de inventarios."],correct:0,difficulty:"easy",justification:"La respuesta correcta es la a, ya que esta perspectiva mide cómo perciben los clientes a la empresa."},
  {text:"¿Cuál es el enfoque central de la perspectiva de procesos internos en el CMI?",options:["Mejorar la eficiencia y calidad de los procesos clave.","Reducir únicamente salarios.","Cambiar la visión empresarial.","Analizar solo factores políticos externos."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque esta perspectiva busca optimizar los procesos que generan valor para clientes y empresa."},
  {text:"¿Qué aspecto caracteriza principalmente a la perspectiva de aprendizaje y crecimiento en el CMI?",options:["Desarrollo del talento humano, innovación y tecnología.","Reducción exclusiva de costos.","Supervisión de impuestos gubernamentales.","Control de proveedores externos."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque esta perspectiva impulsa las capacidades internas necesarias para crecer y mejorar."},
  {text:"¿Qué función principal cumple el mapa estratégico dentro del enfoque del Cuadro de Mando Integral?",options:["Mostrar la relación causa-efecto entre objetivos estratégicos.","Sustituir el presupuesto anual.","Eliminar la necesidad de indicadores.","Controlar únicamente inventarios."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque el mapa estratégico permite visualizar cómo se conectan los objetivos en las diferentes perspectivas del CMI."},
  {text:"En el análisis de desarrollo organizacional asociado al CMI, ¿qué aspecto resulta más relevante evaluar?",options:["Las capacidades, cultura y competencias del personal.","Solo la infraestructura física.","Únicamente las ventas mensuales.","El tamaño del edificio corporativo."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque el desarrollo organizacional se enfoca en las personas, capacidades y cultura necesarias para ejecutar la estrategia."},
  {text:"Durante la etapa de evaluación previa al diseño del CMI, ¿qué herramienta o enfoque es más útil para identificar fortalezas y debilidades internas de la organización?",options:["Matriz FODA.","Balance financiero anual únicamente.","Organigrama empresarial.","Publicidad institucional."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que la matriz FODA permite identificar fortalezas y debilidades internas de forma estructurada."},
  {text:"¿Cuál de las siguientes afirmaciones describe mejor la relación entre el CMI y el control de gestión?",options:["El CMI traduce la estrategia en indicadores para controlar el desempeño.","El CMI reemplaza totalmente la administración.","El CMI elimina la necesidad de supervisión.","El CMI solo sirve para temas financieros."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque el CMI permite monitorear y controlar el cumplimiento estratégico mediante indicadores."},
  {text:"Cuando se diseñan planes de acción vinculados a la perspectiva del cliente, ¿qué criterio es más importante para seleccionar las acciones prioritarias?",options:["Su impacto en la satisfacción y fidelización del cliente.","La reducción exclusiva de costos internos.","La cantidad de empleados disponibles.","La antigüedad de la empresa."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque las acciones deben generar valor y mejorar la experiencia del cliente."},
  {text:"¿Qué característica distingue a un indicador bien definido dentro de un CMI?",options:["Que sea claro, medible y alineado con los objetivos estratégicos.","Que sea ambiguo y general.","Que no tenga relación con la estrategia.","Que solo mida actividades diarias."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque un buen indicador debe facilitar la medición y seguimiento estratégico."},
  {text:"En la construcción del mapa estratégico, ¿qué se busca al conectar objetivos de la perspectiva de aprendizaje y crecimiento con los de procesos internos?",options:["Mostrar cómo el desarrollo del talento mejora los procesos.","Eliminar la necesidad de capacitación.","Reducir únicamente costos operativos.","Sustituir la perspectiva financiera."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque las capacidades del personal impactan directamente en la mejora de procesos internos."},
  {text:"En el contexto del CMI, ¿qué propósito cumple el análisis periódico de resultados en la etapa de control?",options:["Verificar avances y aplicar acciones correctivas.","Eliminar objetivos estratégicos.","Sustituir los indicadores financieros.","Evitar la planificación futura."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que el control permite evaluar resultados y corregir desviaciones."},
  {text:"Al diseñar objetivos para la perspectiva financiera del CMI, ¿qué enfoque es más coherente con la lógica del modelo?",options:["Crear valor económico y mejorar la rentabilidad.","Medir únicamente la satisfacción laboral.","Analizar solo factores externos políticos.","Controlar exclusivamente inventarios."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque la perspectiva financiera se centra en resultados económicos sostenibles."},
  {text:"En la etapa de evaluación, respecto al desarrollo organizacional, ¿qué pregunta es más útil formular para alimentar el diseño del CMI?",options:["¿La organización posee capacidades para ejecutar la estrategia?","¿Cuántas oficinas tiene la empresa?","¿Qué color tiene el logotipo?","¿Cuál es la antigüedad de los muebles?"],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque el CMI requiere evaluar si la organización está preparada para implementar la estrategia."},
  {text:"En la perspectiva de procesos internos, ¿qué tipo de indicador sería más apropiado para evaluar la eficacia de un proceso de atención al cliente?",options:["Tiempo promedio de respuesta al cliente.","Número de edificios de la empresa.","Cantidad de vehículos corporativos.","Total de campañas publicitarias."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque mide directamente la eficiencia y calidad del proceso de atención."},
  {text:"En la perspectiva de aprendizaje y crecimiento, ¿qué indicador sería más adecuado para reflejar el desarrollo de competencias críticas para la estrategia?",options:["Horas de capacitación y nivel de competencias adquiridas.","Número de proveedores externos.","Total de ventas mensuales.","Cantidad de impuestos pagados."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque esta perspectiva busca fortalecer conocimientos y habilidades del personal."},
  {text:"¿Qué representa mejor la integración entre el CMI y el análisis de desarrollo organizacional?",options:["La alineación de personas, procesos y estrategia empresarial.","El reemplazo de la planificación estratégica.","La reducción automática de costos.","La eliminación de indicadores financieros."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que el desarrollo organizacional fortalece la ejecución estratégica del CMI."},
  {text:"En una agroindustria de cacao que busca implementar un Cuadro de Mando Integral, ¿cuál sería el principal propósito de un plan de acción complejo en la etapa de valoración avanzada?",options:["Coordinar acciones estratégicas con responsables, tiempos e indicadores.","Sustituir el mapa estratégico.","Eliminar el control organizacional.","Reducir únicamente gastos operativos."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque un plan de acción organiza la ejecución detallada de la estrategia."},
  {text:"En un esquema de control estratégico iterativo aplicado al Cuadro de Mando Integral de una empresa de cacao, ¿qué caracteriza mejor el enfoque iterativo?",options:["Evaluar resultados continuamente y ajustar estrategias según el desempeño.","Aplicar una sola evaluación al final del proceso.","Ignorar cambios del entorno.","Mantener indicadores sin modificaciones."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque el enfoque iterativo implica mejora continua y retroalimentación constante."},
  {text:"Al diseñar el Cuadro de Mando Integral (CMI) en una agroindustria de cacao, ¿cuál de las siguientes formulaciones de objetivos ilustra mejor la interrelación entre la perspectiva de procesos internos y la de clientes?",options:["Mejorar la calidad del procesamiento para aumentar la satisfacción del cliente.","Reducir únicamente salarios administrativos.","Incrementar impuestos corporativos.","Cambiar el logotipo empresarial."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque conecta mejoras internas con beneficios percibidos por los clientes."},
  {text:"¿Qué mide la 'valoración previa' en un plan de acción del CMI?",options:["El estado inicial y la capacidad organizacional antes de implementar la estrategia.","Solo las ventas futuras.","Únicamente el presupuesto anual.","El número de oficinas disponibles."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque la valoración previa analiza la situación inicial de la organización."},
  {text:"En control del CMI, si el blockchain está al 60% de la meta, ¿qué haces PRIMERO?",options:["Analizar las causas de la desviación y aplicar acciones correctivas.","Eliminar el proyecto inmediatamente.","Cambiar toda la estrategia sin análisis.","Ignorar el resultado obtenido."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque el control estratégico requiere identificar causas antes de tomar decisiones."},
  {text:"¿Por qué el CMI usa 4 perspectivas y no solo la financiera?",options:["Porque integra una visión equilibrada del desempeño organizacional.","Porque elimina la importancia de las finanzas.","Porque solo analiza clientes.","Porque reemplaza el análisis estratégico."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, ya que el CMI considera finanzas, clientes, procesos y aprendizaje para una visión integral."},
  {text:"En la agroindustria de cacao, ¿cuál es el indicador financiero PRINCIPAL del CMI?",options:["Rentabilidad y crecimiento de ingresos.","Número de empleados capacitados.","Tiempo de respuesta al cliente.","Nivel de satisfacción laboral."],correct:0,difficulty:"medium",justification:"La respuesta correcta es la a, porque la perspectiva financiera mide resultados económicos y sostenibilidad."},
  {text:"¿Qué FALTA en este mapa estratégico? 'EBITDA ← NPS' (solo 2 perspectivas conectadas)",options:["Las relaciones completas entre todas las perspectivas estratégicas.","Únicamente el logotipo empresarial.","Los nombres de los empleados.","El organigrama financiero."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque un mapa estratégico debe incluir relaciones causa-efecto más amplias entre perspectivas."},
  {text:"Los empleados NO quieren usar blockchain (60% vs 100% de meta). ¿Qué haces?",options:["Capacitar, comunicar beneficios y gestionar el cambio organizacional.","Obligar sin explicación alguna.","Eliminar toda la tecnología.","Ignorar la resistencia del personal."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque la gestión del cambio ayuda a lograr aceptación y adaptación del personal."},
  {text:"¿Qué mide BIEN el aprendizaje en el CMI?",options:["Desarrollo de competencias, innovación y capacitación del personal.","Solo ingresos financieros.","Cantidad de oficinas corporativas.","Número de productos almacenados."],correct:0,difficulty:"hard",justification:"La respuesta correcta es la a, porque la perspectiva de aprendizaje mide capacidades que impulsan el crecimiento estratégico."}
];

/* ══ CONFIG ══ */
const PRIZES  = ['$100','$200','$300','$500','$1.000','$2.000','$4.000','$8.000','$16.000','$32.000','$64.000','$125.000','$250.000','$500.000','$1.000.000'];
const LETTERS = ['A','B','C','D'];
const DIFF_LABEL = { easy:'Fácil', medium:'Media', hard:'Difícil' };
const DIFF_CLASS = { easy:'diff-easy', medium:'diff-medium', hard:'diff-hard' };

let currentIdx = 0, score = 0, shuffled = [], gameRunning = false;
let lifeline5050Used = false;

/* ══ TABS ══ */
function switchTab(t) {
  document.getElementById('tab-play-btn').classList.toggle('active', t==='play');
  document.getElementById('tab-edit-btn').classList.toggle('active', t==='edit');
  document.getElementById('play-tab').classList.toggle('active', t==='play');
  document.getElementById('edit-tab').classList.toggle('active', t==='edit');
  if (t==='edit') renderEditor();
}

/* ══ MENU ══ */
function showMenu() {
  document.getElementById('menu-total').textContent = questions.length;
  ['game-screen','result-screen'].forEach(id => document.getElementById(id).style.display='none');
  document.getElementById('menu-screen').style.display='block';
}

/* ══ GAME ══ */
function startGame() {
  if (!questions.length) { alert('No hay preguntas cargadas.'); return; }
  shuffled = [...questions].sort(() => Math.random()-0.5);
  currentIdx = 0; score = 0; gameRunning = true;
  lifeline5050Used = false;
  document.getElementById('menu-screen').style.display='none';
  document.getElementById('result-screen').style.display='none';
  document.getElementById('game-screen').style.display='block';
  updateLifelineUI();
  renderQ();
}

function updateLifelineUI() {
  const btn = document.getElementById('ll-5050');
  btn.disabled = lifeline5050Used;
  btn.classList.toggle('used', lifeline5050Used);
}

function renderPrize() {
  const bar = document.getElementById('prize-ladder');
  bar.innerHTML = '';
  const steps = Math.min(shuffled.length, PRIZES.length);
  for (let i=0; i<steps; i++) {
    const c = document.createElement('div');
    c.className = 'prize-chip' + (i===currentIdx?' current':(i<currentIdx?' done':''));
    c.textContent = PRIZES[i];
    bar.appendChild(c);
  }
}

function renderQ() {
  const q = shuffled[currentIdx];
  const total = shuffled.length;

  const pct = Math.round((currentIdx/total)*100);
  document.getElementById('prog-fill').style.width = pct+'%';
  document.getElementById('prog-text').textContent = `Pregunta ${currentIdx+1}`;
  document.getElementById('prog-pct').textContent = pct+'%';

  document.getElementById('q-num-label').textContent = `Pregunta ${currentIdx+1} de ${total}`;
  const db = document.getElementById('diff-badge');
  db.textContent = DIFF_LABEL[q.difficulty]||'Media';
  db.className = 'diff-badge ' + (DIFF_CLASS[q.difficulty]||'diff-medium');

  document.getElementById('q-text').textContent = q.text;

  const grid = document.getElementById('opts-grid');
  grid.innerHTML = '';
  q.options.forEach((opt,i) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.id = `opt-${i}`;
    btn.innerHTML = `<span class="opt-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.onclick = () => selectAnswer(i, btn);
    grid.appendChild(btn);
  });

  const fb = document.getElementById('feedback');
  fb.className = 'feedback';
  document.getElementById('next-btn').style.display='none';
  updateLifelineUI();
  renderPrize();
}

function selectAnswer(idx, clickedBtn) {
  if (!gameRunning) return;
  const q = shuffled[currentIdx];
  document.querySelectorAll('.opt-btn').forEach(b => b.disabled=true);

  const fb = document.getElementById('feedback');
  const correct = idx === q.correct;

  if (correct) {
    clickedBtn.classList.add('correct');
    fb.className = 'feedback ok show';
    document.getElementById('fb-icon').textContent = '✓';
    document.getElementById('fb-verdict').textContent = '¡Correcto!';
    score++;
  } else {
    clickedBtn.classList.add('wrong');
    document.getElementById(`opt-${q.correct}`).classList.add('correct');
    fb.className = 'feedback bad show';
    document.getElementById('fb-icon').textContent = '✗';
    document.getElementById('fb-verdict').textContent = 'Incorrecto';
  }
  document.getElementById('fb-answer').textContent = `${LETTERS[q.correct]}`;
  document.getElementById('fb-just').textContent = q.justification;

  const nb = document.getElementById('next-btn');
  nb.style.display = 'block';
  nb.textContent = currentIdx+1 < shuffled.length ? 'Siguiente pregunta →' : 'Ver resultados →';
}

/* ══ 50/50 COMODÍN ══ */
function use5050() {
  if (lifeline5050Used || !gameRunning) return;

  const q = shuffled[currentIdx];
  const correct = q.correct;

  // Get all wrong option indices
  const wrongOpts = [0,1,2,3].filter(i => i !== correct);
  // Shuffle and pick 2 to eliminate
  wrongOpts.sort(() => Math.random()-0.5);
  const toEliminate = wrongOpts.slice(0,2);

  // Animate elimination
  toEliminate.forEach((i, idx) => {
    setTimeout(() => {
      const btn = document.getElementById(`opt-${i}`);
      if (btn) {
        btn.classList.add('hiding');
        setTimeout(() => btn.classList.add('hidden-5050'), 500);
      }
    }, idx * 300);
  });

  lifeline5050Used = true;
  updateLifelineUI();

  // Show toast
  const toast = document.getElementById('ll-toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function nextQ() {
  currentIdx++;
  if (currentIdx >= shuffled.length) { showResult(); return; }
  renderQ();
}

function showResult() {
  gameRunning = false;
  document.getElementById('game-screen').style.display='none';
  document.getElementById('result-screen').style.display='block';
  const total = shuffled.length;
  const pct = Math.round((score/total)*100);
  const circle = document.getElementById('res-circle');
  circle.className = 'result-circle ' + (pct>=60?'win':'lose');
  circle.textContent = pct>=80?'🏆':pct>=60?'🌟':'📚';
  document.getElementById('res-score').textContent = `${score}/${total}`;
  document.getElementById('res-pct').textContent = `${pct}% de respuestas correctas`;
  document.getElementById('res-msg').textContent = pct>=80?'¡Excelente dominio del tema!':pct>=60?'Buen desempeño, sigue reforzando.':'Revisa los temas y vuelve a intentarlo.';
  document.getElementById('rs-ok').textContent = score;
  document.getElementById('rs-bad').textContent = total-score;
  document.getElementById('rs-total').textContent = total;
}

function confirmExit() {
  if (confirm('¿Seguro que deseas salir? Se perderá el progreso actual.')) {
    gameRunning = false;
    showMenu();
  }
}

/* ══ EDITOR ══ */
function renderEditor() {
  document.getElementById('editor-count').textContent = `Preguntas: ${questions.length}`;
  const list = document.getElementById('editor-list');
  list.innerHTML = '';
  questions.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'eq-card';
    const optsHtml = q.options.map((o,oi) => `
      <div>
        <label style="margin-top:0;">${LETTERS[oi]})</label>
        <input type="text" value="${esc(o)}" oninput="questions[${qi}].options[${oi}]=this.value;updateSelect(${qi})">
      </div>`).join('');
    const selectOpts = q.options.map((o,oi) =>
      `<option value="${oi}" ${q.correct===oi?'selected':''}>${LETTERS[oi]}) ${esc(o)}</option>`).join('');
    card.innerHTML = `
      <div class="eq-header">
        <span class="eq-num">PREGUNTA ${qi+1}</span>
        <button class="eq-del" onclick="delQ(${qi})">✕ Eliminar</button>
      </div>
      <label>Enunciado</label>
      <textarea rows="3" oninput="questions[${qi}].text=this.value">${esc(q.text)}</textarea>
      <label>Opciones</label>
      <div class="opts-2col">${optsHtml}</div>
      <label>Respuesta correcta</label>
      <select id="sel-${qi}" onchange="questions[${qi}].correct=parseInt(this.value)">${selectOpts}</select>
      <label>Justificación</label>
      <textarea rows="3" oninput="questions[${qi}].justification=this.value">${esc(q.justification)}</textarea>
      <label>Dificultad</label>
      <select onchange="questions[${qi}].difficulty=this.value">
        <option value="easy"   ${q.difficulty==='easy'?'selected':''}>Fácil</option>
        <option value="medium" ${q.difficulty==='medium'?'selected':''}>Media</option>
        <option value="hard"   ${q.difficulty==='hard'?'selected':''}>Difícil</option>
      </select>`;
    list.appendChild(card);
  });
}

function updateSelect(qi) {
  const sel = document.getElementById('sel-'+qi);
  if (!sel) return;
  sel.innerHTML = questions[qi].options.map((o,oi) =>
    `<option value="${oi}" ${questions[qi].correct===oi?'selected':''}>${LETTERS[oi]}) ${esc(o)}</option>`).join('');
}

function addQ() {
  questions.push({ text:'', options:['','','',''], correct:0, difficulty:'medium', justification:'' });
  renderEditor();
  setTimeout(() => { const l = document.getElementById('editor-list'); l.scrollTop = l.scrollHeight; }, 80);
}

function delQ(qi) {
  if (questions.length<=1) { alert('Debe haber al menos una pregunta.'); return; }
  if (confirm('¿Eliminar esta pregunta?')) { questions.splice(qi,1); renderEditor(); }
}

function saveAndPlay() {
  const incomplete = questions.filter(q => !q.text.trim() || q.options.some(o=>!o.trim()) || !q.justification.trim());
  if (incomplete.length) { alert(`Hay ${incomplete.length} pregunta(s) con campos vacíos.`); return; }
  switchTab('play');
  startGame();
}

function esc(s) {
  return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ══ INIT ══ */
showMenu();