/* ================================================================
   app2.js – Interview Step Tabs (Recruiter → Manager) + Extra
   ================================================================ */

// ── Tab: Recruiter Call ────────────────────────────────────────────
TAB_RENDERERS['step-recruiter'] = (el) => {
    el.appendChild(h('h1', null, '📞 Recruiter Conversation'));

    el.appendChild(card('📝', 'Overview',
        'The recruiter call is your <strong>first human interaction</strong> in the process. It is typically 30 minutes via phone or Teams.',
        '• The recruiter assesses <strong>culture fit, communication, and motivation</strong>',
        '• They will share details about the team, role, and next steps',
        '• This is NOT a deep technical interview — but be ready for high-level questions about your background',
    ));

    el.appendChild(card('🔗', 'Resources',
        resGrid(
            resourceCard('Microsoft Interview Tips', 'Official guidance on STAR(R) method and core competencies', 'https://careers.microsoft.com/v2/global/en/hiring-tips/interview-tips.html'),
            resourceCard('Microsoft Israel - Work With Us', 'Local interview flow description', 'https://www.microsoftrnd.co.il/workwithus'),
            resourceCard('Microsoft Virtual Interviewing', 'Teams setup and logistics guide', 'https://careers.microsoft.com/v2/global/en/hiring-tips/virtual-interviewing'),
        )
    ));

    el.appendChild(card('📚', 'Preparation',
        h('h3', null, 'Prepare Your Narrative'),
        '• <strong>"Tell me about yourself"</strong>: 2-minute pitch covering your background, current role, why you\'re interested in security at Microsoft',
        '• <strong>"Why Microsoft?"</strong>: Research the Israel security hub (60%+ security teams), mention specific products or missions that excite you',
        '• <strong>"Why security?"</strong>: Frame your backend experience as a strength — security needs engineering rigor',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'STAR(R) Framework'),
        '• <strong>S</strong>ituation → <strong>T</strong>ask → <strong>A</strong>ction → <strong>R</strong>esult → <strong>R</strong>eflection',
        '• Prepare 3-5 stories covering: technical challenge, teamwork, conflict, learning from failure, leadership',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'Questions to Ask the Recruiter'),
        '• What does the team work on day-to-day?',
        '• What does the interview loop look like for this specific role?',
        '• What is the team culture like?',
        '• What is the timeline for the process?',
    ));

    el.appendChild(card('✅', 'Validation',
        quiz({ id: 'rec1', q: 'What method does Microsoft recommend for behavioral interviews?', options: ['SWOT Analysis', 'STAR(R) Method', 'Agile Retrospective', '5 Whys'], correct: 1, explanation: 'Microsoft\'s official interview tips page explicitly recommends STAR(R).' }),
        quiz({ id: 'rec2', q: 'How soon does Microsoft Israel claim to update you after interviews?', options: ['24 hours', '48 hours', '1 week', '2 weeks'], correct: 1, explanation: 'The Microsoft Israel R&D page claims updates within 48 hours.' }),
    ));

    el.appendChild(card('📋', 'Summary',
        '• Keep it <strong>conversational but professional</strong>',
        '• Have your <strong>"why" narrative</strong> ready',
        '• Prepare <strong>STAR(R) stories</strong> even for this stage',
        '• Ask <strong>genuine questions</strong> about the team and role',
        '• Test your <strong>Teams setup</strong> beforehand',
    ));
    Logger.info('Recruiter tab rendered');
};

// ── Tab: Online Assessment ─────────────────────────────────────────
TAB_RENDERERS['step-assessment'] = (el) => {
    el.appendChild(h('h1', null, '💻 Online Assessment'));

    el.appendChild(card('📝', 'Overview',
        'Not all candidates receive an OA — some skip directly to the Interview Day. When present, it\'s typically a <strong>timed coding test</strong> on HackerRank or CodeSignal.',
        '• Usually 1-3 problems in 60-90 minutes',
        '• Focuses on <strong>DSA fundamentals</strong>: arrays, strings, trees, graphs',
        '• Your code must <strong>compile and pass test cases</strong>',
    ));

    el.appendChild(card('🔗', 'Resources',
        resGrid(
            resourceCard('HackerRank Interview Prep Kit', 'Structured DSA practice sets', 'https://www.hackerrank.com/interview/interview-preparation-kit'),
            resourceCard('CodeSignal', 'Assessment-style practice', 'https://codesignal.com/'),
            resourceCard('LeetCode Interview Prep', 'Classic interview question sets', 'https://leetcode.com/interview/'),
        )
    ));

    el.appendChild(card('📚', 'Preparation',
        h('h3', null, 'Core Topics to Practice'),
        '• <strong>Arrays & Strings</strong>: Two pointers, sliding window, prefix sums',
        '• <strong>Hash Maps</strong>: Frequency counting, two-sum patterns',
        '• <strong>Trees & Graphs</strong>: BFS, DFS, level-order traversal',
        '• <strong>Stacks & Queues</strong>: Implement queue using 2 stacks (reported in Israel interviews)',
        '• <strong>Sorting</strong>: Know when to use what; merge sort, quicksort',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'Tips for Timed Assessments'),
        '• Read ALL problems first — start with the one you\'re most confident about',
        '• Write <strong>brute force first</strong>, then optimize',
        '• <strong>Test with edge cases</strong>: empty input, single element, large input',
        '• Save time for reviewing your code before submitting',
    ));

    el.appendChild(card('✅', 'Validation',
        quiz({ id: 'oa1', q: 'Which data structure is needed to implement a queue using minimal resources?', options: ['1 stack', '2 stacks', '2 queues', '1 linked list'], correct: 1, explanation: 'This is a classic interview question reported in Microsoft Israel interviews.' }),
        quiz({ id: 'oa2', q: 'What should you do FIRST when you see multiple problems in a timed OA?', options: ['Start coding problem 1 immediately', 'Read all problems and pick the easiest', 'Ask the recruiter for help', 'Skip the hardest one'], correct: 1, explanation: 'Reading all problems first lets you allocate time wisely.' }),
    ));

    el.appendChild(card('📋', 'Summary',
        '• OA is <strong>not guaranteed</strong> in the process — but prepare for it',
        '• Focus on <strong>medium-difficulty DSA</strong> problems',
        '• Practice on HackerRank/CodeSignal to get used to the <strong>platform UX</strong>',
        '• Always <strong>test and verify</strong> your code before submitting',
    ));
    Logger.info('Assessment tab rendered');
};

