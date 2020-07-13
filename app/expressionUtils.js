define(["require", "exports", "./layerUtils"], function (require, exports, layerUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function createNewInfectionsAverageExpression(currentDateFieldName, excludeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    var unit = 7;\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n    var currentDayValueParts = Split(currentDayValue, \"|\");\n    var currentDayValueInfections = Number(currentDayValueParts[0]);\n    var currentDayValueDeaths = Number(currentDayValueParts[1]);\n\n    var parts = Split(Replace(currentDayFieldName,\"" + layerUtils_1.prefix + "\",\"\"), \"" + layerUtils_1.separator + "\");\n    var currentDayFieldDate = Date(Number(parts[2]), Number(parts[0])-1, Number(parts[1]));\n    var previousDay = DateAdd(currentDayFieldDate, (-1 * unit), 'days');\n    if (Month(previousDay) == 0 && Day(previousDay) <= 21 && Year(previousDay) == 2020){\n      return 0;\n    }\n\n    var previousDayFieldName = getFieldFromDate(previousDay);\n    var previousDayValue = $feature[previousDayFieldName];\n    var previousDayValueParts = Split(previousDayValue, \"|\");\n    var previousDayValueInfections = Number(previousDayValueParts[0]);\n    var previousDayValueDeaths = Number(previousDayValueParts[1]);\n\n    return Round((currentDayValueInfections - previousDayValueInfections) / unit);\n  ";
        return excludeGetFieldFromDate ? base : getFieldFromDate + base;
    }
    exports.createNewInfectionsAverageExpression = createNewInfectionsAverageExpression;
    function createNewInfectionsExpression(currentDateFieldName, excludeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    var unit = 7;\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n    var currentDayValueParts = Split(currentDayValue, \"|\");\n    var currentDayValueInfections = Number(currentDayValueParts[0]);\n    var currentDayValueDeaths = Number(currentDayValueParts[1]);\n\n    var parts = Split(Replace(currentDayFieldName,\"" + layerUtils_1.prefix + "\",\"\"), \"" + layerUtils_1.separator + "\");\n    var currentDayFieldDate = Date(Number(parts[2]), Number(parts[0])-1, Number(parts[1]));\n    var previousDay = DateAdd(currentDayFieldDate, (-1 * unit), 'days');\n    if (Month(previousDay) == 0 && Day(previousDay) <= 21 && Year(previousDay) == 2020){\n      return 0;\n    }\n\n    var previousDayFieldName = getFieldFromDate(previousDay);\n    var previousDayValue = $feature[previousDayFieldName];\n    var previousDayValueParts = Split(previousDayValue, \"|\");\n    var previousDayValueInfections = Number(previousDayValueParts[0]);\n    var previousDayValueDeaths = Number(previousDayValueParts[1]);\n\n    return (currentDayValueInfections - previousDayValueInfections);\n  ";
        return excludeGetFieldFromDate ? base : getFieldFromDate + base;
    }
    exports.createNewInfectionsExpression = createNewInfectionsExpression;
    function createActiveCasesExpression(currentDateFieldName, excludeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n    var currentDayValueParts = Split(currentDayValue, \"|\");\n    var currentDayInfections = Number(currentDayValueParts[0]);\n    var currentDayDeaths = Number(currentDayValueParts[1]);\n\n    var parts = Split(Replace(currentDayFieldName,\"" + layerUtils_1.prefix + "\",\"\"), \"" + layerUtils_1.separator + "\");\n    var currentDayFieldDate = Date(Number(parts[2]), Number(parts[0])-1, Number(parts[1]));\n\n    // Active Cases = (100% of new cases from last 14 days + 19% of days 15-25 + 5% of days 26-49) - Death Count\n\n    var daysAgo14 = DateAdd(currentDayFieldDate, -14, 'days');\n    var daysAgo15 = DateAdd(currentDayFieldDate, -15, 'days');\n    var daysAgo25 = DateAdd(currentDayFieldDate, -25, 'days');\n    var daysAgo26 = DateAdd(currentDayFieldDate, -26, 'days');\n    var daysAgo49 = DateAdd(currentDayFieldDate, -49, 'days');\n\n    var startDate = Date(2020, 0, 22);\n\n    var deaths = currentDayDeaths;\n\n    if (daysAgo15 < startDate){\n      return currentDayInfections - deaths;\n    }\n\n    var daysAgo14FieldName = getFieldFromDate(daysAgo14);\n    var daysAgo14Value = $feature[daysAgo14FieldName];\n    var daysAgo14ValueParts = Split(daysAgo14Value, \"|\");\n    var daysAgo14Infections = Number(daysAgo14ValueParts[0]);\n    var daysAgo14Deaths = Number(daysAgo14ValueParts[1]);\n\n    var daysAgo15FieldName = getFieldFromDate(daysAgo15);\n    var daysAgo15Value = $feature[daysAgo15FieldName];\n    var daysAgo15ValueParts = Split(daysAgo15Value, \"|\");\n    var daysAgo15Infections = Number(daysAgo15ValueParts[0]);\n    var daysAgo15Deaths = Number(daysAgo15ValueParts[1]);\n\n    if (daysAgo26 < startDate){\n      return Round( (currentDayInfections - daysAgo14Infections) + ( 0.19 * daysAgo15Infections ) - deaths );\n    }\n\n    var daysAgo25FieldName = getFieldFromDate(daysAgo25);\n    var daysAgo25Value = $feature[daysAgo25FieldName];\n    var daysAgo25ValueParts = Split(daysAgo25Value, \"|\");\n    var daysAgo25Infections = Number(daysAgo25ValueParts[0]);\n    var daysAgo25Deaths = Number(daysAgo25ValueParts[1]);\n\n    var daysAgo26FieldName = getFieldFromDate(daysAgo26);\n    var daysAgo26Value = $feature[daysAgo26FieldName];\n    var daysAgo26ValueParts = Split(daysAgo26Value, \"|\");\n    var daysAgo26Infections = Number(daysAgo26ValueParts[0]);\n    var daysAgo26Deaths = Number(daysAgo26ValueParts[1]);\n\n    if (daysAgo49 < startDate){\n      return Round( (currentDayInfections - daysAgo14Infections) + ( 0.19 * ( daysAgo15Infections - daysAgo25Infections ) ) + ( 0.05 * daysAgo26Infections ) - deaths );\n    }\n\n    var daysAgo49FieldName = getFieldFromDate(daysAgo49);\n    var daysAgo49Value = $feature[daysAgo49FieldName];\n    var daysAgo49ValueParts = Split(daysAgo49Value, \"|\");\n    var daysAgo49Infections = Number(daysAgo49ValueParts[0]);\n    var daysAgo49Deaths = Number(daysAgo49ValueParts[1]);\n\n    deaths = currentDayDeaths - daysAgo49Deaths;\n    var activeEstimate = (currentDayInfections - daysAgo14Infections) + ( 0.19 * ( daysAgo15Infections - daysAgo25Infections ) ) + ( 0.05 * ( daysAgo26Infections - daysAgo49Infections) ) - deaths;\n\n    return Round(activeEstimate);\n  ";
        return excludeGetFieldFromDate ? base : getFieldFromDate + base;
    }
    exports.createActiveCasesExpression = createActiveCasesExpression;
    function createRecoveredCasesExpression(currentDateFieldName, excludeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n    var currentDayValueParts = Split(currentDayValue, \"|\");\n    var currentDayInfections = Number(currentDayValueParts[0]);\n    var currentDayDeaths = Number(currentDayValueParts[1]);\n\n    var parts = Split(Replace(currentDayFieldName,\"" + layerUtils_1.prefix + "\",\"\"), \"" + layerUtils_1.separator + "\");\n    var currentDayFieldDate = Date(Number(parts[2]), Number(parts[0])-1, Number(parts[1]));\n\n    // Active Cases = (100% of new cases from last 14 days + 19% of days 15-25 + 5% of days 26-49) - Death Count\n\n    var daysAgo14 = DateAdd(currentDayFieldDate, -14, 'days');\n    var daysAgo15 = DateAdd(currentDayFieldDate, -15, 'days');\n    var daysAgo25 = DateAdd(currentDayFieldDate, -25, 'days');\n    var daysAgo26 = DateAdd(currentDayFieldDate, -26, 'days');\n    var daysAgo49 = DateAdd(currentDayFieldDate, -49, 'days');\n\n    var startDate = Date(2020, 0, 22);\n\n    var deaths = currentDayDeaths;\n\n    if (daysAgo15 < startDate){\n      return currentDayInfections - deaths;\n    }\n\n    var daysAgo14FieldName = getFieldFromDate(daysAgo14);\n    var daysAgo14Value = $feature[daysAgo14FieldName];\n    var daysAgo14ValueParts = Split(daysAgo14Value, \"|\");\n    var daysAgo14Infections = Number(daysAgo14ValueParts[0]);\n    var daysAgo14Deaths = Number(daysAgo14ValueParts[1]);\n\n    var daysAgo15FieldName = getFieldFromDate(daysAgo15);\n    var daysAgo15Value = $feature[daysAgo15FieldName];\n    var daysAgo15ValueParts = Split(daysAgo15Value, \"|\");\n    var daysAgo15Infections = Number(daysAgo15ValueParts[0]);\n    var daysAgo15Deaths = Number(daysAgo15ValueParts[1]);\n\n    if (daysAgo26 < startDate){\n      return Round( (currentDayInfections - daysAgo14Infections) + ( 0.19 * daysAgo15Infections ) - deaths );\n    }\n\n    var daysAgo25FieldName = getFieldFromDate(daysAgo25);\n    var daysAgo25Value = $feature[daysAgo25FieldName];\n    var daysAgo25ValueParts = Split(daysAgo25Value, \"|\");\n    var daysAgo25Infections = Number(daysAgo25ValueParts[0]);\n    var daysAgo25Deaths = Number(daysAgo25ValueParts[1]);\n\n    var daysAgo26FieldName = getFieldFromDate(daysAgo26);\n    var daysAgo26Value = $feature[daysAgo26FieldName];\n    var daysAgo26ValueParts = Split(daysAgo26Value, \"|\");\n    var daysAgo26Infections = Number(daysAgo26ValueParts[0]);\n    var daysAgo26Deaths = Number(daysAgo26ValueParts[1]);\n\n    if (daysAgo49 < startDate){\n      return Round( (currentDayInfections - daysAgo14Infections) + ( 0.19 * ( daysAgo15Infections - daysAgo25Infections ) ) + ( 0.05 * daysAgo26Infections ) - deaths );\n    }\n\n    var daysAgo49FieldName = getFieldFromDate(daysAgo49);\n    var daysAgo49Value = $feature[daysAgo49FieldName];\n    var daysAgo49ValueParts = Split(daysAgo49Value, \"|\");\n    var daysAgo49Infections = Number(daysAgo49ValueParts[0]);\n    var daysAgo49Deaths = Number(daysAgo49ValueParts[1]);\n\n    deaths = currentDayDeaths - daysAgo49Deaths;\n    var activeEstimate = (currentDayInfections - daysAgo14Infections) + ( 0.19 * ( daysAgo15Infections - daysAgo25Infections ) ) + ( 0.05 * ( daysAgo26Infections - daysAgo49Infections) ) - deaths;\n\n    return Round(currentDayInfections - activeEstimate - currentDayDeaths);\n  ";
        return excludeGetFieldFromDate ? base : getFieldFromDate + base;
    }
    exports.createRecoveredCasesExpression = createRecoveredCasesExpression;
    function createDoublingTimeExpression(currentDateFieldName, excludeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    var unit = 14;\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n    var currentDayValueParts = Split(currentDayValue, \"|\");\n    var totalInfectionsValue = Number(currentDayValueParts[0]);\n\n    var parts = Split(Replace(currentDayFieldName,\"" + layerUtils_1.prefix + "\",\"\"), \"" + layerUtils_1.separator + "\");\n    var currentDayFieldDate = Date(Number(parts[2]), Number(parts[0])-1, Number(parts[1]));\n    var previousDay = DateAdd(currentDayFieldDate, (unit * -1), 'days');\n\n    if (Month(previousDay) == 0 && Day(previousDay) <= 21 && Year(previousDay) == 2020){\n      return 0;\n    }\n\n    var previousDayFieldName = getFieldFromDate(previousDay);\n    var previousDayValue = $feature[previousDayFieldName];\n    var previousDayValueParts = Split(previousDayValue, \"|\");\n    var previousDayInfectionsValue = Number(previousDayValueParts[0]);\n\n    var newInfections = totalInfectionsValue - previousDayInfectionsValue;\n    var oldInfections = totalInfectionsValue - newInfections;\n\n    if(newInfections == 0 || oldInfections == 0){\n      return \"n/a\";\n    }\n\n    var doublingTimeDays = Floor(unit / (newInfections / oldInfections))\n    return IIF(doublingTimeDays >= 0, doublingTimeDays, \"n/a\");\n  ";
        return excludeGetFieldFromDate ? base : getFieldFromDate + base;
    }
    exports.createDoublingTimeExpression = createDoublingTimeExpression;
    function createNewInfectionPercentTotalExpression(currentDateFieldName, excludeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var totalInfectionsValue = $feature[currentDayFieldName];\n    var parts = Split(Replace(currentDayFieldName,\"" + layerUtils_1.prefix + "\",\"\"), \"" + layerUtils_1.separator + "\");\n    var currentDayFieldDate = Date(Number(parts[2]), Number(parts[0])-1, Number(parts[1]));\n    var previousDay = DateAdd(currentDayFieldDate, -7, 'days');\n\n    if (Month(previousDay) == 0 && Day(previousDay) <= 21 && Year(previousDay) == 2020){\n      return 0;\n    }\n\n    var lastDate = DateAdd(Now(), -1, 'days');\n    var lastDateFieldName = getFieldFromDate(lastDate);\n    var lastDateValue = $feature[lastDateFieldName];\n\n    var previousDayFieldName = getFieldFromDate(previousDay);\n    var previousDayValue = $feature[previousDayFieldName];\n\n    var newInfections = totalInfectionsValue - previousDayValue;\n\n    return ( newInfections / lastDateValue ) * 100;\n  ";
        return excludeGetFieldFromDate ? base : getFieldFromDate + base;
    }
    exports.createNewInfectionPercentTotalExpression = createNewInfectionPercentTotalExpression;
    function createInfectionRateExpression(currentDateFieldName) {
        return "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n    var currentDaySplit = Split(currentDayValue, \"|\");\n    var infections = Number(currentDaySplit[0]);\n    var deaths = Number(currentDaySplit[1]);\n    var population = $feature.POPULATION;\n    return (infections / population ) * 100000;\n  ";
    }
    exports.createInfectionRateExpression = createInfectionRateExpression;
    function createActiveCasesPer100kExpression(currentDateFieldName, excludeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    var population = $feature.POPULATION;\n\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n    var currentDayValueParts = Split(currentDayValue, \"|\");\n    var currentDayInfections = Number(currentDayValueParts[0]);\n    var currentDayDeaths = Number(currentDayValueParts[1]);\n\n    var parts = Split(Replace(currentDayFieldName,\"" + layerUtils_1.prefix + "\",\"\"), \"" + layerUtils_1.separator + "\");\n    var currentDayFieldDate = Date(Number(parts[2]), Number(parts[0])-1, Number(parts[1]));\n\n    // Active Cases = (100% of new cases from last 14 days + 19% of days 15-25 + 5% of days 26-49) - Death Count\n\n    var daysAgo14 = DateAdd(currentDayFieldDate, -14, 'days');\n    var daysAgo15 = DateAdd(currentDayFieldDate, -15, 'days');\n    var daysAgo25 = DateAdd(currentDayFieldDate, -25, 'days');\n    var daysAgo26 = DateAdd(currentDayFieldDate, -26, 'days');\n    var daysAgo49 = DateAdd(currentDayFieldDate, -49, 'days');\n\n    var startDate = Date(2020, 0, 22);\n\n    var activeEstimate = 0;\n    var deaths = currentDayDeaths;\n\n    if (daysAgo15 < startDate){\n      activeEstimate = currentDayInfections - deaths;\n      return (activeEstimate / population ) * 100000;\n    }\n\n    var daysAgo14FieldName = getFieldFromDate(daysAgo14);\n    var daysAgo14Value = $feature[daysAgo14FieldName];\n    var daysAgo14ValueParts = Split(daysAgo14Value, \"|\");\n    var daysAgo14Infections = Number(daysAgo14ValueParts[0]);\n    var daysAgo14Deaths = Number(daysAgo14ValueParts[1]);\n\n    var daysAgo15FieldName = getFieldFromDate(daysAgo15);\n    var daysAgo15Value = $feature[daysAgo15FieldName];\n    var daysAgo15ValueParts = Split(daysAgo15Value, \"|\");\n    var daysAgo15Infections = Number(daysAgo15ValueParts[0]);\n    var daysAgo15Deaths = Number(daysAgo15ValueParts[1]);\n\n    if (daysAgo26 < startDate){\n      activeEstimate = Round( (currentDayInfections - daysAgo14Infections) + ( 0.19 * daysAgo15Infections ) - deaths );\n      return (activeEstimate / population ) * 100000;\n    }\n\n    var daysAgo25FieldName = getFieldFromDate(daysAgo25);\n    var daysAgo25Value = $feature[daysAgo25FieldName];\n    var daysAgo25ValueParts = Split(daysAgo25Value, \"|\");\n    var daysAgo25Infections = Number(daysAgo25ValueParts[0]);\n    var daysAgo25Deaths = Number(daysAgo25ValueParts[1]);\n\n    var daysAgo26FieldName = getFieldFromDate(daysAgo26);\n    var daysAgo26Value = $feature[daysAgo26FieldName];\n    var daysAgo26ValueParts = Split(daysAgo26Value, \"|\");\n    var daysAgo26Infections = Number(daysAgo26ValueParts[0]);\n    var daysAgo26Deaths = Number(daysAgo26ValueParts[1]);\n\n    if (daysAgo49 < startDate){\n      activeEstimate = Round( (currentDayInfections - daysAgo14Infections) + ( 0.19 * ( daysAgo15Infections - daysAgo25Infections ) ) + ( 0.05 * daysAgo26Infections ) - deaths );\n      return (activeEstimate / population ) * 100000;\n    }\n\n    var daysAgo49FieldName = getFieldFromDate(daysAgo49);\n    var daysAgo49Value = $feature[daysAgo49FieldName];\n    var daysAgo49ValueParts = Split(daysAgo49Value, \"|\");\n    var daysAgo49Infections = Number(daysAgo49ValueParts[0]);\n    var daysAgo49Deaths = Number(daysAgo49ValueParts[1]);\n\n    deaths = currentDayDeaths - daysAgo49Deaths;\n    activeEstimate = (currentDayInfections - daysAgo14Infections) + ( 0.19 * ( daysAgo15Infections - daysAgo25Infections ) ) + ( 0.05 * ( daysAgo26Infections - daysAgo49Infections) ) - deaths;\n\n    return (activeEstimate / population ) * 100000;\n  ";
        return excludeGetFieldFromDate ? base : getFieldFromDate + base;
    }
    exports.createActiveCasesPer100kExpression = createActiveCasesPer100kExpression;
    function createDeathRateExpression(currentDateFieldName) {
        return "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n\n    var parts = Split(currentDayValue, \"|\");\n\n    var infections = Number(parts[0]);\n    var deaths = Number(parts[1]);\n\n    return (deaths / infections) * 100;\n  ";
    }
    exports.createDeathRateExpression = createDeathRateExpression;
    function createTotalDeathsExpression(currentDateFieldName) {
        return "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n\n    var parts = Split(currentDayValue, \"|\");\n\n    var infections = Number(parts[0]);\n    var deaths = Number(parts[1]);\n\n    return deaths;\n  ";
    }
    exports.createTotalDeathsExpression = createTotalDeathsExpression;
    function createTotalInfectionsExpression(currentDateFieldName) {
        return "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n\n    var parts = Split(currentDayValue, \"|\");\n\n    var infections = Number(parts[0]);\n    var deaths = Number(parts[1]);\n\n    return infections;\n  ";
    }
    exports.createTotalInfectionsExpression = createTotalInfectionsExpression;
    function createSusceptiblePopulationExpression(currentDateFieldName) {
        return "\n    var currentDayFieldName = \"" + currentDateFieldName + "\";\n    var currentDayValue = $feature[currentDayFieldName];\n\n    var parts = Split(currentDayValue, \"|\");\n\n    var infections = Number(parts[0]);\n    var deaths = Number(parts[1]);\n\n    var population = $feature.POPULATION;\n\n    return population - infections;\n  ";
    }
    exports.createSusceptiblePopulationExpression = createSusceptiblePopulationExpression;
    function getFieldFromDateFunction() {
        return "\n    function getFieldFromDate(d) {\n      var fieldName = \"" + layerUtils_1.prefix + "\" + Text(d, \"MM" + layerUtils_1.separator + "DD" + layerUtils_1.separator + "Y\");\n      return fieldName;\n    }\n\n  ";
    }
    function expressionDifference(startExpression, endExpression, includeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    function startExpression(){\n      " + startExpression + "\n    }\n\n    function endExpression(){\n      " + endExpression + "\n    }\n\n    return endExpression() - startExpression();\n  ";
        return includeGetFieldFromDate ? getFieldFromDate + base : base;
    }
    exports.expressionDifference = expressionDifference;
    function expressionPercentChange(startExpression, endExpression, includeGetFieldFromDate) {
        var getFieldFromDate = getFieldFromDateFunction();
        var base = "\n    function startExpression(){\n      " + startExpression + "\n    }\n\n    function endExpression(){\n      " + endExpression + "\n    }\n    var startValue = startExpression();\n    var endValue = endExpression();\n\n    return ( ( endValue - startValue ) / startValue ) * 100;\n  ";
        return includeGetFieldFromDate ? getFieldFromDate + base : base;
    }
    exports.expressionPercentChange = expressionPercentChange;
});
//# sourceMappingURL=expressionUtils.js.map