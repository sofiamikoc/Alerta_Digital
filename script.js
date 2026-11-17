

const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});


document.querySelectorAll(".detail-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const isOpen = panel.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.innerHTML = isOpen ? 'Ocultar ejemplo <span>−</span>' : 'Ver ejemplo <span>＋</span>';
  });
});


const scenarios = [
  {
    category: "CIBERBULLYING",
    title: "Una foto compartida sin permiso",
    description: "Un compañero comparte una foto tuya sin permiso en un grupo del curso. Varias personas empiezan a burlarse.",
    options: [
      "Responder insultando a todos.",
      "Ignorarlo y no contárselo a nadie.",
      "Guardar pruebas, reportar y pedir ayuda.",
      "Compartir la foto de otra persona como venganza."
    ],
    best: 2,
    heading: "Una alternativa más segura",
    feedback: "Conservar pruebas de forma segura, reportar el contenido y hablar con una persona adulta de confianza son pasos recomendables. No tenés que resolverlo en soledad."
  },
  {
    category: "ACOSO PRESENCIAL",
    title: "Siempre se burlan del mismo compañero",
    description: "En los recreos, un grupo se burla repetidamente de un compañero y los demás se ríen. Notás que cada vez participa menos.",
    options: [
      "Reírme para que el grupo no se burle de mí.",
      "Grabarlo y subirlo a las redes.",
      "Acompañarlo, no sumarme y contárselo a un adulto de confianza.",
      "Enfrentar al grupo a solas aunque pueda ser peligroso."
    ],
    best: 2,
    heading: "Acompañar puede marcar la diferencia",
    feedback: "No sumarte a la burla, acompañar a la persona afectada y buscar apoyo de un adulto responsable son acciones útiles. No tenés que ponerte en riesgo para intervenir."
  },
  {
    category: "ACOSO HACIA DOCENTES",
    title: "Publican amenazas sobre un profesor",
    description: "En un grupo de estudiantes circulan mensajes amenazantes sobre un docente y algunas personas dicen que van a ir a buscarlo.",
    options: [
      "Compartir los mensajes para que se hagan virales.",
      "Tomarlo como una broma y no hacer nada.",
      "Guardar la información sin difundirla y avisar cuanto antes a un adulto responsable o a las autoridades escolares.",
      "Responder con amenazas a quienes escribieron."
    ],
    best: 2,
    heading: "Las amenazas deben tomarse en serio",
    feedback: "No difundas los mensajes ni respondas con amenazas. Informá rápidamente a las autoridades escolares responsables. Si parece haber peligro inmediato, contactá los servicios de emergencia de la zona."
  }
];

let scenarioIndex = 0;
let scenarioAnswered = false;
const scenarioCount = document.getElementById("scenario-count");
const scenarioPercent = document.getElementById("scenario-percent");
const scenarioProgressFill = document.getElementById("scenario-progress-fill");
const scenarioCategory = document.getElementById("scenario-category");
const scenarioTitle = document.getElementById("scenario-title");
const scenarioDescription = document.getElementById("scenario-description");
const scenarioOptions = document.getElementById("scenario-options");
const scenarioFeedback = document.getElementById("scenario-feedback");
const scenarioHint = document.getElementById("scenario-hint");
const nextScenario = document.getElementById("next-scenario");

function renderScenario() {
  const scenario = scenarios[scenarioIndex];
  scenarioAnswered = false;
  scenarioCount.textContent = `CASO ${String(scenarioIndex + 1).padStart(2, "0")} / ${String(scenarios.length).padStart(2, "0")}`;
  const percent = Math.round(((scenarioIndex + 1) / scenarios.length) * 100);
  scenarioPercent.textContent = `${percent}%`;
  scenarioProgressFill.style.width = `${percent}%`;
  scenarioCategory.textContent = scenario.category;
  scenarioTitle.textContent = scenario.title;
  scenarioDescription.textContent = scenario.description;
  scenarioFeedback.hidden = true;
  scenarioFeedback.innerHTML = "";
  scenarioHint.textContent = "Elegí una opción para ver la explicación.";
  nextScenario.disabled = true;
  nextScenario.innerHTML = scenarioIndex === scenarios.length - 1 ? 'Volver al primer caso <span>↻</span>' : 'Siguiente caso <span>→</span>';
  scenarioOptions.innerHTML = "";

  scenario.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.dataset.choice = String(index);
    button.innerHTML = `<span class="choice-letter">${String.fromCharCode(65 + index)}</span><span></span><span class="choice-arrow">↗</span>`;
    button.querySelectorAll("span")[1].textContent = option;
    button.addEventListener("click", () => chooseScenarioAnswer(index, button));
    scenarioOptions.appendChild(button);
  });
}

