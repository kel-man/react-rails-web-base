class ApplicationController < ActionController::Base
  respond_to :json
  protect_from_forgery with: :null_session
  # protect_from_forgery unless: -> {request.format.json?}
  # protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

end
