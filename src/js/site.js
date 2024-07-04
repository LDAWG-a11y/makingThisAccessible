const skipLink = document.querySelector('#skip');
const navBtn = document.getElementById('navBtn');
const pageName = document.documentElement.getAttribute('data-page');
const modalBtn = document.getElementById('modalTrigger');
const modal = document.getElementById('modal');
let modalInner = modal.firstElementChild;
const modalCloseBtns = document.querySelectorAll('.modal__close-btn');
const accordions = document.querySelectorAll('.accordion__btn');
let test = document.documentElement.hasAttribute('data-test');

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


const yuck = () => {
  if (test) {

    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'h') {
        modalBtn.click();
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
      modalBtn.innerText = 'Just holla us!';
    }

    if (pageName === 'about') {
      modal.replaceWith(modalInner);
      modalInner.setAttribute('role', 'dialog');
      modalInner.setAttribute('aria-labelledby', 'mHead');
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
            const poorDialog = `<dialog class="poor__dialog" open><h1>OOPS</h1>
            <p>Sorry, you are not wealthy enough to use our service, Come back when you are not so broke</p>
            <span class="success__timer"></span>
            </dialog>;`
            document.documentElement.setAttribute('data-confirm-open', 'true');
            document.body.insertAdjacentHTML('beforeend', poorDialog);
            setTimeout(() => {
              document.querySelector('.success__timer').classList.add('closing');
            }, 100);

            setTimeout(() => {
              document.querySelector('.poor__dialog').remove();
              document.documentElement.removeAttribute('data-confirm-open');
            }, 2100);
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

yuck();

navBtn.addEventListener('click', () => {
  navBtn.getAttribute('aria-expanded') === 'false' ? navBtn.setAttribute('aria-expanded', 'true') : navBtn.setAttribute('aria-expanded', 'false');
})

modalBtn.addEventListener('click', () => {
  if (!document.documentElement.hasAttribute('data-modal-open')) {
    document.documentElement.setAttribute('data-modal-open', '');
    
    if (test && pageName !== 'about') {
      modal.showModal();
    } else {
      modalInner.classList.add('modal--show');
      document.getElementById('closeTop').focus();
    }
  }
})

modalCloseBtns.forEach((btn, idx) => {
  btn.addEventListener('click', (evt) => {
    document.documentElement.removeAttribute('data-modal-open');
    if (test && pageName === 'about') {
      evt.preventDefault();
    } else {
      modal.close();
    }
  })

  if (idx === 1 && pageName === 'about' && test) {
    modalCloseBtns[1].addEventListener('mousedown', () => {
      abtCls();
    })
    
    modalCloseBtns[1].addEventListener('keydown', () => {
      abtCls();
    })
  }
})

const abtCls = () => {
  modalInner.classList.remove('modal--show');
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
    const success = `<dialog open class="success__dialog">
    <h1>We gotchu, hold tight, we'll be in touch!</h1>
    <p>I confirm by sending this message I will be billed a compulsory consultation fee of $2000, for receiving a follow up call</p>
    <p>It is my responsibility to answer the call, any missed calls will be billed at $1000 per time</p>
    <input id="cBoxSuccess" type="checkbox" checked>
    <label for="cBoxSuccess">I agree to be billed at the supplied rate</label>
    <span class="success__timer"></span>
    </dialog>`;
    document.documentElement.setAttribute('data-confirm-open', 'true');

    document.body.insertAdjacentHTML('beforeend', success);
    document.getElementById('cBoxSuccess').addEventListener('click', (evt) => {
      evt.preventDefault();
    });
    setTimeout(() => {
      document.querySelector('.success__timer').classList.add('closing');
    }, 100);
    

    setTimeout(() => {
      document.querySelector('.success__dialog').remove();
      document.documentElement.removeAttribute('data-confirm-open');
    }, 1100);
  }
}

function showReview(reviewNumber) {
 reviews.forEach((review, i) => {
  i === reviewNumber ? review.setAttribute('aria-hidden', 'false') : review.setAttribute('aria-hidden', 'true');
})

 index++

 if (index >= reviews.length) {
  index = 0;
 }
}

setInterval (() => showReview(index), transitionDelay);