function chooseScenarioAnswer(index, selectedButton) {
  if (scenarioAnswered) return;
  scenarioAnswered = true;
  const scenario = scenarios[scenarioIndex];
  scenarioOptions.querySelectorAll(".choice").forEach(button => {
    button.disabled = true;
    if (button === selectedButton) button.classList.add("selected");
  });
  const isBest = index === scenario.best;
  scenarioFeedback.innerHTML = `<b>${isBest ? "¡Buena elección!" : scenario.heading}</b><span></span>`;
  scenarioFeedback.querySelector("span").textContent = isBest
    ? scenario.feedback
    : `Esa reacción puede tener riesgos o no ser suficiente. ${scenario.feedback}`;
  scenarioFeedback.hidden = false;
  scenarioHint.textContent = "Cada situación puede necesitar apoyo de una persona responsable.";
  nextScenario.disabled = false;
}

nextScenario.addEventListener("click", () => {
  scenarioIndex = (scenarioIndex + 1) % scenarios.length;
  renderScenario();
});
renderScenario();


const quizQuestions = [
  {
    question: "Dos compañeros discuten una sola vez por un trabajo. Ambos pueden expresarse sin intimidación.",
    options: ["Es bullying", "Es un conflicto puntual", "Es una broma"],
    answer: 1,
    explanation: "Una diferencia aislada entre personas con posibilidades similares de expresarse suele ser un conflicto puntual. Importa observar el contexto y cómo se resuelve."
  },
  {
    question: "Un grupo insulta repetidamente a una estudiante y usa su popularidad para que otros también la excluyan.",
    options: ["Es una diferencia de opinión", "Es siempre una broma", "Puede ser bullying"],
    answer: 2,
    explanation: "La repetición y el desequilibrio de poder son señales importantes de posible bullying. Es necesario intervenir y buscar apoyo."
  },
  {
    question: "Alguien publica una foto privada de otra persona sin permiso para humillarla. ¿Qué conviene hacer?",
    options: ["Compartirla para que todos se enteren", "Reportarla, conservar pruebas de forma segura y buscar ayuda", "Responder publicando otra foto"],
    answer: 1,
    explanation: "No difundas el contenido. Si es seguro, conservá evidencias, reportá la publicación y pedí ayuda a una persona adulta de confianza."
  },
  {
    question: "Un profesor recibe mensajes amenazantes de estudiantes en redes sociales.",
    options: ["Hay que tomarlo en serio y comunicarlo a las autoridades responsables", "No importa porque sucede en Internet", "El profesor debe responder con amenazas"],
    answer: 0,
    explanation: "Las amenazas deben comunicarse a las autoridades institucionales correspondientes. Si hay peligro inmediato, hay que contactar los servicios de emergencia."
  },
  {
    question: "Ves que se burlan de una persona. ¿Qué podés hacer si no te sentís seguro/a para intervenir directamente?",
    options: ["Grabarlo y publicarlo", "No hacer nada nunca", "Acompañar a la persona y pedir ayuda a un adulto responsable"],
    answer: 2,
    explanation: "Podés ayudar sin ponerte en riesgo: escuchar, acompañar, no compartir la agresión y buscar apoyo de alguien responsable."
  }
];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
const quizProgressLabel = document.getElementById("quiz-progress-label");
const quizProgressFill = document.getElementById("quiz-progress-fill");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizHint = document.getElementById("quiz-hint");
const quizNext = document.getElementById("quiz-next");
const quizContent = document.getElementById("quiz-content");
const quizResult = document.getElementById("quiz-result");

