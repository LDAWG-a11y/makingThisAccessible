const toggleSwitch = document.querySelector('.toggle__btn');
const helpModalBtn = document.getElementById('modalTrigger');
const skipLink = document.getElementById('skip');
const navBtn = document.getElementById('navBtn');
const navBtnText = navBtn.querySelector('#triggerLabel');
const pageName = document.documentElement.dataset.page;
const helpModal = document.getElementById('modal');
const helpModalHeading = document.getElementById('mHead');
const successModal = document.querySelector('.success__dialog');
const poorModal = document.querySelector('.poor__dialog');
let helpModalInner = helpModal.firstElementChild;
const helpModalCloseBtns = document.querySelectorAll('.modal__close-btn');
const accordions = document.querySelectorAll('.accordion__btn');
const a11yLink = document.querySelector('.footer__link');
const excelFauxHeading = document.querySelector('#s2');
const techList = document.querySelector('.tech__list');
const offerImg = document.querySelector('.offer__code');
const modalCloseTopLabel = document.querySelector('#closeTop .visually-hidden');
const modalCloseBtm = document.querySelector('#closeBtm');
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
const cBoxWrapper = document.querySelector('.form__accept-container');
const cBoxLbl = cBoxWrapper?.querySelector('.form__checkbox-label');
const formBtn = document.getElementById('formBtn');
const form = document.getElementById('form');
let siteFixed = false;

let index = 0;
let transitionDelay = 1500;
const reviewParent = document.querySelector('.review__wrapper');
const reviews = document.querySelectorAll('.review__item');
showReview(index)
let reviewPos = 1;

let obscureModalHTML = `<dialog class="obscure-modal" aria-labelledby="OMHeading">
  <header class="obscure-modal__header">
    <h1 class="obscure-modal__heading" id="OMHeading">The accessibility issues are currently resolved</h1>
  </header>
  <div class="obscure-modal__content">
    <fieldset class="obscure-modal__group">
      <legend class="obscure-modal__legend">Are you sure you want to continue?</legend>
        <div class="obscure-modal-inputs-wrapper">
        <label class="obscure-modal__label" for="OMBroken">
          <input type="radio" name="reviewStatus" id="OMBroken" class="obscure-modal__broken-opt">
          No, I haven't tested this page, yet (show me the broken page).
        </label>
        <label class="obscure-modal__label" for="OMFixed">
          <input type="radio" name="reviewStatus" id="OMFixed" class="obscure-modal__fixed-opt" checked>
          Yes, I have tested this page (show me the fixed page). 
        </label>
      </div>
    </fieldset>
  </div>
  <footer class="obscure-modal__footer">
    <button class="obscure-modal__confirm-btn">Confirm choice</button>
  </footer>`;

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'h' && !siteFixed) {
    helpModalBtn.click();
  }
})

a11yLink.addEventListener('keydown', (evt) => {
  if (pageName === 'testimonials' && !siteFixed && (evt.key === 'Tab' || (evt.shiftKey && evt.key === 'Tab'))) {
    evt.preventDefault(); 
  }
});

if (pageName === 'testimonials') {
  skipLink.addEventListener('keydown', (evt) => {
    if (evt.key ==='Shift') {
      if (reviewParent.getAttribute('aria-live') === 'assertive') {
          reviewParent.setAttribute('aria-live', 'off');
      } else {
        reviewParent.setAttribute('aria-live', 'assertive');
      }
    }
  })
}


toggleSwitch.addEventListener('click', () => {
  if (toggleSwitch.getAttribute('aria-pressed') === 'false') {
    toggleSwitch.setAttribute('aria-pressed', 'true');
    fixSite();
  } else {
    toggleSwitch.setAttribute('aria-pressed', 'false');
    breakSite()
  }
})

accordions.forEach(acc => {
  acc.addEventListener('click', () => {
    if (acc.getAttribute('aria-expanded') === 'true') {
      acc.setAttribute('aria-expanded', 'false');
      acc.parentElement.dataset.expanded = 'false';
    } else {
      acc.setAttribute('aria-expanded', 'true');
      acc.parentElement.dataset.expanded = 'true';
    }
  })
})

const cBoxFunctionality = (box) => {
  if (!siteFixed) {
    if (box.getAttribute('aria-checked') == 'false') {
      box.setAttribute('aria-checked', 'true');
    } else {
      box.setAttribute('aria-checked', 'false');
    }
  }
}

