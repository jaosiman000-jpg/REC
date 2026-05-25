// Reconquista Magnética - Embudo de Quiz y Ventas
// JavaScript Puro (Vanilla JS) para Control de Flujo, Estados e Interactividad

// Configuración de Pasos del Embudo (23 etapas)
const steps = [
  { type: "intro" },
  {
    type: "options",
    question: "¿Qué edad tienes?",
    hint: "Elige la opción a continuación",
    options: [
      { label: "18 a 24 años" },
      { label: "25 a 34 años" },
      { label: "35 a 44 años" },
      { label: "45 a 54 años" },
      { label: "55+" }
    ]
  },
  {
    type: "options",
    question: "¿Hace cuánto tiempo terminaron?",
    options: [
      { label: "Hace pocos días" },
      { label: "Hace algunas semanas" },
      { label: "Hace algunos meses" },
      { label: "Hace más de 1 año" }
    ]
  },
  {
    type: "options",
    question: "¿Hoy todavía tienes algún contacto con tu ex?",
    options: [
      { label: "Sí, de vez en cuando", emoji: "🫠" },
      { label: "Sí, pero es distante/frío", emoji: "🥶" },
      { label: "No, me bloqueó o se alejó totalmente", emoji: "🚫" }
    ]
  },
  {
    type: "options",
    question: "¿Ya has intentado de alguna forma reconquistar a tu ex?",
    options: [
      { label: "Sí, pero no funcionó", emoji: "😪" },
      { label: "Sí, pero solo empeoró la situación", emoji: "😣" },
      { label: "No lo he intentado aún, pero quiero mucho", emoji: "🤩" }
    ]
  },
  { type: "story" },
  {
    type: "multi",
    question: "¿Qué es lo que te hace sufrir más?",
    hint: 'Puedes marcar más de una, y haz clic en "Continuar Prueba"',
    options: [
      { label: "Verlo con otra como si yo hubiera sido reemplazada" },
      { label: "Sentir que no fui suficiente para él" },
      { label: "No recibir mensajes suyos o que no me responda" },
      { label: "Haber sido bloqueada por él" },
      { label: "Verlo seguir con su vida como si yo nunca hubiera existido" },
      { label: "Extrañarlo mucho y pensar en él todos los días" },
      { label: "Tener miedo de nunca más tenerlo de vuelta" },
      { label: "Saber que aún hay algo entre nosotros" },
      { label: "No poder concentrarme en nada, estudios, trabajo, solo pienso en él" }
    ]
  },
  {
    type: "multi",
    question: "¿Ya has pasado por alguna de estas situaciones con él?",
    hint: "Puedes marcar más de una",
    options: [
      { label: "Me ignora incluso cuando intento hablar" },
      { label: "Aparece solo cuando quiere algo y luego desaparece" },
      { label: "Fui bloqueada sin explicación" },
      { label: "Finge que yo no existo" }
    ]
  },
  {
    type: "options",
    question: "¿Qué piensas en relación a la ruptura?",
    options: [
      { label: "Siento que no fui suficiente para él", emoji: "😭" },
      { label: "Creo que encontró a alguien mejor", emoji: "🙁" },
      { label: "Siento que perdí mi valor ante sus ojos", emoji: "🥺" }
    ]
  },
  { type: "urgency" },
  {
    type: "multi",
    question: "¿Cuál es tu mayor temor en relación a él?",
    hint: "Puedes marcar más de una",
    options: [
      { label: "Que se olvide totalmente de mí para siempre" },
      { label: "Verlo casándose y formando una familia con otra" },
      { label: "Nunca más sentirme amada por él" },
      { label: "Sentir que perdí al amor de mi vida" },
      { label: "Sentirme culpable por no haber hecho nada para que volviera" }
    ]
  },
  { type: "loading" },
  { type: "presentation" },
  {
    type: "options",
    question: "¿Crees que cuando dos personas ya tuvieron una relación verdadera, esa conexión nunca desaparece por completo,",
    highlight: "solo queda dormida?",
    options: [
      { label: "Sí, ¡creo totalmente en eso!" },
      { label: "Sí, ¡y quiero reavivar esa conexión!" }
    ]
  },
  {
    type: "options",
    question: "Si pudieras reactivar en el subconsciente de tu ex las mismas sensaciones de",
    highlight: "deseo y nostalgia que sentía al principio,",
    questionAfter: "¿te gustaría aprender?",
    options: [
      { label: "Sí, esto cambiará todo para mí", emoji: "😍" },
      { label: "Sí, estoy dispuesta a aplicarlo hoy mismo", emoji: "🤩" }
    ]
  },
  {
    type: "options",
    question: "¿Qué tan importante es para ti resolver esto ahora?",
    options: [
      { label: "Muy importante, no aguanto más esperarlo", emoji: "‼️" },
      { label: "Crucial, necesito cambiar esto rápido", emoji: "⏰" }
    ]
  },
  {
    type: "options",
    question: "¿Cómo te gustaría que fuera tu vida amorosa",
    highlight: "después de reconquistarlo?",
    options: [
      { label: "Tenerlo de vuelta todos los días a mi lado", emoji: "😍" },
      { label: "Sentir que me valora y me elige de nuevo", emoji: "🥰" },
      { label: "Empezar de cero y construir una nueva etapa juntos", emoji: "👫" }
    ]
  },
  { type: "video" },
  { type: "private-plan" },
  { type: "responsibility" },
  { type: "diagnostic-loading" },
  { type: "final-video" },
  { type: "sales" }
];

// Estado de la Aplicación
let currentStepIndex = 0;
let userAnswers = {};
let selectedMultiOptions = [];
let videoIntervals = {};
let currentCarouselIndex = 0;

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Configurar botón volver
  const btnBack = document.getElementById("btn-back");
  if (btnBack) {
    btnBack.addEventListener("click", goBack);
  }

  // Renderizar el primer paso
  renderStep();
});

// Renderización de los Pasos
function renderStep() {
  const container = document.getElementById("quiz-container");
  if (!container) return;

  // Desplazarse al inicio de la página instantáneamente para no entorpecer la animación
  window.scrollTo(0, 0);

  const step = steps[currentStepIndex];

  // Actualizar cabecera (Botón volver y Progreso)
  updateHeader();

  // Limpiar contenedor y generar HTML dinámico
  container.innerHTML = "";

  switch (step.type) {
    case "intro":
      container.innerHTML = renderIntro();
      break;
    case "options":
      container.innerHTML = renderOptions(step);
      break;
    case "multi":
      // Resetear selecciones temporarias para este paso
      selectedMultiOptions = userAnswers[currentStepIndex] || [];
      container.innerHTML = renderMulti(step);
      break;
    case "story":
      container.innerHTML = renderStory();
      break;
    case "urgency":
      container.innerHTML = renderUrgency();
      break;
    case "loading":
      container.innerHTML = renderLoading();
      runLoadingBar(3000, "Analizando respuestas...", goNext);
      break;
    case "presentation":
      container.innerHTML = renderPresentation();
      break;
    case "video":
      container.innerHTML = renderVideoScreen();
      initVturbTestimonialPlayer();
      break;
    case "private-plan":
      container.innerHTML = renderPrivatePlan();
      break;
    case "responsibility":
      container.innerHTML = renderResponsibility();
      break;
    case "diagnostic-loading":
      container.innerHTML = renderDiagnosticLoading();
      runDiagnosticLoadingBar();
      break;
    case "final-video":
      container.innerHTML = renderFinalVideoScreen();
      initVturbVslPlayer();
      runFinalVideoDelay();
      break;
    case "sales":
      container.innerHTML = renderSalesScreen();
      break;
  }
}

