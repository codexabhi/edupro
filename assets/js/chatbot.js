(function () {
  'use strict';

  var KNOWLEDGE = [
    {
      keywords: ['course', 'courses', 'offer', 'learn', 'program', 'catalog'],
      answer: 'EduPro offers expert-led courses in <strong>Web Development</strong>, <strong>Data Science</strong>, and <strong>Design</strong>. Each program includes hands-on projects and mentorship. Browse all courses at <a href="courses.html">courses.html</a>.'
    },
    {
      keywords: ['web', 'development', 'frontend', 'backend', 'react', 'javascript', 'html', 'css'],
      answer: 'Our Web Development track covers full-stack skills — HTML, CSS, JavaScript, React, Node.js, and more. Check out details at <a href="web-development.html">web-development.html</a>.'
    },
    {
      keywords: ['data', 'science', 'machine learning', 'ml', 'analytics', 'python', 'ai'],
      answer: 'Our Data Science program covers Python, statistics, machine learning, NLP, and real-world analytics projects. Learn more at <a href="data-science.html">data-science.html</a>.'
    },
    {
      keywords: ['design', 'ui', 'ux', 'figma', 'graphic'],
      answer: 'The Design track teaches UI/UX principles, Figma, prototyping, and visual design systems. Explore at <a href="design.html">design.html</a>.'
    },
    {
      keywords: ['placement', 'job', 'career', 'hire', 'salary', 'interview'],
      answer: 'Yes! EduPro offers dedicated placement assistance — resume building, mock interviews, and connections with hiring partners. Our placement rate is <strong>95%</strong> with an average starting salary of <strong>$95k</strong>. Visit <a href="placement.html">placement.html</a> for details.'
    },
    {
      keywords: ['enroll', 'enrollment', 'sign up', 'register', 'join', 'admission', 'apply'],
      answer: 'Ready to start? Click <strong>Get Started</strong> on any page or visit our <a href="contact.html">contact page</a> to speak with our team. We\'ll help you pick the right course!'
    },
    {
      keywords: ['price', 'pricing', 'cost', 'fee', 'payment', 'installment', 'scholarship'],
      answer: 'We offer flexible payment options — one-time payment, monthly installments, and income share agreements (ISA). Scholarships are available for deserving candidates. Contact us at <a href="contact.html">contact.html</a> for a personalized quote.'
    },
    {
      keywords: ['duration', 'long', 'time', 'months', 'weeks', 'complete'],
      answer: 'Most courses take <strong>3–6 months</strong> with 10–15 hours of study per week. We offer flexible schedules for working professionals and students.'
    },
    {
      keywords: ['refund', 'money back', 'guarantee'],
      answer: 'We offer a <strong>7-day money-back guarantee</strong>. If you\'re not satisfied within the first week, you can request a full refund — no questions asked.'
    },
    {
      keywords: ['experience', 'beginner', 'prerequisite', 'prior', 'start from scratch'],
      answer: 'Most courses are designed for beginners — no prior experience needed! We start from fundamentals and build up progressively. Advanced courses list prerequisites in their descriptions.'
    },
    {
      keywords: ['support', 'help', 'stuck', 'mentor', 'assistance'],
      answer: 'You get dedicated mentor sessions, community forums, and <strong>24/7 chat support</strong>. Our instructors and TAs are always ready to help you stay on track.'
    },
    {
      keywords: ['contact', 'email', 'phone', 'call', 'reach', 'talk'],
      answer: 'Reach us anytime:<br>📧 <a href="mailto:hello@edupro.com">hello@edupro.com</a><br>📞 <a href="tel:+1-800-555-0123">+1 (800) 555-0123</a><br>📍 San Francisco, CA<br>Or use our <a href="contact.html">contact form</a>.'
    },
    {
      keywords: ['about', 'who', 'edupro', 'company', 'mission'],
      answer: 'EduPro empowers learners worldwide with expert-led courses, hands-on projects, and a supportive community. Learn our story at <a href="about.html">about.html</a>.'
    },
    {
      keywords: ['access', 'lifetime', 'materials', 'after completion'],
      answer: 'Yes! Enrollment includes <strong>lifetime access</strong> to all course materials — video lectures, project files, and future updates.'
    },
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings'],
      answer: 'Hey there 👋 Welcome to EduPro! I\'m your AI assistant. Ask me about courses, placements, pricing, or anything else — I\'m here to help!'
    }
  ];

  var DEFAULT_ANSWER = 'Thanks for your question! I\'m best at answering questions about EduPro courses, placements, pricing, and enrollment. Try asking about a specific topic, or visit our <a href="faq.html">FAQ page</a> or <a href="contact.html">contact us</a> directly.';

  var SUGGESTIONS = [
    'What courses do you offer?',
    'Placement assistance?',
    'How do I enroll?',
    'Contact info'
  ];

  function refreshIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function botAvatarHtml() {
    return '<i data-lucide="bot"></i>';
  }

  function userAvatarHtml() {
    return '<i data-lucide="user"></i>';
  }

  function getResponse(message) {
    var lower = message.toLowerCase().trim();
    if (!lower) return '';

    var bestMatch = null;
    var bestScore = 0;

    KNOWLEDGE.forEach(function (entry) {
      var score = 0;
      entry.keywords.forEach(function (kw) {
        if (lower.indexOf(kw) !== -1) score += kw.split(' ').length;
      });
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    return bestMatch && bestScore > 0 ? bestMatch.answer : DEFAULT_ANSWER;
  }

  function initChatbot() {
    if (document.getElementById('edupro-chatbot')) return;

    var isOpen = false;
    var hasGreeted = false;
    var teaserDismissed = localStorage.getItem('edupro-chatbot-teaser') === 'hidden';

    var root = document.createElement('div');
    root.id = 'edupro-chatbot';
    root.className = 'edupro-chatbot';
    root.innerHTML =
      '<div id="chatbot-teaser" class="chatbot-teaser' + (teaserDismissed ? ' hidden' : '') + '">' +
        '<p>Hey there 👋 Welcome! How can I assist you today?</p>' +
        '<button type="button" class="chatbot-teaser-close" aria-label="Dismiss">✕</button>' +
      '</div>' +
      '<div id="chatbot-panel" class="chatbot-panel hidden">' +
        '<div class="chatbot-header">' +
          '<div class="chatbot-header-info">' +
            '<div class="chatbot-avatar">' + botAvatarHtml() + '</div>' +
            '<div>' +
              '<span class="chatbot-title">EduPro AI</span>' +
              '<span class="chatbot-status">Online • Replies instantly</span>' +
            '</div>' +
          '</div>' +
          '<button type="button" id="chatbot-close" class="chatbot-close" aria-label="Close chat"><i data-lucide="x"></i></button>' +
        '</div>' +
        '<div id="chatbot-messages" class="chatbot-messages"></div>' +
        '<div id="chatbot-suggestions" class="chatbot-suggestions"></div>' +
        '<div class="chatbot-input-area">' +
          '<input type="text" id="chatbot-input" class="chatbot-input" placeholder="Type your message..." autocomplete="off">' +
          '<button type="button" id="chatbot-send" class="chatbot-send" aria-label="Send message">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<button type="button" id="chatbot-toggle" class="chatbot-toggle" aria-label="Open chat">' +
        '<span class="chatbot-pulse"></span>' +
        '<i data-lucide="bot" class="icon-bot"></i>' +
        '<i data-lucide="x" class="icon-close"></i>' +
      '</button>';

    document.body.appendChild(root);
    refreshIcons();

    var teaser = document.getElementById('chatbot-teaser');
    var panel = document.getElementById('chatbot-panel');
    var toggle = document.getElementById('chatbot-toggle');
    var closeBtn = document.getElementById('chatbot-close');
    var messagesEl = document.getElementById('chatbot-messages');
    var suggestionsEl = document.getElementById('chatbot-suggestions');
    var input = document.getElementById('chatbot-input');
    var sendBtn = document.getElementById('chatbot-send');
    var teaserClose = teaser.querySelector('.chatbot-teaser-close');

    function renderSuggestions() {
      suggestionsEl.innerHTML = '';
      SUGGESTIONS.forEach(function (text) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chatbot-suggestion';
        chip.textContent = text;
        chip.addEventListener('click', function () {
          input.value = text;
          sendMessage();
        });
        suggestionsEl.appendChild(chip);
      });
    }

    function appendMessage(text, type) {
      var msg = document.createElement('div');
      msg.className = 'chatbot-msg ' + type;
      msg.innerHTML =
        '<div class="chatbot-msg-avatar">' + (type === 'bot' ? botAvatarHtml() : userAvatarHtml()) + '</div>' +
        '<div class="chatbot-msg-bubble">' + text + '</div>';
      messagesEl.appendChild(msg);
      refreshIcons();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
      var typing = document.createElement('div');
      typing.id = 'chatbot-typing-indicator';
      typing.className = 'chatbot-msg bot';
      typing.innerHTML =
        '<div class="chatbot-msg-avatar">' + botAvatarHtml() + '</div>' +
        '<div class="chatbot-msg-bubble"><div class="chatbot-typing"><span></span><span></span><span></span></div></div>';
      messagesEl.appendChild(typing);
      refreshIcons();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function hideTyping() {
      var typing = document.getElementById('chatbot-typing-indicator');
      if (typing) typing.remove();
    }

    function sendMessage() {
      var text = input.value.trim();
      if (!text) return;

      appendMessage(text, 'user');
      input.value = '';
      sendBtn.disabled = true;
      showTyping();

      var delay = 600 + Math.random() * 800;
      setTimeout(function () {
        hideTyping();
        appendMessage(getResponse(text), 'bot');
        sendBtn.disabled = false;
        input.focus();
      }, delay);
    }

    function openChat() {
      isOpen = true;
      panel.classList.remove('hidden');
      teaser.classList.add('hidden');
      toggle.classList.add('open');
      toggle.setAttribute('aria-label', 'Close chat');

      if (!hasGreeted) {
        hasGreeted = true;
        appendMessage('Hey there 👋 Welcome to EduPro! I\'m your AI assistant. Ask me about our courses, placements, pricing, or enrollment — I\'m here to help!', 'bot');
        renderSuggestions();
      }

      input.focus();
    }

    function closeChat() {
      isOpen = false;
      panel.classList.add('hidden');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-label', 'Open chat');
    }

    toggle.addEventListener('click', function () {
      if (isOpen) closeChat();
      else openChat();
    });

    closeBtn.addEventListener('click', closeChat);
    sendBtn.addEventListener('click', sendMessage);

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    teaser.addEventListener('click', function (e) {
      if (e.target === teaserClose) return;
      openChat();
    });

    teaserClose.addEventListener('click', function (e) {
      e.stopPropagation();
      teaser.classList.add('hidden');
      localStorage.setItem('edupro-chatbot-teaser', 'hidden');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
