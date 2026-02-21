/* ================================================================
   MS Security Interview Prep – app.js (Part 1: Core + Tabs 1-3)
   ================================================================ */

// ── Logger ─────────────────────────────────────────────────────────
const Logger = (() => {
    const entries = [];
    const el = () => document.getElementById('devlogBody');
    function add(level, msg) {
        const ts = new Date().toISOString();
        entries.push({ ts, level, msg });
        console.log(`[${ts}] [${level}] ${msg}`);
        const body = el();
        if (body) {
            const d = document.createElement('div');
            d.className = `log-entry log-${level}`;
            d.textContent = `[${ts.substring(11, 19)}] [${level}] ${msg}`;
            body.appendChild(d);
            body.scrollTop = body.scrollHeight;
        }
    }
    return {
        info: (m) => add('INFO', m),
        warn: (m) => add('WARN', m),
        error: (m) => add('ERROR', m),
        debug: (m) => add('DEBUG', m),
        entries
    };
})();

function toggleDevLog() {
    document.getElementById('devlogPanel').classList.toggle('open');
    Logger.debug('Dev log toggled');
}
document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.shiftKey && e.key === 'L') { e.preventDefault(); toggleDevLog(); }
});

// ── Checklist persistence ──────────────────────────────────────────
const Store = {
    _key: 'ms-sec-prep-v1',
    load() {
        try { return JSON.parse(localStorage.getItem(this._key)) || {}; }
        catch { return {}; }
    },
    save(data) { localStorage.setItem(this._key, JSON.stringify(data)); },
    get(k) { return this.load()[k]; },
    set(k, v) { const d = this.load(); d[k] = v; this.save(d); }
};

// ── Tab definitions ────────────────────────────────────────────────
const TABS = [
    { id: 'summary', icon: '📋', label: 'Summary', section: 'Overview' },
    { id: 'process', icon: '🔄', label: 'Process Overview', section: 'Overview' },
    { id: 'gaps', icon: '🎯', label: 'Personal Gaps', section: 'Overview' },
    { id: 'step-recruiter', icon: '📞', label: 'Recruiter Call', section: 'Interview Steps' },
    { id: 'step-assessment', icon: '💻', label: 'Online Assessment', section: 'Interview Steps' },
    { id: 'step-coding', icon: '⌨️', label: 'Coding Interviews', section: 'Interview Steps' },
    { id: 'step-design', icon: '🏗️', label: 'System Design', section: 'Interview Steps' },
    { id: 'step-security', icon: '🔒', label: 'Security Knowledge', section: 'Interview Steps' },
    { id: 'step-manager', icon: '🤝', label: 'Manager / Team Fit', section: 'Interview Steps' },
    { id: 'extra', icon: '⚡', label: 'Additional Prep', section: 'Extras' },
];

// ── Build sidebar nav ──────────────────────────────────────────────
function buildNav() {
    const nav = document.getElementById('sidebarNav');
    let prevSection = '';
    TABS.forEach(t => {
        if (t.section !== prevSection) {
            const lbl = document.createElement('div');
            lbl.className = 'nav-section-label';
            lbl.textContent = t.section;
            nav.appendChild(lbl);
            prevSection = t.section;
        }
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.dataset.tab = t.id;
        btn.innerHTML = `<span class="icon">${t.icon}</span><span>${t.label}</span>`;
        btn.onclick = () => setTab(t.id);
        nav.appendChild(btn);
    });
    Logger.info('Sidebar nav built');
}

// ── Tab routing ────────────────────────────────────────────────────
let currentTab = '';
function setTab(id) {
    if (currentTab === id) return;
    currentTab = id;
    window.location.hash = id;
    // Update nav
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === id);
    });
    // Render content
    const main = document.getElementById('mainContent');
    const renderer = TAB_RENDERERS[id];
    if (renderer) {
        main.innerHTML = `<div class="tab-panel active" id="panel-${id}"></div>`;
        renderer(document.getElementById(`panel-${id}`));
    } else {
        main.innerHTML = `<div class="tab-panel active"><h1>Coming soon</h1></div>`;
    }
    // close mobile sidebar
    document.querySelector('.sidebar').classList.remove('open');
    Logger.info(`Tab switched: ${id}`);
}