// Actualizar cabecera (Botón Volver y Progreso)
function updateHeader() {
  const btnBack = document.getElementById("btn-back");
  const progressBar = document.getElementById("progress-bar");

  // Mostrar/Ocultar botón volver
  if (btnBack) {
    if (currentStepIndex > 0 && currentStepIndex < steps.length - 1) {
      btnBack.classList.remove("pointer-events-none", "opacity-0");
    } else {
      btnBack.classList.add("pointer-events-none", "opacity-0");
    }
  }

  // Actualizar barra de progreso
  if (progressBar) {
    const totalSteps = steps.length;
    const progressPct = ((currentStepIndex + 1) / totalSteps) * 100;
    progressBar.style.width = `${progressPct}%`;
  }
}

// Navegación
function transitionStep(action) {
  const container = document.getElementById("quiz-container");
  if (!container) {
    action();
    return;
  }
  
  container.classList.add("transition-fade-out");
  
  setTimeout(() => {
    action();
    window.scrollTo(0, 0);
    container.classList.remove("transition-fade-out");
  }, 180);
}

function goNext(answerValue = undefined) {
  if (answerValue !== undefined) {
    userAnswers[currentStepIndex] = answerValue;
  }
  
  if (currentStepIndex < steps.length - 1) {
    transitionStep(() => {
      currentStepIndex++;
      renderStep();
    });
  }
}

function goBack() {
  if (currentStepIndex > 0) {
    transitionStep(() => {
      currentStepIndex--;
      renderStep();
    });
  }
}

// Generadores de HTML para los Componentes/Etapas

// 0. Intro Screen
function renderIntro() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h1 class="quiz-title">¡No dejes que se vaya <span class="text-primary">para siempre!</span></h1>
      <p class="mt-4 text-lg font-bold text-foreground">Prueba rápida de 1 minuto:</p>
      
      <div class="mt-6">
        <img src="casal-hero.jpg" alt="Pareja reconquistada" class="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg" style="aspect-ratio: 4/5; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);" />
      </div>
      
      <button onclick="goNext()" class="animate-cta-3d mt-6 w-full rounded-2xl bg-primary px-6 py-5 text-lg font-extrabold uppercase tracking-wide text-primary-foreground">
        INICIAR PRUEBA GRATUITA
      </button>
      
      <div class="attention-box">
        <p class="attention-title">⚠️ ATENCIÓN</p>
        <p class="attention-desc">¡Solo continúa si realmente quieres que vuelva a tu vida!</p>
      </div>
    </div>
  `;
}

// 1. Options Question Screen (Single select)
function renderOptions(step) {
  const optionsHtml = step.options.map(opt => {
    let indicatorHtml = "";
    if (opt.emoji) {
      indicatorHtml = `<span class="option-emoji">${opt.emoji}</span>`;
    } else {
      indicatorHtml = `
        <span class="option-circle">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      `;
    }

    return `
      <button onclick="goNext('${opt.label}')" class="option-button group">
        ${indicatorHtml}
        <span class="option-label">${opt.label}</span>
      </button>
    `;
  }).join("");

  return `
    <div class="flex flex-col items-center pt-6 animate-fade-in">
      <h2 class="text-center text-2xl font-extrabold sm:text-3xl">
        ${step.question}
        ${step.highlight ? `<span class="highlight-badge">${step.highlight}</span>` : ""}
        ${step.questionAfter ? ` ${step.questionAfter}` : ""}
      </h2>
      ${step.hint ? `<p class="mt-2 text-center text-base text-muted-foreground">${step.hint}</p>` : ""}
      
      <div class="options-grid">
        ${optionsHtml}
      </div>
    </div>
  `;
}

// 2. Multi-select Question Screen
function renderMulti(step) {
  const optionsHtml = step.options.map(opt => {
    const isSelected = selectedMultiOptions.includes(opt.label);
    const selectedClass = isSelected ? "selected" : "";
    const checkmarkHtml = isSelected ? `
      <svg class="checkbox-checkmark" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ` : "";

    return `
      <button onclick="toggleMultiOption('${opt.label}')" class="checkbox-button ${selectedClass}">
        <span class="checkbox-box">
          ${checkmarkHtml}
        </span>
        <span class="checkbox-label">${opt.label}</span>
      </button>
    `;
  }).join("");

  const disableContinue = selectedMultiOptions.length === 0 ? "disabled" : "";

  return `
    <div class="flex flex-col animate-fade-in" id="multi-container">
      <h2 class="text-2xl font-extrabold sm:text-3xl">${step.question}</h2>
      <p class="mt-2 text-center text-base text-muted-foreground">
        Puedes marcar más de una, y haz clic en <span class="font-bold text-primary">"Continuar Prueba"</span>
      </p>
      
      <div class="mt-6 flex flex-col gap-3">
        ${optionsHtml}
      </div>
      
      <button onclick="submitMulti()" ${disableContinue} class="btn-continue" id="btn-multi-continue">
        Continuar prueba
      </button>
    </div>
  `;
}

// Toggle multi-select options
window.toggleMultiOption = function(label) {
  const index = selectedMultiOptions.indexOf(label);
  if (index > -1) {
    selectedMultiOptions.splice(index, 1);
  } else {
    selectedMultiOptions.push(label);
  }

  // Re-render multi-select step content to avoid total wipeout
  const step = steps[currentStepIndex];
  const container = document.getElementById("quiz-container");
  if (container) {
    container.innerHTML = renderMulti(step);
  }
};

window.submitMulti = function() {
  if (selectedMultiOptions.length > 0) {
    goNext(selectedMultiOptions);
  }
};

// 3. Story Screen
function renderStory() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-3xl font-extrabold leading-tight text-primary">💡 La verdad detrás de la reconquista:</h2>
      <p class="mt-4 text-center text-lg">Existe un ciclo en el cerebro que, si se reactiva, puede hacer que vuelva contigo...</p>
      <p class="mt-6 text-center text-xl font-extrabold">Un estudio difundido por Harvard Medical School y publicado por BBC Mundo reveló algo sorprendente...</p>
      
      <div class="mt-6">
        <img src="bbc-news.jpg" alt="BBC Mundo artículo" class="w-full rounded-2xl shadow-lg" style="width: 100%; height: auto; border-radius: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);" />
      </div>
      
      <p class="mt-6 text-center text-lg">Existen cuatro <span class="font-bold text-primary">zonas específicas en el cerebro masculino</span> que son cruciales para la química de las parejas...</p>
      <p class="mt-4 text-center text-lg">Estas zonas son conocidas como el <span class="font-bold text-primary">ciclo A.R.E.A.</span></p>
      <p class="mt-4 text-center text-lg">Son responsables de los sentimientos más profundos de amor y placer en un hombre.</p>
      
      <div class="mx-auto mt-6 grid grid-max-width grid-cols-2 gap-3">
        <img src="sinapse.jpg" alt="Sinapsis cerebral" class="aspect-square w-full rounded-2xl object-cover shadow-md" style="aspect-ratio: 1/1; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
        <img src="neuronio.jpg" alt="Conexión neuronal" class="aspect-square w-full rounded-2xl object-cover shadow-md" style="aspect-ratio: 1/1; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
      </div>
      
      <p class="mt-6 text-center text-lg">Sin embargo, con el tiempo, la rutina cansadora, el estrés, la falta de novedades en la relación, los desacuerdos constantes, <strong>estas se van debilitando...</strong></p>
      <p class="mt-4 text-center text-lg">Pero cuando aprendes a <strong>reactivar y estimular</strong> este ciclo, tocas áreas de su cerebro que le recuerdan a ti, <span class="font-bold text-primary">así vuelve a estar totalmente obsesionado contigo,</span> ¡dispuesto a hacer todo para volver a estar a tu lado!</p>
      <p class="mt-4 text-center text-lg font-extrabold">¡Y yo estoy aquí para enseñarte a reactivar ese ciclo!</p>
      
      <button onclick="goNext()" class="btn-success-cta mt-8 animate-cta-3d">
        Continuar Prueba
      </button>
    </div>
  `;
}

