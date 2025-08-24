(function() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('[data-toggle="nav"]');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const message = formData.get('message') || '';

      const subject = encodeURIComponent('Заявка с сайта — Бухгалтерия Армения');
      const body = encodeURIComponent([
        `Имя: ${name}`,
        `Email: ${email}`,
        `Телефон: ${phone}`,
        '',
        'Сообщение:',
        `${message}`
      ].join('\n'));

      const to = (form.getAttribute('data-mailto') || 'info@armaccounting.am').trim();
      const cc = (form.getAttribute('data-cc') || 'support@armaccounting.am').trim();
      const mailtoHref = `mailto:${to}?subject=${subject}&cc=${encodeURIComponent(cc)}&body=${body}`;

      // Open email client
      window.location.href = mailtoHref;

      // Optional WhatsApp fallback
      const wapp = document.querySelector('[data-whatsapp]');
      if (wapp) {
        const phone = wapp.getAttribute('data-whatsapp');
        const wmsg = encodeURIComponent(`Здравствуйте! Меня зовут ${name}. ${message}`);
        // Uncomment next line if you want to also open WhatsApp
        // window.open(`https://wa.me/${phone}?text=${wmsg}`, '_blank');
      }

      // UX feedback
      const note = document.getElementById('form-note');
      if (note) {
        note.textContent = 'Спасибо! Открылось окно отправки письма. Мы ответим в ближайшее время.';
      }

      form.reset();
    });
  }
})();