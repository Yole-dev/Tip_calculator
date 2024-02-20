`use strict`;

const bill = document.querySelector('.bill');
const percentage = document.querySelector('.percentage');
const percent = document.querySelectorAll('.perc');
const customPercentage = document.querySelector('.custom_perc');
const numberOfPeople = document.querySelector('.people');
const tipPerPerson = document.querySelector('.tip_per_person');
const totalTip = document.querySelector('.total_tip');
const resetBtn = document.querySelector('.reset_btn');
const error = document.querySelector('.error_message');


let tip;

const tipCalc = function() {
    const calcTip = tip/numberOfPeople.value;

    tipPerPerson.innerHTML = `$${calcTip.toFixed(2)}`;
    totalTip.innerHTML = `$${((bill.value/numberOfPeople.value) + calcTip).toFixed(2)}`;

    resetBtn.style.opacity = 1;
};

percentage.addEventListener('click', function(e){
    const clicked = e.target.classList.contains('perc'); 

    if(!clicked) return;
    //active class        
     const active = e.target.classList.add('perc_active');

    if(clicked) {

        if(e.target.innerHTML.length === 2) {
            tip = +(bill.value * e.target.innerHTML.slice(0, 1).padStart(4, '0.0')).toFixed(2);
            active;
        } else if(e.target.innerHTML.length > 2) {
            tip = +(bill.value * e.target.innerHTML.slice(0, 2).padStart(4, '0.')).toFixed(2);
            active;
        };     
    };

    if(numberOfPeople.value === '0' || numberOfPeople.value === '') {
            numberOfPeople.style.border = `solid 1px red`;
            error.style.opacity = 1;
    }else if(numberOfPeople.value > '0') {
        tipCalc();
    };

});




customPercentage.addEventListener('input', function(e) {
    const input = e.target;
    const customValue = input.value;
    console.log(customValue);

    if(input) {
        if(customValue.length === 1) {
            tip = +((bill.value * customValue.padStart(4, '0.0')).toFixed(2));
        } else if (customValue.length > 1) {
            tip = +((bill.value * customValue.padStart(4, '0.')).toFixed(2));
        }
    }

    percent.forEach (perc => {
        if(perc.classList.contains('perc_active'))  perc.classList.remove('perc_active');
    });

    if(customValue === '') return;

    if(numberOfPeople.value === '0' || numberOfPeople.value === '') {
        numberOfPeople.style.border = `solid 1px red`;
        error.style.opacity = 1;
    }else if(numberOfPeople.value > '0') {
        tipCalc();
    }
});

numberOfPeople.addEventListener('input', function(){
    if(numberOfPeople.value > '0') {
        numberOfPeople.style.border = `none`;
        error.style.opacity = 0;
        tipCalc();
    }
});


resetBtn.addEventListener('click', function(e) {
    e.preventDefault;
    
    bill.value = '';

    percent.forEach (perc => {
        if(perc.classList.contains('perc_active'))  perc.classList.remove('perc_active');
    });

    customPercentage.value = '';

    numberOfPeople.value = '';

    tipPerPerson.innerHTML = `$0.00`;
    totalTip.innerHTML = `$0.00`;
    resetBtn.style.opacity = 0.3;
})