// 4. Urgency Screen
function renderUrgency() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-3xl font-extrabold uppercase leading-tight text-primary sm:text-4xl">¡Necesitas actuar AHORA!</h2>
      <p class="mt-3 text-xl font-bold">¡O puedes perderlo para siempre!</p>
      
      <div class="mt-6">
        <img src="hombre-triste.jpg" alt="Hombre triste" class="aspect-square w-full rounded-2xl object-cover shadow-lg" style="aspect-ratio: 1/1; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);" />
      </div>
      
      <p class="mt-6 text-center text-lg">Cada día que pasa sin hacer nada o tomando decisiones equivocadas reduce tus posibilidades de reconquistarlo...</p>
      <p class="mt-4 text-center">
        <span class="inline-block rounded-md bg-destructive px-3 py-2 text-lg font-bold text-destructive-foreground">
          ¡Y corres el riesgo de perderlo para siempre!
        </span>
      </p>
      
      <button onclick="goNext()" class="btn-success-cta mt-8 animate-cta-3d">
        Continuar Prueba
      </button>
    </div>
  `;
}

// 5. Loading / Analysis Screen
function renderLoading() {
  return `
    <div class="flex flex-1 flex-col items-center justify-center pb-20 text-center animate-fade-in">
      <h2 class="text-3xl font-extrabold">Cargando...</h2>
      <div class="mt-10 text-6xl font-extrabold text-primary" id="loading-percentage">0%</div>
      
      <div class="mt-8 h-2 w-full max-w-sm overflow-hidden rounded-full bg-primary-soft">
        <div class="h-full rounded-full bg-primary transition-all duration-150" id="loading-progress-bar" style="width: 0%;"></div>
      </div>
      
      <p class="mt-6 text-base text-muted-foreground" id="loading-subtext">Analizando respuestas...</p>
    </div>
  `;
}

function runLoadingBar(duration, text, onDone) {
  let progress = 0;
  const pctEl = document.getElementById("loading-percentage");
  const barEl = document.getElementById("loading-progress-bar");
  const subtextEl = document.getElementById("loading-subtext");

  if (subtextEl) subtextEl.innerText = text;

  const intervalTime = 50;
  const increment = (100 / (duration / intervalTime));

  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      if (pctEl) pctEl.innerText = "100%";
      if (barEl) barEl.style.width = "100%";
      setTimeout(onDone, 500);
    } else {
      if (pctEl) pctEl.innerText = `${Math.floor(progress)}%`;
      if (barEl) barEl.style.width = `${progress}%`;
    }
  }, intervalTime);
}

// 6. Presentation Screen
function renderPresentation() {
  const items = [
    { pct: "3%", day: "Hoy", text: "Comienza a pensar en ti", colorClass: "pill-today" },
    { pct: "43%", day: "Día 8", text: "Ya no puede imaginarse sin ti", colorClass: "pill-day8" },
    { pct: "96%", day: "Día 12", text: "Te rogará para volver", colorClass: "pill-day12" }
  ];

  const itemsHtml = items.map(item => `
    <div class="plan-item-card">
      <div class="plan-item-pct">
        ${item.pct}
      </div>
      <div class="plan-item-content">
        <div class="plan-item-pill ${item.colorClass}">
          ${item.day}
        </div>
        <div class="plan-item-desc">${item.text}</div>
      </div>
    </div>
  `).join("");

  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-2xl font-extrabold leading-tight text-primary sm:text-3xl">¡Gracias por tus respuestas! Estoy aquí para ayudarte</h2>
      <p class="mt-6 text-base">Mucho gusto, soy <strong>Martina Alves</strong>, psicóloga con especialización en Neurociencia del Comportamiento y Ciencia del Apego.</p>
      
      <div class="mt-6">
        ${renderImagePlaceholder("Imagen: Martina Alves", "aspect-square w-full max-w-[240px] mx-auto rounded-xl")}
      </div>
      
      <p class="mt-6 text-base">Ya he ayudado a <strong>más de 5,300 mujeres</strong> a recuperar sus relaciones utilizando inteligencia emocional y ciencia. <span class="font-bold text-primary">Sin jueguitos, desapariciones ni fórmulas vacías.</span></p>
      
      <p class="mt-4 text-base">Lo que realmente funciona es <span class="font-bold text-primary">entender como el cerebro masculino procesa las emociones.</span> Existen <strong>cuatro áreas en el cerebro</strong> responsables del placer y vínculo emocional que son la clave, las cuales pueden apagarse con el tiempo.</p>
      <p class="mt-4 text-base">Cuando las reactivas de la manera correcta, él comienza a sentir <strong>nostalgia, arrepentimiento y ganas de acercarse nuevamente...</strong> incluso sin saber exactamente por qué.</p>
      <p class="mt-4 text-base">Este método tiene comprobación científica, tiene garantía y genera resultados. <strong>Si sigues el paso a paso,</strong> existen probabilidades de que te busque esta misma semana, y sienta una conexión tan fuerte que no podrá sacarte de su cabeza ni por un momento.</p>
      
      <p class="mt-6 text-center text-lg font-bold sm:text-xl">De acuerdo con tus respuestas, identificamos que tu plan ideal de reconquista es de <span class="text-primary">12 días</span>:</p>
      
      <div class="mt-6 flex flex-col gap-4">
        ${itemsHtml}
      </div>
      
      <div class="warning-alert-box">
        <svg class="mt-0.5 h-5 w-5 shrink-0 text-destructive" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <div>
          <div class="warning-alert-title">Atención</div>
          <p class="warning-alert-desc">Aunque tienes un gran potencial para reconquistarlo, tu éxito depende de seguir el plan fielmente para lograr los resultados deseados.</p>
        </div>
      </div>
      
      <button onclick="goNext()" class="btn-success-cta mt-8 animate-cta-3d">
        CONTINUAR PRUEBA
      </button>
    </div>
  `;
}

