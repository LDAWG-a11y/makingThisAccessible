const skipLink = document.getElementById('skip');
const navBtn = document.getElementById('navBtn');
const pageName = document.documentElement.getAttribute('data-page');
const helpModalBtn = document.getElementById('modalTrigger');
const helpModal = document.getElementById('modal');
const successModal = document.querySelector('.success__dialog');
const poorModal = document.querySelector('.poor__dialog');
let helpModalInner = helpModal.firstElementChild;
const helpModalCloseBtns = document.querySelectorAll('.modal__close-btn');
const accordions = document.querySelectorAll('.accordion__btn');
let test = document.documentElement.hasAttribute('data-test');
let review = document.documentElement.hasAttribute('data-review');

const fName = document.getElementById('fName');
const lName = document.getElementById('lName');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const worth = document.getElementById('worth');
const org = document.getElementById('org');
const country = document.getElementById('country');
const query = document.getElementById('query');
const inputs = document.querySelectorAll('.input');
const cBox = document.getElementById('cBox');
const formBtn = document.getElementById('formBtn');

let index = 0;
let transitionDelay = 2000;
const reviewParent = document.querySelector('.review__wrapper');
const reviews = document.querySelectorAll('.review__item');
showReview(index)
let reviewPos = 1;

const breakIt = () => {
  if (test) {
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'h') {
        helpModalBtn.click();
      }
    })

    navBtn.querySelector('#triggerLabel').textContent = 'Site navigation';
    if (pageName === 'home') {
      document.querySelector('.intro__img').removeAttribute('alt');
      const s2 = document.querySelector('#s2');
      const s2R = document.createElement('p');
      s2R.classList.add('h2');
      s2R.textContent = s2.textContent;
      s2.replaceWith(s2R);

      const techList = document.querySelector('.tech__list');
      let items = '';
      techList.querySelectorAll('li').forEach(el => {
        let text = el.innerText;
        items += `<p>${text}</p>`
      });
      techList.insertAdjacentHTML('beforebegin', `<div class="tech__list">${items}</div>`);
      techList.remove();
    }

    if (pageName === 'services') {
      document.documentElement.setAttribute('lang', 'es');
      helpModalBtn.innerText = 'Just holla us!';
    }

    if (pageName === 'about') {
      modal.replaceWith(helpModalInner);
      helpModalInner.setAttribute('role', 'dialog');
      helpModalInner.setAttribute('aria-labelledby', 'mHead');
      document.getElementById('bradProfile').querySelector('img').alt = 'Chad';
      document.getElementById('chadProfile').querySelector('img').alt = 'Brad';
    }

    if (pageName === 'contact') {
      document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0 maximum-scale=1.9');
      skipLink.setAttribute('href', 'd1');
      document.getElementById('form').querySelectorAll('input').forEach(input => {
        input.removeAttribute('autocomplete');
      })

      cBox.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('aria-checked') == 'false') {
          evt.target.setAttribute('aria-checked', 'true');
        } else {
          evt.target.setAttribute('aria-checked', 'false');
        }
      });

      fName.addEventListener('focus', () => {
        if (worth.value.length) {
          let worthVal = Number(worth.value.replace(/\D/g,''));
          if (worthVal < 2000000) {
            inputs.forEach(input => {
              input.setAttribute('disabled', '')
            })
            cBox.setAttribute('aria-disabled', 'true');
            formBtn.setAttribute('disabled', '');
            document.documentElement.setAttribute('data-form-modal-open', 'true');
            poorModal.setAttribute('open', '');
            setTimeout(() => {
              poorModal.querySelector('.success__timer').classList.add('closing');
            }, 100);

            setTimeout(() => {
              poorModal.removeAttribute('open');
              poorModal.querySelector('.success__timer').classList.add('closing');
              document.documentElement.removeAttribute('data-form-modal-open');
            }, 1600);
          }
        }
      })

      formBtn.addEventListener('click', () => {
        badValidation();
      });
    }

    if (pageName === 'testimonials') {
      document.querySelector('a[href="/accessibility/"]').addEventListener('keydown', (evt) => {
        if (evt.key === 'Tab' || (evt.shiftKey && evt.key === 'Tab')) {
          evt.preventDefault(); 
        }
      })

      window.addEventListener('load', (evt) => {
        document.body.setAttribute('data-loaded', '');
      })
    }
  }
}

breakIt();

navBtn.addEventListener('click', () => {
  navBtn.getAttribute('aria-expanded') === 'false' ? navBtn.setAttribute('aria-expanded', 'true') : navBtn.setAttribute('aria-expanded', 'false');
})

helpModalBtn.addEventListener('click', () => {
  if (!document.documentElement.hasAttribute('data-modal-open')) {
    document.documentElement.setAttribute('data-modal-open', '');
    
    if (test && pageName !== 'about') {
      modal.showModal();
    } else {
      helpModalInner.classList.add('modal--show');
      document.getElementById('closeTop').focus();
    }
  }
})

helpModalCloseBtns.forEach((btn, idx) => {
  btn.addEventListener('click', (evt) => {
    document.documentElement.removeAttribute('data-modal-open');
    if (test && pageName === 'about') {
      evt.preventDefault();
    } else {
      modal.close();
    }
  })

  if (idx === 1 && pageName === 'about' && test) {
    helpModalCloseBtns[1].addEventListener('mousedown', () => {
      abtCls();
    })
    
    helpModalCloseBtns[1].addEventListener('keydown', () => {
      abtCls();
    })
  }
})

const abtCls = () => {
  helpModalInner.classList.remove('modal--show');
  document.body.focus();
  document.documentElement.removeAttribute('data-modal-open');
}

accordions.forEach(acc => {
  acc.addEventListener('click', () => {
    if (acc.getAttribute('aria-expanded') === 'true') {
      acc.setAttribute('aria-expanded', 'false');
      acc.parentElement.setAttribute('data-expanded', 'false');
    } else {
      acc.setAttribute('aria-expanded', 'true');
      acc.parentElement.setAttribute('data-expanded', 'true');
    }
  })
})

const badValidation = () => {
  inputs.forEach(input => {
    if (!input.value.length) {
      input.setAttribute('data-err', 'true');
    } else {
      input.removeAttribute('data-err');
    }
  })

  if (cBox.getAttribute('aria-checked') == 'false') {
    cBox.setAttribute('data-err', 'true');
  } else {
    cBox.removeAttribute('data-err');
  }

  if (document.querySelectorAll('[data-err').length < 1) {
    document.documentElement.setAttribute('data-form-modal-open', 'true');
    successModal.setAttribute('open', '');
    document.getElementById('cBoxSuccess').addEventListener('click', (evt) => {
      evt.preventDefault();
    });
    setTimeout(() => {
      successModal.querySelector('.success__timer').classList.add('closing');
    }, 100);
    

    setTimeout(() => {
      document.querySelector('.success__dialog').remove();
      document.documentElement.removeAttribute('data-form-modal-open');
      successModal.querySelector('.success__timer').classList.remove('closing');
    }, 1600);
  }
}

function showReview(reviewNumber) {
 reviews.forEach((review, idx) => {
  idx === reviewNumber ? review.setAttribute('aria-hidden', 'false') : review.setAttribute('aria-hidden', 'true');
})

 index++

 if (index >= reviews.length) {
  index = 0;
 }
}

setInterval (() => showReview(index), transitionDelay);

const fixIt = () => {
  if (review) {

  }
}