if (document.documentElement.dataset.page === 'contact') {
  cBox.addEventListener('mouseup', () => {  
    if (cBox) cBoxFunctionality(cBox);
  });

  fName.addEventListener('focus', () => {
    if (worth.value.length && !siteFixed) {
      let worthVal = Number(worth.value.replaceAll(/\D/g,''));
      if (worthVal < 2000000) {
        inputs.forEach(input => {
          input.setAttribute('disabled', '')
          window.scrollTo(0, 0);
        })
        cBox.setAttribute('aria-disabled', 'true');
        formBtn.setAttribute('disabled', '');
        document.documentElement.dataset.formModalOpen = 'true';
        poorModal.setAttribute('open', '');
        setTimeout(() => {
          poorModal.querySelector('.success__timer').classList.add('closing');
        }, 100);

        setTimeout(() => {
          poorModal.removeAttribute('open');
          poorModal.querySelector('.success__timer').classList.add('closing');
          delete document.documentElement.dataset.formModalOpen;
        }, 1600);
      }
    }
  })
}


formBtn?.addEventListener('click', (evt) => {
  evt.preventDefault();
  validateForm();
  checkInputsValidity();
  let cBoxInput = cBoxWrapper.querySelector('#cBox');


  if (cBoxInput.getAttribute('aria-checked' || !cBoxInput.checked) === 'false') {
    cBoxInput.dataset.err = '';
    if (siteFixed && !document.getElementById('cBoxError')) {
      console.log( cBoxInput );
      cBoxInput.closest('.form__inputs-wrapper').insertAdjacentHTML('afterbegin', `<p id="cBoxError" class="err-msg">You must agree to all of the things</p>`);
    }
  } else {
    cBoxInput.removeAttribute('aria-invalid');
    cBoxInput.removeAttribute('aria-describedby');
    delete cBox.dataset.err;
    delete cBoxInput.dataset.err;
    if (document.getElementById('cBoxError')) {
      document.getElementById('cBoxError').remove();
    }
  }
})

const validateForm = () => {
  if (form.checkValidity() === true && (cBox.getAttribute('aria-checked') === 'true' || cBox.checked)) {
    formSubmit();
  }

  if (form.checkValidity() === true) {
    formSubmit();
  }
}

const checkInputsValidity = () => {
  inputs.forEach(input => {
    if (!input.validity.valid) {
      input.dataset.err = '';

      if (siteFixed) {
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', `${input.id}-error`);
          
        if (input.validity.valueMissing) {
          if (document.getElementById(`${input.id}-error`)) {
            document.getElementById(`${input.id}-error`).remove();
          }
          input.insertAdjacentHTML('beforebegin', `<p id="${input.id}-error" class="err-msg">This field is required</p>`);
        } else if (input.validity.typeMismatch) {
          if (document.getElementById(`${input.id}-error`)) {
            document.getElementById(`${input.id}-error`).remove();
          }
          input.insertAdjacentHTML('beforebegin', `<p id="${input.id}-error" class="err-msg">Please enter a valid ${input.type}</p>`);
        } else if (input.validity.patternMismatch) {
          if (document.getElementById(`${input.id}-error`)) {
            document.getElementById(`${input.id}-error`).remove();
          }
          input.insertAdjacentHTML('beforebegin', `<p id="${input.id}-error" class="err-msg">Please enter a valid phone number, example: +1 555-019-8742</p>`);
        }
      } else {
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
        delete input.dataset.err
        if (document.getElementById(`${input.id}-error`)) {
          document.getElementById(`${input.id}-error`).remove();
        }
      }
    }
  })
}

const formSubmit = () => {
  if (document.querySelectorAll('[data-err').length < 1) {
    successModal.showModal();
  }

  if (!siteFixed) {
    autoCloseSuccessModal();
    document.getElementById('cBoxSuccess').addEventListener('click', (evt) => {
      evt.preventDefault();
    });
  } else {
    document.getElementById('cBoxSuccess').checked = false;
  }
}

const autoCloseSuccessModal = () => {
  setTimeout(() => {
    successModal.querySelector('.success__timer').classList.add('closing');
    }, 100);
  setTimeout(() => {
    closeSuccessModal();
  }, 1600);
}

const closeSuccessModal = () => {
  delete document.documentElement.dataset.formModalOpen;
  successModal.querySelector('.success__timer').classList.remove('closing');
  successModal.close();
  form.reset()
}

