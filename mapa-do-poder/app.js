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
  { n:1, title:"Escreva sua trava principal em uma frase.",
    hint:"Qual é o bloqueio que mais pesa hoje?",
    fields:[{k:"trava", t:"textarea", ph:"Hoje, a trava que mais me pesa é…"}] },

  { n:2, title:"Quando essa trava começou?",
    hint:"Procure lembrar a primeira vez que sentiu essa trava e reconheça quem estava — ou ainda está — perto de você quando ela aparece.",
    fields:[
      {k:"primeira_vez", t:"textarea", ph:"A primeira vez que senti isso foi…"},
      {k:"pessoa", t:"text", label:"Quem estava perto?", ph:"Nome ou papel dessa pessoa"}
    ] },

  { n:3, title:"Que tipo de relação você tem com essa pessoa?",
    hint:"Quem protege quem nessa relação?",
    fields:[{k:"relacao", t:"textarea", ph:"Nossa relação é… / Quem protege quem é…"}] },

  { n:4, title:"Lembre-se da sua força.",
    hint:"Liste 3 momentos em que você avançou sem que a trava se manifestasse — ou em que seguiu mesmo com ela. E 3 sentimentos que viveu ali.",
    fields:[
      {k:"momento1", t:"text", label:"Momento 1", ph:"Uma vez em que avancei…"},
      {k:"momento2", t:"text", label:"Momento 2", ph:"Outra vez…"},
      {k:"momento3", t:"text", label:"Momento 3", ph:"E ainda…"},
      {k:"sentimentos", t:"text", label:"3 sentimentos que senti", ph:"ex.: coragem, alívio, orgulho"}
    ] },

  { n:5, title:"O que você mais deseja hoje?",
    hint:"E que essa trava está te impedindo de alcançar.",
    fields:[{k:"desejo", t:"textarea", ph:"O que eu mais desejo hoje é…"}] },

  { n:6, title:"Onde o seu corpo guarda essa trava?",
    hint:"Qual parte do corpo se tensiona quando você identifica isso? Toque para selecionar.",
    fields:[{k:"corpo", t:"body"}] },

  { n:7, title:"Crie um vínculo de pertencimento.",
    hint:"Crie uma frase para acolher essa trava — e então faça este ritual em voz alta, com calma.",
    fields:[
      {k:"frase_vinculo", t:"text", label:"Sua frase de pertencimento", ph:"Trava querida, eu te aceito porque…"},
      {k:"ritual", t:"ritual"}
    ] },

  { n:8, title:"Transforme a trava em direção.",
    hint:"Toque na estrela e dê brilho a ela. Quando ofuscar seus olhos, ela vira uma flecha certeira — que você colocará, mentalmente, sob o seu travesseiro.",
    fields:[{k:"viz", t:"viz"}] }
];

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

/* ---------- Navegação entre telas ---------- */
function screens(){ return document.querySelectorAll(".screen") }
function show(el){
  screens().forEach(s=>s.classList.remove("active"));
  el.classList.add("active");
  // re-trigger stagger
  const st=el.querySelector(".stagger");
  if(st){ st.style.animation="none"; void st.offsetWidth; st.style.animation=""; }
  window.scrollTo(0,0);
}
function go(name){
  const el=document.querySelector(`.screen[data-screen="${name}"]`);
  const showBar = (name==="step");
  document.getElementById("topbar").classList.toggle("hidden", !showBar);
  show(el);
  if(name==="capture") prefillCapture();
}
function prefillCapture(){
  const n=document.getElementById("cap-nome");
  const e=document.getElementById("cap-email");
  const p=document.getElementById("cap-phone");
  if(n) n.value=data.nome||"";
  if(e) e.value=data.email||"";
  if(p) p.value=data.phone||"";
}
function startSteps(){ stepIdx=0; renderStep(); go("step"); }

