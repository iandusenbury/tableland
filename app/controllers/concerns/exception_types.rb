module ExceptionTypes

  class UnauthorizedError < StandardError
    def initialize(message = nil)
      super(message)
    end
  end

end