function showReview(reviewNumber) {
  if (!siteFixed) {
    reviews.forEach((review, idx) => {
      idx === reviewNumber ? review.setAttribute('aria-hidden', 'false') : review.setAttribute('aria-hidden', 'true');
    })

  index++

    if (index >= reviews.length) {
      index = 0;
    }
  }
}
setInterval (() => showReview(index), transitionDelay);


const fixSite = () => {
  siteFixed = true;
// Sitewide
  localStorage.setItem("fixed", "true");
  document.documentElement.dataset.fixed = "";
  const mainLinks = document.querySelectorAll('.nav__list a');
  document.querySelector('.footer__useful div').insertAdjacentHTML('afterbegin', `<ul class="footer-nav__list"></ul>`);
  const footerNavList = document.querySelector('.footer-nav__list');
  helpModalBtn.setAttribute('accesskey', '9');
  navBtnText.classList.remove('visually-hidden');
  navBtnText.textContent = 'Menu';
  navBtn.insertAdjacentHTML('afterbegin',`<img src="/img/burger.png" alt="" class="nav__icon">`);
  modalCloseTopLabel.innerText = 'Close';

  mainLinks.forEach(el => {
    let listItem = `<li class="footer-nav__item"><a href="${el.getAttribute('href')}" class="footer-nav__link">${el.textContent}</a></li>`;
    footerNavList.insertAdjacentHTML('afterbegin', listItem);
  })

  document.querySelector('.footer__popup p span').textContent = 'Help button, below';
  document.querySelector('.footer__socials--facebook').alt = 'Facebook';
  footerNavList.insertAdjacentHTML('beforeend', `<li class="footer-nav__item"></li>`);

  footerNavList.lastElementChild.append(a11yLink);
  a11yLink.classList.add('footer-nav__link');
  a11yLink.classList.remove('footer__link');
  helpModalHeading.textContent = 'Our FAQs';
  
  if (document.documentElement.dataset.page === 'home') {
    document.querySelector('.intro__img').alt = '';
    const excelHeading =  document.createElement('h2');
    excelHeading.textContent = excelFauxHeading.textContent;
    excelHeading.id = 's2';
    excelFauxHeading.replaceWith(excelHeading);
    document.querySelector('.tech__container').insertAdjacentHTML('beforeend', `<ul class="tech__list"></ul>`);
    const techlistNew = document.querySelector('ul.tech__list');
    document.querySelectorAll('.tech__list p').forEach(el => {
      let listItem = `<li>${el.textContent}</li>`;
      techlistNew.insertAdjacentHTML('beforeend', listItem);
    });
    techList.remove();
  }


  if (document.documentElement.dataset.page === 'services') {
    document.documentElement.setAttribute('lang', 'en');
    helpModalBtn.innerText = 'Help';
    offerImg.insertAdjacentHTML('afterend', '<p class="offer__text">Use code: <span>betterThanTherest</span>');
    offerImg.remove();
  }

  if (document.documentElement.dataset.page === 'about') {
    document.querySelector('#bradProfile').querySelector('img').alt = 'Brad';
    document.querySelector('#chadProfile').querySelector('img').alt = 'Chad';
    
  }
  
  if (document.documentElement.dataset.page === 'testimonials') {
    document.title = 'Testimonials - Problematically';
    reviewParent.removeAttribute('aria-live');
    reviewParent.removeAttribute('aria-relevant');
    reviews.forEach((review) => {
      review.removeAttribute('aria-hidden');
    });
    document.querySelector('.review__star > path').setAttribute('stroke-width', '3px');
    document.querySelector('.review__star > path').setAttribute('stroke', 'black');
  }

  if (document.documentElement.dataset.page === 'contact') {
    skipLink.setAttribute('href', '#h1');
    fName.setAttribute('autocomplete', 'given-name');
    lName.setAttribute('autocomplete', 'family-name');
    phone.setAttribute('autocomplete', 'tel');
    email.setAttribute('autocomplete', 'email');
    org.setAttribute('autocomplete', 'organization');
    country.setAttribute('autocomplete', 'country-name');
    const formTitle = document.createElement('h3');
    formTitle.id = 'formTitle';
    formTitle.classList.add('form__title');
    formTitle.textContent = 'All fields are required';
    form.prepend(formTitle);
    fName.removeAttribute('aria-labelledby');
    cBoxWrapper.innerHTML = '';
    cBoxWrapper.insertAdjacentHTML('afterbegin',  `<label class="form__label form__label--checkbox" for="cBox">
  <input type="checkbox" name="terms" id="cBox" class="form__checkbox" aria-checked="false">
  I agree to anything and everything
</label>`);
  
    document.querySelectorAll('.form__label:not(.form__label--checkbox').forEach(label => {
      label.setAttribute('for', label.nextElementSibling.id);
    })

    successModal.insertAdjacentHTML('beforeend', '<div class="success__controls"><button class="success__agree">Close</button><button class="success__disagree">Disagree</button></div>');
    document.querySelector('.success__agree').addEventListener('click', () => {
      closeSuccessModal();
    })
    document.querySelector('.success__disagree').addEventListener('click', () => {
      closeSuccessModal();
    })
  }
}