function renderQuizQuestion() {
  const q = quizQuestions[quizIndex];
  quizAnswered = false;
  quizProgressLabel.textContent = `PREGUNTA ${quizIndex + 1} DE ${quizQuestions.length}`;
  quizProgressFill.style.width = `${(quizIndex / quizQuestions.length) * 100}%`;
  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = "";
  quizFeedback.hidden = true;
  quizHint.textContent = "Elegí una respuesta.";
  quizNext.disabled = true;
  quizNext.innerHTML = quizIndex === quizQuestions.length - 1 ? 'Ver resultado <span>→</span>' : 'Siguiente <span>→</span>';

  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.dataset.answer = String(index);
    button.textContent = option;
    button.addEventListener("click", () => answerQuiz(index, button));
    quizOptions.appendChild(button);
  });
}

function answerQuiz(index, button) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizQuestions[quizIndex];
  if (index === q.answer) quizScore++;
  quizOptions.querySelectorAll("button").forEach(item => {
    item.disabled = true;
    if (item === button) item.classList.add("selected");
  });
  quizFeedback.textContent = `${index === q.answer ? "¡Correcto! " : "Repasemos. "}${q.explanation}`;
  quizFeedback.hidden = false;
  quizHint.textContent = "Leé la explicación antes de continuar.";
  quizNext.disabled = false;
}

function showQuizResult() {
  quizContent.hidden = true;
  quizResult.hidden = false;
  const percent = Math.round((quizScore / quizQuestions.length) * 100);
  let title = "Seguí aprendiendo";
  let description = "Repasá las explicaciones y recordá: si una situación te preocupa, podés buscar orientación aunque no estés seguro/a de cómo clasificarla.";
  if (quizScore >= 4) {
    title = "¡Muy buen trabajo!";
    description = "Reconociste varias señales importantes y elegiste respuestas cuidadosas. Seguí practicando cómo acompañar y buscar ayuda.";
  } else if (quizScore >= 3) {
    title = "¡Vas por buen camino!";
    description = "Ya reconocés varios aspectos importantes. Revisá las explicaciones para reforzar cómo actuar ante distintas situaciones.";
  }
  quizProgressFill.style.width = "100%";
  quizProgressLabel.textContent = "TEST COMPLETADO";
  quizResult.innerHTML = `<div class="result-score">${quizScore}/${quizQuestions.length}</div><h3>${title}</h3><p>${description}</p><button type="button" class="button button-primary" id="quiz-restart">Volver a intentarlo ↻</button><p class="privacy-note">Este test es educativo: no diagnostica ni determina por sí solo si una situación es bullying.</p>`;
  document.getElementById("quiz-restart").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizResult.hidden = true;
  quizContent.hidden = false;
  renderQuizQuestion();
}

quizNext.addEventListener("click", () => {
  if (!quizAnswered) return;
  if (quizIndex < quizQuestions.length - 1) {
    quizIndex++;
    renderQuizQuestion();
  } else {
    showQuizResult();
  }
});
renderQuizQuestion();