// ── Helpers ─────────────────────────────────────────────────────────
function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'className') el.className = v;
        else if (k === 'innerHTML') el.innerHTML = v;
        else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
        else el.setAttribute(k, v);
    });
    children.flat().forEach(c => {
        if (typeof c === 'string') el.appendChild(document.createTextNode(c));
        else if (c) el.appendChild(c);
    });
    return el;
}

function card(icon, title, ...content) {
    const c = h('div', { className: 'card' });
    c.appendChild(h('div', { className: 'card-header' },
        h('span', { className: 'card-icon' }, icon),
        h('h2', null, title)
    ));
    content.flat().forEach(el => { if (typeof el === 'string') { const p = h('p', { innerHTML: el }); c.appendChild(p); } else if (el) c.appendChild(el); });
    return c;
}

function resourceCard(title, desc, url) {
    const c = h('div', { className: 'resource-card' });
    c.appendChild(h('div', { className: 'rc-title' }, title));
    if (desc) c.appendChild(h('div', { className: 'rc-desc' }, desc));
    c.appendChild(h('a', { className: 'rc-link', href: url, target: '_blank' }, '🔗 Open resource →'));
    return c;
}

function resGrid(...cards) {
    const g = h('div', { className: 'resource-grid' });
    cards.forEach(c => g.appendChild(c));
    return g;
}

function callout(type, text) {
    return h('div', { className: `callout callout-${type}`, innerHTML: text });
}

function makeChecklist(groupKey, items) {
    const ul = h('ul', { className: 'checklist' });
    const state = Store.get(groupKey) || {};
    items.forEach((item, i) => {
        const key = `${groupKey}_${i}`;
        const cb = h('input', { type: 'checkbox' });
        cb.checked = !!state[i];
        const label = h('span', null, item);
        if (cb.checked) label.classList.add('checked-label');
        cb.addEventListener('change', () => {
            const s = Store.get(groupKey) || {};
            s[i] = cb.checked;
            Store.set(groupKey, s);
            label.classList.toggle('checked-label', cb.checked);
            Logger.debug(`Checklist ${groupKey}[${i}] = ${cb.checked}`);
            updateGapsProgress();
        });
        ul.appendChild(h('li', null, cb, label));
    });
    return ul;
}

function accordion(title, contentFn) {
    const wrap = h('div', { className: 'accordion-item' }, '');
    const header = h('div', { className: 'accordion-header' },
        h('span', null, title),
        h('span', { className: 'arrow' }, '▼')
    );
    const body = h('div', { className: 'accordion-body' });
    header.onclick = () => { header.classList.toggle('open'); body.classList.toggle('open'); };
    contentFn(body);
    wrap.appendChild(header);
    wrap.appendChild(body);
    return wrap;
}

function progressBar(pct) {
    const w = h('div', { className: 'progress-bar-wrap' });
    const f = h('div', { className: 'progress-bar-fill' });
    f.style.width = pct + '%';
    w.appendChild(f);
    return w;
}

function quiz(qObj) {
    const block = h('div', { className: 'quiz-block' });
    block.appendChild(h('div', { className: 'quiz-q' }, qObj.q));
    const opts = h('div', { className: 'quiz-options' });
    const ans = h('div', { className: 'quiz-answer' });
    qObj.options.forEach((o, i) => {
        const lbl = h('label', null);
        const radio = h('input', { type: 'radio', name: qObj.id });
        radio.addEventListener('change', () => {
            if (i === qObj.correct) { ans.className = 'quiz-answer correct'; ans.textContent = '✓ Correct! ' + (qObj.explanation || ''); }
            else { ans.className = 'quiz-answer incorrect'; ans.textContent = '✗ Try again. ' + (qObj.hint || ''); }
        });
        lbl.appendChild(radio);
        lbl.appendChild(document.createTextNode(' ' + o));
        opts.appendChild(lbl);
    });
    block.appendChild(opts);
    block.appendChild(ans);
    return block;
}

