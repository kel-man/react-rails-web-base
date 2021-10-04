require 'rails_helper'

describe 'ConfirmationsController', type: :request do
  let(:user) {User.create!({
    email: 'user@user.com',
    password: 'password',
    role: 'guest',
  }) }

  describe 'Redirect after confirmation' do
    let(:request) { get "/users/confirmation?confirmation_token=#{user.confirmation_token}" }

    before do
      user
    end

    it 'redirects the webpage after hitting confirmation token' do
      expect(request).to redirect_to('/_/checklist')
    end
  end

  describe 'Creates empty profile for new user' do
    let(:request) { get "/users/confirmation?confirmation_token=#{user.confirmation_token}" }
    let(:profile_request) { get "/profiles/0" }
    let(:expected_response) { {
      'username' => user.email,
      'user_id' => user.id
    } }
    before do
      user
      request
    end

    it 'creates new empty profile for new user' do
      profile_request
      expect(JSON.parse(response.body)).to include expected_response
    end
  end
end
