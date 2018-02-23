module ApplicationHelper
  def self.fields_to_query(field_list)
    query = ""
    query = fields_to_search.join(" LIKE :term ")
    query += " LIKE :term "
  end
end