// ── Tab: Coding Interviews ─────────────────────────────────────────
TAB_RENDERERS['step-coding'] = (el) => {
    el.appendChild(h('h1', null, '⌨️ Coding & DSA Interviews'));

    el.appendChild(card('📝', 'Overview',
        'The technical interviews are the <strong>core of the process</strong>. Microsoft uses a <strong>third-party coding tool</strong> where you must write, compile, and run real code.',
        '• <strong>45-minute rounds</strong> — manage time carefully',
        '• You choose your language — pick the one you\'re strongest in',
        '• Interviewers assess: problem solving, code quality, Big-O analysis, testing, security implications',
        '• Some interviews may evaluate your use of <strong>AI/Copilot tools</strong>',
        callout('warn', 'You must write <strong>compilable, runnable code</strong> — pseudocode is NOT acceptable per Microsoft\'s official guidance.'),
    ));

    el.appendChild(card('🔗', 'Resources',
        resGrid(
            resourceCard('Microsoft Technical Interviewing Guide', 'Official expectations for technical rounds', 'https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing'),
            resourceCard('LeetCode - Microsoft Questions 2025', 'Consolidated recent question patterns', 'https://leetcode.com/discuss/interview-question/6403987/Microsoft-SDE-2-Recent-questions-2025-or-Consolidated/'),
            resourceCard('Glassdoor - MS Herzliya Interviews', 'Real candidate reports with example questions', 'https://www.glassdoor.com/Interview/Microsoft-Herzliya-Interview-Questions-EI_IE1651.0%2C9_IL.10%2C18_IC2421073.htm'),
            resourceCard('Reddit - Recent MS Questions', 'Community-compiled question list', 'https://www.reddit.com/r/leetcode/comments/1q1v5cm/recent_microsoft_interview_questions_ive_compiled/'),
        )
    ));

    el.appendChild(card('📚', 'Preparation',
        h('h3', null, 'Question Patterns from Israel Interviews'),
        '• <strong>Trees</strong>: Binary tree traversals, LCA, serialize/deserialize',
        '• <strong>Queue via 2 stacks</strong>: Classic problem reported multiple times',
        '• <strong>Concurrency</strong>: Thread-safe data structures, producer-consumer',
        '• <strong>OOP / LLD</strong>: Low-level design (design a parking lot, library system)',
        '• <strong>String manipulation</strong>: Parsing, pattern matching',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'The 45-Minute Framework'),
        '• <strong>0-5 min</strong>: Clarify the problem, discuss constraints and edge cases',
        '• <strong>5-10 min</strong>: Think aloud, discuss approach and complexity',
        '• <strong>10-35 min</strong>: Code the solution — clean, well-structured',
        '• <strong>35-40 min</strong>: Test with examples and edge cases',
        '• <strong>40-45 min</strong>: Discuss security implications and optimizations',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'Security Angle in Coding Rounds'),
        '• Always mention <strong>input validation</strong> in your solutions',
        '• Discuss <strong>buffer safety, integer overflow</strong> if relevant to your language',
        '• Consider <strong>injection risks</strong> if the problem involves string processing',
    ));

    el.appendChild(card('✅', 'Validation',
        quiz({ id: 'cod1', q: 'In a 45-minute coding interview, when should you start writing code?', options: ['Immediately', 'After 5-10 minutes of clarification and planning', 'After 20 minutes', 'Only in the last 15 minutes'], correct: 1, explanation: 'Spend the first 5-10 minutes clarifying the problem and discussing your approach.' }),
        quiz({ id: 'cod2', q: 'What does Microsoft expect you to do AFTER writing your solution?', options: ['Just submit it', 'Explain the time complexity only', 'Test it, cover edge cases, and discuss security implications', 'Refactor it to be shorter'], correct: 2, explanation: 'Microsoft explicitly expects you to test your solution and consider security implications.' }),
    ));

    el.appendChild(card('📋', 'Summary',
        '• Practice in a <strong>real compiler/runner</strong> environment, not on paper',
        '• Master the <strong>45-minute time framework</strong>',
        '• Always <strong>test your code</strong> and discuss edge cases',
        '• Mention <strong>security implications</strong> proactively',
        '• Be ready for <strong>AI/Copilot-assisted coding</strong> evaluation',
    ));
    Logger.info('Coding tab rendered');
};

