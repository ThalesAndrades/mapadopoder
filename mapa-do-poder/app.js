/* ============================================================
   MAPA DA ATIVAÇÃO DO PODER · Despertar Espiral
   Experiência guiada · estática · salva localmente
   ============================================================ */

/* >>> CONFIG: para receber e-mails/telefones num serviço externo,
   cole abaixo a URL do seu endpoint (ex.: Formspree https://formspree.io/f/SEU_ID).
   Deixe vazio ("") para apenas guardar localmente no navegador. */
const CAPTURE_ENDPOINT = "";

/* ---------- Definição dos 8 passos ---------- */
const STEPS = [
  { n:1,
    title:"Qual trava te trava hoje?",
    hint:"A primeira que vier. Não pense demais — é o seu corpo que sabe.",
    icon:'knot',
    fields:[{k:"trava", t:"textarea", ph:"Hoje, o que me paralisa é…"}] },

  { n:2,
    title:"Quando essa trava entrou em você?",
    hint:"Volte ao primeiro momento que conseguir lembrar. Não precisa ser a verdade absoluta — é a sua verdade.",
    icon:'spiral',
    fields:[
      {k:"primeira_vez", t:"textarea", ph:"A primeira vez que senti isso foi…"},
      {k:"pessoa", t:"text", label:"Quem estava perto?", ph:"Nome ou papel dessa pessoa"}
    ] },

  { n:3,
    title:"O que essa pessoa carrega de você?",
    hint:"As pessoas que ativam nossas travas costumam carregar algo que ainda precisamos integrar. Quem protege quem aí?",
    icon:'venn',
    fields:[{k:"relacao", t:"textarea", ph:"Nossa relação é… / Quem protege quem é…"}] },

  { n:4,
    title:"Você já avançou antes. Lembra?",
    hint:"Liste 3 momentos em que seguiu mesmo com medo — e 3 sentimentos que viveu ali. Essa é a sua prova viva de que o caminho existe.",
    icon:'pillars',
    fields:[
      {k:"momento1", t:"text", label:"Momento 1", ph:"Uma vez em que avancei…"},
      {k:"momento2", t:"text", label:"Momento 2", ph:"Outra vez…"},
      {k:"momento3", t:"text", label:"Momento 3", ph:"E ainda…"},
      {k:"sentimentos", t:"text", label:"3 sentimentos que senti", ph:"ex.: coragem, alívio, orgulho"}
    ] },

  { n:5,
    title:"O que pulsa em você como desejo agora?",
    hint:"Aquilo que, se acontecesse, mudaria tudo. Pode ser pequeno. Pode ser enorme. Nomeie sem editar.",
    icon:'star',
    fields:[{k:"desejo", t:"textarea", ph:"Se eu pudesse pedir uma coisa para a vida hoje, seria…"}] },

  { n:6,
    title:"Onde, no corpo, mora essa trava?",
    hint:"Sinta. Não pense. Toque a região que pulsa, aperta ou se contrai quando você imagina a trava.",
    icon:'body',
    fields:[{k:"corpo", t:"body"}] },

  { n:7,
    title:"Acolha essa trava. Diga que ela tem lugar.",
    hint:"Você não precisa expulsar — precisa incluir. Crie sua frase de aceitação e leia o ritual em voz alta.",
    icon:'infinity',
    fields:[
      {k:"frase_vinculo", t:"text", label:"Sua frase de pertencimento", ph:"Trava querida, eu te aceito porque…"},
      {k:"ritual", t:"ritual"}
    ] },

  { n:8,
    title:"Agora, transforme a trava em flecha.",
    hint:"Toque na estrela e dê brilho. Quando ofuscar seus olhos, ela vira a direção do seu desejo.",
    icon:'arrow',
    fields:[{k:"viz", t:"viz"}] }
];

const STEP_LABELS = ["Trava","Origem","Relação","Força","Desejo","Corpo","Acolhimento","Direção"];

/* Ícones SVG por passo — line work dourado, minimalista */
const STEP_ICONS = {
  knot: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <path d="M20 18 C30 8, 50 14, 44 30 C40 42, 22 44, 16 32 C12 22, 28 14, 38 24 C46 32, 34 42, 24 38" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,
  spiral: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <path d="M30 30 m0 -2 a 2 2 0 1 1 -2 2 a 4 4 0 1 1 4 -4 a 7 7 0 1 1 -7 7 a 11 11 0 1 1 11 -11 a 15 15 0 1 1 -15 15 a 19 19 0 1 1 19 -19" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,
  venn: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <circle cx="22" cy="30" r="14" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="38" cy="30" r="14" fill="none" stroke="currentColor" stroke-width="1.4"/>
  </svg>`,
  pillars: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <rect x="12" y="38" width="8" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <rect x="26" y="28" width="8" height="24" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <rect x="40" y="18" width="8" height="34" rx="1" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <path d="M44 14 l1.5 3 l3 .4 l-2.2 2 l.5 3 l-2.8 -1.5 l-2.8 1.5 l.5 -3 l-2.2 -2 l3 -.4 z" fill="currentColor" stroke="none"/>
  </svg>`,
  star: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <g stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none">
      <path d="M30 8 L30 18 M30 42 L30 52 M8 30 L18 30 M42 30 L52 30"/>
      <path d="M14.5 14.5 L21.5 21.5 M38.5 38.5 L45.5 45.5 M14.5 45.5 L21.5 38.5 M38.5 21.5 L45.5 14.5"/>
    </g>
    <circle cx="30" cy="30" r="6" fill="none" stroke="currentColor" stroke-width="1.4"/>
    <circle cx="30" cy="30" r="2.5" fill="currentColor"/>
  </svg>`,
  body: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="30" cy="14" r="6"/>
      <path d="M30 20 L30 24 M22 26 Q30 22 38 26 L36 42 L24 42 Z"/>
      <path d="M22 26 L18 40 M38 26 L42 40"/>
      <path d="M26 42 L24 56 M34 42 L36 56"/>
    </g>
  </svg>`,
  infinity: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <path d="M18 30 C 18 22, 26 22, 30 30 C 34 38, 42 38, 42 30 C 42 22, 34 22, 30 30 C 26 38, 18 38, 18 30 Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,
  arrow: `<svg viewBox="0 0 60 60" class="step-svg" aria-hidden="true">
    <g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 46 L46 14"/>
      <path d="M34 14 L46 14 L46 26"/>
      <path d="M14 46 L18 50 M14 46 L10 50 M14 46 L14 52"/>
    </g>
    <path d="M8 10 l1.5 3 l3 .4 l-2.2 2 l.5 3 l-2.8 -1.5 l-2.8 1.5 l.5 -3 l-2.2 -2 l3 -.4 z" fill="currentColor" stroke="none"/>
  </svg>`
};

const BODY_ZONES = ["Cabeça","Garganta","Peito","Coração","Estômago","Ombros","Costas","Ventre","Mãos","Pernas"];

