require 'rails_helper'

describe User do
  let(:user) {User.create!({
    email: 'user@user.com',
    password: 'password',
    role: 'guest',
  }) }

  let(:example_image) {File.open("#{Rails.root}/spec/fixtures/images/example.png")}

  it 'it attaches the image to the user' do
    user.image.attach(io: example_image, filename: "attachment.png")
    expect(user.image).to be_attached
  end
end
