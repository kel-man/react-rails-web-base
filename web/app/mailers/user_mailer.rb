class UserMailer < ApplicationMailer
  default from: 'notifications@yafusos.com'

  def welcome_email
    @user = params[:user]
    @url = 'http://yafusos.com/login'
    mail(to: @user.email, subject: 'Welcome to Yafusos.com!')
  end
end
