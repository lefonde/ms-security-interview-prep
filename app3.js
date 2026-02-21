/* ================================================================
   app3.js – Security Knowledge, Manager/Fit, Additional Prep tabs
   + Initialization
   ================================================================ */

// ── Tab: Security Knowledge ────────────────────────────────────────
TAB_RENDERERS['step-security'] = (el) => {
    el.appendChild(h('h1', null, '🔒 Security Domain Knowledge'));

    el.appendChild(card('📝', 'Overview',
        'As a backend engineer transitioning to a security-focused team, <strong>threat modeling + secure-by-design</strong> are your highest-ROI areas. They map directly to system design interviews and security discussions.',
        '• Israel security postings lean into: <strong>OS internals, OS security models, cryptography, PKI, low-level debugging</strong>',
        '• For SE II, security is often a <strong>preferred</strong> (not required) qualification — demonstrating initiative here is a strong signal',
        callout('tip', '<strong>Pro tip</strong>: Hands-on labs generate concrete stories for interviews ("I found X vulnerability, mitigated it with Y, considered Z tradeoffs")'),
    ));

    el.appendChild(card('🔗', 'Resources',
        resGrid(
            resourceCard('Microsoft SDL Overview', 'Microsoft\'s Security Development Lifecycle', 'https://www.microsoft.com/en-us/securityengineering/sdl'),
            resourceCard('MS SDL Practices', 'Concrete secure-by-design practices', 'https://www.microsoft.com/en-us/securityengineering/sdl/practices'),
            resourceCard('Threat Modeling Tool Docs', 'STRIDE framework and MS tooling', 'https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool'),
            resourceCard('OWASP Top 10', 'Canonical application risk categories', 'https://owasp.org/Top10/2021/'),
            resourceCard('OWASP Cheat Sheets', 'Practical guidance on auth, CSRF, etc.', 'https://cheatsheetseries.owasp.org/index.html'),
            resourceCard('MITRE ATT&CK', 'Tactics & techniques knowledge base', 'https://attack.mitre.org/'),
            resourceCard('CWE Top 25', 'Most dangerous software weaknesses', 'https://cwe.mitre.org/top25/'),
            resourceCard('PortSwigger Web Security Academy', 'Free hands-on web security labs', 'https://portswigger.net/web-security'),
            resourceCard('TryHackMe Pre-Security', 'Beginner-friendly security foundations', 'https://tryhackme.com/path/outline/presecurity'),
            resourceCard('Hack The Box Academy', 'Guided security training with labs', 'https://academy.hackthebox.com/'),
            resourceCard('MS Threat Modeling Fundamentals', 'Structured learning path', 'https://learn.microsoft.com/en-us/training/paths/tm-threat-modeling-fundamentals/'),
            resourceCard('Windows Internals', 'OS internals book reference', 'https://learn.microsoft.com/en-us/sysinternals/resources/windows-internals'),
        )
    ));

    el.appendChild(card('📚', 'Preparation',
        h('h3', null, '1. Threat Modeling (STRIDE)'),
        '• <strong>S</strong>poofing → Can an attacker impersonate a user/system?',
        '• <strong>T</strong>ampering → Can data be modified in transit/at rest?',
        '• <strong>R</strong>epudiation → Can actions be denied without audit trails?',
        '• <strong>I</strong>nformation Disclosure → Can sensitive data leak?',
        '• <strong>D</strong>enial of Service → Can the system be overwhelmed?',
        '• <strong>E</strong>levation of Privilege → Can a user gain unauthorized access?',
        h('div', { className: 'section-divider' }),
        h('h3', null, '2. OWASP Top 10 Key Categories'),
        '• A01: Broken Access Control',
        '• A02: Cryptographic Failures',
        '• A03: Injection (SQL, XSS, Command)',
        '• A07: Identification & Authentication Failures',
        '• A09: Security Logging & Monitoring Failures',
        h('div', { className: 'section-divider' }),
        h('h3', null, '3. Cryptography Essentials'),
        '• <strong>Symmetric</strong>: AES-256, used for data at rest',
        '• <strong>Asymmetric</strong>: RSA, ECDSA — used for TLS, signatures',
        '• <strong>Hashing</strong>: SHA-256, bcrypt/scrypt for passwords',
        '• <strong>PKI</strong>: Certificates, CAs, certificate chains, revocation (CRL/OCSP)',
        h('div', { className: 'section-divider' }),
        h('h3', null, '4. KQL & Security Tools'),
        '• KQL (Kusto Query Language) is used for <strong>Defender XDR advanced hunting</strong>',
        '• Key operators: <code>where</code>, <code>project</code>, <code>summarize</code>, <code>join</code>, <code>render</code>',
        '• Enables hunting across <strong>30 days of raw security data</strong>',
        resGrid(
            resourceCard('Defender XDR Advanced Hunting', 'What advanced hunting is', 'https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-overview'),
            resourceCard('KQL Learning Path (SC-200)', 'Structured KQL for security', 'https://learn.microsoft.com/en-us/training/paths/sc-200-utilize-kql-for-azure-sentinel/'),
            resourceCard('KQL Learning Resources', 'Official references and trainings', 'https://learn.microsoft.com/en-us/azure/data-explorer/kql-learning-resources'),
        ),
    ));

    el.appendChild(card('✅', 'Validation',
        quiz({ id: 'sec1', q: 'In STRIDE, what does the "T" stand for?', options: ['Theft', 'Tampering', 'Trojan', 'Tracing'], correct: 1, explanation: 'Tampering — the unauthorized modification of data.' }),
        quiz({ id: 'sec2', q: 'Which OWASP Top 10 category covers SQL Injection?', options: ['A01: Broken Access Control', 'A02: Cryptographic Failures', 'A03: Injection', 'A07: Auth Failures'], correct: 2, explanation: 'A03: Injection covers SQL, NoSQL, OS, and LDAP injection.' }),
        quiz({ id: 'sec3', q: 'What is the primary use of KQL in Microsoft security products?', options: ['Building UI dashboards', 'Threat hunting in security data', 'Managing user permissions', 'Deploying security patches'], correct: 1, explanation: 'KQL is the query language for advanced hunting in Defender XDR and Sentinel.' }),
    ));

    el.appendChild(card('📋', 'Summary',
        '• <strong>STRIDE threat modeling</strong> is your most versatile interview tool for a security team',
        '• Know <strong>OWASP Top 10</strong> categories and mitigations',
        '• Understand <strong>basic cryptography</strong> (symmetric, asymmetric, hashing, PKI)',
        '• Do <strong>hands-on labs</strong> (PortSwigger is highest ROI for free)',
        '• Learn <strong>KQL basics</strong> — practical differentiator for detection-oriented teams',
    ));
    Logger.info('Security tab rendered');
};

