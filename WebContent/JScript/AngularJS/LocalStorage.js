angular.module('LocalApp', []).controller('LocalController', function($scope) {
	// localStorage.clear();
	$scope.clear = function() {
		localStorage.clear();
		$scope.List = '';
	}
	$scope.save = function(bind) {
		bind.clickcount = localStorage.length;
		$scope.addcontact.$setPristine();

		$scope.List = [];
		for (var i = 0; i < localStorage.length; i++) {
			var contact = JSON.parse(localStorage.getItem(i));
			if (contact != null) {
				contact.checkbox = false;
				$scope.List.push(contact);
			}
		}

		for (var i = 0; i < $scope.List.length; i++) {
			if (bind.fname == $scope.List[i].firstname) {
				$scope.exist = true;
				alert("Username already Exists");
				break;
			} else if (bind.email == $scope.List[i].email) {
				$scope.exist = true;
				alert("Email already Exists");
				break;
			} else if (bind.telephone == $scope.List[i].number) {
				$scope.exist = true;
				alert("Phone Number already Exists");
				break;
			} else {
				$scope.exist = false;
			}

		}

		if (!$scope.exist) {
			localStorage.setItem(bind.clickcount, JSON.stringify({
				serial : bind.clickcount,
				firstname : bind.fname,
				lastname : bind.lname,
				email : bind.email,
				number : bind.telephone,
				address : bind.address
			}));
			$scope.bind = "";
		}

		$scope.List = [];
		for (var i = 0; i < localStorage.length; i++) {
			var contact = JSON.parse(localStorage.getItem(i));
			if (contact != null) {
				contact.checkbox = false;
				$scope.List.push(contact);
			}
		}

	};

	$scope.List = [];
	for (var i = 0; i < localStorage.length; i++) {
		var contact = JSON.parse(localStorage.getItem(i));
		if (contact != null) {
			contact.checkbox = false;
			$scope.List.push(contact);
		}
	}

	$scope.delet = function(details) {
		$scope.deleteThis = details
		$("#deleteDialogueBox").dialog({
			modal : true,
			draggable : false,
			resizable : false,
			hide : {
				effect : 'fade',
				duration : 300, /* SPECIF ARGUMENT */
			},
			show : {
				effect : 'fade',
				duration : 250, /* SPECIF ARGUMENT */
			}

		});
	}

	$scope.edit = function(details, index) {
		$scope.editThis = details;
		$scope.editIndex = index;
		$("#editDialogueBox").dialog({
			modal : true,
			draggable : false,
			resizable : false,
			width : 500,
			height : 340,
			hide : {
				effect : 'fade',
				duration : 300, /* SPECIF ARGUMENT */
			},
			show : {
				effect : 'fade',
				duration : 250, /* SPECIF ARGUMENT */
			}
		});
	}

	$scope.noDelet = function() {
		$("#deleteDialogueBox").dialog("close");
	}

	$scope.sureDelet = function() {

		var delValue = $scope.deleteThis;

		$scope.List.splice(delValue, 1);
		localStorage.clear();
		for (var i = 0; i < $scope.List.length; i++) {
			localStorage.setItem(i, JSON.stringify($scope.List[i]));
		}

		$("#deleteDialogueBox").dialog("close");
	}

	$scope.updat = function(update) {

		var fname = $(".editFname").val();
		var lname = $(".editLname").val()
		var email = update.email;
		var phone = update.number;
		var address = update.address;
		var serial = $(".editSerial").val();

		var edit = JSON.stringify({
			"serial" : serial,
			"firstname" : fname,
			"lastname" : lname,
			"email" : email,
			"number" : phone,
			"address" : address
		});

		localStorage.setItem(localStorage.key($scope.editIndex), edit);

		$scope.List = [];
		for (var i = 0; i < localStorage.length; i++) {
			var contact = JSON.parse(localStorage.getItem(i));
			if (contact != null) {
				contact.checkbox = false;
				$scope.List.push(contact);
			}
		}
		$("#editDialogueBox").dialog('close');

	}

	$scope.profileView = function(details) {
		$scope.profile = details;

	}

	$scope.checkedAll = false;
	$scope.checkall = function(a) {
		for (var i = 0; i < $scope.List.length; i++) {
			$scope.List[i].checkbox = !$scope.checkedAll;
		}
	}

	$scope.contacIndex = [];
	$scope.checkbox = false;
	$scope.checked = function(checkbox, index) {
		if (!checkbox) {

			$scope.contacIndex.push(index);
		} else {

			$scope.contacIndex.splice($scope.contacIndex.indexOf(index), 1);
		}
	}

	$scope.deleteSelected = function(checkedAll) {
		if (checkedAll == true) {
			localStorage.clear();
			alert("Contacts Cleared");
		} else {

			if ($scope.contacIndex.length != 0) {
				$scope.contacIndex.sort(function(a, b) {
					return b - a
				});

				for (i = 0; i < $scope.contacIndex.length; i++) {
					$scope.List.splice($scope.contacIndex[i], 1);
				}
				if ($scope.checkedAll == false) {
					localStorage.clear();
				}

				for (var i = 0; i < $scope.List.length; i++) {
					localStorage.setItem(i, JSON.stringify($scope.List[i]));
				}
			} else {
				alert("Select The Contact To Delete");
			}
			$scope.contacIndex = [];
		}
		$scope.List = [];
		for (var i = 0; i < localStorage.length; i++) {
			var contact = JSON.parse(localStorage.getItem(i));
			if (contact != null) {
				contact.checkbox = false;
				$scope.List.push(contact);
			}
		}
	}

});