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
      response: 'Предлагаме следните дигитални маркетинг услуги:<br><br>' +
        '<strong>• SEO & SEM</strong> — оптимизация за търсачки и платени кампании<br>' +
        '<strong>• Facebook Ads & Google Ads</strong> — рекламни кампании<br>' +
        '<strong>• Content Marketing</strong> — създаване на съдържание<br>' +
        '<strong>• E-mail маркетинг</strong><br>' +
        '<strong>• Управление на социални мрежи</strong> — цялостно поддържане<br>' +
        '<strong>• Видео обработка</strong><br>' +
        '<strong>• Google Analytics</strong> — анализ и проследяване<br>' +
        '<strong>• Дигитален маркетинг</strong> — всички услуги в един пакет<br><br>' +
        '<em>Скоро:</em> AI услуги, правене на сайтове, автоматизации<br><br>' +
        'За коя услуга искате да научите повече?'
    },
    {
      keywords: ['seo', 'sem', 'търсачк', 'оптимизация'],
      response: 'Предлагаме професионални <strong>SEO и SEM услуги</strong> — оптимизираме сайта ви за търсачките и управляваме платени рекламни кампании за максимална видимост и реални резултати.'
    },
    {
      keywords: ['facebook', 'фейсбук', 'instagram', 'инстаграм', 'социални мрежи', 'социални'],
      response: 'Предлагаме <strong>цялостно управление на социални мрежи</strong> — от създаване на съдържание до Facebook Ads кампании. Грижим се за вашите профили, за да не се притеснявате вие.'
    },
    {
      keywords: ['google ads', 'гугъл', 'google', 'реклам', 'ppc', 'ads'],
      response: 'Управляваме <strong>Google Ads</strong> и <strong>Facebook Ads</strong> кампании с фокус върху ROI. Също предлагаме <strong>Google Analytics</strong> за детайлен анализ на резултатите.'
    },
    {
      keywords: ['email', 'имейл маркетинг', 'e-mail', 'мейл'],
      response: 'Предлагаме <strong>e-mail маркетинг</strong> услуги — от създаване на кампании до автоматизации, които помагат да поддържате връзка с клиентите си.'
    },
    {
      keywords: ['видео', 'video', 'обработка', 'монтаж', 'reels'],
      response: 'Предлагаме професионална <strong>видео обработка</strong> за вашите маркетинг кампании, социални мрежи и Reels. Визуалният контент е ключов за ангажираността!'
    },
    {
      keywords: ['content', 'контент', 'съдържание'],
      response: 'Предлагаме <strong>content marketing</strong> — създаване на качествено съдържание, което привлича и задържа вашата аудитория.'
    },
    {
      keywords: ['маркетинг', 'marketing', 'дигитален'],
      response: 'Предлагаме <strong>цялостен дигитален маркетинг</strong> — всички наши услуги в един пакет: SEO, SEM, Google Ads, Facebook Ads, content marketing, e-mail маркетинг, управление на социални мрежи, Google Analytics и видео обработка.'
    },
    {
      keywords: ['екип', 'кой', 'хора', 'team', 'кои сте'],
      response: 'Зад ProjectA стои <strong>Калоян Иванов</strong> — основател и дигитален маркетинг специалист от Варна. Занимавам се с всичко — от SEO и Google Ads до управление на социални мрежи и видео обработка.'
    },
    {
      keywords: ['процес', 'как работ', 'стъпк', 'етап', 'process'],
      response: 'Работим в 4 ясни стъпки:<br><br>' +
        '<strong>01. Откриване</strong> — Анализ на целите и аудиторията<br>' +
        '<strong>02. Стратегия</strong> — Детайлен план с етапи и срокове<br>' +
        '<strong>03. Изпълнение</strong> — Превръщаме плана в реалност<br>' +
        '<strong>04. Оптимизация & Растеж</strong> — Оптимизираме за максимални резултати'
    },
    {
      keywords: ['контакт', 'свърж', 'имейл', 'email', 'телефон', 'адрес', 'пиш', 'обад'],
      response: 'Можете да се свържете с нас:<br><br>' +
        '📧 <strong>kaloyanivanov29@gmail.com</strong><br>' +
        '📍 <strong>Варна, България</strong><br><br>' +
        'Или попълнете <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a> и ще ви отговорим до 24 часа.'
    },
    {
      keywords: ['цен', 'колко струва', 'цена', 'бюджет', 'price', 'cost', 'оферт', 'стойност'],
      response: 'Цената зависи от обхвата и сложността на проекта. Всяка оферта е <strong>индивидуална</strong>. Свържете се с нас чрез <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a> или на <strong>kaloyanivanov29@gmail.com</strong>, за да обсъдим вашите нужди и да ви дадем оферта.'
    },
    {
      keywords: ['проект', 'портфолио', 'portfolio', 'примери', 'работа', 'клиент'],
      response: 'В момента работим с нашия първи клиент — <strong>Espreso.bg</strong>, новинарски портал. Предоставяме цялостен дигитален маркетинг и клиентът споделя, че е <strong>много доволен</strong> от качеството на работата ни.<br><br>Търсим нови партньори — свържете се с нас!'
    },
    {
      keywords: ['опит', 'години', 'колко време', 'experience'],
      response: 'ProjectA е млада агенция с <strong>под една година опит</strong>, но вече с <strong>доволен клиент</strong> — Espreso.bg, който потвърждава качеството на нашата работа. Работим с голяма отдаденост и внимание към всеки детайл.'
    },
    {
      keywords: ['благодар', 'мерси', 'thanks', 'thank'],
      response: 'С удоволствие! Ако имате други въпроси, не се колебайте да попитате. 😊'
    },
    {
      keywords: ['довиждане', 'чао', 'bye', 'goodbye'],
      response: 'Довиждане! Беше ми приятно да говорим. Ако имате нужда от нещо, ще съм тук! 👋'
    },
    {
      keywords: ['време', 'колко дни', 'колко време', 'срок', 'deadline', 'бързо'],
      response: 'Сроковете зависят от обхвата на проекта. Свържете се с нас за точна оценка — ще ви дадем реалистичен срок и план за изпълнение.'
    },
    {
      keywords: ['скоро', 'бъдещ', 'нов', 'планира', 'ai', 'сайт', 'автоматизаци'],
      response: 'Скоро ще добавим и нови услуги:<br><br>' +
        '<strong>• AI услуги</strong> — изкуствен интелект за бизнеса<br>' +
        '<strong>• Правене на сайтове</strong> — уеб разработка<br>' +
        '<strong>• Автоматизации</strong> — оптимизиране на процеси<br><br>' +
        'Следете ни за актуализации!'
    },
    {
      keywords: ['espreso', 'еспресо'],
      response: 'Espreso.bg е нашият първи клиент — новинарски портал, на който предоставяме цялостен дигитален маркетинг. Клиентът споделя, че е <strong>много доволен</strong> и че си вършим работата наистина качествено!'
    },
    {
      keywords: ['варна', 'къде', 'град', 'локация', 'местоположение'],
      response: 'Базирани сме във <strong>Варна, България</strong>. Работим с клиенти от цялата страна — комуникацията е предимно онлайн.'
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
    return 'Благодаря за въпроса! За по-подробен отговор, моля свържете се с нас на <strong>kaloyanivanov29@gmail.com</strong> или попълнете <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a>. Ще ви отговорим в рамките на 24 часа.';
  }
})();