// ── Tab: Manager / Team Fit ────────────────────────────────────────
TAB_RENDERERS['step-manager'] = (el) => {
    el.appendChild(h('h1', null, '🤝 Manager / Team Fit Interview'));

    el.appendChild(card('📝', 'Overview',
        'Usually the <strong>final interview</strong> in the loop. Assesses cultural fit, collaboration, and growth mindset. Often with the hiring manager or potential teammates.',
        '• Typically behavioral (STAR method)',
        '• Microsoft values: <strong>Growth mindset, customer obsession, diversity & inclusion, One Microsoft</strong>',
    ));

    el.appendChild(card('🔗', 'Resources',
        resGrid(
            resourceCard('Microsoft Interview Tips', 'Official STAR(R) and competency guidance', 'https://careers.microsoft.com/v2/global/en/hiring-tips/interview-tips.html'),
            resourceCard('Microsoft Israel - Who We Are', 'Culture and values of the Israel office', 'https://www.microsoftrnd.co.il/whoweare'),
        )
    ));

    el.appendChild(card('📚', 'Preparation',
        h('h3', null, 'Key Behavioral Stories to Prepare'),
        makeChecklist('behavioral_stories', [
            'A time you solved a difficult technical problem',
            'A time you disagreed with a teammate and how you resolved it',
            'A time you failed and what you learned',
            'A time you led a project or initiative',
            'A time you had to learn something new quickly',
            'A time you helped someone else grow or succeed',
        ]),
        h('div', { className: 'section-divider' }),
        h('h3', null, 'Microsoft Growth Mindset Questions'),
        '• "What\'s something you\'ve recently learned that changed how you work?"',
        '• "Tell me about a time you received critical feedback. How did you respond?"',
        '• "How do you stay current with technology trends?"',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'Questions to Ask the Manager'),
        '• What are the biggest challenges the team is facing right now?',
        '• How does the team measure success?',
        '• What does career growth look like for an SE II on this team?',
        '• How does the team collaborate with other security teams at Microsoft?',
    ));

    el.appendChild(card('✅', 'Validation',
        quiz({ id: 'mgr1', q: 'Which Microsoft value emphasizes learning from failure rather than avoiding it?', options: ['Customer Obsession', 'Growth Mindset', 'One Microsoft', 'Diversity & Inclusion'], correct: 1, explanation: 'Growth mindset — the belief that abilities can be developed through dedication and hard work.' }),
    ));

    el.appendChild(card('📋', 'Summary',
        '• Prepare <strong>6+ STAR(R) stories</strong> covering different competencies',
        '• Research <strong>Microsoft\'s culture and values</strong>',
        '• Show <strong>genuine curiosity</strong> about the team and role',
        '• Demonstrate <strong>growth mindset</strong> — learning from setbacks',
        '• Have <strong>thoughtful questions</strong> ready for the manager',
    ));
    Logger.info('Manager tab rendered');
};

