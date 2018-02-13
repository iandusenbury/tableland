# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180213044623) do

  create_table "experiences", force: :cascade do |t|
    t.integer "user_id"
    t.integer "organization_id"
    t.integer "program_id"
    t.datetime "start_date"
    t.datetime "end_date"
    t.string "title"
    t.string "award"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_experiences_on_organization_id"
    t.index ["program_id"], name: "index_experiences_on_program_id"
    t.index ["user_id"], name: "index_experiences_on_user_id"
  end

  create_table "media", force: :cascade do |t|
    t.integer "mediable_id"
    t.string "mediable_type"
    t.string "category"
    t.text "description"
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mediable_type", "mediable_id"], name: "index_media_on_mediable_type_and_mediable_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "url"
    t.boolean "visible"
    t.string "category"
    t.string "address_line_1"
    t.string "address_line_2"
    t.string "address_line_3"
    t.string "city"
    t.string "state"
    t.string "postal_code"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "permissions", force: :cascade do |t|
    t.integer "user_id"
    t.integer "organization_id"
    t.integer "program_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_permissions_on_organization_id"
    t.index ["program_id"], name: "index_permissions_on_program_id"
    t.index ["user_id"], name: "index_permissions_on_user_id"
  end

  create_table "programs", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "url"
    t.boolean "visible"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sponsors", force: :cascade do |t|
    t.integer "organization_id"
    t.integer "program_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_sponsors_on_organization_id"
    t.index ["program_id"], name: "index_sponsors_on_program_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "linkedin_id"
    t.string "contact_url"
    t.boolean "visible"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
  end

end