// 7. Video screen (first video)
function renderVideoScreen() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-2xl font-extrabold leading-tight text-primary sm:text-3xl">¡Mira lo que ella logró, incluso con su ex sin siquiera mirarla a la cara!</h2>
      <p class="mt-3 text-center text-base text-foreground">El 93% de las mujeres vieron resultados notables en los <strong>primeros días aplicando el método...</strong></p>
      
      <div class="mt-6" style="width: 100%; max-width: 420px; margin: 0 auto; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.4);">
        <vturb-smartplayer id="vid-6a144f4bb76950cfcfb3e729" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>
      </div>
      
      <!-- Depoimentos Carousel -->
      ${renderTestimonialsCarousel()}
      
      <p class="mt-6 text-center text-xl font-extrabold text-primary">¿Tú también quieres vivir esto?</p>
      
      <button onclick="goNext()" class="btn-success-cta mt-6 animate-cta-3d">
        ¡SÍ! LO QUIERO Y ESTOY LISTA
      </button>
    </div>
  `;
}

// Inicializar el player de VTurb de manera dinámica al renderizar el paso
function initVturbTestimonialPlayer() {
  // Remover script anterior para evitar duplicidad si el usuario va y vuelve de pantalla
  const existingScript = document.getElementById("vturb-testimonial-script");
  if (existingScript) {
    existingScript.remove();
  }

  // Crear y agregar el script de VTurb al head de forma dinámica
  const s = document.createElement("script");
  s.id = "vturb-testimonial-script";
  s.type = "text/javascript";
  s.src = "https://scripts.converteai.net/4f709ec3-848b-43ff-bdb3-b7acf251c613/players/6a144f4bb76950cfcfb3e729/v4/player.js";
  s.async = true;
  document.head.appendChild(s);
}

// 8. Private Plan Screen
function renderPrivatePlan() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-2xl font-extrabold leading-tight sm:text-3xl">
        El siguiente paso es solo para quienes desean un plan secreto, personalizado y comprobado 
        <span class="text-primary">para hacer que su ex le ruegue por volver</span>
      </h2>
      
      <div class="mt-6">
        <img src="whatsapp-ex.jpg" alt="WhatsApp del ex" class="aspect-square w-full rounded-2xl object-cover shadow-lg" style="aspect-ratio: 1/1; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);" />
      </div>
      
      <p class="mt-6 text-center text-xl font-extrabold">¿Quieres recibir un mensaje como este?</p>
      
      <button onclick="goNext()" class="btn-success-cta mt-6 animate-cta-3d">
        ¡SÍ, LO QUIERO DE VUELTA!
      </button>
    </div>
  `;
}

// 9. Responsibility Screen
function renderResponsibility() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-2xl font-extrabold leading-tight sm:text-3xl">
        El Código de Reactivación Emocional es algo
        <span class="bg-primary-soft px-1 text-primary">poderoso y debe usarse con responsabilidad!</span>
        ¡Solo úsalo para reactivar el vínculo con quien <strong>realmente amas!</strong>
      </h2>
      
      <div class="mt-6">
        <img src="casal-abracado.jpg" alt="Pareja abrazada" class="aspect-square w-full rounded-2xl object-cover shadow-lg" style="aspect-ratio: 1/1; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);" />
      </div>
      
      <p class="mt-6 text-center text-xl font-extrabold">¿Prometes usarlo con responsabilidad?</p>
      
      <button onclick="goNext()" class="btn-success-cta mt-6 animate-cta-3d">
        ¡SÍ, LO USARÉ CON LA PERSONA CORRECTA!
      </button>
    </div>
  `;
}

// 10. Diagnostic-loading screen
function renderDiagnosticLoading() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-3xl font-extrabold leading-tight text-primary sm:text-4xl">¡Tu diagnóstico está listo!</h2>
      <p class="mt-4 text-center text-lg font-bold">¡Pero antes de liberarlo, necesito mostrarte algo importante!</p>
      
      <div class="mt-6 rounded-2xl bg-success/10 p-5 text-center">
        <div class="text-lg font-extrabold text-success">⚠️ ¡AVISO IMPORTANTE!</div>
        <p class="mt-3 text-base text-success">De acuerdo con tus respuestas, él <strong>no</strong> se alejó porque se acabó el sentimiento o porque tiene a otra.</p>
        <p class="mt-3 text-base text-success">Solo se alejó porque su cerebro <strong>dejó de asociarte con la recompensa emocional.</strong></p>
      </div>
      
      <div class="mt-8 flex items-center justify-between">
        <span class="font-extrabold">Finalizando tu protocolo...</span>
        <span class="font-extrabold" id="diag-percentage">0%</span>
      </div>
      
      <div class="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted">
        <div class="h-full rounded-full bg-primary transition-all duration-150" id="diag-progress-bar" style="width: 0%;"></div>
      </div>
      
      <div class="mt-6 flex flex-col gap-4 text-center text-base text-foreground" id="diag-status-lines">
        <!-- Status lines will appear sequentially here -->
      </div>
    </div>
  `;
}

function runDiagnosticLoadingBar() {
  const statusLines = [
    "Analizando patrones de la relación...",
    "Cruzando comportamientos emocionales...",
    "Identificando señales ocultas...",
    "Concluyendo presentación..."
  ];

  let progress = 0;
  const pctEl = document.getElementById("diag-percentage");
  const barEl = document.getElementById("diag-progress-bar");
  const statusContainer = document.getElementById("diag-status-lines");

  const duration = 8000; // 8 seconds
  const intervalTime = 50;
  const increment = (100 / (duration / intervalTime));
  
  // Show status lines sequentially
  let currentLineIndex = 0;
  
  const statusTimer = setInterval(() => {
    if (currentLineIndex < statusLines.length) {
      const p = document.createElement("div");
      p.className = "animate-fade-in font-bold text-muted-foreground";
      p.innerText = statusLines[currentLineIndex];
      if (statusContainer) statusContainer.appendChild(p);
      currentLineIndex++;
    } else {
      clearInterval(statusTimer);
    }
  }, 2000);

  const timer = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(timer);
      if (pctEl) pctEl.innerText = "100%";
      if (barEl) barEl.style.width = "100%";
      setTimeout(goNext, 800);
    } else {
      if (pctEl) pctEl.innerText = `${Math.floor(progress)}%`;
      if (barEl) barEl.style.width = `${progress}%`;
    }
  }, intervalTime);
}

