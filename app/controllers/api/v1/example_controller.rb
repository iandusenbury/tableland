module Api::V1
  class ExampleController < ApplicationController
    def index
      @message = {message: 'hello, world!'}
      
      render json: @message
    end
  end
end