const helpForm = document.getElementById("help-form");
const helpResponse = document.getElementById("help-response");
helpForm.addEventListener("submit", event => {
  event.preventDefault();
  const personType = document.getElementById("person-type").value;
  const situationType = document.getElementById("situation-type").value;
  const helpNeed = document.getElementById("help-need").value;
  if (!personType || !situationType || !helpNeed) return;

  let advice = "Buscá una persona adulta de confianza o un referente responsable de la escuela y explicale qué está pasando. Si hay mensajes o publicaciones, conservá pruebas de forma segura y evitá difundirlas.";
  if (situationType === "Amenazas o agresiones") {
    advice = "Priorizá la seguridad y no enfrentes la situación a solas. Avisá cuanto antes a una persona adulta responsable o a las autoridades correspondientes. Si existe peligro inmediato, contactá los servicios de emergencia de tu zona.";
  } else if (situationType === "Ciberbullying o redes sociales") {
    advice = "No respondas con más agresiones ni compartas el contenido. Si es seguro, guardá capturas o enlaces, reportá la publicación y pedí apoyo a una persona adulta de confianza.";
  } else if (situationType === "Acoso hacia un/a docente") {
    advice = "Es importante registrar los hechos, conservar evidencias pertinentes y comunicar lo ocurrido a las autoridades institucionales correspondientes para solicitar acompañamiento.";
  }

  helpResponse.innerHTML = "";
  const heading = document.createElement("strong");
  heading.textContent = "Orientación inicial para vos";
  const p1 = document.createElement("p");
  p1.textContent = advice;
  const p2 = document.createElement("p");
  p2.textContent = "Como elegiste: " + personType + " · " + helpNeed + ". Este formulario no envió tus respuestas a nadie. Para recibir ayuda real, contactá directamente a una persona responsable o a un servicio verificado de tu zona.";
  helpResponse.append(heading, p1, p2);
  helpResponse.hidden = false;
  helpResponse.scrollIntoView({ behavior: "smooth", block: "nearest" });
});



const chatPanel = document.getElementById("chat-panel");
const chatLauncher = document.getElementById("chat-launcher");
const chatClose = document.getElementById("chat-close");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const chatSuggestions = document.getElementById("chat-suggestions");

function toggleChat(open) {
  chatPanel.hidden = !open;
  chatLauncher.setAttribute("aria-expanded", String(open));
  if (open) chatInput.focus();
}
chatLauncher.addEventListener("click", () => toggleChat(chatPanel.hidden));
chatClose.addEventListener("click", () => toggleChat(false));