// ── Gaps progress tracker (called from checklists) ──────────────────
function updateGapsProgress() {
    const bar = document.getElementById('gapsProgressFill');
    if (!bar) return;
    const groups = ['gaps_coding', 'gaps_design', 'gaps_security', 'gaps_behavioral', 'gaps_cloud', 'gaps_general'];
    let total = 0, checked = 0;
    groups.forEach(g => {
        const s = Store.get(g) || {};
        const items = GAPS_ITEMS[g] || [];
        total += items.length;
        Object.values(s).forEach(v => { if (v) checked++; });
    });
    const pct = total ? Math.round(checked / total * 100) : 0;
    bar.style.width = pct + '%';
    const lbl = document.getElementById('gapsProgressLabel');
    if (lbl) lbl.textContent = `${pct}% prepared (${checked}/${total})`;
}

// ── Gap items data ─────────────────────────────────────────────────
const GAPS_ITEMS = {
    gaps_coding: [
        'Review Big-O notation and complexity analysis',
        'Practice LeetCode medium problems (arrays, strings, hash maps)',
        'Practice LeetCode medium problems (trees, graphs, BFS/DFS)',
        'Practice LeetCode medium problems (dynamic programming basics)',
        'Practice stack/queue problems (e.g. queue via 2 stacks)',
        'Practice in a real compiler/runner (not pseudocode)',
        'Review sorting algorithms and when to use each',
        'Practice writing test cases for your solutions',
    ],
    gaps_design: [
        'Study distributed systems fundamentals (CAP, partitioning)',
        'Practice designing a URL shortener / chat system',
        'Study load balancing, caching strategies, CDNs',
        'Learn about resiliency patterns (circuit breakers, retries)',
        'Study database choices (SQL vs NoSQL, sharding)',
        'Practice explaining design trade-offs clearly',
        'Read System Design Primer on GitHub',
    ],
    gaps_security: [
        'Learn OWASP Top 10 categories and mitigations',
        'Study Microsoft SDL practices and threat modeling',
        'Practice STRIDE threat modeling on a sample system',
        'Learn basic cryptography (symmetric, asymmetric, hashing, PKI)',
        'Study OS security models (Windows security architecture)',
        'Learn about common CWE weaknesses (CWE Top 25)',
        'Complete PortSwigger Web Security Academy labs (at least 5)',
        'Study MITRE ATT&CK framework basics',
        'Review secure coding practices (input validation, auth, CSRF)',
    ],
    gaps_behavioral: [
        'Prepare 5 STAR(R) stories covering leadership, conflict, failure',
        'Research Microsoft culture and growth mindset',
        'Prepare "Tell me about yourself" narrative',
        'Prepare "Why Microsoft / Why security?" answer',
        'Prepare questions to ask the hiring manager',
    ],
    gaps_cloud: [
        'Learn KQL basics (operators, queries for threat hunting)',
        'Understand Microsoft Defender XDR advanced hunting',
        'Explore Microsoft Sentinel / SC-200 learning path',
        'Understand Azure AD / identity fundamentals at a high level',
    ],
    gaps_general: [
        'Set up Teams and test audio/video for virtual interviews',
        'Practice 45-minute timed coding sessions',
        'Do at least 2 mock interviews (interviewing.io or peer)',
        'Prepare a quiet, well-lit interview space',
        'Review the specific job posting requirements again',
    ]
};

// ── TAB RENDERERS ──────────────────────────────────────────────────
const TAB_RENDERERS = {};

