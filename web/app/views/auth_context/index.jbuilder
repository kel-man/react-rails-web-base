json.loggedIn @user.present?
if @user.present?
  json.username @user.username
end
