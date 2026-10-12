'use strict';
const github = 'https://github.com/max-ictu';
const serviceRepo = 'https://github.com/MAx-ICTU/1C-Service-Management';
const stageContent = {
  now: '<div class="stage-row"><span>✓</span><div>Требования и бизнес-процессы<small>Описаны цели и границы первого релиза</small></div></div><div class="stage-row"><span>✓</span><div>Архитектура и модель данных<small>Подготовлена основа системы</small></div></div><div class="stage-row"><span>✓</span><div>Базовая конфигурация<small>Этап 00 завершён · исходники в GitHub</small></div></div>',
  plan: '<p class="panel-note">Планируемый маршрут сервисной заявки:</p><div class="plan-flow"><span>Обращение</span>→<span>Инженер</span>→<span>Работы</span>→<span>История</span></div><p class="panel-note">Справочники, заявки, роли и отчётность — следующие этапы. Прикладные функции пока не реализованы.</p>',
  stack: '<div class="stage-row"><span>↗</span><div>1С:Предприятие 8.5<small>Учебная версия · обычный Конфигуратор</small></div></div><div class="stage-row"><span>↗</span><div>Управляемое приложение<small>Файловая информационная база</small></div></div><div class="stage-row"><span>↗</span><div>Git и GitHub<small>Исходники и история разработки</small></div></div>'
};
const panel = document.getElementById('service-panel');
panel.innerHTML = stageContent.now;
const tabs = [...document.querySelectorAll('[data-stage]')];
function selectStage(tab) {
  tabs.forEach(t => { const active = t === tab; t.classList.toggle('active', active); t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1; });
  panel.innerHTML = stageContent[tab.dataset.stage];
  panel.setAttribute('aria-labelledby', tab.id);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStage(tab));
  tab.addEventListener('keydown', e => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { e.preventDefault(); selectStage(tabs[next]); tabs[next].focus(); }
  });
});
const filterButtons = [...document.querySelectorAll('[data-filter]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  let count = 0;
  document.querySelectorAll('.project[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; if (!card.hidden) count++; });
  document.querySelector('.web-grid').hidden = button.dataset.filter === '1c';
  document.getElementById('filter-status').textContent = `Показано проектов: ${count}`;
}));
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') !== 'true'; menuToggle.setAttribute('aria-expanded', String(open)); menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню'); navigation.classList.toggle('open', open); menuToggle.textContent = open ? '✕' : '☰'; });
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { navigation.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.setAttribute('aria-label', 'Открыть меню'); menuToggle.textContent = '☰'; }));
const link = (url, label, secondary = false) => `<a class="button ${secondary ? 'secondary' : 'primary'}" href="${url}" target="_blank" rel="noopener noreferrer">${label} <span>↗</span></a>`;
const dialogs = {
  service: `<p class="eyebrow">01 / 1С · В РАЗРАБОТКЕ</p><h2 id="dialog-title">Управление сервисной компанией</h2><p>Учебная система для обслуживания оборудования клиентов. Цель первого релиза — объединить клиента, оборудование, заявку и результаты работы в одном процессе.</p><h3>Что делаю</h3><p>Проектирую и развиваю систему с помощью нейросети. Работаю с требованиями, процессами, архитектурой и основой конфигурации.</p><h3>Что уже подготовлено</h3><ul><li>Требования, бизнес-процессы и модель данных.</li><li>Архитектура R1 и поэтапный план разработки.</li><li>Базовая конфигурация с подсистемой «Сервис».</li></ul><h3>Следующие этапы</h3><p>Справочники, сервисные заявки, выполнение работ, разграничение доступа и история обслуживания. Прикладные сценарии ещё не реализованы.</p><div class="dialog-links">${link(serviceRepo, 'Исходники и документация')}</div><p class="dialog-footnote">Статус по README проекта на 11 октября 2026 года. Учебная версия, ранняя стадия разработки.</p>`,
  wedo: `<p class="eyebrow">02 / ВЕБ · ВЫПОЛНЕНО</p><h2 id="dialog-title">Маркетинговое агентство</h2><p>Работа для маркетингового агентства, в котором я работал ранее.</p><h3>Мой вклад</h3><ul><li>Разработал дизайн главной страницы.</li><li>Разработал страницу отзывов.</li></ul><p>Сайт агентства можно открыть по ссылке ниже. В портфолио указан мой вклад в отдельные страницы.</p>${link('https://marketingwedo.ru/', 'Открыть сайт')}<p class="dialog-footnote">На обложке — снимок текущей главной страницы. Сайт может меняться после завершения моей работы.</p>`,
  school: `<p class="eyebrow">03 / ВЕБ · ВЫПОЛНЕНО</p><h2 id="dialog-title">Частная школа «Перспектива»</h2><p>Дизайн и разработка страниц для частной школы в Санкт-Петербурге.</p><h3>Мой вклад</h3><p>Занимался дизайном и разработкой страниц сайта. Проект представлен ссылкой на действующий сайт школы.</p>${link('https://perspectiveschool.ru/', 'Открыть сайт')}<p class="dialog-footnote">На обложке — снимок текущей главной страницы для знакомства с проектом. Перечень страниц, над которыми я работал, дополню отдельно.</p>`,
  zhiguli: `<p class="eyebrow">04 / ВЕБ · В РАЗРАБОТКЕ</p><h2 id="dialog-title">«Жигули» — интернет-магазин</h2><p>Текущий веб-проект для компании из Кирова. Разрабатываю интернет-магазин автозапчастей.</p><h3>Что можно посмотреть сейчас</h3><p>В текущей версии сайта представлены каталог автозапчастей, поиск и подбор товаров. Это проект в работе, а не финальный релиз.</p><div class="dialog-links">${link('https://max-ictu.github.io/zhiguli-kirov/', 'Текущая версия')}${link('https://github.com/MAx-ICTU/zhiguli-kirov', 'GitHub', true)}</div>`,
  profile: `<p class="eyebrow">ДЛЯ РАБОТОДАТЕЛЯ</p><h2 id="dialog-title">Максим / Junior 1С-разработчик</h2><div class="summary-grid"><div><small>Город</small><b>Киров</b></div><div><small>Ищу позицию</small><b>1С-разработчик</b></div><div><small>Опыт в 1С</small><b>5 месяцев</b></div><div><small>Текущий фокус</small><b>Система управления сервисом</b></div></div><h3>Сейчас</h3><p>Проектирую учебную систему управления сервисной компанией на 1С с помощью нейросети. Подготовлены требования, архитектура и основа конфигурации. Прикладные функции первого релиза находятся в плане разработки.</p><h3>Образование</h3><p>Школа — кадетский класс. Есть удостоверение Юнармии.<br>Среднее специальное образование: «Информационные системы».</p><h3>Служба</h3><p>Срочная служба в бригаде специального назначения. Спецназ ВДВ.</p><h3>Опыт в веб-проектах</h3><ul><li>Маркетинговое агентство — дизайн главной и разработка страницы отзывов.</li><li>Школа «Перспектива» — дизайн и разработка страниц.</li><li>«Жигули» — интернет-магазин в разработке.</li></ul><h3>Интересы</h3><p>Музыка и видеомонтаж.</p><h3>Контакты</h3><p class="profile-contacts"><a href="tel:+79536783320">+7 (953) 678-33-20</a><br><a href="mailto:maksim.ushakov02@mail.ru">maksim.ushakov02@mail.ru</a></p><div class="dialog-links">${link(github, 'Мой GitHub')}<button class="button secondary" id="print-profile">Сохранить в PDF <span>↓</span></button></div><p class="dialog-footnote">Опыт указан на октябрь 2026 года.</p>`
};
const dialog = document.getElementById('details');
let dialogTrigger = null;
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
  dialogTrigger = button;
  document.getElementById('dialog-content').innerHTML = dialogs[button.dataset.open];
  dialog.showModal(); document.body.style.overflow = 'hidden';
  document.getElementById('print-profile')?.addEventListener('click', () => window.print());
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; dialogTrigger?.focus({preventScroll:true}); });
const progress = document.querySelector('.scroll-progress');
function updateProgress() { const max = document.documentElement.scrollHeight - window.innerHeight; progress.style.width = `${max > 0 ? window.scrollY / max * 100 : 0}%`; }
window.addEventListener('scroll', updateProgress, {passive:true});
window.addEventListener('resize', updateProgress);
const wave = document.querySelector('.waveform');
for (let i = 0; i < 80; i++) { const bar = document.createElement('i'); bar.style.height = `${6 + Math.abs(Math.sin(i * .31) * Math.cos(i * .73)) * 42}px`; wave.appendChild(bar); }

