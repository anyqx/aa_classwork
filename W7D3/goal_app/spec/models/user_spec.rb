require 'rails_helper'

RSpec.describe User, type: :model do
  # # pending "add some examples to (or delete) #{__FILE__}"
  # let (:incomplete_user) { User.new(username: '', email: 'aa@aa.io', password: 'password') }
	# it 'validates the presence of username' do 
	# 	expect(incomplete_user).to_not be_valid
  # end #need to come back, wrong here

  it {should validate_presence_of(:email)}
  it {should validate_presence_of(:password_digest)}
  it {should validate_length_of(:password).is_at_least(6)}
  # it {should validate_presence_of(:password)}


end