function addChatMessage(text, who) {
  const message = document.createElement("div");
  message.className = "chat-message " + (who === "user" ? "user-message" : "bot-message");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.appendChild(paragraph);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const chatKnowledge = [
  {keys:["hola","buenas","buen dia","buenas tardes","buenas noches","hey"], answer:"¡Hola!  Podés preguntarme sobre bullying, ciberbullying, privacidad en Internet, cómo ayudar a alguien o cómo pedir ayuda."},
  {keys:["que es bullying","qué es bullying","que significa bullying","definicion de bullying","qué es el acoso escolar","acoso escolar"], answer:"El bullying o acoso escolar es una conducta agresiva que se repite y ocurre en una relación donde existe un desequilibrio de poder. Puede ser físico, verbal, social o psicológico. Un hecho aislado también puede ser grave y necesitar intervención."},
  {keys:["ciberbullying","acoso por internet","acoso en internet","me acosan por redes","redes sociales","me molestan por internet"], answer:"Si te acosan por Internet: 1) no respondas con más agresiones; 2) guardá capturas o enlaces si hacerlo es seguro; 3) bloqueá y reportá la cuenta; 4) contáselo a una persona adulta de confianza. No reenvíes contenido humillante. Si hay amenazas o peligro inmediato, pedí ayuda urgente."},
  {keys:["me hacen bullying","me hacen bulling","me molestan","se burlan de mi","se burlan de mí","me insultan","me acosan","me pegan","me amenazan"], answer:"Siento que estés pasando por esto. No es tu culpa y no tenés que resolverlo a solas. Buscá a una persona adulta en quien confíes —por ejemplo, alguien de tu familia, un docente o el equipo de orientación escolar— y contale qué está pasando. Si estás en peligro ahora, andá a un lugar seguro y pedí ayuda de inmediato."},
  {keys:["amigo","amiga","ayudar a alguien","ayudo a","si veo","testigo","compañero"], answer:"Podés ayudar escuchando sin juzgar, creyéndole, acompañándolo a hablar con una persona adulta de confianza y evitando compartir rumores, fotos o mensajes. No te pongas en riesgo ni enfrentes a un grupo por tu cuenta. Si hay peligro, avisá enseguida a un adulto responsable."},
  {keys:["adulto","docente","profesor","escuela","preceptor","orientacion escolar","orientación escolar"], answer:"Podés hablar con un docente, preceptor/a, directivo, equipo de orientación escolar o una persona adulta de confianza. Contá hechos concretos: qué pasó, cuándo y dónde, y mostrales pruebas pertinentes si las tenés. Si la primera persona no te escucha, intentá con otra persona responsable."},
  {keys:["captura","pruebas","evidencia","guardar mensajes","publicaron una foto","foto sin permiso"], answer:"Si es seguro, guardá capturas donde se vea el contexto, el usuario y la fecha, o conservá el enlace. No edites ni difundas el material ni lo reenvíes a otras personas. Reportá la publicación en la plataforma y pedí apoyo a una persona adulta de confianza."},
  {keys:["privacidad","contraseña","contrasena","hackearon","cuenta","seguridad digital","datos personales"], answer:"Para cuidarte en Internet, usá contraseñas largas y distintas, activá la verificación en dos pasos, revisá quién puede ver tus publicaciones y no compartas dirección, escuela, ubicación ni códigos de acceso. Si alguien entró a tu cuenta, cambiá la contraseña desde un dispositivo seguro y pedí ayuda."},
  {keys:["denunciar","reportar","bloquear","denuncia"], answer:"Podés reportar el perfil o contenido desde las herramientas de la plataforma y bloquear la cuenta si eso te ayuda a estar más seguro/a. Guardá pruebas antes de bloquear, si es seguro. También contáselo a una persona adulta de confianza; si hay amenazas serias, extorsión o riesgo inmediato, buscá ayuda de las autoridades o servicios de emergencia de tu zona."},
  {keys:["es mi culpa","culpa mia","culpa mía","tengo miedo","me da vergüenza","verguenza","vergüenza"], answer:"No merecés que te acosen y no es tu culpa. Es normal sentir miedo o vergüenza, pero no tenés que atravesarlo a solas. Elegí a una persona adulta de confianza y pedile que te escuche y te acompañe a encontrar una solución segura."},
  {keys:["acoso sexual","mensaje sexual","foto intima","foto íntima","me presiona","me pide fotos"], answer:"Si alguien te presiona, te envía mensajes sexuales no deseados o pide imágenes íntimas, no tenés que aceptar ni responder. No compartas ni reenvíes imágenes. Guardá información solo si es seguro y hablá cuanto antes con una persona adulta de confianza. Si hay amenazas o extorsión, pedí ayuda inmediata."},
  {keys:["gracias","muchas gracias","thank you"], answer:"¡De nada!  Me alegra poder orientarte. Si la situación te afecta a vos o a alguien cercano, también es importante hablar con una persona adulta de confianza."},
  {keys:["contacto","telefono","teléfono","ayuda urgente","emergencia","peligro"], answer:"Si hay peligro inmediato, buscá un lugar seguro y contactá los servicios de emergencia de tu zona. Si estás en Argentina, el 911 es el número de emergencias. También podés acudir a una persona adulta de confianza o a las autoridades de tu escuela. No compartas datos personales en este chat."}
];

function normalizeChatText(text) {
  return text.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[¿?¡!.,;:]/g, " ").replace(/\s+/g, " ").trim();
}
function getChatAnswer(question) {
  const normalized = normalizeChatText(question);
  for (const item of chatKnowledge) {
    if (item.keys.some(key => normalized.includes(normalizeChatText(key)))) return item.answer;
  }
  return "No tengo una respuesta específica para esa pregunta todavía. Puedo orientarte sobre bullying, ciberbullying, privacidad digital y cómo pedir ayuda. Si se trata de algo que te está pasando, hablá con una persona adulta de confianza; no tenés que resolverlo a solas. Evitá escribir nombres, direcciones u otros datos personales acá.";
}
function sendChatQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  addChatMessage(cleanQuestion, "user");
  addChatMessage(getChatAnswer(cleanQuestion), "bot");
  chatInput.value = "";
  chatSuggestions.hidden = true;
  chatInput.focus();
}
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendChatQuestion(chatInput.value);
});
chatSuggestions.addEventListener("click", event => {
  const button = event.target.closest("button[data-question]");
  if (button) sendChatQuestion(button.dataset.question);
});
