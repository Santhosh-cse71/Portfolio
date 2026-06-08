// Accessible form handling and small enhancements
document.addEventListener('DOMContentLoaded', function(){
  // Theme toggle: respects saved preference, system preference, and persists choice
  const root = document.documentElement;
  const saved = localStorage.getItem('site-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(theme){
    // default is dark (no attribute). Light theme is enabled by setting data-theme="light" on html.
    if(theme === 'light'){
      root.setAttribute('data-theme','light');
    } else {
      root.removeAttribute('data-theme');
    }
  }
  // initialize: if user saved 'light', enable it; otherwise keep default dark (or respect system preference only if saved explicitly)
  if(saved === 'light') applyTheme('light');

  const toggles = document.querySelectorAll('.theme-toggle');
  function updateToggleUI(){
    const isLight = root.getAttribute('data-theme') === 'light';
    toggles.forEach(b => {
      b.setAttribute('aria-pressed', String(isLight));
      b.textContent = isLight ? 'Switch to dark' : 'Switch to light';
    });
  }

  toggles.forEach(btn => {
    btn.addEventListener('click', function(){
      const isLight = root.getAttribute('data-theme') === 'light';
      applyTheme(isLight ? 'dark' : 'light');
      localStorage.setItem('site-theme', isLight ? 'dark' : 'light');
      updateToggleUI();
    });
  });

  // set initial aria-pressed and label
  updateToggleUI();

  // Accessible contact form handling
  const form = document.querySelector('form[data-contact-form]');
  if(!form) return;

  const live = document.getElementById('form-status');

  form.addEventListener('submit', function(e){
    e.preventDefault();
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      const subject = form.querySelector('[name="subject"]');
      const message = form.querySelector('[name="message"]');
    let errors = [];
    if(!name.value.trim()) errors.push('Please enter your name.');
      if(!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) errors.push('Please enter a valid email address.');
      if(!subject || !subject.value.trim()) errors.push('Please enter a subject.');
      if(!message.value.trim()) errors.push('Please enter a message.');

    if(errors.length){
      live.textContent = errors.join(' ');
      live.setAttribute('aria-live','assertive');
      return;
    }

    // Simulate success
    live.textContent = 'Message sent — thank you!';
    live.setAttribute('aria-live','polite');
    form.reset();
  });
});
