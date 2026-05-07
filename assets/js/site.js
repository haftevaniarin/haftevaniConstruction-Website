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
    if(nextInput && /^https?:$/.test(window.location.protocol)){
      const successUrl = new URL(window.location.href);
      successUrl.searchParams.set('sent', '1');
      nextInput.value = successUrl.toString();
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

  const rotatingHeroes = document.querySelectorAll('.hero[data-hero-images]');
  rotatingHeroes.forEach(function(hero){
    const rawImages = hero.getAttribute('data-hero-images') || '';
    const images = rawImages.split(',').map(function(path){ return path.trim(); }).filter(Boolean);
    if(images.length < 2){ return; }

    const intervalMs = Number(hero.getAttribute('data-hero-interval')) || 3000;
    let currentIndex = 0;
    hero.classList.add('has-slider');

    const slides = document.createElement('div');
    slides.className = 'hero-slides';
    slides.setAttribute('aria-hidden', 'true');

    images.forEach(function(src){
      const slide = document.createElement('div');
      slide.className = 'hero-slide';
      slide.style.backgroundImage = "url('" + src + "')";
      slides.appendChild(slide);
    });

    const firstClone = document.createElement('div');
    firstClone.className = 'hero-slide';
    firstClone.style.backgroundImage = "url('" + images[0] + "')";
    slides.appendChild(firstClone);

    hero.insertBefore(slides, hero.firstChild);

    images.forEach(function(src){
      const preload = new Image();
      preload.src = src;
    });

    const setSlidePosition = function(index, animate){
      slides.style.transition = animate ? 'transform 750ms ease' : 'none';
      slides.style.transform = 'translateX(-' + (index * 100) + '%)';
    };

    setSlidePosition(0, false);

    slides.addEventListener('transitionend', function(){
      if(currentIndex === images.length){
        currentIndex = 0;
        setSlidePosition(currentIndex, false);
      }
    });

    setInterval(function(){
      currentIndex += 1;
      setSlidePosition(currentIndex, true);
    }, intervalMs);
  });

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

  const projectImages = document.querySelectorAll('.project img');
  if(projectImages.length){
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('aria-hidden', 'true');

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'lightbox-close';
    closeButton.setAttribute('aria-label', 'Close image');
    closeButton.textContent = '×';

    const lightboxImage = document.createElement('img');
    lightboxImage.alt = '';
    lightboxImage.loading = 'eager';
    lightboxImage.decoding = 'sync';

    lightbox.appendChild(closeButton);
    lightbox.appendChild(lightboxImage);
    document.body.appendChild(lightbox);

    const closeLightbox = function(){
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxImage.removeAttribute('src');
    };

    const openLightbox = function(img){
      const fullSrc = img.getAttribute('src');
      if(!fullSrc){ return; }
      lightboxImage.src = fullSrc;
      lightboxImage.alt = img.alt || 'Project image';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){
      if(e.target === lightbox){
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && lightbox.classList.contains('is-open')){
        closeLightbox();
      }
    });

    projectImages.forEach(function(img){
      img.addEventListener('click', function(){
        openLightbox(img);
      });
    });
  }
})
