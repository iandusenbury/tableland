module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |record_not_found_exception|
      render json: { error: record_not_found_exception.message }, status: :not_found
    end

    rescue_from ActiveRecord::RecordInvalid do |record_invalid_exception|
      render json: { errors: record_invalid_exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    rescue_from ExceptionTypes::UnauthorizedError do |unauthorized_exception|
      binding.pry
      render json: { error: unauthorized_exception.message }, status: :unauthorized
    end
  end

end
