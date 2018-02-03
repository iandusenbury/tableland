json.extract! organization, :id, :name, :description, :url, :visible, :category, :address_line_1, :address_line_2, :address_line_3, :city, :state, :postal_code, :country, :created_at, :updated_at
json.url organization_url(organization, format: :json)
