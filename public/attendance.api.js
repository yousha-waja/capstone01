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
			validateEmail() {
				const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
				this.emailValid = emailPattern.test(this.email);
            },

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
							this.username = '';
							this.password = '';
							this.confirmPassword = '';
							this.userType = '';
							this.phoneNumber = '';
							window.location.href = './index.html';
						}
					  })
				}
			},

			login(event){
				event.preventDefault();
				axios.post("/api/login/", {
					username : this.username,
					password : this.password
				}).then((result)=>{
					if(result.data.success){
						window.location.href = './registers.html';
						this.username='';
						this.password='';   	 
					}else{
						alert(result.data.error)
					}
				})
			}
		}

	});
})