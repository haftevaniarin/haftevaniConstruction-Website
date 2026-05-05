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

  const contactForms = document.querySelectorAll('form.contact-form');
  contactForms.forEach(function(contactForm){
    const nextInput = contactForm.querySelector('input[name=_next]');
    if(nextInput){
      nextInput.value = window.location.origin + '/contact.html?sent=1';
    }

    contactForm.addEventListener('submit',function(e){
      const name = contactForm.querySelector('[name=name]').value.trim();
      const email = contactForm.querySelector('[name=email]').value.trim();
      const message = contactForm.querySelector('[name=message]').value.trim();
      if(!name || !email || !message){
        e.preventDefault();
        alert('Please complete name, email and message before sending.');
      }
    });
  });

  const params = new URLSearchParams(window.location.search);
  if(params.get('sent') === '1'){
    const successMessage = document.getElementById('form-success-message');
    if(successMessage){
      successMessage.style.display = 'block';
    }
  }

  const galleryArrows = document.querySelectorAll('.gallery-arrow[data-gallery-target]');
  galleryArrows.forEach(function(arrow){
    arrow.addEventListener('click',function(){
      const galleryId = arrow.getAttribute('data-gallery-target');
      const direction = arrow.getAttribute('data-direction') === 'left' ? -1 : 1;
      const gallery = document.getElementById(galleryId);
      if(!gallery){ return; }

      const firstProject = gallery.querySelector('.project');
      const step = firstProject ? firstProject.getBoundingClientRect().width + 12 : gallery.clientWidth * 0.8;
      gallery.scrollBy({ left: step * direction, behavior: 'smooth' });
    });
  });
})
