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
			emailValid: true,
			validateEmail() {
				const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
				this.emailValid = emailPattern.test(this.email);
            },

			signup(event){
				event.preventDefault();
				if (this.password !== this.confirmPassword || this.userType == '' || !this.emailValid) {
					alert(`Please ensure:(1) Email address has the correct format.
                       (2) User type is selected.
                       (3) Passwords match.`);

                    this.formValid = false;
				} else {
					axios.post('/api/addUser/', {
						firstName : this.firstName,
						surname : this.surname,
						email : this.email,
						username : this.username,
						password : this.password,
						userType : this.userType
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
							window.location.href = './index.html';
						}
					  })
				}
			},
			init() {
				
			},
		}

	});
})