/* ritual fixo (texto do método) */
const RITUAL_TEXT =
"Trava querida — pode ser medo de exposição, de fracassar, de ficar longe de quem ama, de decepcionar alguém — hoje eu te aceito e te incluo no meu processo de evolução. Você me protegeu até aqui, mas hoje eu sou livre e escolho seguir como seu amigo. Os tempos de guerra já passaram e nós podemos ser mais fortes juntos. Eu reconheço a potência que deixei de ver em você, e todas as vezes que senti raiva por você existir. Você faz parte de mim, da minha herança, e eu te aceito — mas te faço um convite: seja a minha potência a partir de hoje. Eu decido avançar junto com você, em paz, porque meus sonhos são muito maiores e podemos construí-los juntos.";

/* ---------- Estado ---------- */
const KEY = "despertar_mapa_v1";
let data = load();
let stepIdx = 0;

function load(){ try{ return JSON.parse(localStorage.getItem(KEY))||{} }catch(e){ return {} } }
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(data)); flagSaved() }catch(e){} }
let flagT;
function flagSaved(){
  const f=document.getElementById("savedFlag"); if(!f) return;
  f.classList.add("show"); clearTimeout(flagT);
  flagT=setTimeout(()=>f.classList.remove("show"),1400);
}

/* ---------- Haptic feedback ---------- */
const REDUCED_MOTION = matchMedia("(prefers-reduced-motion:reduce)").matches;
function haptic(pattern){
  if(REDUCED_MOTION) return;
  try{ if(navigator.vibrate) navigator.vibrate(pattern||10); }catch(e){}
}

/* ---------- Navegação entre telas ---------- */
function screens(){ return document.querySelectorAll(".screen") }
function show(el, dir){
  screens().forEach(s=>s.classList.remove("active","enter-forward","enter-back"));
  el.classList.add("active");
  if(dir==="forward") el.classList.add("enter-forward");
  else if(dir==="back") el.classList.add("enter-back");
  // re-trigger stagger
  const st=el.querySelector(".stagger");
  if(st){ st.style.animation="none"; void st.offsetWidth; st.style.animation=""; }
  window.scrollTo(0,0);
}
const SCREEN_ORDER = ["hero","intro","breathe","step","result","capture","done"];
function go(name, dir){
  const el=document.querySelector(`.screen[data-screen="${name}"]`);
  const showBar = (name==="step");
  document.getElementById("topbar").classList.toggle("hidden", !showBar);
  if(!dir){
    const cur = document.querySelector(".screen.active");
    const curName = cur ? cur.dataset.screen : null;
    const a = SCREEN_ORDER.indexOf(curName), b = SCREEN_ORDER.indexOf(name);
    dir = (a>=0 && b>=0 && b<a) ? "back" : "forward";
  }
  show(el, dir);
  if(name==="capture") prefillCapture();
  document.body.dataset.stage = name;
}
function prefillCapture(){
  const n=document.getElementById("cap-nome");
  const e=document.getElementById("cap-email");
  const p=document.getElementById("cap-phone");
  if(n) n.value=data.nome||"";
  if(e) e.value=data.email||"";
  if(p) p.value=data.phone||"";
}
function startSteps(){ stepIdx=0; renderStep(); go("step","forward"); }

/* ---------- Respiração (3 ciclos) ---------- */
let breatheT;
function startBreathing(){
  go("breathe","forward");
  const lbl=document.getElementById("breatheLabel");
  if(!lbl) { startSteps(); return; }
  if(REDUCED_MOTION){ lbl.textContent="Respire"; clearTimeout(breatheT); breatheT=setTimeout(()=>startSteps(),1800); return; }
  const cycle = 8000; // sync com .breathe-orb animation
  const phases = [
    [0,    "Inspire"],
    [3000, "Sustente"],
    [5000, "Solte"]
  ];
  let cycleN = 0;
  const totalCycles = 2;
  function run(){
    phases.forEach(([t,text],i)=>{
      setTimeout(()=>{
        const l=document.getElementById("breatheLabel");
        if(!l || document.body.dataset.stage!=="breathe") return;
        if(i===0 && cycleN===1){ l.textContent=text; }
        else { l.style.opacity=0; setTimeout(()=>{ l.textContent=text; l.style.opacity=1; },180); }
        haptic(8);
      }, t);
    });
    cycleN++;
    if(cycleN<totalCycles){
      breatheT = setTimeout(run, cycle);
    } else {
      breatheT = setTimeout(()=>{
        if(document.body.dataset.stage==="breathe") startSteps();
      }, cycle);
    }
  }
  run();
}
function skipBreathing(){ clearTimeout(breatheT); startSteps(); }

/* ---------- Retomada ---------- */
function hasProgress(){
  const keys = Object.keys(data).filter(k=>!k.startsWith("__"));
  return keys.length>0;
}
function setupResume(){
  const card = document.getElementById("resumeCard");
  if(!card) return;
  if(!hasProgress()){ card.style.display="none"; return; }
  const savedIdx = Math.min(Math.max(parseInt(data.__stepIdx||0,10)||0,0), STEPS.length-1);
  const labelEl = document.getElementById("resumeLabel");
  const stepEl = document.getElementById("resumeStep");
  if(labelEl) labelEl.textContent = STEP_LABELS[savedIdx] || "";
  if(stepEl) stepEl.textContent = String(savedIdx+1).padStart(2,"0");
  card.style.display="flex";
}
function resumeJourney(){
  haptic(10);
  const savedIdx = Math.min(Math.max(parseInt(data.__stepIdx||0,10)||0,0), STEPS.length-1);
  stepIdx = savedIdx;
  renderStep();
  go("step","forward");
}

