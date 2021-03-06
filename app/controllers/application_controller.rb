class ApplicationController < ActionController::API
  include ExceptionTypes
  include ExceptionHandler
  
  # https://github.com/gonzalo-bulnes/simple_token_authentication#make-models-token-authenticatable
  acts_as_token_authentication_handler_for User, except: [:search, :show, :linkedin, :random], fallback: :exception

  private

  def super_admin_only
    if !current_user.super_admin?
      head(:unauthorized)
    end
  end

  def admin_only
    if current_user.user?
      head(:unauthorized)
    end
  end
end
