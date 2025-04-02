function updateValue(id, value) {
    document.getElementById(id).innerText = "$" + Number(value).toLocaleString();
}

function formatAndCalculate(id) {
    const input = document.getElementById(id);
    const raw = input.value.replace(/[^0-9]/g, ""); // Remove commas and non-numeric
    if (raw === "") return;

    const formatted = parseFloat(raw).toLocaleString();
    input.value = formatted;

    updateCalculation();
}


function updateCalculation() {
    let numPorts = parseFloat(document.getElementById("numPorts").value);
    let kwRating = parseFloat(document.getElementById("kwRating").value);
    let costPerKwh = parseFloat(document.getElementById("costPerKwh").value);
    let chargeRate = parseFloat(document.getElementById("chargeRate").value);
    let hoursPerDay = parseFloat(document.getElementById("hoursPerDay").value);
    let daysPerYear = parseFloat(document.getElementById("daysPerYear").value);
    //let projectCost = parseFloat(document.getElementById("projectCost").value); commenting out for testing
    //let incentives = parseFloat(document.getElementById("incentives").value);
    let projectCost = parseFloat(document.getElementById("projectCost").value.replace(/,/g, ""));
    let incentives = parseFloat(document.getElementById("incentives").value.replace(/,/g, ""));


    // Update slider values visually
    document.getElementById("numPortsVal").innerText = numPorts;
    document.getElementById("kwRatingVal").innerText = kwRating;
    document.getElementById("costPerKwhVal").innerText = costPerKwh.toFixed(2);
    document.getElementById("chargeRateVal").innerText = chargeRate.toFixed(2);
    document.getElementById("hoursPerDayVal").innerText = hoursPerDay;
    document.getElementById("daysPerYearVal").innerText = daysPerYear;

    // Calculate total energy consumption
    let totalKwh = numPorts * kwRating * hoursPerDay * daysPerYear;

    // Calculate total cost and revenue
    let totalCost = totalKwh * costPerKwh;
    let totalRevenue = totalKwh * chargeRate;

    // Calculate net profit
    let netProfit = totalRevenue - totalCost;

    // Calculate Net Project Cost
    let netProjectCost = projectCost - incentives;

    // Calculate Estimated Payback Period (Months)
    let monthlyNetProfit = netProfit / 12;
    let paybackPeriod = monthlyNetProfit > 0 ? (netProjectCost / monthlyNetProfit) : "N/A";

    // Format numbers with commas and update the results
    document.getElementById("totalKwh").innerText = totalKwh.toLocaleString();
    document.getElementById("totalCost").innerText = totalCost.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    document.getElementById("totalRevenue").innerText = totalRevenue.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    document.getElementById("netProfit").innerText = netProfit.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    document.getElementById("netProjectCost").innerText = netProjectCost.toLocaleString(undefined, { style: 'currency', currency: 'USD' });

    // If Payback Period is a valid number, display it
    document.getElementById("paybackPeriod").innerText = (paybackPeriod !== "N/A") ? Math.ceil(paybackPeriod).toLocaleString() : "N/A";
}

// Run calculation once on page load
window.onload = updateCalculation;
