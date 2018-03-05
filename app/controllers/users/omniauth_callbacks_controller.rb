class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  include ActionController::Cookies
  after_action :set_auth_cookies, only: [:linkedin]

  def index
  end

  def linkedin
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(auth_hash)

    render json: 'all done'
  end

  def failure
    redirect_to root_path
  end

  protected
  def auth_hash
    request.env["omniauth.auth"]
  end

  def set_auth_cookies
    cookies["X-User-Email"] = @user.email
    cookies["X-User-Token"] = @user.authentication_token
  end
end