// 11. Final Video Screen
function renderFinalVideoScreen() {
  return `
    <div class="flex flex-col animate-fade-in">
      <h2 class="text-3xl font-extrabold leading-tight text-primary sm:text-4xl">¡El problema es el Síndrome de Saturación Emocional!</h2>
      <p class="mt-3 text-center text-lg font-bold">Mira el video a continuación para entender cómo resolverlo 👇</p>
      
      <div class="mt-6" style="width: 100%; max-width: 480px; margin: 0 auto; border-radius: 18px; overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.4);">
        <vturb-smartplayer id="vid-6a1450cd93af3c4030723b94" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>
      </div>
      
      <div class="mt-6" id="diagnostic-button-container" style="display: none;">
        <button onclick="goNext()" class="w-full rounded-full bg-primary px-6 py-4 text-lg font-bold uppercase text-primary-foreground shadow-lg transition hover:opacity-95 animate-fade-in">
          ACCEDER AL DIAGNÓSTICO
        </button>
      </div>
    </div>
  `;
}

// Inicializar el player de VTurb de manera dinámica al renderizar la VSL principal
function initVturbVslPlayer() {
  // Remover script anterior para evitar duplicidad si el usuario va y vuelve de pantalla
  const existingScript = document.getElementById("vturb-vsl-script");
  if (existingScript) {
    existingScript.remove();
  }

  // Crear y agregar el script de VTurb al head de forma dinâmica
  const s = document.createElement("script");
  s.id = "vturb-vsl-script";
  s.type = "text/javascript";
  s.src = "https://scripts.converteai.net/4f709ec3-848b-43ff-bdb3-b7acf251c613/players/6a1450cd93af3c4030723b94/v4/player.js";
  s.async = true;
  document.head.appendChild(s);
}

function runFinalVideoDelay() {
  const isTest = new URLSearchParams(window.location.search).get("test") === "true";
  const delay = isTest ? 3000 : 255000; // 3 segundos para pruebas, de lo contrario 4 min 15 seg (255000ms)
  setTimeout(showDiagnosticButton, delay);
}

function showDiagnosticButton() {
  const container = document.getElementById("diagnostic-button-container");
  if (container) {
    container.style.display = "block";
    container.scrollIntoView({ behavior: "smooth" });
  }
}

