<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Water testing</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="index.js"></script>
</head>
<body>

    <h1>H2OCheck</h1>
    <p>Please test your water using a test strip or a water test kit. Once you have tested the water, enter the information in the fields below to get detailed step by step instructions on rectifying chemical levels. </p>

<form id="form" method="post">
    <div class="container">

        <!-- input for pool volume -->
            <input class="grids" type="number" name="volume" id="volume" placeholder="volume x1000L" step="0.01" >

        <!-- PH level -->
            <input class="grids" type="number" name="ph" id="ph" placeholder="PH Level" step="0.01" >

        <!-- select pool surface type -->
            <select class="grids" id="surface" name="surfaceType" >
                <option value="" disabled selected>Pool surface</option>
                <option value="concrete" class="blackText">Concrete</option>
                <option value="fiberglass" class="blackText">Fiberglass</option>
            </select>

        <!-- stabelizer level -->
            <input class="grids" type="number" name="stabelizer" id="stabilizer" placeholder="Stabelizer" >

        <!-- Total alkalinity -->
            <input class="grids" type="number" name="totalAlk" id="totalAlk" placeholder="Total Alkalinity" >

        <!-- Acid demand -->
        <input class="grids" type="number" name="acidDemand" id="acidDemand" placeholder="Acid Demand in drops" >

        <!-- water clarity -->
            <select class="grids" id="clarity" name="clarityType" >
                <option value="" class="greyText" disabled selected>Water Clarity</option>
                <option value="Clear" class="blackText">Clear</option>
                <option value="Blue/White" class="blackText">Blue/White</option>
                <option value="Lite Green/Clear" class="blackText">Lite Green/Clear</option>
                <option value="Green/Cloudy" class="blackText">Green/Cloudy</option>
                <option value="Dark Green/Very Cloudy" class="blackText">Dark Green/Very Cloudy</option>
            </select>

        <!-- Person that preformed the test -->
            <input class="grids" type="text" name="user" id="user" placeholder="Tested By">

        <!-- Free chlorine -->
            <input class="grids" type="number" name="FreeC" id="freeC" placeholder="Free Chlorine" step="0.01" >
        
        <!-- copper level -->
            <input class="grids" type="number" name="copper" id="copper" placeholder="Copper Reading" step="0.01" >

        <!-- date tested -->
            <input class="grids" type="date" name="date" id="date" placeholder="Date tested" >

        <!-- Get Results -->
            <button class="grids" id="btn" type="submit">Get Results</button>
    </div> 
</form>

    <div class="results">
    
        <!-- Backwash and rinse -->
        <div class="stepOne">
            <h3 class="stepOneHeading"></h3>
            <p class="stepOneExplain"></p>
        </div>

        <!-- get PH reading and adjust if needed -->
        <div class="stepTwo">
            <h3 class="stepTwoHeading"></h3>
            <p class="stepTwoExplain"></p>
        </div>

        <!-- Display if Metal magic needs to be used -->
        <div class="stepThree">
            <h3 class="stepThreeHeading"></h3>
            <p class="stepThreeExplain"></p>
        </div>
        
        <!-- Get Alkalinity level and adjust if needed -->
        <div class="stepFour">
            <h3 class="stepFourHeading"></h3>
            <p class="stepFourExplain"></p>
        </div>

        <!-- Get chlorine level and adjust if needed -->
        <div class="stepFive">
            <h3 class="stepFiveHeading"></h3>
            <p class="stepFiveExplain"></p>
        </div>

        <!-- Display if algaeside needs to be used -->
        <div class="stepSix">
            <h3 class="stepSixHeading"></h3>
            <p class="stepSixExplain"></p>
        </div>  

        <!-- Get stabelizer level and adjust if needed -->
        <div class="stepSeven">
            <h3 class="stepSevenHeading"></h3>
            <p class="stepSevenExplain"></p>
        </div>
        

        <!-- Display if clarifier needs to be used -->
        <div class="stepSix">
            <h3 class="stepEightHeading"></h3>
            <p class="stepEightExplain"></p>
        </div>        
  

        
        <button id="printResults" class="grids">Print Page</button>
        <button id="newTest" class="grids">New Test</button>

</body>
</html>
