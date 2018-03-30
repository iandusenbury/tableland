class Search
  def self.where_clause_from_fields(fields_to_search)
    return where_clause = fields_to_search.join(" ILIKE :term OR ") + " ILIKE :term "
  end

  def self.where_clause_from_fields_vis_only(fields_to_search)
    return '(' + self.where_clause_from_fields(fields_to_search) + ')' +
      ' AND visible=:tautology '
  end

  def self.term_to_pattern(term)
    return "%#{term}%"
  end
end