// ── Tab: Summary ───────────────────────────────────────────────────
TAB_RENDERERS.summary = (el) => {
    el.appendChild(h('h1', null, '📋 Interview Preparation Summary'));
    el.appendChild(callout('info', 'This guide is tailored for a <strong>Software Engineer II</strong> position in a <strong>Security-focused team</strong> at <strong>Microsoft Israel</strong> (Herzliya / Tel Aviv).'));

    el.appendChild(card('🎯', 'Key Takeaways',
        '• The interview process is <strong>mostly virtual</strong> (via Microsoft Teams) with structured technical interviews.',
        '• Expect <strong>3–5 technical interviews</strong> in a "Virtual Interview Day" format.',
        '• Interviews assess <strong>coding</strong> (compilable code, not pseudocode), <strong>system design</strong>, <strong>security awareness</strong>, and <strong>behavioral fit</strong>.',
        '• Israel offices are a <strong>major security hub</strong> (60%+ security-focused); interviews lean harder into security fundamentals.',
        '• <strong>45-minute rounds</strong> using a third-party coding tool where you compile and run code.',
        '• Some interviews may evaluate <strong>AI-assisted coding</strong> (Copilot usage).',
    ));

    el.appendChild(card('📝', 'Interview Flow At a Glance',
        '1️⃣ <strong>Apply</strong> → Resume review',
        '2️⃣ <strong>Recruiter conversation</strong> — learn about you & the role',
        '3️⃣ <strong>Optional: Online Assessment</strong> — HackerRank / CodeSignal',
        '4️⃣ <strong>Technical Interviews</strong> — coding, DSA, system design',
        '5️⃣ <strong>Manager / Team Fit Interview</strong>',
        '6️⃣ <strong>Decision</strong> — update within ~48 hours',
    ));

    el.appendChild(card('⚡', 'Quick-Start Actions',
        makeChecklist('quickstart', [
            'Read through all tabs in this guide',
            'Self-assess your gaps on the Personal Gaps tab',
            'Start LeetCode practice (2 mediums/day target)',
            'Complete at least 3 PortSwigger labs',
            'Study OWASP Top 10 and Microsoft SDL',
            'Do 1 mock system design interview',
            'Prepare your STAR(R) stories',
            'Set up and test Microsoft Teams',
        ])
    ));

    el.appendChild(card('🏢', 'Israel-Specific Notes',
        '• Offices: <strong>Herzliya, Tel Aviv, Haifa, Nazareth</strong>',
        '• Day-to-day: <strong>Hybrid (3 days/week in-office)</strong> for security roles',
        '• Language: Excellent <strong>English</strong> required; Hebrew helpful locally',
        '• Microsoft Israel R&D describes security as a <strong>major presence</strong> at the site',
    ));
    Logger.info('Summary tab rendered');
};

