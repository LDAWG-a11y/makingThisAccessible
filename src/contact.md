---
layout: base.njk
title: Contact us
pageName: contact
test: true
---

<div class="main__container">
  <h2>Touch base with us</h2>
  <p>If you have a project that is worthy of our time and skillset, fill in our Contact Form, below and let us know about your future product. Once we have reviewed your request, we'll decide if you need a couple of 10x engineers, like us, or you'd be better off with a conventional developer. You have to understand, that we are in demand, we can only build products for clients when we have complete autonomy over the project lifecycle, the project is big enough for us to make serious bank on, or our involvement finishes off an undesirable to us company. rememeber, we're the best, we know what is best and we need to be trusted to work for you.</p>
</div>
<div class="secondary__container" id="form">
  <div class="form__inputs-wrapper">
    <span class="form__label" id="fNameLbl">First name</span>
    <input class="form__input--text input" id="fName" type="text" autocomplete="given-name" aria-labelledby="fNameLbl" required>
  </div>
  <div class="form__inputs-wrapper">
    <label class="form__label">Last name</label>
    <input class="form__input--text input" id="lName" type="text"  autocomplete="family-name" required>
  </div>
  <div class="form__inputs-wrapper">
    <label class="form__label">Phone</label>
    <input class="form__input--text input" type="text" id="phone" autocomplete="tel" required>
  </div>
  <div class="form__inputs-wrapper">
    <label class="form__label">Email</label>
    <input class="form__input--text input" type="email" id="email" autocomplete="email" required>
  </div>
  <div class="form__inputs-wrapper">
    <label class="form__label">Your net worth ($)</label>
    <input class="form__input--text input" id="worth" type="text" required>
  </div>
  <div class="form__inputs-wrapper">
    <label class="form__label">Your business' name</label>
    <input class="form__input--text input" type="text" id="org" autocomplete="organization" required>
  </div>
  <div class="form__inputs-wrapper">
    <label class="form__label">Country of residence</label>
    <input class="form__input--text input" type="text" id="country" autocomplete="country" required>
  </div>
  <div class="form__inputs-wrapper">
  <label class="form__label">Tell us about the project</label>
    <textarea class="form__input--textarea input" id="query" required></textarea>
  </div>
  <div class="form__inputs-wrapper form__accept-container">
    <span class="form__checkbox" id="cBox" role="checkbox" aria-labelledby="cbLbl" aria-checked="false" aria-required="true" tabindex="0"></span>
    <span id="cbLbl" class="form__checkbox-label">I agree to anything and everything</span>
  </div>
  <div class="form__inputs-wrapper">
    <button type="submit" class="form__btn" id="formBtn">Submit</submit>
  </div>
</div>