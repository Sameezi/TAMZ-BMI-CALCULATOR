//Variables
const height_range = document.getElementById('range-height');
const weight_range = document.getElementById('range-weight');
const name_field = document.getElementById('input-name');
const age_field = document.getElementById('input-age');
const gender_field = document.getElementById('radio-1-selection');
const alert = document.querySelector('ion-alert');
alert.buttons = ['OK'];
const modal = document.querySelector('ion-modal');

//Listners
weight_range.addEventListener('ionChange', ({ detail }) => {
  document.getElementById('Text-weight').textContent = 'weight: ' + detail.value + ' kg';
});

height_range.addEventListener('ionChange', ({ detail }) => {
  document.getElementById('Text-height').textContent = 'height: ' + detail.value + ' cm';
});

alert.addEventListener('ionAlertDidDismiss', () => {
  alert.isOpen = false;
});

modal.addEventListener('ionModalDidDismiss', () => {
  modal.isOpen = false;
});

//functions
function openModal() {
  if (name_field.value == '') {
    alert.message = 'field name is empty!';
    alert.isOpen = true;
    console.log('no name');
    return;
  }
  if (age_field.value == '') {
    alert.message = 'field age is empty!';
    alert.isOpen = true;
    console.log('no age');
    return;
  }
  if (gender_field.value == 'truncated') {
    alert.message = 'gender is not selected!';
    alert.isOpen = true;
    console.log('no gender');
    return;
  }
  if (height_range.value === 0) {
    alert.message = 'height is not selected!';
    alert.isOpen = true;
    console.log('no height');
    return;
  }
  if (weight_range.value === 0) {
    alert.message = 'weight is not selected!';
    alert.isOpen = true;
    console.log('no weight');
    return;
  }

  modal.innerHTML = ` 
        <ion-content>
              <ion-header>
                <ion-toolbar id='modal-toolbar'>
                  <ion-title id="Text-evaluation" >Here goes evaluation string</ion-title>
                </ion-toolbar>
              </ion-header>
              <ion-list style='background: #6ba200'>
                <ion-item class='info-list'>
                  <ion-label id='info-name'>NAME: </ion-label>
                </ion-item>
                <ion-item class='info-list'>
                  <ion-label id='info-age'>AGE: </ion-label>
                </ion-item>
                <ion-item class='info-list'>
                  <ion-label id='info-gender'>GENDER: </ion-label>
                </ion-item>
                <ion-item class='info-list'>
                  <ion-label id='info-height'>HEIGHT: </ion-label>
                </ion-item>
                <ion-item class='info-list'>
                  <ion-label id='info-weight'>WEIGHT: </ion-label>
                </ion-item>
              </ion-list>
            </ion-content>
              `;

  modal.isOpen = true;
  calculateBMI();
}

function calculateBMI() {
  let bmi = weight_range.value / (height_range.value / 100) ** 2;

  console.log('bmi: ' + bmi);
  document.getElementById('info-name').textContent = name_field.value;
  document.getElementById('info-age').textContent = age_field.value;
  document.getElementById('info-gender').textContent = gender_field.value;
  document.getElementById('info-height').textContent = height_range.value + ' cm';
  document.getElementById('info-weight').textContent = weight_range.value + ' kg';
  document.getElementById('Text-evaluation').textContent = 'You are ';
  addItem(bmi);

  if (bmi < 18.5) {
    document.getElementById('Text-evaluation').textContent += 'underweight!';
    document.getElementById('modal-toolbar').style =
      '--background: radial-gradient(circle,rgb(209, 132, 96) 23%, rgba(84, 219, 50, 1) 100%);';
    return;
  }
  if (bmi < 24.9) {
    document.getElementById('Text-evaluation').textContent += 'healthy';
    return;
  }
  if (bmi < 29.9) {
    document.getElementById('Text-evaluation').textContent += 'overweight';
    document.getElementById('modal-toolbar').style =
      '--background: radial-gradient(circle,rgb(209, 209, 96) 23%, rgba(84, 219, 50, 1) 100%);';

    return;
  }
  if (bmi > 30) {
    document.getElementById('Text-evaluation').textContent += 'obese!';
    document.getElementById('modal-toolbar').style =
      '--background: radial-gradient(circle,rgb(209, 132, 96) 23%, rgba(84, 219, 50, 1) 100%);';
    return;
  }
}

function addItem(result) {
  let data = {
    name: name_field.value,
    age: age_field.value,
    gender: gender_field.value,
    height: height_range.value,
    weight: weight_range.value,
    bmi: result,
  };

  let offset = localStorage.length;
  while (localStorage['record-' + offset] != undefined) {
    offset += 1;
  }
  let key = 'record-' + offset;

  localStorage.setItem(key, JSON.stringify(data));
}
