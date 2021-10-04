class AuthContextController < ApplicationController
  # before_action :authenticate_user!
  # skip_before_action :verify_authenticity_token

  def index
    @user = current_user
    head 404 unless current_user
  end
end
