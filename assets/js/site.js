document.addEventListener('DOMContentLoaded',function(){
  const btn = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-links');
  if(btn && nav){
    btn.addEventListener('click',()=>{
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.background = 'transparent';
      nav.style.padding = '12px 0';
    })
  }

  // Simple contact form placeholder validation
  const contactForm = document.querySelector('#contact-form');
  if(contactForm){
    contactForm.addEventListener('submit',function(e){
      const name = contactForm.querySelector('[name=name]').value.trim();
      const email = contactForm.querySelector('[name=email]').value.trim();
      const message = contactForm.querySelector('[name=message]').value.trim();
      if(!name || !email || !message){
        e.preventDefault();
        alert('Please complete name, email and message before sending.');
      }
    })
  }
})
