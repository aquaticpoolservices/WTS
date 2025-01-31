document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission from reloading the page

  // Get input values
  const volume = parseFloat(document.querySelector('#volume').value) || 0;
  const ph = parseFloat(document.getElementById('ph').value) || 0;
  const stabilizer = parseFloat(document.getElementById('stabilizer').value) || 0;
  const totalAlk = parseFloat(document.getElementById('totalAlk').value) || 0;
  const algae = document.querySelector('#algae').value;
  const clarity = document.getElementById('clarity').value;
  const freeChlorine = parseFloat(document.getElementById('freeC').value) || 0;
  const copper = parseFloat(document.getElementById('copper').value) || 0;

  // Display elements
  const headings = {
    backwash: document.querySelector('.stepOneHeading'),
    ph: document.querySelector('.stepTwoHeading'),
    stabilizer: document.querySelector('.stepThreeHeading'),
    alkalinity: document.querySelector('.stepFourHeading'),
    chlorine: document.querySelector('.stepFiveHeading'),
    algaecide: document.querySelector('.stepSixHeading'),
    copper: document.querySelector('.stepSevenHeading'),
    clarity: document.querySelector('.stepEightHeading'),
  };

  const explanations = {
    backwash: document.querySelector('.stepOneExplain'),
    ph: document.querySelector('.stepTwoExplain'),
    stabilizer: document.querySelector('.stepThreeExplain'),
    alkalinity: document.querySelector('.stepFourExplain'),
    chlorine: document.querySelector('.stepFiveExplain'),
    algaecide: document.querySelector('.stepSixExplain'),
    copper: document.querySelector('.stepSevenExplain'),
    clarity: document.querySelector('.stepEightExplain'),
  };

  function updateStep(step, heading, explanation) {
    headings[step].innerHTML = heading || '';
    explanations[step].innerHTML = explanation || '';
  }

  function formatValue(amount, unit) {
    return amount >= 1000 ? (amount / 1000).toFixed(2) + ' ' + unit : amount.toFixed(0) + ' ' + (unit === 'Kg' ? 'grams' : unit === 'L' ? 'mL' : unit);
  }

  function formatValueStabilizer(amount, unit) {
    return amount >= 1000 ? (amount / 1000).toFixed(0) + ' ' + unit : amount.toFixed(0) + ' ' + (unit === 'KL' ? 'L' : unit);
  }

  function calcPh() {
    const volumeLiters = volume * 1000;
    const phDifference = 7.2 - ph;
    const sodaAshNeeded = 1.8;
    const calcPhIncrease = ((phDifference / 0.1) * (sodaAshNeeded / 1000) * volumeLiters);
    const calcAcid = ((ph - 7.6) * 1.46 * volumeLiters / 10);
    const dilutionWater = calcAcid * 10;
    
    if (ph < 7.2) {
      updateStep('ph', 'Adjust PH Levels', `Add ${formatValue(calcPhIncrease, 'Kg')} of Soda Ash directly in to the water while the pump is running.`);
    } else if (ph > 7.6) {
      updateStep('ph', 'Adjust PH Levels', `Dilute ${formatValue(calcAcid, 'L')} of pool acid with ${formatValue(dilutionWater, 'L')} of water. Add directly in to the pool water dispursing evenly over the surface of the pool water while the pool pump is running.`);
    } else {
      updateStep('ph');
    }
  }

  function calcStabilizer() {
    const targetStabilizer = 40;
    const volumeLiters = volume * 1000;

    if (stabilizer > 50) {
      const waterToReplace = ((stabilizer - targetStabilizer) / stabilizer) * volumeLiters;
      updateStep('stabilizer', 'Adjust Stabilizer ', `Drain ${formatValueStabilizer(waterToReplace, 'KL')} of water and replace with fresh water.`);
    } else if (stabilizer < 30) {
      const stabilizerAmount = (targetStabilizer - stabilizer) * volume;
      updateStep('stabilizer', 'Adjust stabilizer', `Add ${formatValue(stabilizerAmount, 'Kg')} of stabilizer slowly into the skimmer basket while the pump is running.`);
    } else {
      updateStep('stabilizer');
    }
  }

  function calcAlkalinity() {
    const alkDifferenceLow = 100 - totalAlk;
    const alkalinityAmount = ((alkDifferenceLow * 1.6 * volume * 1000) / 1000);
    const alkDifferenceHigh = totalAlk - 120;
    const acidAmount = ((volume * 1000) * alkDifferenceHigh * 0.000032);
    
    if (totalAlk > 120) {
      updateStep('alkalinity', 'Adjust Alkalinity', `Turn off the pool pump and add ${formatValue(acidAmount, 'Kg')} of dry acid directly in to the deep end of the pool. Do NOT turn the pool pump on for at least 1 hour. Retest alkalinity after 12 hours and adjust if needed.`);
      console.log(alkDifferenceHigh)
    } else if (totalAlk < 100) {
      updateStep('alkalinity', 'Adjust Alkalinity', `Add ${formatValue(alkalinityAmount, 'Kg')} of alkalinity increaser directly in to pool water while pool pump is running.`);
    } else {
      updateStep('alkalinity');
    }
  }

  function calcChlorine() {
    const volumeLiters = volume * 1000;
    const chlorineDifference = 3 - freeChlorine;
    const chlorineDose = (5 * volumeLiters) / 1000;
    const singleShock = (12 * volumeLiters) / 1000;
    const bagSize = 600; // 600 grams per bag

    function calculateBags(amountGrams) {
        return Math.ceil(amountGrams / bagSize); // Round up to the nearest whole bag
    }

    if (freeChlorine === 0) {
        let shockMultiplier = clarity === 'Lite Green/Clear' ? 1 : clarity === 'Green/Cloudy' ? 2 : clarity === 'Dark Green/Very Cloudy' ? 3 : 0;
        const totalShock = singleShock * shockMultiplier; // Convert to grams
        const bagsNeeded = calculateBags(totalShock);
        if (shockMultiplier > 0) {
            updateStep('chlorine', 'Shock Pool Water', `Pre-dissolve ${bagsNeeded} bag${bagsNeeded > 1 ? 's' : ''} of HTH Super Shock in a bucket of water and spread it over the surface of the pool while the pump is running.`);
        } else {
            const totalDose = chlorineDose * chlorineDifference; // Convert to grams
            const bagsNeeded = calculateBags(totalDose);
            updateStep('chlorine', 'Shock Pool Water', `Pre-dissolve ${bagsNeeded} bag${bagsNeeded > 1 ? 's' : ''} of HTH Super Shock in a bucket of water and spread it over the surface of the pool while the pump is running.`);
        }
    } else if (freeChlorine > 3) {
        updateStep('chlorine', 'Chlorine is high', 'Do not add more chlorine until levels are between 1-3ppm.');
    } else {
        updateStep('chlorine');
    }
}


  function checkAlgaecide() {
    const algaeDoses = { 'Lite Green/Clear': 25, 'Green/Cloudy': 30, 'Dark Green/Very Cloudy': 35 };
    if (['Green', 'Black'].includes(algae) && clarity in algaeDoses) {
      const dose = algaeDoses[clarity] * volume;
      updateStep('algaecide', 'Add algaecide', `Add ${formatValue(dose, 'L')} of DQ80 directly in to the pool water while pool pump is running.`);
    } else {
      updateStep('algaecide');
    }
  }

  function checkCopperLevel() {
    if (copper > 0) {
      const copperTreatment = 20 * volume;
      updateStep('copper', 'Add Metal Remover', `Add ${formatValue(copperTreatment, 'L')} of metal remover directly in to pool water while pool pump is running.`);
    } else {
      updateStep('copper', '', '');
    }
  }

  function checkClarifier () {
    if (['Blue/White','Green/Cloudy', 'Dark Green/Very Cloudy'].includes(clarity) && ['Green', 'Black', 'None'].includes(algae)) {
      updateStep('clarity', 'Add Clarifier', `Add 2 supper clear tabs directly into the skimmer basket or pump basket. Run pool pump for 48 hours before doing a backwash and rinse to clean the filter. If pool remains cloudy, repeat this step.`);
    }
    else {
      updateStep('clarity', '', '');
    }
    }

  updateStep('backwash', 'Backwash and rinse', 'Perform a backwash and rinse procedure before adding chemicals.');
  calcPh();
  calcStabilizer();
  calcAlkalinity();
  calcChlorine();
  checkAlgaecide();
  checkCopperLevel();
  checkClarifier();
});

document.getElementById('printResults').addEventListener('click', function () {
  window.print(); // This will print the full page
});