// ── Tab: Process Overview ──────────────────────────────────────────
TAB_RENDERERS.process = (el) => {
    el.appendChild(h('h1', null, '🔄 Interview Process Overview'));

    el.appendChild(card('📊', 'Process Flowchart',
        h('div', {
            className: 'mermaid', innerHTML: `flowchart TD
  A["📩 Apply"] --> B["📄 Resume Review"]
  B -->|Pass| C["📞 Recruiter Conversation"]
  C --> D{"Assessment needed?"}
  D -->|Sometimes| E["💻 Online Assessment / Take-home"]
  D -->|Often no| F["⌨️ Technical Interviews"]
  E --> F
  F --> G["🏢 Virtual Interview Day<br/>3-5 rounds × 45-60 min"]
  G --> H["🤝 Manager / Team Fit"]
  H --> I["✅ Decision + Offer / Rejection"]`})
    ));

    // reinit mermaid
    setTimeout(() => { try { mermaid.run(); } catch (e) { Logger.warn('Mermaid render: ' + e.message); } }, 100);

    el.appendChild(card('📞', 'Stage 1: Recruiter Conversation',
        'After your resume passes review, a recruiter contacts you. This is a <strong>two-way conversation</strong>: they learn about you, and you learn about the role and team.',
        '• Typically 30 minutes, conducted via phone or Teams',
        '• Not deeply technical — focus on your background, motivations, and logistics',
    ));

    el.appendChild(card('💻', 'Stage 2: Online Assessment (Sometimes)',
        'Some candidates report being given a <strong>take-home assessment</strong> or <strong>online coding test</strong> (HackerRank / CodeSignal) before the Interview Day.',
        '• Not universal — some candidates skip directly to interviews',
        '• Expect DSA-style problems with time constraints',
    ));

    el.appendChild(card('⌨️', 'Stage 3: Technical Interviews (Virtual Interview Day)',
        'The core of the process: <strong>3–5 back-to-back interviews</strong>, each 45–60 minutes.',
        '• <strong>Coding/DSA rounds</strong>: LeetCode-style, must compile/run in a real tool',
        '• <strong>System design round</strong>: Distributed systems, resiliency, security implications',
        '• <strong>Security-focused discussions</strong>: Threat modeling, secure design, domain knowledge',
        '• Some reports mention an <strong>AI/Copilot-assisted coding</strong> evaluation',
    ));

    el.appendChild(card('🤝', 'Stage 4: Manager / Team Fit',
        'Usually the final interview. Assesses <strong>cultural fit, collaboration style, and growth mindset</strong>.',
        '• Often behavioral (STAR method recommended)',
        '• Questions about teamwork, conflict resolution, learning from failure',
    ));

    // SE II vs Senior table
    el.appendChild(card('📊', 'SE II vs Senior: What\'s Different',
        h('div', {
            className: 'table-wrap', innerHTML: `<table>
      <tr><th>Dimension</th><th>SE II (Mid-level)</th><th>Senior</th></tr>
      <tr><td>Experience</td><td>3+ years</td><td>5-6+ years</td></tr>
      <tr><td>Coding</td><td>Clean, correct, compilable; Big-O; testing; security awareness</td><td>Same + deeper tradeoffs, performance tuning</td></tr>
      <tr><td>Design</td><td>System design knowledge important</td><td>Lead architecture discussions, deeper ambiguity</td></tr>
      <tr><td>Security</td><td>Preferred qualification</td><td>Often required; crypto/PKI/OS security models</td></tr>
      <tr><td>Loop shape</td><td>Recruiter → tech interviews → manager fit (Virtual Interview Day)</td><td>Same + stronger leadership probing</td></tr>
    </table>`})
    ));
    Logger.info('Process tab rendered');
};

// ── Tab: Personal Gaps ─────────────────────────────────────────────
TAB_RENDERERS.gaps = (el) => {
    el.appendChild(h('h1', null, '🎯 Personal Gaps & Preparation Tracker'));
    el.appendChild(callout('tip', 'Check off items as you complete them. Your progress is <strong>saved locally</strong> and persists across sessions.'));

    // Progress bar
    const pw = h('div', { className: 'card' });
    pw.appendChild(h('div', { className: 'card-header' }, h('span', { className: 'card-icon' }, '📈'), h('h2', null, 'Overall Readiness')));
    const lbl = h('p', { id: 'gapsProgressLabel' }, 'Calculating...');
    pw.appendChild(lbl);
    const bar = progressBar(0);
    bar.querySelector('.progress-bar-fill').id = 'gapsProgressFill';
    pw.appendChild(bar);
    el.appendChild(pw);

    const sections = [
        { key: 'gaps_coding', icon: '⌨️', title: 'Coding & DSA' },
        { key: 'gaps_design', icon: '🏗️', title: 'System Design' },
        { key: 'gaps_security', icon: '🔒', title: 'Security Knowledge' },
        { key: 'gaps_behavioral', icon: '🤝', title: 'Behavioral / Soft Skills' },
        { key: 'gaps_cloud', icon: '☁️', title: 'Cloud & Security Tools (KQL / Sentinel)' },
        { key: 'gaps_general', icon: '📋', title: 'General / Logistics' },
    ];

    sections.forEach(s => {
        el.appendChild(card(s.icon, s.title, makeChecklist(s.key, GAPS_ITEMS[s.key])));
    });

    // Calculate initial progress
    setTimeout(updateGapsProgress, 50);
    Logger.info('Gaps tab rendered');
};

/* continued in app2.js loaded below */