// 12. Sales/Offer Screen
function renderSalesScreen() {
  const comparisonList = [
    { title: "Él se arrepentirá", img: "Imagen 16 — hombre pensativo", paragraphs: ["Parece que te superó, pero todavía te desea.", "Con un plan simple de 12 días, que reactiva las 4 áreas de su cerebro...", "Reencenderás su deseo y harás que te vea como la mujer que nunca debió haber perdido."] },
    { title: "Cambia el juego", img: "Imagen 11 — pareja conversando", paragraphs: ["No vas a rogarle ni a mendigar su atención.", "Y no es con contacto cero o jueguitos.", "El verdadero cambio ocurre cuando reactivas cuatro zonas cerebrales que te hacen irresistible para él, al punto de que te busque y te escriba de la nada."] },
    { title: "Desejo silencioso", img: "Imagen 12 — cerebro con zonas activas", paragraphs: ["No vas a reconquistarlo con textos largos, persiguiéndolo o con intentos obvios.", "El secreto está en generar el impacto emocional correcto en el momento exacto.", "Esto despierta en él un deseo que ni él mismo sabe explicar."] },
    { title: "Hecho para ti", img: "Imagen 13 — Martina escribiendo plan", paragraphs: ["Un plan de 12 días, simple y adaptado a tu situación.", "Incluso si te bloqueó, está con otra o dice que te odia...", "Cada paso está ajustado a tu momento con él, para provocar el efecto correcto en la hora perfecta."] }
  ];

  const bonuses = [
    { title: "Aplicación Personalizada con acceso de por vida", desc: "Acompañamiento día a día directamente con el especialista a través de una app.", from: "$57" },
    { title: "Diagnóstico de Saturación Emocional", desc: "Una consulta privada conmigo para identificar exactamente en qué etapa se encuentra y aplicar la intensidad correcta del método.", from: "$247" },
    { title: "Protocolo Antibloqueo y Reactivación Silenciosa", desc: "Para reactivar el circuito emocional incluso si te bloqueó o está completamente frío.", from: "$147" },
    { title: "Acelerador de Dopamina Magnética™", desc: "Un conjunto de microactivadores emocionales y mensajes estratégicos para generar señales rápidas en los primeros días.", from: "$97" },
    { title: "18 Disparadores de la Seducción en la Práctica", desc: "Aprende los 18 disparadores que hacen que cualquier hombre se vuelva loco de deseo por ti instantáneamente.", from: "$37" },
    { title: "Los 10 Mandamientos de Medusa", desc: "Aprende los 10 trucos para volverte sexualmente irresistible y los 7 pasos para que se obsesione sexualmente.", from: "$47" }
  ];

  const features = [
    "Aplicación completa con desafíos, lista de verificación, clases",
    "Clases en video completas",
    "Frecuencias para la atracción amorosa",
    "Todos los bonos",
    "Acceso de por vida",
    "Acceso inmediato por correo electrónico",
    "Mi correo personal para dudas y soporte"
  ];

  const faqItems = [
    { q: "📩 ¿Cómo recibiré el acesso?", a: "Tan pronto como se confirme la compra, recibirás todos los datos de acceso directamente en tu correo electrónico. De esta forma, podrás acceder al contenido de manera rápida y sencilla." },
    { q: "🔒 ¿El proceso de pago es seguro?", a: "¡Sí! Nuestro sistema de pago utiliza el mismo nivel de seguridad que los bancos y grandes instituciones.<br><br>Tu compra está 100% protegida y es totalmente confidencial." },
    { q: "🔄 ¿Qué garantía tengo?", a: "Ofrecemos una garantía incondicional de 14 días. Si el material no cumple con tus expectativas, puedes solicitar el reembolso total dentro de ese plazo." },
    { q: "🔒 ¿Necesito pagar alguna mensualidade?", a: "No. El pago es único. Pagas una sola vez y tendrás acceso ilimitado al contenido, sin mensualidades ni cargos adicionales." }
  ];

  const checkoutUrl = "https://pay.hotmart.com/L105983669G?checkoutMode=10";

  // Renders comparative boxes (Sem seguir o código vs Seguindo o código)
  const comparisonBoxesHtml = `
    <div class="mt-8 grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <div class="text-base font-extrabold text-destructive">Sin seguir el código</div>
        <div class="mt-2">
          <img src="mujer-llorando.jpg" alt="Mujer llorando" class="aspect-square w-full rounded-2xl object-cover shadow-lg" style="aspect-ratio: 1/1; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);" />
        </div>
        <div class="mt-3 text-sm font-bold text-left">Probabilidad de que vuelva</div>
        <div class="mt-1 flex items-center gap-2">
          <div class="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div class="h-full rounded-full bg-destructive" style="width: 12%;"></div>
          </div>
          <span class="text-sm font-extrabold">12%</span>
        </div>
      </div>
      
      <div class="flex flex-col">
        <div class="text-base font-extrabold text-success">Siguiendo el código</div>
        <div class="mt-2">
          <img src="pareja-feliz.jpg" alt="Pareja feliz" class="aspect-square w-full rounded-2xl object-cover shadow-lg" style="aspect-ratio: 1/1; width: 100%; border-radius: 1rem; object-fit: cover; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);" />
        </div>
        <div class="mt-3 text-sm font-bold text-left">Probabilidad de que vuelva</div>
        <div class="mt-1 flex items-center gap-2">
          <div class="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div class="h-full rounded-full bg-success" style="width: 96%;"></div>
          </div>
          <span class="text-sm font-extrabold">96%</span>
        </div>
      </div>
    </div>
  `;

  // Renders comparison lists (Homem pensativo, cérebro com zonas ativas, etc.)
  const comparisonCardsHtml = comparisonList.map(card => `
    <div class="overflow-hidden rounded-2xl border border-border bg-card">
      <div class="w-full">
        ${renderImagePlaceholder(card.img, "aspect-[4/3] w-full rounded-none border-0", true)}
      </div>
      <div class="p-5 text-center">
        <h3 class="text-xl font-extrabold">${card.title}</h3>
        ${card.paragraphs.map(p => `<p class="mt-3 text-base">${p}</p>`).join("")}
      </div>
    </div>
  `).join("");

  // Renders bonuses list
  const bonusesHtml = bonuses.map(bonus => `
    <div class="text-left border-b border-border pb-4 last:border-b-0 last:pb-0">
      <div class="text-lg font-extrabold">🎁 ${bonus.title}</div>
      <p class="mt-2 text-base text-muted-foreground">${bonus.desc}</p>
      <p class="mt-2 text-base">
        De ${bonus.strike ? `<span class="font-bold line-through">${bonus.from}</span>` : `<strong>${bonus.from}</strong>`} por:
        <span class="font-extrabold text-success">GRATIS${bonus.strike ? "!" : ""}</span>
      </p>
    </div>
  `).join("");

  // Renders pricing checklist
  const featuresHtml = features.map(feat => `
    <div class="flex items-start gap-2 text-base text-left">
      <span>✅</span>
      <span>${highlightWords(feat)}</span>
    </div>
  `).join("");

  // Renders FAQ accordion
  const faqHtml = faqItems.map(faq => `
    <details class="group p-5" open>
      <summary class="flex cursor-pointer items-start justify-between gap-3 text-lg font-extrabold text-left">
        <span>${faq.q}</span>
        <span class="text-muted-foreground transition group-open:rotate-180">⌃</span>
      </summary>
      <p class="mt-3 whitespace-pre-line text-base text-left text-muted-foreground">${faq.a}</p>
    </details>
  `).join("");

  return `
    <div class="flex flex-col animate-fade-in text-center">
      <h2 class="text-3xl font-extrabold leading-tight text-primary sm:text-4xl">Reconquista en 12 días usando el protocolo de Reactivación Emocional</h2>
      <p class="mt-4 text-center text-lg">Con el Código de la Reconquista Magnética, recibirás una guía de 12 días <strong>simple, directa y 100% personalizada.</strong></p>
      
      ${comparisonBoxesHtml}
      
      <div class="mt-10 flex flex-col gap-6">
        ${comparisonCardsHtml}
      </div>
      
      <h3 class="mt-12 text-2xl font-extrabold leading-tight sm:text-3xl">¿Cómo funciona el <span class="text-primary">Código de la Reconquista Magnética?</span></h3>
      <p class="mt-4 text-base">Puedes intentar recuperarlo con jueguitos y consejos genéricos...</p>
      <p class="mt-3 text-base">Pero si quieres un resultado real, necesitas algo que realmente funcione.</p>
      <p class="mt-3 text-base">Nuestro manual ya ha sido probado y validado por miles de mujeres que reconquistaron a hombres que parecían imposibles de recuperar.</p>
      <p class="mt-4 text-lg font-extrabold text-primary">¿Y sabes por qué?</p>
      
      <div class="mt-6 rounded-2xl bg-primary-soft p-5 text-center text-primary">
        <div class="text-lg font-extrabold">🧠 Neuroquímica con psicología afectiva</div>
        <p class="mt-3 text-base text-foreground">Usamos disparadores psicológicos basados en neurociencia que <strong>reactivan el ciclo A.R.E.A.</strong>, fundamental para la reconexión emocional:</p>
        <div class="mt-4 flex flex-col gap-2 text-left text-base font-extrabold pl-4">
          <div>• Anticipación;</div>
          <div>• Recompensa;</div>
          <div>• Estímulo;</div>
          <div>• Asociación;</div>
        </div>
        <p class="mt-4 text-base text-foreground">Aprenderás <em>cuándo</em> y <em>cómo</em> activar estos disparadores, en el momento exacto, sin parecer manipuladora ni desesperada.</p>
      </div>
      
      <div class="mt-6 rounded-2xl bg-success/10 p-5 text-center">
        <div class="text-lg font-extrabold text-success">📘 Tu Plan Personalizado de 12 Días</div>
        <p class="mt-3 text-base">Nada de contenido genérico: recibirás un <strong>manual paso a paso de 12 días,</strong> totalmente personalizado, con <strong>instrucciones diarias, acciones y comportamientos</strong> que impactan emocionalmente en él <strong>sin parecer forzado,</strong> todo adaptado a tu caso específico.</p>
        <p class="mt-3 text-base">Cada día incluye <strong>listas de verificación con acciones claras</strong> para acompañar tu <strong>progreso real</strong> dentro del proceso de reconquista.</p>
      </div>
      
      <p class="mt-6 text-base">No importa si es tu ex, tu esposo o ese chico que se alejó... <span class="text-primary font-bold">Él te va a extrañar. Te va a desear. Y te va a buscar.</span></p>
      
      <h3 class="mt-12 text-center text-2xl font-extrabold text-primary sm:text-3xl">¿Para quién es esto?</h3>
      <div class="mt-4 flex flex-col gap-3 text-left">
        <div class="flex items-start gap-2 text-base"><span>&nbsp;✅&nbsp;</span><span>Para quienes desean reconquistar a su exnovio, prometido o esposo</span></div>
        <div class="flex items-start gap-2 text-base"><span>&nbsp;✅&nbsp;</span><span>Para quienes desean transformar una relación fría y distante en pasión de nuevo</span></div>
        <div class="flex items-start gap-2 text-base"><span>&nbsp;✅&nbsp;</span><span>Para quienes desean mantener a cualquier hombre obsesionado y locamente enamorado</span></div>
        <div class="flex items-start gap-2 text-base"><span>&nbsp;✅&nbsp;</span><span>Para quienes desean finalmente conquistar al hombre de sus sueños</span></div>
      </div>
      
      <h3 class="mt-12 text-center text-2xl font-extrabold leading-tight text-primary sm:text-3xl">Además de tu plan de reconquista, recibirás los siguientes bonos:</h3>
      <div class="mt-6 flex flex-col gap-5 border border-border rounded-2xl p-5 bg-card">
        ${bonusesHtml}
      </div>
      
      <h3 class="mt-12 text-center text-3xl font-extrabold text-success">¿Cuánto cuesta todo esto?</h3>
      <div class="mt-4 flex flex-col gap-3 border border-border rounded-2xl p-5 bg-card">
        ${featuresHtml}
      </div>
      
      <div class="mt-8 rounded-2xl border-2 border-success p-5 bg-card">
        <div class="flex items-center justify-between gap-4">
          <div class="text-lg font-extrabold leading-tight text-left">Código Reconquista<br>Magnética</div>
          <div class="rounded-xl bg-muted px-4 py-3 text-2xl font-extrabold text-success">$9,90</div>
        </div>
      </div>
      
      <a href="${checkoutUrl}" target="_blank" class="mt-4 block w-full rounded-full bg-success px-6 py-5 text-center text-lg font-extrabold uppercase text-success-foreground transition-opacity hover:opacity-95 animate-cta-3d text-decoration-none" style="text-decoration: none;">
        QUIERO TENERLO DE VUELTA
      </a>
      
      <div class="mt-12 rounded-2xl bg-destructive/10 p-5 text-left border border-destructive/20">
        <h3 class="text-2xl font-extrabold text-destructive">Opción 1: Seguir sin hacer nada</h3>
        <ul class="mt-4 flex flex-col gap-3 text-base text-destructive" style="list-style: none;">
          <li class="flex items-start gap-2"><span>❌</span><span>Él seguirá con su vida y eventualmente se enamorará de otra</span></li>
          <li class="flex items-start gap-2"><span>❌</span><span>Seguirás atrapada en la duda, sin entender qué salió mal</span></li>
          <li class="flex items-start gap-2"><span>❌</span><span>Los mensajes que esperas nunca llegarán</span></li>
          <li class="flex items-start gap-2"><span>❌</span><span>Sentirás que perdiste al amor de tu vida</span></li>
          <li class="flex items-start gap-2"><span>❌</span><span>Tu autoestima seguirá por los suelos</span></li>
          <li class="flex items-start gap-2"><span>❌</span><span>Seguirás fracasando con estrategias que no funcionan</span></li>
        </ul>
      </div>
      
      <div class="mt-4 rounded-2xl bg-success/15 p-5 text-left border border-success/20">
        <h3 class="text-2xl font-extrabold text-success leading-tight">Opción 2: Usar el Manual de la Reconquista Magnética</h3>
        <ul class="mt-4 flex flex-col gap-3 text-base text-success" style="list-style: none;">
          <li class="flex items-start gap-2"><span>✅</span><span>Él empezará a pensar en ti todo el tiempo</span></li>
          <li class="flex items-start gap-2"><span>✅</span><span>Comenzará a buscarte y a enviarte mensajes</span></li>
          <li class="flex items-start gap-2"><span>✅</span><span>Él te verá como la mujer de su vida</span></li>
          <li class="flex items-start gap-2"><span>✅</span><span>Volverá a tu cama, lleno de deseo</span></li>
          <li class="flex items-start gap-2"><span>✅</span><span>Tu confianza regresará con fuerza total</span></li>
          <li class="flex items-start gap-2"><span>✅</span><span>La conexión emocional entre ustedes se reconstruirá</span></li>
          <li class="flex items-start gap-2"><span>✅</span><span>Querrá estar a tu lado como nunca antes</span></li>
          <li class="flex items-start gap-2"><span>✅</span><span>Tienes el paso a paso comprobado para recuperarlo</span></li>
        </ul>
      </div>
      
      <a href="${checkoutUrl}" target="_blank" class="mt-4 block w-full rounded-full bg-success px-6 py-5 text-center text-lg font-extrabold uppercase text-success-foreground transition-opacity hover:opacity-95 animate-cta-3d" style="text-decoration: none;">
        QUIERO TENERLO DE VUELTA
      </a>
      
      <h3 class="mt-12 text-center text-2xl font-extrabold sm:text-3xl">Preguntas frecuentes</h3>
      <div class="mt-6 flex flex-col divide-y divide-border rounded-2xl border border-border bg-card">
        ${faqHtml}
      </div>
      
      <div class="mt-12 rounded-2xl border border-border p-6 text-center bg-card">
        <div class="mb-4">
          <img src="garantia-14dias.jpg" alt="Garantía de 14 días" class="aspect-square max-w-xs mx-auto rounded-2xl object-contain" style="aspect-ratio: 1/1; max-width: 240px; border-radius: 1rem;" />
        </div>
        <p class="mt-6 text-base">
          <strong>Riesgo CERO.</strong> Si en cualquier momento dentro de los 14 días no estás satisfecha con el Plan de Reconquista Magnética, solo solicita el reembolso y
          <strong>recibirás el 100% de tu dinero de vuelta, sin burocracia y sin preguntas.</strong>
        </p>
      </div>
      
      <a href="${checkoutUrl}" target="_blank" class="mt-8 block w-full rounded-full bg-success px-6 py-5 text-center text-lg font-extrabold uppercase text-success-foreground transition-opacity hover:opacity-95 animate-cta-3d" style="text-decoration: none;">
        QUIERO TENERLO DE VUELTA
      </a>
      <p class="mt-4 text-center text-xs text-muted-foreground">🔒 Compra 100% segura</p>
    </div>
  `;
}

