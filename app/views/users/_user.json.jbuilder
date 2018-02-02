json.extract! user, :id, :first_name, :last_name, :linkedin_id, :contact_url, :visible, :role, :created_at, :updated_at
json.url user_url(user, format: :json)
