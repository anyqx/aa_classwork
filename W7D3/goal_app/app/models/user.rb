class User < ApplicationRecord 
    #validations give us nice and readable errors messages e.g. fake_ryan.errors.full_messages 
    validates :email, :session_token, presence: true, uniqueness: true 
    validates :password_digest, presence: true 
    validates :password, length: { minimum: 6 }, allow_nil: true 
    #not a column in the db 
    #length check for when we sign up a user
    #other times, allow pw to be nil 
  
    after_initialize :ensure_session_token 
    #rails method(e.g. after User.new)     runs this method 
    #before_validation will also work 
  
    attr_reader :password #a reader is not provided, we have to make it 
  
    def self.find_by_credentials(username, pw)
      user = User.find_by(username: username)
  
      if user && user.is_password?(pw) #helper method we will write 
        user 
        #if the username is found and passwords match
      else 
        nil
      end
    end
  
    def is_password?(pw) #not recursion 
      BCrypt::Password.new(self.password_digest).is_password?(pw)
      #create a new instance using digest from db  this is_pw? is BCrypt's method 
      #returns a boolean
    end
  
    def password=(password) #we are overwriting the setter
      self.password_digest = BCrypt::Password.create(password)
      #column in db          result of bcrypt hash with salt 
      #we use the user's input password once to create the password_digest
  
      @password = password 
      #creating the instance varialbe when we sign up the user 
      #this is for the validation/length 
    end
  
    def ensure_session_token
      self.session_token ||= SecureRandom::urlsafe_base64 
      #assigns it             random string generated 
    end
  
    def reset_session_token! 
      self.session_token = SecureRandom::urlsafe_base64 
      # we want to change the session_token 
      self.save! #we want to fail LOUDLY
  
      self.session_token #we want to return this value via the getter method 
    end

end