// Auxiliares de Visualización y Renderizado

function highlightWords(text) {
  const wordsToBold = [
    "Aplicación completa",
    "video",
    "Frecuencias",
    "Todos los bonos",
    "de por vida",
    "correo electrónico",
    "dudas y soporte"
  ];

  let result = text;
  wordsToBold.forEach(word => {
    const regex = new RegExp(`\\b(${word})\\b`, "gi");
    result = result.replace(regex, "<strong>$1</strong>");
  });
  return result;
}

// Representación de Placeholder de Imagen
function renderImagePlaceholder(label, className = "", contain = false) {
  if (label.includes("Martina") || label.includes("Imagen 13")) {
    return `<img src="martina-alves.jpg" alt="Martina Alves" class="${className} object-cover" style="object-fit: cover;" />`;
  }
  if (label.includes("Imagen 16") || label.includes("hombre pensativo")) {
    return `<img src="hombre-arrepentido.jpg" alt="Él se arrepentirá" class="${className} object-cover" style="object-fit: cover;" />`;
  }
  if (label.includes("Imagen 11") || label.includes("pareja conversando")) {
    return `<img src="pareja-rogando.jpg" alt="Pareja conversando" class="${className} object-cover" style="object-fit: cover;" />`;
  }
  if (label.includes("Imagen 12") || label.includes("cerebro") || label.includes("cérebro")) {
    return `<img src="cerebro-zonas.jpg" alt="Zonas cerebrales activas" class="${className} object-cover" style="object-fit: cover;" />`;
  }

  let iconPath = `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>`;
  let bgGradient = "linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)"; // rose soft
  
  if (label.includes("BBC") || label.includes("print")) {
    iconPath = `<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M4 15h16M9 15v5M15 15v5M4 9h16"/>`;
    bgGradient = "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)";
  } else if (label.includes("Garantía") || label.includes("selo") || label.includes("sello")) {
    iconPath = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`;
    bgGradient = "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)";
  } else if (label.includes("WhatsApp") || label.includes("print WhatsApp")) {
    iconPath = `<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`;
    bgGradient = "linear-gradient(135deg, #f0fdf4 0%, #bbf7d0 100%)";
  } else if (label.includes("cerebro") || label.includes("zonas") || label.includes("cérebro")) {
    iconPath = `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2z"/>`;
    bgGradient = "linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 100%)";
  } else if (label.includes("Martina")) {
    iconPath = `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`;
    bgGradient = "linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)";
  } else if (label.includes("mulher chorando") || label.includes("Sem seguir") || label.includes("mujer llorando") || label.includes("Sin seguir")) {
    iconPath = `<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>`;
    bgGradient = "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)";
  } else if (label.includes("casal feliz") || label.includes("abraçado") || label.includes("Casal reconquistado") || label.includes("pareja feliz") || label.includes("pareja abrazada") || label.includes("Pareja reconquistada")) {
    iconPath = `<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 7v5l3 3"/>`;
    bgGradient = "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)";
  }

  return `
    <div class="image-placeholder ${className}" style="min-height: 150px; background: ${bgGradient};">
      <svg class="image-placeholder-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        ${iconPath}
      </svg>
      <span class="image-placeholder-title">${label}</span>
      <span class="image-placeholder-desc">Marcador de posición visual</span>
    </div>
  `;
}

