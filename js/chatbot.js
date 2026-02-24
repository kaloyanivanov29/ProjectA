/* ========================================
   ProjectA — AI Chatbot
   Knowledge-based assistant
   ======================================== */

(function () {
  'use strict';

  var chatbot = document.getElementById('chatbot');
  var toggle = document.getElementById('chatbotToggle');
  var messages = document.getElementById('chatbotMessages');
  var input = document.getElementById('chatbotInput');
  var sendBtn = document.getElementById('chatbotSend');
  var quickActions = document.getElementById('chatbotQuickActions');

  // Toggle chat window
  toggle.addEventListener('click', function () {
    chatbot.classList.toggle('open');
    if (chatbot.classList.contains('open')) {
      input.focus();
    }
  });

  // Quick action buttons
  quickActions.addEventListener('click', function (e) {
    var btn = e.target.closest('.chatbot-quick-btn');
    if (btn) {
      var msg = btn.getAttribute('data-msg');
      sendMessage(msg);
    }
  });

  // Send on button click
  sendBtn.addEventListener('click', function () {
    var text = input.value.trim();
    if (text) sendMessage(text);
  });

  // Send on Enter
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var text = input.value.trim();
      if (text) sendMessage(text);
    }
  });

  function sendMessage(text) {
    // Hide quick actions after first message
    if (quickActions) {
      quickActions.style.display = 'none';
    }

    addMessage(text, 'user');
    input.value = '';

    // Show typing indicator
    var typing = document.createElement('div');
    typing.className = 'chatbot-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    scrollToBottom();

    // Simulate thinking delay
    var delay = 600 + Math.random() * 800;
    setTimeout(function () {
      typing.remove();
      var response = getResponse(text);
      addMessage(response, 'bot');
    }, delay);
  }

  function addMessage(text, type) {
    var div = document.createElement('div');
    div.className = 'chatbot-msg chatbot-msg-' + type;
    var p = document.createElement('p');
    p.innerHTML = text;
    div.appendChild(p);
    messages.appendChild(div);
    scrollToBottom();
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  // --- Knowledge Base ---
  var knowledge = [
    {
      keywords: ['здравей', 'здрасти', 'привет', 'хей', 'hello', 'hi', 'добър ден'],
      response: 'Здравейте! Радвам се, че ни пишете. С какво мога да ви помогна днес?'
    },
    {
      keywords: ['услуг', 'какво правите', 'какво предлагате', 'service', 'какво може'],
      response: 'Предлагаме следните услуги:<br><br>' +
        '<strong>1. SEO & SEM</strong> — оптимизация и маркетинг в търсачки<br>' +
        '<strong>2. Дигитален маркетинг</strong> — Content Marketing, Facebook Ads, Google Ads, Google Analytics, Email Marketing<br>' +
        '<strong>3. Социални мрежи</strong> — цялостно поддържане<br>' +
        '<strong>4. Видео обработка</strong> — за реклами и социални мрежи<br><br>' +
        '<em>Очаквайте скоро: AI услуги, изработка на сайтове и автоматизации.</em><br><br>' +
        'За коя услуга искате да научите повече?'
    },
    {
      keywords: ['seo', 'sem', 'търсач', 'оптимизация'],
      response: 'Предлагаме <strong>SEO & SEM</strong> услуги — оптимизация за търсачки и маркетинг в търсачки. Повече видимост означава повече клиенти за вашия бизнес.'
    },
    {
      keywords: ['facebook', 'instagram', 'социалн', 'мреж', 'social'],
      response: 'Предлагаме <strong>цялостно поддържане на социални мрежи</strong> — създаване на съдържание, планиране и управление на профили в Instagram, Facebook и LinkedIn.'
    },
    {
      keywords: ['google ads', 'facebook ads', 'реклам', 'ads', 'ppc'],
      response: 'Управляваме <strong>рекламни кампании</strong> във Facebook Ads и Google Ads. Фокусираме се върху ROI и реален растеж за вашия бизнес.'
    },
    {
      keywords: ['маркетинг', 'seo', 'marketing', 'content', 'email'],
      response: 'Предлагаме пълен набор от <strong>дигитален маркетинг</strong> услуги — SEO, SEM, Content Marketing, Facebook Ads, Google Ads, Google Analytics, Email Marketing и управление на социални мрежи.'
    },
    {
      keywords: ['видео', 'video', 'монтаж', 'reels'],
      response: 'Предлагаме <strong>професионална видео обработка</strong> за социални мрежи, реклами и презентации — включително Reels, кратки видеа и рекламни клипове.'
    },
    {
      keywords: ['екип', 'кой', 'хора', 'team', 'кои сте'],
      response: 'Зад ProjectA стои <strong>Калоян Иванов</strong> — основател, който се занимава с всичко от SEO и рекламни кампании до управление на социални мрежи и видео обработка. Базиран е във Варна.'
    },
    {
      keywords: ['процес', 'как работ', 'стъпк', 'етап', 'process'],
      response: 'Работим в 4 ясни стъпки:<br><br>' +
        '<strong>01. Откриване</strong> — Анализ на целите и аудиторията<br>' +
        '<strong>02. Стратегия</strong> — Детайлен план с етапи и срокове<br>' +
        '<strong>03. Изпълнение</strong> — Превръщаме плана в реалност<br>' +
        '<strong>04. Оптимизация</strong> — Анализ и подобряване на резултатите'
    },
    {
      keywords: ['контакт', 'свърж', 'имейл', 'email', 'телефон', 'адрес', 'пиш', 'обад'],
      response: 'Можете да се свържете с нас:<br><br>' +
        '📧 <strong>kaloyanivanov29@gmail.com</strong><br>' +
        '📍 <strong>Варна, България</strong><br><br>' +
        'Или попълнете <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a> и ще ви отговорим възможно най-скоро.'
    },
    {
      keywords: ['цен', 'колко струва', 'цена', 'бюджет', 'price', 'cost', 'оферт', 'стойност'],
      response: 'Цената зависи от обхвата на проекта. Всяка оферта е <strong>индивидуална</strong>. Свържете се с нас чрез <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a> или на <strong>kaloyanivanov29@gmail.com</strong>, за да обсъдим вашите нужди.'
    },
    {
      keywords: ['проект', 'портфолио', 'portfolio', 'примери', 'работа', 'клиент'],
      response: 'В момента работим с <strong>Espreso.bg</strong> — цялостен дигитален маркетинг включващ SEO, социални мрежи и рекламни кампании. Клиентът е изключително доволен от качеството на работа.'
    },
    {
      keywords: ['опит', 'години', 'колко време', 'experience'],
      response: 'ProjectA е млада агенция с по-малко от една година опит, но работим с пълна отдаденост и качество. Нашият клиент Espreso.bg потвърждава, че си вършим работата наистина качествено.'
    },
    {
      keywords: ['благодар', 'мерси', 'thanks', 'thank'],
      response: 'С удоволствие! Ако имате други въпроси, не се колебайте да попитате.'
    },
    {
      keywords: ['довиждане', 'чао', 'bye', 'goodbye'],
      response: 'Довиждане! Беше ми приятно да говорим. Ако имате нужда от нещо, ще съм тук!'
    },
    {
      keywords: ['ai', 'изкуствен интелект', 'автоматизаци', 'сайт'],
      response: 'Скоро ще предлагаме и <strong>AI услуги, изработка на уебсайтове и автоматизации</strong>. Следете ни за повече информация или се свържете с нас на <strong>kaloyanivanov29@gmail.com</strong>.'
    }
  ];

  function getResponse(input) {
    var text = input.toLowerCase().trim();

    // Check each knowledge entry
    for (var i = 0; i < knowledge.length; i++) {
      var entry = knowledge[i];
      for (var j = 0; j < entry.keywords.length; j++) {
        if (text.indexOf(entry.keywords[j]) !== -1) {
          return entry.response;
        }
      }
    }

    // Default response
    return 'Благодаря за въпроса! За по-подробен отговор, моля свържете се с нас на <strong>kaloyanivanov29@gmail.com</strong> или попълнете <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a>. Ще ви отговорим възможно най-скоро.';
  }
})();