/* ---------- Render de um passo ---------- */
function renderStep(dir){
  const s=STEPS[stepIdx];
  const host=document.querySelector('.screen[data-screen="step"]');
  if(dir){
    host.classList.remove("enter-forward","enter-back");
    void host.offsetWidth;
    host.classList.add(dir==="back"?"enter-back":"enter-forward");
  }
  const iconSvg = STEP_ICONS[s.icon] || "";
  const stepLabel = STEP_LABELS[stepIdx] || "";
  let html=`<div class="stagger">
    <div class="q-header">
      <div class="q-icon">${iconSvg}</div>
      <div class="q-meta">
        <span class="q-tag">Passo 0${s.n} · ${stepLabel}</span>
        <h2 class="q-title">${s.title}</h2>
      </div>
    </div>
    <p class="q-hint">${s.hint}</p>`;

  if(s.fields.some(f=>["textarea","text"].includes(f.t))){
    html+=`<div class="card">`;
    s.fields.forEach(f=>{
      if(f.t==="textarea"){
        html+=`<div class="field">${f.label?`<label>${f.label}</label>`:""}
          <textarea data-k="${f.k}" placeholder="${f.ph||""}">${esc(data[f.k]||"")}</textarea></div>`;
      } else if(f.t==="text"){
        html+=`<div class="field">${f.label?`<label>${f.label}</label>`:""}
          <input type="text" data-k="${f.k}" placeholder="${f.ph||""}" value="${esc(data[f.k]||"")}"></div>`;
      }
    });
    html+=`</div>`;
  }

  s.fields.forEach(f=>{
    if(f.t==="body") html+=bodyMarkup();
    if(f.t==="ritual") html+=ritualMarkup();
    if(f.t==="viz") html+=vizMarkup();
  });

  const last = stepIdx===STEPS.length-1;
  html+=`<div class="actions">
    <button class="btn" onclick="nextStep()">${last?"Concluir o mapa":"Continuar"} <span class="arr">→</span></button>
    <button class="btn-text" onclick="prevStep()">${stepIdx===0?"Voltar à introdução":"Passo anterior"}</button>
  </div></div>`;

  host.innerHTML=html;

  // bind inputs
  host.querySelectorAll("[data-k]").forEach(inp=>{
    inp.addEventListener("input",e=>{ data[e.target.dataset.k]=e.target.value; save(); });
  });
  // body zones (SVG + fallback chips)
  const selectBodyZone = (zoneName)=>{
    haptic(12);
    host.querySelectorAll(".zsvg,.zone").forEach(x=>x.classList.remove("sel"));
    host.querySelectorAll(`[data-z="${zoneName}"]`).forEach(x=>x.classList.add("sel"));
    data.corpo=zoneName; save();
    const lbl=host.querySelector("#bodyLabel");
    if(lbl) lbl.textContent=zoneName;
  };
  if(data.corpo){
    host.querySelectorAll(`[data-z="${data.corpo}"]`).forEach(x=>x.classList.add("sel"));
  }
  host.querySelectorAll(".zsvg,.zone").forEach(z=>{
    z.addEventListener("click",()=>selectBodyZone(z.dataset.z));
  });
  // ritual read aloud
  const ra=host.querySelector(".read-aloud");
  if(ra) ra.addEventListener("click",toggleSpeak);
  // viz
  if(host.querySelector("#viz")) initViz();

  // auto-focus primeiro campo (apenas desktop; mobile evita teclado pulando)
  if(matchMedia("(min-width:768px) and (hover:hover)").matches){
    const first=host.querySelector("textarea, input[type=text]");
    if(first && !first.value) setTimeout(()=>first.focus({preventScroll:true}),250);
  }

  updateProgress();
}

function bodyMarkup(){
  return `
  <div class="bodymap">
    <div class="body-figure">
      <svg viewBox="0 0 200 440" xmlns="http://www.w3.org/2000/svg" class="body-svg" aria-label="Mapa do corpo - toque para selecionar uma região">
        <!-- aura/halo de fundo -->
        <defs>
          <radialGradient id="bodyAura" cx="50%" cy="35%" r="55%">
            <stop offset="0%" stop-color="#C9A862" stop-opacity=".10"/>
            <stop offset="60%" stop-color="#C9A862" stop-opacity=".03"/>
            <stop offset="100%" stop-color="#C9A862" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="200" height="440" fill="url(#bodyAura)"/>
        <!-- silhueta anatômica refinada -->
        <g class="silhouette" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <!-- cabeça (ovalada, mais natural) -->
          <ellipse cx="100" cy="40" rx="22" ry="26"/>
          <!-- pescoço -->
          <path d="M90 64 Q90 74 86 80 M110 64 Q110 74 114 80"/>
          <!-- torso outline (ombros largos -> cintura -> quadril) -->
          <path d="M86 80 Q62 84 50 100 Q42 116 48 138 Q54 168 56 198 Q56 218 58 232 L142 232 Q144 218 144 198 Q146 168 152 138 Q158 116 150 100 Q138 84 114 80"/>
          <!-- linha do peito sutil -->
          <path d="M76 116 Q100 124 124 116" opacity=".5"/>
          <!-- cintura -->
          <path d="M62 178 L138 178" opacity=".3"/>
          <!-- braço esquerdo -->
          <path d="M50 100 Q40 130 36 162 Q34 196 38 224 Q40 244 36 256"/>
          <path d="M62 104 Q56 130 54 162 Q52 196 56 224"/>
          <!-- braço direito -->
          <path d="M150 100 Q160 130 164 162 Q166 196 162 224 Q160 244 164 256"/>
          <path d="M138 104 Q144 130 146 162 Q148 196 144 224"/>
          <!-- mão esq/dir -->
          <ellipse cx="36" cy="266" rx="8" ry="11"/>
          <ellipse cx="164" cy="266" rx="8" ry="11"/>
          <!-- divisor pélvis -->
          <path d="M100 232 L100 250"/>
          <!-- perna esquerda -->
          <path d="M58 232 Q60 290 62 350 Q64 400 70 420"/>
          <path d="M96 250 Q94 300 90 350 Q86 400 84 420"/>
          <!-- perna direita -->
          <path d="M142 232 Q140 290 138 350 Q136 400 130 420"/>
          <path d="M104 250 Q106 300 110 350 Q114 400 116 420"/>
          <!-- pés -->
          <path d="M70 420 L86 422 L84 428 L68 426 Z"/>
          <path d="M130 420 L114 422 L116 428 L132 426 Z"/>
        </g>
        <!-- zonas clicáveis (ordem importa: maiores primeiro p/ Z-stacking correto) -->
        <g class="zones-svg">
          <rect   class="zsvg" data-z="Pernas"   x="48" y="240" width="104" height="180" rx="50"/>
          <rect   class="zsvg" data-z="Peito"    x="58" y="86"  width="84"  height="38"  rx="16"/>
          <rect   class="zsvg" data-z="Estômago" x="64" y="128" width="72"  height="28"  rx="14"/>
          <rect   class="zsvg" data-z="Ventre"   x="66" y="160" width="68"  height="44"  rx="16"/>
          <circle class="zsvg" data-z="Ombros"   cx="54"  cy="96"  r="16"/>
          <circle class="zsvg" data-z="Ombros"   cx="146" cy="96"  r="16"/>
          <circle class="zsvg" data-z="Coração"  cx="84"  cy="110" r="14"/>
          <ellipse class="zsvg" data-z="Cabeça"  cx="100" cy="40"  rx="24" ry="28"/>
          <rect   class="zsvg" data-z="Garganta" x="84" y="64" width="32" height="22" rx="9"/>
          <ellipse class="zsvg" data-z="Mãos"    cx="36"  cy="266" rx="11" ry="14"/>
          <ellipse class="zsvg" data-z="Mãos"    cx="164" cy="266" rx="11" ry="14"/>
        </g>
        <!-- pulsador para a região selecionada -->
        <g class="zone-pulse" id="zonePulse" style="opacity:0;pointer-events:none"></g>
      </svg>
      <div class="body-label" id="bodyLabel">${data.corpo||"Toque uma região do corpo"}</div>
    </div>
    <div class="zones-fallback">
      <button class="zone" data-z="Costas" type="button">⤺ Costas</button>
    </div>
  </div>`;
}
function ritualMarkup(){
  return `<div class="ritual"><span class="mark">“</span>${RITUAL_TEXT.replace(/—/g,"—")}</div>
    <button class="read-aloud"><span class="dot"></span><span class="ra-label">Ouvir / parar o ritual</span></button>`;
}
function vizMarkup(){
  return `<div class="viz-wrap"><canvas id="viz"></canvas>
    <div class="viz-hint" id="vizHint">toque e segure na estrela para dar brilho</div></div>`;
}

