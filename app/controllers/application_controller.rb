class ApplicationController < ActionController::API
  # https://github.com/gonzalo-bulnes/simple_token_authentication#make-models-token-authenticatable
  acts_as_token_authentication_handler_for User, fallback: :exception
end
