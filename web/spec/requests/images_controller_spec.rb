require 'rails_helper'

describe 'ImagesController', type: :request do
  let(:user) {User.create!({
    email: 'user@user.com',
    password: 'password',
    role: 'guest',
  }) }

  before do
    sign_in(user)
  end

  it 'attaches the image to the user' do
    user.image.attach(io: File.open("#{Rails.root}/spec/fixtures/images/example.png"), filename: "attachment.png", content_type: "image/png")
    expect(user.image).to be_attached
  end
end