function esc(s){ return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

function nextStep(){
  haptic(10);
  if(stepIdx<STEPS.length-1){ stepIdx++; data.__stepIdx=stepIdx; save(); renderStep("forward"); }
  else { data.__stepIdx=stepIdx; save(); renderResult(); go("result","forward"); }
}
function prevStep(){
  haptic(8);
  if(stepIdx>0){ stepIdx--; data.__stepIdx=stepIdx; save(); renderStep("back"); }
  else { go("intro","back"); }
}
function updateProgress(){
  const pct=((stepIdx+1)/STEPS.length)*100;
  document.getElementById("bar").style.width=pct+"%";
  const label = STEP_LABELS[stepIdx]||"";
  document.getElementById("count").textContent=`${label} · 0${stepIdx+1}/0${STEPS.length}`;
  document.body.dataset.stage = "step-"+stepIdx;
}

/* ---------- Voz (Web Speech API) ---------- */
let speaking=false;
function toggleSpeak(){
  if(!("speechSynthesis" in window)) return;
  const lbl=document.querySelector(".ra-label");
  if(speaking){ speechSynthesis.cancel(); speaking=false; if(lbl)lbl.textContent="Ouvir / parar o ritual"; return; }
  const u=new SpeechSynthesisUtterance(RITUAL_TEXT);
  u.lang="pt-BR"; u.rate=.92; u.pitch=1;
  u.onend=()=>{ speaking=false; if(lbl)lbl.textContent="Ouvir / parar o ritual"; };
  speechSynthesis.cancel(); speechSynthesis.speak(u); speaking=true;
  if(lbl)lbl.textContent="Parar o ritual";
}

/* ============================================================
   VISUALIZAÇÃO: estrela que brilha -> flecha (passo 8)
   ============================================================ */
let vizRAF, vizState;
function initViz(){
  const cv=document.getElementById("viz"); if(!cv) return;
  const ctx=cv.getContext("2d");
  const hint=document.getElementById("vizHint");
  let charging=false, transformed=false;
  vizState={ glow:0, arrowT:0, t:0, twinkle:[] };
  if(data.viz==="flecha"){ transformed=true; vizState.glow=1; vizState.arrowT=1;
    if(hint) hint.textContent="a trava virou flecha — direcione-a ao seu objetivo"; }
  // pequenas estrelas de fundo
  for(let i=0;i<46;i++) vizState.twinkle.push({x:Math.random(),y:Math.random(),r:Math.random()*1.4+.3,p:Math.random()*6});

  function fit(){
    const dpr=Math.min(devicePixelRatio||1,2);
    cv.width=cv.clientWidth*dpr; cv.height=cv.clientHeight*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  fit(); window.addEventListener("resize",fit);

  const start=()=>{ if(!transformed) charging=true; };
  const stop=()=>{ charging=false; };
  cv.addEventListener("mousedown",start); cv.addEventListener("touchstart",e=>{e.preventDefault();start();},{passive:false});
  window.addEventListener("mouseup",stop); cv.addEventListener("touchend",stop);

  function star(cx,cy,spikes,outer,inner,rot){
    ctx.beginPath();
    for(let i=0;i<spikes*2;i++){
      const r=i%2?inner:outer, a=Math.PI*i/spikes - Math.PI/2 + rot;
      ctx[i?"lineTo":"moveTo"](cx+Math.cos(a)*r, cy+Math.sin(a)*r);
    } ctx.closePath();
  }

  function draw(){
    const W=cv.clientWidth, H=cv.clientHeight, cx=W/2, cy=H*0.5;
    vizState.t+=0.016;
    if(charging && vizState.glow<1) vizState.glow=Math.min(1,vizState.glow+0.012);
    if(!charging && !transformed && vizState.glow>0) vizState.glow=Math.max(0,vizState.glow-0.006);
    if(vizState.glow>=1 && !transformed){ transformed=true; data.viz="flecha"; save();
      haptic([12,60,12]);
      if(hint) hint.textContent="a trava virou flecha — direcione-a ao seu objetivo"; }
    if(transformed && vizState.arrowT<1) vizState.arrowT=Math.min(1,vizState.arrowT+0.02);

    ctx.clearRect(0,0,W,H);
    // estrelas de fundo
    vizState.twinkle.forEach(s=>{
      const tw=.4+.6*Math.abs(Math.sin(vizState.t*1.5+s.p));
      ctx.globalAlpha=tw*.6; ctx.fillStyle="#E4CE9C";
      ctx.beginPath(); ctx.arc(s.x*W,s.y*H,s.r,0,7); ctx.fill();
    });
    ctx.globalAlpha=1;

    const g=vizState.glow;
    const starFade = transformed ? Math.max(0,1-vizState.arrowT*1.4) : 1;
    if(starFade>0){
      // halo
      const haloR=(40+g*120);
      const grd=ctx.createRadialGradient(cx,cy,0,cx,cy,haloR);
      grd.addColorStop(0,`rgba(244,236,220,${(.5+g*.5)*starFade})`);
      grd.addColorStop(.4,`rgba(201,168,98,${(.25+g*.4)*starFade})`);
      grd.addColorStop(1,"rgba(201,168,98,0)");
      ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(cx,cy,haloR,0,7); ctx.fill();
      // estrela
      const sz=24+g*30, rot=vizState.t*.25;
      ctx.save();
      ctx.globalAlpha=starFade;
      ctx.shadowColor="#E4CE9C"; ctx.shadowBlur=20+g*70;
      const sg=ctx.createLinearGradient(cx-sz,cy-sz,cx+sz,cy+sz);
      sg.addColorStop(0,"#F7EFD8"); sg.addColorStop(1,"#C9A862");
      ctx.fillStyle=sg;
      star(cx,cy,5,sz,sz*.42,rot); ctx.fill();
      ctx.restore();
    }
    if(transformed){
      // flecha emergindo
      const at=easeOut(vizState.arrowT);
      const len=130*at, ang=-Math.PI/4;
      ctx.save(); ctx.translate(cx,cy); ctx.rotate(ang);
      ctx.globalAlpha=at;
      ctx.strokeStyle="#E4CE9C"; ctx.lineWidth=3; ctx.lineCap="round";
      ctx.shadowColor="#C9A862"; ctx.shadowBlur=18;
      ctx.beginPath(); ctx.moveTo(-len/2,0); ctx.lineTo(len/2,0); ctx.stroke();
      // ponta
      ctx.fillStyle="#F7EFD8"; ctx.beginPath();
      ctx.moveTo(len/2+12,0); ctx.lineTo(len/2-6,-9); ctx.lineTo(len/2-6,9); ctx.closePath(); ctx.fill();
      // penas
      ctx.beginPath(); ctx.moveTo(-len/2,0); ctx.lineTo(-len/2-12,-8);
      ctx.moveTo(-len/2+8,0); ctx.lineTo(-len/2-4,-8);
      ctx.moveTo(-len/2,0); ctx.lineTo(-len/2-12,8);
      ctx.moveTo(-len/2+8,0); ctx.lineTo(-len/2-4,8); ctx.stroke();
      ctx.restore();
    }
    vizRAF=requestAnimationFrame(draw);
  }
  cancelAnimationFrame(vizRAF); draw();
  if(transformedFromData()){ /* mantém estado se já feito */ }
}
function easeOut(t){ return 1-Math.pow(1-t,3); }
function transformedFromData(){ return false; }

/* ---------- Tela de Resultado: síntese personalizada e narrativa ---------- */
const BODY_READINGS = {
  "Cabeça": "na racionalização — onde você fica girando um pensamento sem conseguir sair dele",
  "Garganta": "na voz que você ainda não autorizou — o que precisa ser dito está represado aí",
  "Peito": "no fôlego — bem onde a expansão acontece quando você se permite",
  "Coração": "no afeto — no que você ama tanto que tem medo de perder",
  "Estômago": "na intuição — você sabe antes da mente saber, e isso te aperta aí",
  "Ombros": "no peso que você carrega — provavelmente uma responsabilidade que nem era sua",
  "Costas": "no que vem por trás — no que está fora do seu campo de visão consciente",
  "Ventre": "no centro criativo — onde nasce o que ainda não veio para fora",
  "Mãos": "no fazer — no que está pronto para sair de você e ainda não saiu",
  "Pernas": "na direção — no avançar que ainda não autorizou"
};

/* ============================================================
   CONSTELAÇÃO: pôster generativo determinístico das respostas
   ============================================================ */
function fnv1a(str){
  let h = 2166136261 >>> 0;
  for(let i=0;i<str.length;i++){
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
function mulberry32(seed){
  let a = seed >>> 0;
  return function(){
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t>>>15), t | 1);
    t ^= t + Math.imul(t ^ (t>>>7), t | 61);
    return ((t ^ (t>>>14)) >>> 0) / 4294967296;
  };
}
const ZONE_TOPO = {
  "Cabeça":   { kind:"crown",   anchor:0.30 },
  "Garganta": { kind:"column",  anchor:0.36 },
  "Peito":    { kind:"radiant", anchor:0.46 },
  "Coração":  { kind:"ring",    anchor:0.50 },
  "Estômago": { kind:"spiral",  anchor:0.54 },
  "Ombros":   { kind:"arc",     anchor:0.40 },
  "Costas":   { kind:"column",  anchor:0.48 },
  "Ventre":   { kind:"spiral",  anchor:0.58 },
  "Mãos":     { kind:"radiant", anchor:0.50 },
  "Pernas":   { kind:"column",  anchor:0.66 }
};

function drawConstellation(cv, opts){
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height;
  const cssW = parseFloat(cv.dataset.cssW||W), cssH = parseFloat(cv.dataset.cssH||H);
  const scale = W / cssW;
  ctx.setTransform(scale,0,0,scale,0,0);
  const w = cssW, h = cssH;

  const nome = (opts.nome||"").trim();
  const trava = (opts.trava||"").trim();
  const corpo = (opts.corpo||"").trim();
  const desejo = (opts.desejo||"").trim();
  const frase = (opts.frase||"").trim();
  const seedStr = [trava,corpo,desejo,frase,opts.primeira||"",opts.pessoa||""].join("|") || "vazio";
  const seed = fnv1a(seedStr);
  const rnd = mulberry32(seed);

  // fundo
  const bg = ctx.createLinearGradient(0,0,0,h);
  bg.addColorStop(0,"#1a130a");
  bg.addColorStop(0.55,"#0e0a05");
  bg.addColorStop(1,"#080503");
  ctx.fillStyle = bg;
  ctx.fillRect(0,0,w,h);

  // aurora sutil
  const aur = ctx.createRadialGradient(w*0.5, h*0.18, 10, w*0.5, h*0.18, h*0.5);
  aur.addColorStop(0,"rgba(228,206,156,0.18)");
  aur.addColorStop(1,"rgba(228,206,156,0)");
  ctx.fillStyle = aur;
  ctx.fillRect(0,0,w,h);

  // estrelas de fundo
  ctx.save();
  for(let i=0;i<180;i++){
    const x = rnd()*w, y = rnd()*h;
    const r = rnd()*1.6 + 0.3;
    const a = 0.25 + rnd()*0.55;
    ctx.globalAlpha = a;
    ctx.fillStyle = rnd()>0.85 ? "#F4ECDC" : "#C9A862";
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
  }
  ctx.restore();

  // grão
  ctx.save();
  ctx.globalAlpha = 0.04;
  for(let i=0;i<1400;i++){
    ctx.fillStyle = rnd()>0.5 ? "#fff" : "#000";
    ctx.fillRect(rnd()*w, rnd()*h, 1, 1);
  }
  ctx.restore();

  // moldura
  ctx.save();
  ctx.strokeStyle = "rgba(201,168,98,0.45)";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(w*0.04, h*0.04, w*0.92, h*0.92);
  ctx.strokeStyle = "rgba(201,168,98,0.18)";
  ctx.strokeRect(w*0.055, h*0.055, w*0.89, h*0.89);
  ctx.restore();

  // header
  ctx.save();
  ctx.fillStyle = "#C9A862";
  ctx.textAlign = "center";
  ctx.font = '500 ' + Math.round(w*0.022) + 'px "Jost", sans-serif';
  const headerY = h*0.085;
  ctx.fillText("MÉTODO  DESPERTAR  ESPIRAL", w/2, headerY);
  ctx.font = 'italic 500 ' + Math.round(w*0.078) + 'px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = "#F4ECDC";
  ctx.fillText("Mapa do Poder", w/2, headerY + w*0.085);
  // ornamento
  ctx.strokeStyle = "rgba(201,168,98,0.5)";
  ctx.lineWidth = 1;
  const ornY = headerY + w*0.105;
  ctx.beginPath(); ctx.moveTo(w*0.32, ornY); ctx.lineTo(w*0.45, ornY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*0.55, ornY); ctx.lineTo(w*0.68, ornY); ctx.stroke();
  ctx.fillStyle = "#C9A862";
  ctx.beginPath(); ctx.arc(w*0.5, ornY, w*0.008, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  // CONSTELAÇÃO
  const topo = ZONE_TOPO[corpo] || { kind:"radiant", anchor:0.5 };
  const cx = w*0.5, cy = h*topo.anchor;
  const baseR = w*0.28;
  const spikes = 5 + (fnv1a(trava||"x") % 4); // 5..8
  const desejoSeed = fnv1a(desejo||"d");
  const desejoLen = (desejo||"").length;
  const rays = 6 + (desejoLen % 7); // 6..12
  const fraseSeed = fnv1a(frase||"f");

  ctx.save();
  // halo grande
  const halo = ctx.createRadialGradient(cx,cy,2, cx,cy,baseR*1.8);
  halo.addColorStop(0,"rgba(244,236,220,0.22)");
  halo.addColorStop(0.5,"rgba(201,168,98,0.10)");
  halo.addColorStop(1,"rgba(201,168,98,0)");
  ctx.fillStyle = halo;
  ctx.beginPath(); ctx.arc(cx,cy,baseR*1.8,0,Math.PI*2); ctx.fill();

  // raios do desejo
  ctx.strokeStyle = "rgba(228,206,156,0.42)";
  ctx.lineWidth = 0.9;
  for(let i=0;i<rays;i++){
    const a = (i/rays)*Math.PI*2 + (desejoSeed % 360)*Math.PI/180;
    const r1 = baseR*0.55, r2 = baseR*(1.05 + rnd()*0.35);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(a)*r1, cy + Math.sin(a)*r1);
    ctx.lineTo(cx + Math.cos(a)*r2, cy + Math.sin(a)*r2);
    ctx.stroke();
  }

  // topologia da constelação por região
  const anchors = [];
  if(topo.kind==="ring"){
    for(let i=0;i<spikes;i++){
      const a = (i/spikes)*Math.PI*2 - Math.PI/2;
      anchors.push({x: cx+Math.cos(a)*baseR*0.78, y: cy+Math.sin(a)*baseR*0.78, r: 4 + (i===0?2:0)});
    }
  } else if(topo.kind==="spiral"){
    for(let i=0;i<spikes+2;i++){
      const t = i/(spikes+2);
      const a = t*Math.PI*3 + (fraseSeed%180)*Math.PI/180;
      const r = baseR*(0.25 + t*0.7);
      anchors.push({x: cx+Math.cos(a)*r, y: cy+Math.sin(a)*r, r: 3 + t*3});
    }
  } else if(topo.kind==="column"){
    for(let i=0;i<spikes;i++){
      const t = i/(spikes-1||1);
      const off = (rnd()-0.5)*baseR*0.35;
      anchors.push({x: cx + off, y: cy - baseR*0.7 + t*baseR*1.4, r: 3 + (i===Math.floor(spikes/2)?3:0)});
    }
  } else if(topo.kind==="crown"){
    for(let i=0;i<spikes;i++){
      const a = -Math.PI*0.85 + (i/(spikes-1||1))*Math.PI*0.7;
      const r = baseR*(0.7 + (i%2?0.18:0));
      anchors.push({x: cx+Math.cos(a)*r, y: cy+Math.sin(a)*r, r: 3.5});
    }
    anchors.push({x: cx, y: cy + baseR*0.25, r: 5});
  } else if(topo.kind==="arc"){
    for(let i=0;i<spikes;i++){
      const a = Math.PI*0.15 + (i/(spikes-1||1))*Math.PI*0.7;
      anchors.push({x: cx+Math.cos(a)*baseR*0.85, y: cy+Math.sin(a)*baseR*0.85 - baseR*0.2, r: 3.5});
    }
  } else { // radiant
    for(let i=0;i<spikes;i++){
      const a = (i/spikes)*Math.PI*2 + (fraseSeed%90)*Math.PI/180;
      const r = baseR*(0.55 + rnd()*0.5);
      anchors.push({x: cx+Math.cos(a)*r, y: cy+Math.sin(a)*r, r: 3 + rnd()*2.5});
    }
  }
  anchors.push({x:cx, y:cy, r:7, core:true});

  // linhas conectando
  ctx.strokeStyle = "rgba(201,168,98,0.55)";
  ctx.lineWidth = 1.1;
  for(let i=0;i<anchors.length-1;i++){
    const a = anchors[i], b = anchors[(i+1)%(anchors.length-1)];
    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
  }
  // raios do núcleo até alguns nós
  for(let i=0;i<anchors.length-1;i+=2){
    const a = anchors[i];
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(a.x,a.y);
    ctx.strokeStyle = "rgba(228,206,156,0.35)";
    ctx.stroke();
  }

  // estrelas (anchors)
  anchors.forEach(a=>{
    const r = a.r * (a.core?1.6:1);
    const g = ctx.createRadialGradient(a.x,a.y,0,a.x,a.y,r*4);
    g.addColorStop(0, a.core?"rgba(255,250,235,1)":"rgba(244,236,220,0.95)");
    g.addColorStop(0.3,"rgba(228,206,156,0.6)");
    g.addColorStop(1,"rgba(201,168,98,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(a.x,a.y,r*4,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = a.core?"#FFF7E2":"#F4ECDC";
    ctx.beginPath(); ctx.arc(a.x,a.y,r,0,Math.PI*2); ctx.fill();
  });

  // estrela-flecha (mira) — apontando para nordeste se transformada
  if(opts.transformed){
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI/4);
    const len = baseR*1.05;
    ctx.strokeStyle = "rgba(255,247,226,0.95)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.shadowColor = "#E4CE9C";
    ctx.shadowBlur = 16;
    ctx.beginPath(); ctx.moveTo(-len/2,0); ctx.lineTo(len/2,0); ctx.stroke();
    ctx.fillStyle = "#FFF7E2";
    ctx.beginPath();
    ctx.moveTo(len/2+10,0); ctx.lineTo(len/2-7,-8); ctx.lineTo(len/2-7,8); ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-len/2,0); ctx.lineTo(-len/2-10,-7);
    ctx.moveTo(-len/2,0); ctx.lineTo(-len/2-10,7);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  // labels — abaixo da constelação
  ctx.save();
  ctx.textAlign = "center";
  let ty = cy + baseR*1.6;

  if(nome){
    ctx.fillStyle = "#E4CE9C";
    ctx.font = 'italic 500 ' + Math.round(w*0.052) + 'px "Cormorant Garamond", serif';
    ctx.fillText(nome, w/2, ty);
    ty += w*0.062;
  }

  if(corpo){
    ctx.fillStyle = "#C9A862";
    ctx.font = '500 ' + Math.round(w*0.018) + 'px "Jost", sans-serif';
    ctx.fillText(("Trava ancora em · " + corpo).toUpperCase(), w/2, ty);
    ty += w*0.04;
  }

  // frase de pertencimento — multi-linha
  if(frase){
    ctx.fillStyle = "#F4ECDC";
    ctx.font = 'italic 400 ' + Math.round(w*0.036) + 'px "Cormorant Garamond", serif';
    const lines = wrapText(ctx, '"' + frase + '"', w*0.78);
    lines.slice(0,4).forEach(line=>{
      ctx.fillText(line, w/2, ty);
      ty += w*0.046;
    });
  } else if(desejo){
    ctx.fillStyle = "#F4ECDC";
    ctx.font = 'italic 400 ' + Math.round(w*0.034) + 'px "Cormorant Garamond", serif';
    const lines = wrapText(ctx, desejo, w*0.78);
    lines.slice(0,3).forEach(line=>{ ctx.fillText(line, w/2, ty); ty += w*0.044; });
  }
  ctx.restore();

  // footer
  ctx.save();
  ctx.textAlign = "center";
  const footY = h*0.93;
  ctx.strokeStyle = "rgba(201,168,98,0.4)";
  ctx.beginPath(); ctx.moveTo(w*0.3, footY - w*0.04); ctx.lineTo(w*0.7, footY - w*0.04); ctx.stroke();
  ctx.fillStyle = "#C9A862";
  ctx.font = '500 ' + Math.round(w*0.018) + 'px "Jost", sans-serif';
  ctx.fillText("@DESPERTARESPIRAL  ·  @DRASUNYANNUNES", w/2, footY);
  ctx.fillStyle = "#8A7B63";
  ctx.font = '400 ' + Math.round(w*0.016) + 'px "Jost", sans-serif';
  ctx.fillText("despertarespiral.com.br/mapa-do-poder", w/2, footY + w*0.028);
  ctx.restore();
}

function wrapText(ctx, text, maxW){
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = "";
  words.forEach(w=>{
    const test = cur ? cur+" "+w : w;
    if(ctx.measureText(test).width > maxW && cur){
      lines.push(cur); cur = w;
    } else cur = test;
  });
  if(cur) lines.push(cur);
  return lines;
}

function renderPoster(){
  const cv = document.getElementById("poster");
  if(!cv) return;
  const TARGET_W = 1080, TARGET_H = 1920;
  const dpr = Math.min(devicePixelRatio||1, 2);
  cv.width = TARGET_W; cv.height = TARGET_H;
  cv.dataset.cssW = TARGET_W; cv.dataset.cssH = TARGET_H;
  drawConstellation(cv, {
    nome: data.nome,
    trava: data.trava,
    corpo: data.corpo,
    desejo: data.desejo,
    frase: data.frase_vinculo,
    primeira: data.primeira_vez,
    pessoa: data.pessoa,
    transformed: data.viz==="flecha"
  });
}

function downloadPoster(){
  haptic(15);
  const cv = document.getElementById("poster");
  if(!cv) return;
  const nameSafe = (data.nome||"meu-mapa").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"") || "meu-mapa";
  if(cv.toBlob){
    cv.toBlob(blob=>{
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `mapa-do-poder-${nameSafe}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(()=>URL.revokeObjectURL(url), 4000);
    }, "image/png");
  } else {
    const url = cv.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = `mapa-do-poder-${nameSafe}.png`;
    document.body.appendChild(a); a.click(); a.remove();
  }
}

function renderResult(){
  const host=document.querySelector('.screen[data-screen="result"]');
  const nome = (data.nome||"").trim();
  const trava = (data.trava||"").trim();
  const corpo = (data.corpo||"").trim();
  const desejo = (data.desejo||"").trim();
  const frase = (data.frase_vinculo||"").trim();
  const momentos = [data.momento1, data.momento2, data.momento3].filter(m=>(m||"").trim()).map(m=>esc(m));
  const sentimentos = (data.sentimentos||"").trim();
  const primeira = (data.primeira_vez||"").trim();
  const pessoa = (data.pessoa||"").trim();
  const relacao = (data.relacao||"").trim();

  const saudacao = nome ? `${esc(nome)},` : "Olha o que você acabou de construir:";
  const corpoLeitura = corpo && BODY_READINGS[corpo] ? BODY_READINGS[corpo] : "";

  // chips de insights rápidos no topo
  const insights = [];
  if(trava) insights.push({label:"Trava", value:trava.length>40?trava.slice(0,38)+"…":trava});
  if(corpo) insights.push({label:"Corpo", value:corpo});
  if(desejo) insights.push({label:"Desejo", value:desejo.length>40?desejo.slice(0,38)+"…":desejo});

  let html = `<div class="stagger">
    <p class="eyebrow">Seu Mapa</p>
    <h2 style="margin-top:16px">${saudacao}<br><em>aqui está sua leitura</em></h2>
    <p class="body" style="margin-top:20px">Este é o seu mapa, costurado a partir das suas próprias respostas. Releia com calma — ele não foi escrito por mim, foi escrito por você.</p>

    <div class="poster-wrap" style="margin-top:24px">
      <canvas id="poster" aria-label="Pôster constelação do seu Mapa do Poder"></canvas>
    </div>
    <div class="poster-actions">
      <button class="btn" onclick="downloadPoster()">Baixar pôster (PNG) <span class="arr">↓</span></button>
      <button class="btn-ghost" onclick="sharePoster()" type="button">Compartilhar imagem</button>
    </div>
    <p class="poster-caption">Sua constelação · gerada a partir das suas respostas</p>`;

  if(insights.length){
    html += `<div class="insights">`+
      insights.map(i=>`<div class="insight"><span class="insight-label">${i.label}</span><span class="insight-value">${esc(i.value)}</span></div>`).join("")+
      `</div>`;
  }

  html += `
    <!-- Leitura narrativa: o coração do resultado -->
    <div class="ritual" style="border-left-color:var(--gold);margin-top:24px;font-style:normal;font-family:var(--sans);font-size:clamp(15px,3.7vw,16px);line-height:1.75;color:var(--cream)">`;

  // Parágrafo 1: a trava nomeada
  if(trava){
    html += `<p style="margin-bottom:14px">Você reconheceu como sua trava principal: <b style="color:var(--gold-soft);font-weight:500">"${esc(trava)}"</b>. Nomear é o primeiro ato de poder — porque o que não tem nome continua mandando em você sem que você veja.</p>`;
  }

  // Parágrafo 2: origem
  if(primeira || pessoa){
    html += `<p style="margin-bottom:14px">Ela tem uma história. ${primeira?`Começou em algum lugar do tempo: <i>${esc(primeira)}</i>.`:""} ${pessoa?`E aparece perto de <b style="color:var(--gold-soft);font-weight:500">${esc(pessoa)}</b> — isso não é coincidência. As pessoas que ativam nossas travas são, no fundo, espelhos do que precisamos integrar.`:""}</p>`;
  }

  // Parágrafo 3: força que já viveu
  if(momentos.length || sentimentos){
    html += `<p style="margin-bottom:14px">Mas olha o que você também trouxe: <b style="color:var(--gold-soft);font-weight:500">você já avançou antes</b>. ${momentos.length?`Você lembrou de ${momentos.length} ${momentos.length>1?"momentos":"momento"} em que seguiu mesmo com a trava — isso é prova viva de que o caminho existe.`:""} ${sentimentos?`Naqueles momentos você sentiu: <i>${esc(sentimentos)}</i>. Guarde essa lista — ela é o seu antídoto.`:""}</p>`;
  }

  // Parágrafo 4: corpo + desejo
  if(corpo || desejo){
    html += `<p style="margin-bottom:14px">`;
    if(corpo){
      html += `Seu corpo te entregou a pista: a trava mora em <b style="color:var(--gold-soft);font-weight:500">${esc(corpo)}</b>${corpoLeitura?` — ${corpoLeitura}`:""}. Toda vez que você sentir essa região tensionando, é a sua trava pedindo presença, não fuga. `;
    }
    if(desejo){
      html += `E aqui está a direção: você nomeou que deseja <b style="color:var(--gold-soft);font-weight:500">${esc(desejo)}</b>. Esse desejo não é o oposto da sua trava — é o que ela está escondendo. A trava aponta exatamente para onde sua potência quer crescer.`;
    }
    html += `</p>`;
  }

  // Parágrafo 5: pertencimento
  if(frase){
    html += `<p style="margin-bottom:14px">Você criou a frase: <em style="color:var(--gold-soft);font-family:var(--serif);font-size:1.08em">"${esc(frase)}"</em>. Essa é a sua chave. Quando a trava aparecer, repita essa frase em voz alta — você está dizendo ao seu sistema que ela tem lugar, e por isso pode soltar.</p>`;
  }

  // Fechamento
  html += `<p style="margin-top:18px;padding-top:18px;border-top:1px solid var(--line);color:var(--gold-soft)"><b style="font-weight:500">A flecha já foi forjada.</b> Ela aponta para o seu desejo. A trava virou direção. Agora é caminhar.</p>`;

  html += `</div>

    <!-- Recapitulação compacta das respostas -->
    <details style="margin-top:30px;border:1px solid var(--line);border-radius:14px;padding:0;overflow:hidden;background:rgba(0,0,0,.18)">
      <summary style="cursor:pointer;padding:16px 20px;color:var(--gold-soft);font-family:var(--sans);font-size:13px;letter-spacing:.18em;text-transform:uppercase;font-weight:500">Ver minhas respostas detalhadas</summary>
      <div style="padding:6px 20px 20px">`;

  const blocks = [
    ["A trava", trava],
    ["Primeira vez", primeira],
    ["Pessoa associada", pessoa],
    ["A relação", relacao],
    ["Momentos de força", momentos.length?`<ul class="result-list">${momentos.map(m=>`<li>${m}</li>`).join("")}</ul>`:""],
    ["Sentimentos vividos", sentimentos],
    ["O que mais desejo", desejo],
    ["Onde mora no corpo", corpo],
    ["Frase de pertencimento", frase?`<span style="font-family:var(--serif);font-style:italic">"${esc(frase)}"</span>`:""]
  ];

  blocks.forEach(([label, value])=>{
    if(value){
      const v = (typeof value==="string" && !value.startsWith("<")) ? esc(value) : value;
      html += `<div class="result-block">
        <div class="result-label">${label}</div>
        <div class="result-value">${v}</div>
      </div>`;
    }
  });

  html += `</div></details>

    <p class="q-hint" style="margin-top:22px">Seu mapa fica salvo neste dispositivo. Volte sempre que precisar.</p>

    <div class="actions">
      <button class="btn" onclick="go('capture')">Continuar <span class="arr">→</span></button>
      <button class="btn-ghost" onclick="window.print()" type="button">Imprimir / salvar PDF</button>
    </div>
    <button class="btn-text" onclick="stepIdx=${STEPS.length-1};renderStep();go('step')" style="margin-top:6px">Revisar última resposta</button>
  </div>`;

  host.innerHTML = html;
  requestAnimationFrame(()=>renderPoster());
}

/* ---------- Compartilhar pôster (Web Share API com arquivo, fallback link) ---------- */
async function sharePoster(){
  haptic(10);
  const cv = document.getElementById("poster");
  if(!cv){ shareIt(); return; }
  const url = "https://despertarespiral.com.br/mapa-do-poder";
  const text = "Meu Mapa do Poder — Método Despertar Espiral.";
  try{
    if(cv.toBlob && navigator.canShare){
      const blob = await new Promise(res=>cv.toBlob(res, "image/png"));
      if(blob){
        const file = new File([blob], "mapa-do-poder.png", { type:"image/png" });
        if(navigator.canShare({ files:[file] })){
          await navigator.share({ files:[file], title:"Mapa do Poder", text, url });
          return;
        }
      }
    }
  }catch(e){}
  shareIt();
}

/* ---------- Captura de contato (último: nome, email, telefone) ---------- */
async function submitCapture(){
  const nome=document.getElementById("cap-nome").value.trim();
  const email=document.getElementById("cap-email").value.trim();
  const phone=document.getElementById("cap-phone").value.trim();
  const btn=document.getElementById("cap-send");
  data.nome=nome; data.email=email; data.phone=phone; save();
  if(!nome && !email && !phone){ go("done"); return; }
  btn.textContent="Enviando…"; btn.disabled=true;
  if(CAPTURE_ENDPOINT){
    try{
      await fetch(CAPTURE_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({nome,email,phone,fonte:"mapa-do-poder"})});
    }catch(e){}
  }
  go("done");
}

/* ---------- Concluir / reiniciar / compartilhar ---------- */
function restart(){
  if(confirm("Isto vai apagar suas respostas salvas neste dispositivo. Deseja recomeçar?")){
    data={}; localStorage.removeItem(KEY); stepIdx=0;
    const card = document.getElementById("resumeCard"); if(card) card.style.display="none";
    renderStep(); go("hero","back");
  }
}
function shareIt(){
  const url="https://despertarespiral.com.br/mapa-do-poder";
  const text="Acabei de fazer o Mapa do Poder — uma ferramenta do Método Despertar Espiral.";
  if(navigator.share){ navigator.share({title:"Mapa do Poder",text,url}).catch(()=>{}); }
  else { navigator.clipboard?.writeText(url); alert("Link copiado: "+url); }
}

/* ============================================================
   STARFIELD de fundo (toda a página)
   ============================================================ */
(function(){
  const cv=document.getElementById("stars"); const ctx=cv.getContext("2d");
  let stars=[],W,H,dpr=Math.min(devicePixelRatio||1,2),raf=null,t=0;
  // densidade menor no mobile (perf/battery)
  const isMobile = matchMedia("(max-width:768px)").matches;
  const reduceMotion = matchMedia("(prefers-reduced-motion:reduce)").matches;
  function resize(){
    W=cv.width=innerWidth*dpr; H=cv.height=innerHeight*dpr;
    cv.style.width=innerWidth+"px"; cv.style.height=innerHeight+"px";
    const divisor = isMobile?22000:14000;
    const count=Math.round(innerWidth*innerHeight/divisor);
    stars=[]; for(let i=0;i<count;i++) stars.push({
      x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.3+.2)*dpr,
      p:Math.random()*6,sp:Math.random()*.4+.1});
  }
  resize(); addEventListener("resize",resize);
  function loop(){
    if(!reduceMotion) t+=0.01;
    ctx.clearRect(0,0,W,H);
    for(const s of stars){
      const tw=reduceMotion?.5:(.35+.65*Math.abs(Math.sin(t*s.sp*4+s.p)));
      ctx.globalAlpha=tw*.5;
      ctx.fillStyle= tw>.85 ? "#E4CE9C" : "#C9A862";
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,7); ctx.fill();
    }
    ctx.globalAlpha=1;
    raf=requestAnimationFrame(loop);
  }
  function start(){ if(!raf) raf=requestAnimationFrame(loop); }
  function stop(){ if(raf){cancelAnimationFrame(raf); raf=null;} }
  document.addEventListener("visibilitychange",()=>{ document.hidden?stop():start(); });
  start();
})();

/* expõe handlers no escopo global */
window.go=go; window.startSteps=startSteps; window.nextStep=nextStep;
window.prevStep=prevStep; window.renderResult=renderResult;
window.submitCapture=submitCapture;
window.restart=restart; window.shareIt=shareIt;
window.startBreathing=startBreathing; window.skipBreathing=skipBreathing;
window.resumeJourney=resumeJourney;
window.downloadPoster=downloadPoster; window.sharePoster=sharePoster;

/* Inicialização — retomada de progresso no hero */
if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded", setupResume);
} else {
  setupResume();
}
