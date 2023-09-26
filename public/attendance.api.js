document.addEventListener('alpine:init', () => {

	Alpine.data('Attendance', () => {

		return {
			firstName:'',
			surname:'',
			email:'',
			username:'',
			password:'',
			confirmPassword:'',
			userType:'',
			phoneNumber:'',
			emailValid: true,
			attendeeList: '',
			selectedAttendees: [],
			registerName:'',
			registerList:'',
			attendanceList:[],
			attendanceName:'',

			init(){
				// Get Attendance
				axios.get("/api/getAttendees/").then((result) => {
					if (result.data.success) {
						// Assuming result.data.attendees is an array of attendees
						this.attendeeList = result.data.attendees;
					} else {
						// Handle the case when no attendees are found or an error occurs
						console.error("No attendees found or error occurred.");
					}
				});

				//Get Register
				const storedUsername = localStorage.getItem("username");
				axios.post("/api/getRegisters/", {
					storedUsername: storedUsername
			    }).then((result) => {
					if (result.data.success) {
					  this.registerList = result.data.registers;
					} else {
					  console.error("No registers found or error occurred.");
					}
	    		});
                
				//Get specific register name
				this.attendanceList = JSON.parse(localStorage.getItem('attendanceList'));
				console.log(this.attendanceList);
				axios.post("/api/viewRegisterName/", {
					registerId : this.attendanceList[0].registerId
				}).then((result)=>{
					if(result.data.success){
						this.attendanceName = result.data.registerName;
					}
				});
                
			},
			
			validateEmail() {
				const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
				this.emailValid = emailPattern.test(this.email);
            },
           
			//Signup
			signup(event){
				event.preventDefault();
				if (this.password !== this.confirmPassword) {
					alert(`Please ensure Passwords match.`);
				} else if(this.userType == ''){
					alert(`Please ensure 'User type' is selected.`)
				}
				else if(!this.emailValid){
					alert(`Please ensure valid email address is entered.`)
				}
				else if(!this.username){
					alert(`Please enter a username.`)
				}
				else {
					axios.post('/api/addUser/', {
						firstName : this.firstName,
						surname : this.surname,
						email : this.email,
						username : this.username,
						password : this.password,
						userType : this.userType,
						phoneNumber : this.phoneNumber
					  }).then((result)=>{
						if(result.data.error){
						alert(result.data.error);
						}else{
							alert(result.data.success);
							this.firstName = '';
							this.surname = '';
							this.email = '';
							this.password = '';
							this.username='';
							this.confirmPassword = '';
							this.userType = '';
							this.phoneNumber = '';
							window.location.href = './index.html';
						}
					  })
				}
			},
			//SignUp Button functionaliy
            

			//Login
			login(event){
				event.preventDefault();
				axios.post("/api/login/", {
					username : this.username,
					password : this.password
				}).then((result)=>{
					if(result.data.success){
						localStorage.setItem("username", this.username);
						this.username = '';
						this.password = '';
						window.location.href = './registerLists.html';   	 
					}else{
						alert(result.data.error)
					}
				})
			},

			submitRegister(event){
				event.preventDefault();
				const storedUsername = localStorage.getItem("username");
				axios.post("/api/submitRegister/", {
					selectedAttendees : this.selectedAttendees,
					registerName : this.registerName,
					storedUsername : storedUsername
				}).then((result)=>{
					if(result.data.success){
						this.selectedAttendees=[];
						this.registerName=''; 
						alert("Register has been created, successfully!")
						window.location.href = './registerLists.html';  	 
					}else{
						alert(result.data.error);
					}
				})
			},

			deleteRegister(registerId){
				axios.post("/api/deleteRegister/", {
					registerId : registerId,
				}).then((result)=>{
					if(result.data.success){
						window.location.href = './registerLists.html';  	 
					}else{
						alert(result.data.error);
					}
				})
			},

			viewRegister(registerId) {
				axios.post("/api/viewRegister/", {
				  registerId: registerId,
				}).then((result) => {
				  if (result.data.success) {
					// Save attendanceList to localStorage
					localStorage.setItem('attendanceList', JSON.stringify(result.data.attendance));
					window.location.href = './attendanceList.html';
				  } else {
					alert(result.data.error);
				  }
				}).catch((error) => {
				  console.error("Error:", error);
				});
			},
			
			//Attendance List button functionality
			showFullAttendance: true,
			showAutomatedAttendance: false,
			showSearchAttendee: false,
			showSearch : true,
			showManualAttendance: false,
			searchUser : '',
			specificAttendanceList : '',
			manualAttendanceUsername: '',
            manualAttendanceAttendeeId: '',
            manualAttendanceCheckInTime: '',

			viewEntireRegister(){
				this.showFullAttendance = true; 
				this.showSearch=true; 
				this.showSearchAttendee = false;
				this.showAutomatedAttendance = false;
				this.showManualAttendance = false;           
			},
			
            automatedAttendance() {
				this.showAutomatedAttendance = true;     
				this.showSearchAttendee = false;           
				this.showManualAttendance = false;           
			},
       
			searchAttendee() {          
				this.showAutomatedAttendance = false;      
				this.showSearchAttendee = true;
				this.showManualAttendance = false;
				this.showSearch = false;
			},

			manualAttendance() {
				this.showAutomatedAttendance = false;
				this.showSearchAttendee = false;		
				this.showManualAttendance = true;
		    },
    
			deleteAttendance() {
				this.showAutomatedAttendance = false;
				this.showSearchAttendee = false;
				this.showManualAttendance = false;
			},

			submitSearch(event){
				event.preventDefault();
				axios.post("/api/viewSpecificRegister/", {
                    registerId : this.attendanceList[0].registerId,
					attendeeName : this.searchUser
				}).then((result) => {
					if (result.data.success) {
						// Assuming result.data.attendees is an array of attendees
						this.specificAttendanceList = result.data.attendance;
						this.showFullAttendance = false;
						this.searchUser='';
					} else {
						alert(result.data.error);
						this.searchUser='';
						console.error("No attendance found or error occurred.");

					}
				});
			},

			// 
			submitManualAttendance(event) {
				event.preventDefault();
				axios
				  .post("/api/addAttendance/", {
					registerId: this.attendanceList[0].registerId,
					username: this.manualAttendanceUsername,
					attendeeId: this.manualAttendanceAttendeeId,
					checkInTime: this.manualAttendanceCheckInTime,
				  })
				  .then((result) => {
					if (result.data.success) {
					  alert(result.data.message);
					  axios.post("/api/viewRegister/", {
					  registerId: this.attendanceList[0].registerId,
					  })
					  .then((viewResult) => {
						if (viewResult.data.success) {
						  // Update the attendanceList directly
						  this.attendanceList = viewResult.data.attendance;
						} else {
						  alert(viewResult.data.error);
						}
					  })
					  .catch((error) => {
						console.error("An error occurred:", error);
					  });
					  
					} else {
					  alert(result.data.error);
					};
					this.manualAttendanceCheckInTime ='';
				    this.manualAttendanceUsername ='';
				  })
				  .catch((error) => {
					// Handle the error here, e.g., show a user-friendly error message.
					console.error("An error occurred:", error);
					alert("An error occurred while submitting attendance.");
				  });
			  },
			  
		}

	});
})