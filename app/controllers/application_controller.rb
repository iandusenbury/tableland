class ApplicationController < ActionController::API
  # https://github.com/gonzalo-bulnes/simple_token_authentication#make-models-token-authenticatable
  acts_as_token_authentication_handler_for User, except: [:index, :show, :linkedin], fallback: :exception

  # This is a helper method that is used by the top-level models (User, 
  # Organization, Program) to build a where clause for use in the Model's search
  # method. The input list of fields will be included in the pattern match. 
  # Each pattern is matched against a search term (:term), that will be replaced
  # when calling 'where' in a model.
  # See: http://guides.rubyonrails.org/active_record_querying.html#pure-string-conditions
  # Example: an input of ['first_name', 'last_name'] would produce:
  # ' first_name LIKE :term OR last_name LIKE :term '
  def self.build_like_clause(fields)
    query = ""
    query = fields.join(" LIKE :term OR ")
    query += " LIKE :term "
  end

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
