class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def index
  end

  def linkedin
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(auth_hash)

    # TODO: reroute user based on signup/signin
  end

  def failure
    redirect_to root_path
  end

  protected
  def auth_hash
    request.env["omniauth.auth"]
  end
end