// Representación de Placeholder de Video con Reproducción Simulada
function renderVideoPlaceholder(id, title, durationSeconds = 185, onCompleteCallback) {
  const isTest = new URLSearchParams(window.location.search).get("test") === "true";
  const actualDuration = isTest ? 5 : durationSeconds;
  
  // Registrar callback globalmente para eventos onclick inline
  const callbackName = `video_callback_${id}`;
  window[callbackName] = onCompleteCallback;
  
  return `
    <div class="video-placeholder ${id}-video-container" id="${id}-video">
      <div class="video-placeholder-ratio"></div>
      <div class="video-placeholder-content">
        <div class="video-play-btn" onclick="startSimulatedVideo('${id}', ${actualDuration}, window['${callbackName}'])">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 4px;">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <div class="video-placeholder-title">${title}</div>
        <div class="video-placeholder-desc">Haz clic para ver la explicación</div>
        
        <div class="video-playing-indicator">
          <svg class="animate-pulse h-10 w-10 mx-auto text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.53 8.47a7 7 0 010 9.06m3.53-12.59a11 11 0 010 16.12M12 4v16m-8-4v-8m4 6v-4" />
          </svg>
          <div class="mt-4 font-extrabold text-lg">Video en reproducción...</div>
          <div class="mt-2 text-sm text-muted-foreground" id="${id}-countdown">Espera ${actualDuration}s</div>
        </div>
      </div>
      
      <div class="video-placeholder-overlay-bottom">
        <div class="video-progress-bar">
          <div class="video-progress-fill" id="${id}-progress-fill" style="width: 0%;"></div>
        </div>
        <span class="text-xs text-white" id="${id}-timer" style="margin-left: 10px;">0:00</span>
      </div>
    </div>
  `;
}

// Iniciar player de video simulado
window.startSimulatedVideo = function(id, duration, onCompleteCallback) {
  const container = document.getElementById(id + "-video");
  if (!container || container.classList.contains("video-playing")) return;
  
  container.classList.add("video-playing");
  
  const progressFill = document.getElementById(id + "-progress-fill");
  const timer = document.getElementById(id + "-timer");
  const countdown = document.getElementById(id + "-countdown");
  
  let elapsed = 0;
  
  if (videoIntervals[id]) clearInterval(videoIntervals[id]);
  
  videoIntervals[id] = setInterval(() => {
    elapsed++;
    const pct = (elapsed / duration) * 100;
    if (progressFill) progressFill.style.width = pct + "%";
    
    // Actualizar tiempo de reproducción
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    if (timer) timer.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    
    // Actualizar texto del contador
    const remaining = duration - elapsed;
    if (countdown) countdown.innerText = `Espera ${remaining}s`;
    
    if (elapsed >= duration) {
      clearInterval(videoIntervals[id]);
      if (countdown) countdown.innerText = "¡Video completado!";
      if (onCompleteCallback) onCompleteCallback();
    }
  }, 1000);
};

// 7.1. Testimonials Carousel (`lo`)
function renderTestimonialsCarousel() {
  const testimonials = [
    { label: "Testimonio 1", src: "testimonio-1.jpg" },
    { label: "Testimonio 2 — ex pidiendo disculpas y queriendo volver", src: null },
    { label: "Testimonio 3 — audio de ex arrepentido", src: null }
  ];
  
  let slidesHtml = testimonials.map((t, idx) => `
    <div class="carousel-slide" style="display: ${idx === 0 ? 'block' : 'none'};" data-index="${idx}">
      ${t.src ? `<img src="${t.src}" alt="${t.label}" class="w-full rounded-none border-0 object-contain" style="display: block; width: 100%; height: auto;" />` : renderImagePlaceholder(t.label, "aspect-[4/3] w-full rounded-none border-0", true)}
    </div>
  `).join('');
  
  let indicatorsHtml = testimonials.map((_, idx) => `
    <button type="button" onclick="setCarouselSlide(${idx})" aria-label="Ir al testimonio ${idx + 1}" class="carousel-indicator-dot h-2 rounded-full transition-all ${idx === 0 ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/40'}" style="outline: none;"></button>
  `).join('');

  return `
    <div class="mt-6">
      <div class="relative overflow-hidden rounded-2xl border border-border bg-card" style="min-height: 200px;">
        <div id="carousel-slides-container">
          ${slidesHtml}
        </div>
        <button type="button" onclick="prevCarouselSlide()" aria-label="Anterior" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur transition hover:bg-background" style="outline: none; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button type="button" onclick="nextCarouselSlide()" aria-label="Siguiente" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground shadow-md backdrop-blur transition hover:bg-background" style="outline: none; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer;">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div class="mt-3 flex justify-center gap-2" id="carousel-indicators">
        ${indicatorsHtml}
      </div>
    </div>
  `;
}

window.setCarouselSlide = function(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".carousel-indicator-dot");
  if (!slides.length) return;
  
  currentCarouselIndex = (index + slides.length) % slides.length;
  
  slides.forEach((slide, idx) => {
    slide.style.display = idx === currentCarouselIndex ? "block" : "none";
  });
  
  indicators.forEach((ind, idx) => {
    if (idx === currentCarouselIndex) {
      ind.classList.remove("w-2", "bg-muted-foreground/40");
      ind.classList.add("w-6", "bg-primary");
    } else {
      ind.classList.remove("w-6", "bg-primary");
      ind.classList.add("w-2", "bg-muted-foreground/40");
    }
  });
};

window.prevCarouselSlide = function() {
  setCarouselSlide(currentCarouselIndex - 1);
};

window.nextCarouselSlide = function() {
  setCarouselSlide(currentCarouselIndex + 1);
};
