require 'rails_helper'

describe 'ProfilesController', type: :request do
  let(:user) {User.create!({
    email: 'admin@admin.com',
    password: 'password',
    role: 'admin',
    confirmed_at: Time.now,
  }) }

  before do
    user
    sign_in(user)
  end

  describe 'update' do
    let(:avatar) {fixture_file_upload("#{Rails.root}/spec/fixtures/images/example.png", 'image/png')}
    let(:request) { patch "/profiles/#{user.profile.id}", params: {
        avatar: avatar,
    } }
    it 'posts an image to a profile record' do
      expect{request}.to change{ActiveStorage::Attachment.count}.by(1)
    end

    context 'user wishes to change username' do
      let(:request) { patch "/profiles/#{user.profile.id}", params: {
        username: 'new username',
      } }
      let(:expected_response) { {
        'username' => 'new username',
      } }
      it 'changes the username by patching profiles' do
        request
        expect(JSON.parse(response.body)).to include expected_response
      end
    end
  end

  describe 'show' do
    let(:request) { get "/profiles/#{user.profile.id}" }
    let(:expected_response) { {
      id: user.profile.id,
      user_id: user.profile.user_id,
      username: user.profile.user.username,
      bio: user.profile.bio,
    }.to_json }

    it 'displays profile attributes for this profile' do
      request
      expect(response.body).to eq expected_response
    end

    context 'profile has an avatar' do
    let(:avatar) { patch "/profiles/#{user.profile.id}", params: {
        avatar: fixture_file_upload("#{Rails.root}/spec/fixtures/images/example.png", 'image/png'),
    } }
    let(:expected_URL_end) { "/example.png" }

      it 'displays profile attributes for this user including an avatar URL' do
        avatar
        request
        expect(JSON.parse(response.body)["avatarURL"]).to end_with expected_URL_end
      end
    end
  end
end
