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
      response: 'Предлагаме 4 основни услуги:<br><br>' +
        '<strong>1. Уеб разработка</strong> — React, Next.js, Node.js<br>' +
        '<strong>2. UI/UX Дизайн</strong> — Figma, прототипиране, UX изследвания<br>' +
        '<strong>3. Брандинг</strong> — лого, бранд идентичност, стратегия<br>' +
        '<strong>4. Дигитален маркетинг</strong> — SEO, PPC, анализ<br><br>' +
        'За коя услуга искате да научите повече?'
    },
    {
      keywords: ['уеб разработ', 'web', 'сайт', 'приложени', 'react', 'next', 'node'],
      response: 'Нашият екип създава бързи, сигурни и мащабируеми уеб приложения с <strong>React, Next.js и Node.js</strong>. Всеки проект е адаптиран спрямо нуждите на клиента — от корпоративни сайтове до сложни уеб платформи.'
    },
    {
      keywords: ['дизайн', 'ui', 'ux', 'figma', 'интерфейс', 'design'],
      response: 'Нашите дизайнери проектират <strong>интуитивни и красиви интерфейси</strong>, фокусирани върху потребителското изживяване. Работим с Figma и провеждаме UX изследвания, за да гарантираме, че продуктът работи за вашите потребители.'
    },
    {
      keywords: ['бранд', 'лого', 'идентичност', 'brand', 'logo'],
      response: 'Изграждаме <strong>уникални бранд идентичности</strong>, включващи лого дизайн, цветова палитра, типография и бранд стратегия. Целта ни е вашият бизнес да се отличава от конкуренцията.'
    },
    {
      keywords: ['маркетинг', 'seo', 'реклам', 'ppc', 'google ads', 'marketing'],
      response: 'Предлагаме пълен набор от <strong>дигитален маркетинг</strong> услуги — SEO оптимизация, Google Ads, реклама в социалните мрежи и подробен анализ на резултатите. Фокусираме се върху ROI и реален растеж.'
    },
    {
      keywords: ['екип', 'кой', 'хора', 'team', 'кои сте'],
      response: 'Нашият екип се състои от 4 ключови специалисти:<br><br>' +
        '<strong>Александър Иванов</strong> — CEO & Стратегия (10+ год. опит)<br>' +
        '<strong>Мария Петрова</strong> — Creative Director<br>' +
        '<strong>Георги Димитров</strong> — Lead Developer (Full-stack)<br>' +
        '<strong>Елена Стоянова</strong> — Marketing Manager<br><br>' +
        'Заедно имаме над 8 години опит в дигиталната индустрия.'
    },
    {
      keywords: ['процес', 'как работ', 'стъпк', 'етап', 'process'],
      response: 'Работим в 4 ясни стъпки:<br><br>' +
        '<strong>01. Откриване</strong> — Анализ на целите и аудиторията<br>' +
        '<strong>02. Стратегия</strong> — Детайлен план с етапи и срокове<br>' +
        '<strong>03. Дизайн & Разработка</strong> — Превръщаме плана в реалност<br>' +
        '<strong>04. Пускане & Растеж</strong> — Оптимизираме за максимални резултати'
    },
    {
      keywords: ['контакт', 'свърж', 'имейл', 'email', 'телефон', 'адрес', 'пиш', 'обад'],
      response: 'Можете да се свържете с нас по няколко начина:<br><br>' +
        '📧 <strong>hello@projecta.bg</strong><br>' +
        '📞 <strong>+359 2 123 4567</strong><br>' +
        '📍 <strong>София, България</strong><br><br>' +
        'Или попълнете <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a> и ще ви отговорим до 24 часа.'
    },
    {
      keywords: ['цен', 'колко струва', 'цена', 'бюджет', 'price', 'cost', 'оферт', 'стойност'],
      response: 'Цената зависи от обхвата и сложността на проекта. Всяка оферта е <strong>индивидуална</strong>. Свържете се с нас чрез <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a> или на <strong>hello@projecta.bg</strong>, за да обсъдим вашите нужди и да ви дадем оферта.'
    },
    {
      keywords: ['проект', 'портфолио', 'portfolio', 'примери', 'работа'],
      response: 'Имаме портфолио с над <strong>150+ завършени проекта</strong> за 50+ клиенти. Ето някои примери:<br><br>' +
        '<strong>NovaTech Store</strong> — E-commerce платформа (Next.js, Stripe)<br>' +
        '<strong>FlowMetrics</strong> — Аналитичен дашборд (React, D3.js)<br>' +
        '<strong>Verdant Kitchen</strong> — Ребрандинг за верига ресторанти<br>' +
        '<strong>PulseHealth</strong> — Мобилно приложение за здраве'
    },
    {
      keywords: ['опит', 'години', 'колко време', 'experience'],
      response: 'ProjectA има <strong>над 8 години опит</strong> в дигиталната индустрия, <strong>150+ завършени проекта</strong> и <strong>50+ доволни клиенти</strong>.'
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
      response: 'Сроковете зависят от проекта. Стандартно:<br><br>' +
        '• Лендинг страница — <strong>1-2 седмици</strong><br>' +
        '• Корпоративен сайт — <strong>3-6 седмици</strong><br>' +
        '• Уеб приложение — <strong>2-4 месеца</strong><br>' +
        '• Брандинг — <strong>2-4 седмици</strong><br><br>' +
        'Свържете се с нас за точна оценка на вашия проект.'
    },
    {
      keywords: ['технолог', 'stack', 'с какво работите', 'инструмент'],
      response: 'Работим с модерни технологии:<br><br>' +
        '<strong>Frontend:</strong> React, Next.js, HTML/CSS, JavaScript<br>' +
        '<strong>Backend:</strong> Node.js, Express<br>' +
        '<strong>Дизайн:</strong> Figma, Adobe Suite<br>' +
        '<strong>Маркетинг:</strong> Google Analytics, Google Ads, Meta Ads'
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
    return 'Благодаря за въпроса! За по-подробен отговор, моля свържете се с нас на <strong>hello@projecta.bg</strong> или попълнете <a href="#contact" style="color:#818cf8;text-decoration:underline;">контактната форма</a>. Ще ви отговорим в рамките на 24 часа.';
  }
})();