// A locally rendered particle torus. No external 3D runtime or image assets.
const canvas = document.getElementById('orbit');
const ctx = canvas.getContext('2d');
if (ctx) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const art = document.querySelector('.hero-art');
  let width = 0, height = 0, frame = 0, phase = 0, inView = true;
  let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
  const points = [];
  for (let u = 0; u < 140; u++) for (let v = 0; v < 36; v++) {
    const a = u / 140 * Math.PI * 2, b = v / 36 * Math.PI * 2;
    const ripple = 3 * Math.sin(a * 5 + b * 2);
    points.push({x:(117 + (36 + ripple) * Math.cos(b)) * Math.cos(a), y:(117 + (36 + ripple) * Math.cos(b)) * Math.sin(a), z:(36 + ripple) * Math.sin(b), b, a});
  }
  function resize() { const r = art.getBoundingClientRect(); width = r.width; height = r.height; const dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); ctx.setTransform(dpr,0,0,dpr,0,0); if(motion.matches) draw(); }
  function draw() {
    ctx.clearRect(0,0,width,height);
    const scale = Math.min(width / 390, height / 380);
    const cx = width / 2, cy = height / 2 - 4;
    const glow = ctx.createRadialGradient(cx,cy,20,cx,cy,180*scale);
    glow.addColorStop(0,'rgba(123,163,55,.06)'); glow.addColorStop(.6,'rgba(159,191,87,.045)'); glow.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = glow; ctx.fillRect(0,0,width,height);
    const ax = .42 + pointerY * .25 + Math.sin(phase * .6) * .08;
    const ay = .22 + pointerX * .25;
    const az = -.47 + phase * .045;
    const sinX = Math.sin(ax), cosX = Math.cos(ax), sinY = Math.sin(ay), cosY = Math.cos(ay), sinZ = Math.sin(az), cosZ = Math.cos(az);
    const transformed = points.map(p => {
      const twist = .15 * Math.sin(p.a * 3 + phase);
      const z0 = p.z + twist * 25;
      const y1 = p.y * cosX - z0 * sinX, z1 = p.y * sinX + z0 * cosX;
      const x2 = p.x * cosY + z1 * sinY, z2 = -p.x * sinY + z1 * cosY;
      const x3 = x2 * cosZ - y1 * sinZ, y3 = x2 * sinZ + y1 * cosZ;
      const perspective = 600 / (600 - z2);
      return {x:cx+x3*scale*perspective, y:cy+y3*scale*perspective, z:z2, light:.5+.5*Math.cos(p.b-1.1)*Math.sin(p.a+.9+phase*.1)};
    }).sort((a,b)=>a.z-b.z);
    for(const p of transformed) {
      const depth = (p.z + 110) / 220;
      const light = Math.max(0,Math.min(1,p.light * .58 + depth * .42));
      const r = Math.round(69 + light*150), g = Math.round(87 + light*162), b = Math.round(38 + light*94);
      ctx.fillStyle = `rgba(${r},${g},${b},${.22+depth*.68})`;
      ctx.beginPath(); ctx.arc(p.x,p.y,Math.max(.5,(.63+depth*.35)*scale),0,Math.PI*2); ctx.fill();
    }
    ctx.strokeStyle='#7d985540'; ctx.lineWidth=.6;
    ctx.beginPath(); ctx.ellipse(cx,cy,180*scale,147*scale,-.2,0,Math.PI*2); ctx.stroke();
    for(let i=0;i<3;i++){const a=phase*.1+i*Math.PI*2/3;const x=cx+Math.cos(a)*180*scale;const y=cy+Math.sin(a)*147*scale;ctx.fillStyle=i===0?'#d5f978':'#839b62';ctx.beginPath();ctx.arc(x,y,i===0?3:1.6,0,Math.PI*2);ctx.fill();}
  }
  function animate(){ frame=0; if(!inView || document.hidden || motion.matches) return; pointerX+=(targetX-pointerX)*.035; pointerY+=(targetY-pointerY)*.035; phase+=.009; draw(); frame=requestAnimationFrame(animate); }
  function start(){ if(!frame && inView && !motion.matches && !document.hidden) frame=requestAnimationFrame(animate); }
  new ResizeObserver(resize).observe(art);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;if(inView)start();else if(frame){cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(art);
  art.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width-.5;targetY=(e.clientY-r.top)/r.height-.5;},{passive:true});
  art.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  motion.addEventListener('change',()=>{if(motion.matches){cancelAnimationFrame(frame);frame=0;draw();}else start();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();});
  resize(); draw(); start();
}
