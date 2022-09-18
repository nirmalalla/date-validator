function onClick(){
  var dateInput = document.getElementById("dateInputTextBox").value;
  var formatInput = document.getElementById("formatInputTextBox").value;
  formatInput = formatInput.toUpperCase();
  var validationStatus = validatorFunction(dateInput, formatInput);
  if (validationStatus[5] == true){
    document.getElementById("returnStatus").innerHTML = "Date " + validationStatus[0] + validationStatus[3] + validationStatus[1] + validationStatus[3] + validationStatus[2] + " is valid for the format " + formatInput;
  }else{
    document.getElementById("returnStatus").innerHTML = "Date " + dateInput + " is not valid for the format " + formatInput;
  }
  document.getElementById("dateInputTextBox").value = "";
  document.getElementById("formatInputTextBox").value = "";
}
function validatorFunction(date, format){
  var separators = [".", "/", "-"];
  var delimeter;
  var day;
  var month;
  var year;
  var formatStyle;
  var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  separators.forEach(separator => {
    var formatArray = format.split(separator);
    if (formatArray.length == 3){
      delimeter = separator;
    }
  });
  var dateArray = date.split(delimeter);
  if (dateArray < 3){
    return false;
  }
  switch (format.indexOf("M")){
    case 0:                         //M*...*...
      if (format.indexOf("D") == 2){    //M*D*Y
        month = dateArray[0];
        day = dateArray[1];
        year = dateArray[2];
        formatStyle = "M*D*Y";
      }else{                          //M*Y*D
        month = dateArray[0];
        year = dateArray[1];
        day = dateArray[2];
        formatStyle = "M*Y*D";
      }
      break;
    case 2:                         //...*M*...
      if (format.indexOf("D") == 0){    //D*M*Y
        day = dateArray[0];
        month = dateArray[1];
        year = dateArray[2];
        formatStyle = "D*M*Y";
      }else{                          //Y*M*D
        year = dateArray[0];
        month = dateArray[1];
        day = dateArray[2];
        formatStyle = "Y*M*D";
      }
      break;
    case 4:                         //...*...*M
      if (format.indexOf("D") == 2){    //Y*D*M
        year = dateArray[0];
        day = dateArray[1];
        month = dateArray[2];
        formatStyle = "Y*D*M";
      }else{                          //D*Y*M
        day = dateArray[0];
        year = dateArray[1];
        month = dateArray[2];
        formatStyle = "D*Y*M";
      }
      break;
  }
  if (year.length < 3){
    if (year > 50){
      year = 19 + year;
    }else{
      year = 20 + year;
    }
  }
  if (parseInt(month) == 2){
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)){
      day = day - 1;
    }else if(day > 28){
      return false;
    }
  }
  if ((day <= monthDays[parseInt(month - 1)]) && (month < 13)){
    switch (formatStyle){
      case "Y*M*D":
        return [year, dateArray[1], dateArray[2], delimeter, formatStyle, true];
      case "Y*D*M":
        return [year, dateArray[1], dateArray[2], delimeter, formatStyle, true];
      case "M*D*Y":
        return [dateArray[0], dateArray[1], year, delimeter, formatStyle, true];
      case "M*Y*D":
        return [dateArray[0], year, dateArray[2], delimeter, formatStyle, true];
      case "D*M*Y":
        return [dateArray[0], dateArray[1], year, delimeter, formatStyle, true];
      case "D*Y*M":
        return [dateArray[0], year, dateArray[2], delimeter,formatStyle, true];
    }
  }else{
    return false;
  }
}