// ── Tab: Additional Prep ───────────────────────────────────────────
TAB_RENDERERS.extra = (el) => {
    el.appendChild(h('h1', null, '⚡ Additional Preparation'));

    el.appendChild(card('🤖', 'AI/Copilot Interview Prep',
        'Some Tel Aviv interviews explicitly evaluate <strong>AI-tool usage</strong> (e.g., GitHub Copilot).',
        '• Practice coding <strong>with and without</strong> AI assistance',
        '• Be ready to explain when AI suggestions are <strong>correct vs incorrect</strong>',
        '• Show you can <strong>critically evaluate</strong> AI-generated code, not just accept it',
        '• Discuss <strong>security implications</strong> of AI-generated code (potential vulnerabilities, data leakage)',
    ));

    el.appendChild(card('🌐', 'Language & Communication',
        '• All technical interviews are in <strong>English</strong> — practice explaining technical concepts clearly',
        '• <strong>Hebrew</strong> is helpful for day-to-day but not typically required for interviews',
        '• Practice <strong>thinking aloud</strong> while coding — interviewers want to see your thought process',
        '• Be concise but thorough in your explanations',
    ));

    el.appendChild(card('🗓️', 'Timeline & Study Plan',
        h('h3', null, 'Suggested 2-Week Intensive Plan'),
        h('div', {
            className: 'table-wrap', innerHTML: `<table>
      <tr><th>Day</th><th>Focus</th><th>Activities</th></tr>
      <tr><td>1-3</td><td>DSA Fundamentals</td><td>2 LeetCode mediums/day; review Big-O</td></tr>
      <tr><td>4-5</td><td>System Design</td><td>Study System Design Primer; practice 1 design problem</td></tr>
      <tr><td>6-7</td><td>Security Foundations</td><td>OWASP Top 10; STRIDE; 2-3 PortSwigger labs</td></tr>
      <tr><td>8-9</td><td>Coding + Security</td><td>2 LeetCode/day with security angle; KQL basics</td></tr>
      <tr><td>10</td><td>Mock Interview</td><td>Full mock on interviewing.io or with a peer</td></tr>
      <tr><td>11-12</td><td>Weak Areas</td><td>Review gaps checklist; focus on weakest areas</td></tr>
      <tr><td>13</td><td>Behavioral</td><td>Finalize STAR stories; review Microsoft culture</td></tr>
      <tr><td>14</td><td>Logistics</td><td>Test Teams setup; prepare interview space; rest</td></tr>
    </table>`}),
    ));

    el.appendChild(card('🏢', 'Interview Day Logistics',
        '• <strong>Virtual interviews</strong>: Use Microsoft Teams (install + test in advance)',
        '• Have a <strong>backup plan</strong>: phone number, alternative device',
        '• Quiet room with <strong>good lighting</strong> and stable internet',
        '• <strong>Water + notepad</strong> nearby',
        '• Expect <strong>3-5 back-to-back interviews</strong> with short breaks between',
        '• Dress <strong>smart casual</strong> (Microsoft culture is relatively informal)',
    ));

    el.appendChild(card('🧠', 'Mental Preparation',
        '• It\'s normal to feel nervous — <strong>preparation reduces anxiety</strong>',
        '• Remember: the interviewer <strong>wants you to succeed</strong>',
        '• If you get stuck: <strong>think aloud</strong>, ask clarifying questions, discuss your thought process',
        '• <strong>Don\'t panic</strong> if you don\'t know something — show how you\'d approach learning it',
        '• <strong>Sleep well</strong> the night before — fatigue hurts performance more than extra studying',
    ));

    el.appendChild(card('📖', 'Additional Study Resources',
        resGrid(
            resourceCard('Interviewing.io Mock Interviews', 'Practice with real interviewers', 'https://interviewing.io/mocks'),
            resourceCard('Microsoft Security Learning', 'Broad security learning paths', 'https://learn.microsoft.com/en-us/security/'),
            resourceCard('Azure Security Engineer Cert', 'Cert-level security study materials', 'https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/'),
            resourceCard('NIST SSDF (SP 800-218)', 'Secure software development framework', 'https://csrc.nist.gov/pubs/sp/800/218/final'),
            resourceCard('Threat Modeling Book (Shostack)', 'Deep-dive threat modeling reference', 'https://shostack.org/books/threat-modeling-book'),
        )
    ));
    Logger.info('Extra tab rendered');
};

// ── Initialization ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    Logger.info('App initializing...');
    mermaid.initialize({
        startOnLoad: false, theme: 'dark', themeVariables: {
            primaryColor: '#6366f1', primaryTextColor: '#f1f5f9', primaryBorderColor: '#4f46e5',
            lineColor: '#64748b', secondaryColor: '#1e293b', tertiaryColor: '#0f172a',
            fontSize: '14px'
        }
    });
    buildNav();
    const hash = window.location.hash.replace('#', '');
    const initial = TABS.find(t => t.id === hash) ? hash : 'summary';
    setTab(initial);
    Logger.info('App initialized successfully');
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (TABS.find(t => t.id === hash)) setTab(hash);
});
