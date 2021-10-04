require 'rails_helper'

describe 'auth_context_controller', type: :request do
  let(:request) { get '/authstate' }
  let(:user) {User.create!({
    email: 'kyyafuso@gmail.com',
    password: 'password',
    confirmed_at: Time.now,
  }) }
  context 'user is not logged in' do
    let(:expected_response_status) { 404 }
    it 'returns false' do
      request
      expect(response.status).to eq expected_response_status
    end
  end
  context 'user is logged in' do
    before do
      sign_in user
    end
    let(:expected_response) { {
      loggedIn: true,
      username: user.email,
    }.to_json }
    it 'returns valid data' do
      request
      expect(response.body).to eq expected_response
    end
  end
end
