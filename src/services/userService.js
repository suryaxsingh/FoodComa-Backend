class UserService {

    constructor(_userRepository) {
        this.userRepository = _userRepository;
    }

    async registerUser(userDetails){
        
        // It will create a brand new user in database

        //1. we need to check if the user with this email and mobile number already exists or not
        const user = await this.userRepository.findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });

        if(user){
            throw { reason: 'User with the given email and mobile number already exist', statusCode: 400}
        }
        //2. If not then create the user in database
        const newUser = await this.userRepository.createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        });


        if(!newUser) {
            throw { reason: 'Something went wrong, cannot create user', statusCode: 500}
        }
        //3. return the details of created user
        return newUser;
    }   
}

module.exports = UserService;