/* ---------- Render de um passo ---------- */
function renderStep(){
  const s=STEPS[stepIdx];
  const host=document.querySelector('.screen[data-screen="step"]');
  let html=`<div class="stagger"><div class="q-num">0${s.n}</div>
    <div class="q-title">${s.title}</div>
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
  // body zones
  host.querySelectorAll(".zone").forEach(z=>{
    if(data.corpo===z.dataset.z) z.classList.add("sel");
    z.addEventListener("click",()=>{
      host.querySelectorAll(".zone").forEach(x=>x.classList.remove("sel"));
      z.classList.add("sel"); data.corpo=z.dataset.z; save();
    });
  });
  // ritual read aloud
  const ra=host.querySelector(".read-aloud");
  if(ra) ra.addEventListener("click",toggleSpeak);
  // viz
  if(host.querySelector("#viz")) initViz();

  updateProgress();
}

function bodyMarkup(){
  return `<div class="bodymap"><div class="zones">`+
    BODY_ZONES.map(z=>`<button class="zone" data-z="${z}">${z}</button>`).join("")+
    `</div></div>`;
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
  if(stepIdx<STEPS.length-1){ stepIdx++; renderStep(); }
  else { renderResult(); go("result"); }
}
function prevStep(){
  if(stepIdx>0){ stepIdx--; renderStep(); }
  else { go("intro"); }
}
function updateProgress(){
  const pct=((stepIdx+1)/STEPS.length)*100;
  document.getElementById("bar").style.width=pct+"%";
  document.getElementById("count").textContent=`0${stepIdx+1} / 0${STEPS.length}`;
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

  const saudacao = nome ? `${esc(nome)},` : "Olha só o que você acabou de fazer:";
  const corpoLeitura = corpo && BODY_READINGS[corpo] ? BODY_READINGS[corpo] : "";

  let html = `<div class="stagger">
    <p class="eyebrow">✦ Seu Mapa do Poder</p>
    <h2 style="margin-top:18px">${saudacao}<br><em>aqui está o que apareceu</em></h2>
    <p class="body" style="margin-top:22px">Este é o seu mapa — costurado a partir das suas próprias respostas. Releia com calma. Ele não foi escrito por mim, foi escrito por você.</p>

    <!-- Leitura narrativa: o coração do resultado -->
    <div class="ritual" style="border-left-color:var(--gold);margin-top:26px;font-style:normal;font-family:var(--sans);font-size:clamp(15px,3.8vw,17px);line-height:1.7;color:var(--cream)">
      <span class="mark">✦</span>`;

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

    <p class="q-hint" style="margin-top:24px">💾 Seu mapa fica salvo neste dispositivo. Volte sempre que precisar.</p>

    <div class="actions">
      <button class="btn" onclick="go('capture')">Continuar <span class="arr">→</span></button>
      <button class="btn-text" onclick="stepIdx=${STEPS.length-1};renderStep();go('step')">Revisar última resposta</button>
    </div>
  </div>`;

  host.innerHTML = html;
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
    data={}; localStorage.removeItem(KEY); stepIdx=0; renderStep(); go("hero");
  }
}
function shareIt(){
  const url="https://despertarespiral.com.br/mapa-do-poder";
  const text="Acabei de fazer o Mapa da Ativação do Poder do Despertar Espiral 🌟";
  if(navigator.share){ navigator.share({title:"Mapa da Ativação do Poder",text,url}).catch(()=>{}); }
  else { navigator.clipboard?.writeText(url); alert("Link copiado: "+url); }
}

/* ============================================================
   STARFIELD de fundo (toda a página)
   ============================================================ */
(function(){
  const cv=document.getElementById("stars"); const ctx=cv.getContext("2d");
  let stars=[],W,H,dpr=Math.min(devicePixelRatio||1,2);
  function resize(){
    W=cv.width=innerWidth*dpr; H=cv.height=innerHeight*dpr;
    cv.style.width=innerWidth+"px"; cv.style.height=innerHeight+"px";
    const count=Math.round(innerWidth*innerHeight/14000);
    stars=[]; for(let i=0;i<count;i++) stars.push({
      x:Math.random()*W,y:Math.random()*H,r:(Math.random()*1.3+.2)*dpr,
      p:Math.random()*6,sp:Math.random()*.4+.1});
  }
  resize(); addEventListener("resize",resize);
  let t=0;
  (function loop(){
    t+=0.01; ctx.clearRect(0,0,W,H);
    for(const s of stars){
      const tw=.35+.65*Math.abs(Math.sin(t*s.sp*4+s.p));
      ctx.globalAlpha=tw*.5;
      ctx.fillStyle= tw>.85 ? "#E4CE9C" : "#C9A862";
      ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,7); ctx.fill();
    }
    ctx.globalAlpha=1; requestAnimationFrame(loop);
  })();
})();

/* expõe handlers no escopo global */
window.go=go; window.startSteps=startSteps; window.nextStep=nextStep;
window.prevStep=prevStep; window.renderResult=renderResult;
window.submitCapture=submitCapture;
window.restart=restart; window.shareIt=shareIt;