// ── Tab: System Design ─────────────────────────────────────────────
TAB_RENDERERS['step-design'] = (el) => {
    el.appendChild(h('h1', null, '🏗️ System Design Interview'));

    el.appendChild(card('📝', 'Overview',
        'System design is "very important" per Microsoft\'s official guidance. For SE II, you\'re expected to demonstrate strong fundamentals — not necessarily lead deep architectural debates (that\'s more Senior+).',
        '• Topics: <strong>resiliency, high availability, partitioning, CAP theorem</strong>',
        '• Security-aware design is especially relevant for security team roles',
        '• Expect <strong>45-60 minute rounds</strong> with open-ended problems',
    ));

    el.appendChild(card('🔗', 'Resources',
        resGrid(
            resourceCard('System Design Primer (GitHub)', 'Comprehensive free resource for scalable systems', 'https://github.com/donnemartin/system-design-primer'),
            resourceCard('Grokking System Design', 'Structured course with practice problems', 'https://www.educative.io/courses/grokking-the-system-design-interview'),
            resourceCard('Microsoft Technical Interviewing', 'Official design expectations', 'https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing'),
        )
    ));

    el.appendChild(card('📚', 'Preparation',
        h('h3', null, 'Core Concepts to Master'),
        '• <strong>Load Balancing</strong>: L4 vs L7, round-robin, consistent hashing',
        '• <strong>Caching</strong>: CDN, Redis/Memcached, cache invalidation strategies',
        '• <strong>Databases</strong>: SQL vs NoSQL, sharding, replication, indexing',
        '• <strong>CAP Theorem</strong>: Consistency vs Availability vs Partition tolerance',
        '• <strong>Message Queues</strong>: Kafka, RabbitMQ, async processing',
        '• <strong>Resiliency</strong>: Circuit breakers, retries, bulkheads, graceful degradation',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'Security-Aware Design (Differentiator!)'),
        '• <strong>Authentication & Authorization</strong>: OAuth 2.0, RBAC, least privilege',
        '• <strong>Encryption</strong>: Data at rest (AES), data in transit (TLS), key management',
        '• <strong>Threat modeling</strong>: Apply STRIDE to your design during the interview',
        '• <strong>Logging & monitoring</strong>: Audit trails, anomaly detection, SIEM integration',
        '• <strong>Input validation</strong>: API gateway, schema validation, rate limiting',
        h('div', { className: 'section-divider' }),
        h('h3', null, 'Practice Scenarios'),
        '• Design a <strong>URL shortener</strong> (classic, covers most fundamentals)',
        '• Design a <strong>real-time chat system</strong> (WebSockets, presence, scaling)',
        '• Design a <strong>security event pipeline</strong> (log ingestion, alerting, hunting)',
        '• Design a <strong>certificate management system</strong> (relevant to security orgs)',
    ));

    el.appendChild(card('✅', 'Validation',
        quiz({ id: 'sd1', q: 'In CAP theorem, what trade-off do most distributed databases choose?', options: ['CA (Consistency + Availability)', 'CP (Consistency + Partition tolerance)', 'AP (Availability + Partition tolerance)', 'All three'], correct: 2, explanation: 'In the presence of network partitions (which are inevitable), most systems choose either CP or AP. Many real-world systems choose AP for availability.' }),
        quiz({ id: 'sd2', q: 'What security principle should you apply to API access in your system design?', options: ['Give all services admin access for simplicity', 'Least privilege — each service gets only the permissions it needs', 'Use a single shared API key', 'No authentication needed for internal services'], correct: 1, explanation: 'Least privilege is fundamental to secure design — especially important for Microsoft security teams.' }),
    ));

    el.appendChild(card('📋', 'Summary',
        '• Start with <strong>requirements clarification</strong> (functional + non-functional)',
        '• Draw a <strong>high-level architecture</strong> before diving into details',
        '• Discuss <strong>trade-offs</strong> explicitly — there are no perfect designs',
        '• <strong>Weave security into your design</strong> naturally (don\'t bolt it on at the end)',
        '• For SE II: demonstrate <strong>solid fundamentals</strong>, not exhaustive expertise',
    ));
    Logger.info('Design tab rendered');
};