const breakSite = () => {
  if (localStorage.getItem('fixed')) {
    siteFixed = false;
    localStorage.removeItem('fixed');
    delete document.documentElement.dataset.fixed;
    modalCloseTopLabel.innerText = '';

    document.querySelector('.footer-nav__list').remove();
    navBtnText.textContent = 'Site navigation';
    navBtnText.classList.add('visually-hidden');
    navBtn.querySelector('img').remove();
    document.querySelector('.footer__popup p span').textContent = 'orange button, below';
    document.querySelector('.footer__socials--facebook').alt = '.';
    document.querySelector('.footer__secondary').insertAdjacentElement('beforeend', a11yLink);
    
    if (document.documentElement.dataset.page === 'home') {
      document.querySelector('.intro__img').removeAttribute('alt');
      document.querySelector('#s2').replaceWith(excelFauxHeading);
      document.querySelector('ul.tech__list').remove();
      document.querySelector('.tech__container').insertAdjacentHTML('beforeend', techList.outerHTML);
    }

    if (document.documentElement.dataset.page === 'services') {
      document.documentElement.setAttribute('lang', 'es');
      helpModalBtn.innerText = 'Just holla us!';
      document.querySelector('.offer__text').replaceWith(offerImg);
    }

    if (document.documentElement.dataset.page === 'about') {
      document.querySelector('#bradProfile').querySelector('img').alt = 'Chad';
      document.querySelector('#chadProfile').querySelector('img').alt = 'Brad';
    }

    if (document.documentElement.dataset.page === 'testimonials') {
      document.title = 'Testing the range on the new CyberTruck | Brad’s personal site”';
      reviewParent.setAttribute('aria-live', 'assertive');
      reviewParent.setAttribute('aria-relevant', 'all');
      reviews.forEach((review) => {
        review.setAttribute('aria-hidden', 'true');

        document.querySelector('.review__star > path').removeAttribute('stroke-width');
    document.querySelector('.review__star > path').removeAttribute('stroke');
      })
    }

    if (document.documentElement.dataset.page === 'contact') {
    skipLink.setAttribute('href', '#d1');
    cBoxWrapper.innerHTML = '';
    cBoxWrapper.insertAdjacentElement('afterbegin', cBox);
    cBoxWrapper.insertAdjacentElement('beforeend', cBoxLbl);
    inputs.forEach(input => {
      input.removeAttribute('autocomplete');
      if (input.id === 'fName') {
        input.setAttribute('aria-labelledby', 'fNameLabel');
      }
      input.closest('.form__inputs-wrapper').querySelector('label').removeAttribute('for');
    })
    document.querySelector('.form__title').remove();
    document.querySelectorAll('.err-msg').forEach(el => el.remove());

    }
  }
}

helpModalBtn.addEventListener('click', () => {
  if (!document.documentElement.dataset.modalOpen) {
    if (pageName === 'about' && !siteFixed) {
      modal.show();
    } else {
      modal.showModal();
    }
    document.documentElement.dataset.modalOpen = '';
    helpModalInner.classList.add('modal--show');
    document.getElementById('closeTop').focus();
  }
})

helpModalCloseBtns.forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    if (pageName === 'about' && !siteFixed && evt.target === btn) {
      modalClose(true);
    } else {
      modalClose()
    }
  })
})

const modalClose = (isAbout) => {
  delete document.documentElement.dataset.modalOpen;
  helpModalInner.classList.remove('modal--show');
  modal.close();
  if (isAbout) {
    document.querySelector('.nav a').focus();
  }
}

modalCloseBtm.addEventListener('mousedown', () => {
  if (pageName === 'about' && !siteFixed) {
    modalClose();
  }
})

