const client1 = { 
	userName: "Jack",
	passWord: "admin",
	casaBalance: 17000,
	fdBalance: 54000,
	cardLimit: 13270
}


const client2 = { 
	userName: "sam",
	passWord: "user",
	casaBalance: 1100,
	fdBalance: 16000,
	cardLimit: 5000
}



function login_to_atm() {
		let uN = document.getElementById("userName").value
		let pW = document.getElementById("pWord").value

		if (uN == client1.userName && pW == client1.passWord) {
			console.log(client1.userName)
			return 1;
			
		}
		else if (uN == client2.userName && pW == client2.passWord) {
			console.log(client2.userName)
			return 2;
			
		}
		else  {
			return 3;
	}

}



function cleanConsole() {
		document.getElementById("input_frame").value = ""

}
	
function clearConsole() {
		let resStatus = login_to_atm();
		console.log(resStatus);
		if (resStatus == 1 || resStatus == 2) {
			location.replace("ATM-sys.html");
			
		}
		else  {
			alert("Wrong User or Password");
		}
}
function showCasaBal(c_name) {
		document.getElementById("input_frame").value = "Your CaSa Balance is " + c_name.casaBalance + " ksh";
	}
function showfdBal(c_name) {
		document.getElementById("input_frame").value = "Your Fixed Deposit Balance is " + c_name.fdBalance + " ksh";
	
	}

function showcardLimit(c_name) {
		document.getElementById("input_frame").value = "Your Credit Card limit is " + c_name.cardLimit + " ksh";
	}

function logOut() {
		location.replace("landing_page.html");
	}

function withdrawCash(c_name) {
		let amount = document.getElementById("withdraw_val").value;
		let int_amount = parseInt(amount)
	
		let newBalance = c_name.casaBalance - int_amount;
		console.log(newBalance);
		document.getElementById("input_frame").value = "You have Authorised a cash Withdrawal of. " + amount + " New Balance is " + newBalance + " ksh";
	}