window.addEventListener('load', () => {
  if (localStorage.getItem('fixed')) {
  
    document.body.insertAdjacentHTML('beforeend', obscureModalHTML);
    const obscureModalEl = document.querySelector('.obscure-modal');
    obscureModalEl.showModal();
    const confirmBtn = obscureModalEl.querySelector('.obscure-modal__confirm-btn');
    
    confirmBtn.addEventListener('click', () => {
      const brokenOpt = document.getElementById('OMBroken');
      if (brokenOpt.checked) {
        localStorage.removeItem('fixed');
      } else {
        fixSite();
        toggleSwitch.setAttribute('aria-pressed', 'true');
      }
       obscureModalEl.close();
       obscureModalEl.remove();
       document.body.focus();
    })
  }
});








//      

//       formBtn.addEventListener('click', () => {
//         badValidation();
//       });
//     }










// let index = 0;
// let transitionDelay = 2000;
// const reviewParent = document.querySelector('.review__wrapper');
// const reviews = document.querySelectorAll('.review__item');
// showReview(index)
// let reviewPos = 1;

// const breakIt = () => {
//   if (test) {
//     window.addEventListener('keydown', (evt) => {
//       if (evt.key === 'h') {
//         helpModalBtn.click();
//       }
//     })

//     navBtn.querySelector('#triggerLabel').textContent = 'Site navigation';
//     if (pageName === 'home') {
//       document.querySelector('.intro__img').removeAttribute('alt');
//       const s2 = document.querySelector('#s2');
//       const s2R = document.createElement('p');
//       s2R.classList.add('h2');
//       s2R.textContent = s2.textContent;
//       s2.replaceWith(s2R);

//       const techList = document.querySelector('.tech__list');
//       let items = '';
//       techList.querySelectorAll('li').forEach(el => {
//         let text = el.innerText;
//         items += `<p>${text}</p>`
//       });
//       techList.insertAdjacentHTML('beforebegin', `<div class="tech__list">${items}</div>`);
//       techList.remove();
//     }

//     if (pageName === 'services') {
//       document.documentElement.setAttribute('lang', 'es');
//       helpModalBtn.innerText = 'Just holla us!';
//     }

//     if (pageName === 'about') {
//       modal.replaceWith(helpModalInner);
//       helpModalInner.setAttribute('role', 'dialog');
//       helpModalInner.setAttribute('aria-labelledby', 'mHead');
//       document.getElementById('bradProfile').querySelector('img').alt = 'Chad';
//       document.getElementById('chadProfile').querySelector('img').alt = 'Brad';
//     }

//     if (pageName === 'contact') {
//       document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width, initial-scale=1.0 maximum-scale=1.9');
//       skipLink.setAttribute('href', 'd1');
//       document.getElementById('form').querySelectorAll('input').forEach(input => {
//         input.removeAttribute('autocomplete');
//       })





//     if (pageName === 'testimonials') {
//       document.querySelector('a[href="/accessibility/"]').addEventListener('keydown', (evt) => {
//         if (evt.key === 'Tab' || (evt.shiftKey && evt.key === 'Tab')) {
//           evt.preventDefault(); 
//         }
//       })

//       window.addEventListener('load', (evt) => {
//         document.body.setAttribute('data-loaded', '');
//       })
//     }
//   }
// }

// breakIt();

navBtn.addEventListener('click', () => {
  navBtn.getAttribute('aria-expanded') === 'false' ? navBtn.setAttribute('aria-expanded', 'true') : navBtn.setAttribute('aria-expanded', 'false');
})



//   if (idx === 1 && pageName === 'about' && test) {
//     helpModalCloseBtns[1].addEventListener('mousedown', () => {
//       abtCls();
//     })
    
//     helpModalCloseBtns[1].addEventListener('keydown', () => {
//       abtCls();
//     })
//   }
// })

// const abtCls = () => {
//   helpModalInner.classList.remove('modal--show');
//   document.body.focus();
//   document.documentElement.removeAttribute('data-modal-open');
// }



// const badValidation = () => {
//   inputs.forEach(input => {
//     if (!input.value.length) {
//       input.setAttribute('data-err', 'true');
//     } else {
//       input.removeAttribute('data-err');
//     }
//   })

  // if (cBox.getAttribute('aria-checked') == 'false') {
  //   cBox.setAttribute('data-err', 'true');
  // } else {
  //   cBox.removeAttribute('data-err');
  // }

  





