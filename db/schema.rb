# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160124180050) do

  create_table "articles", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cart_entries", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "order_id"
    t.integer  "amount"
    t.text     "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "order_type"
  end

  add_index "cart_entries", ["order_id"], name: "index_cart_entries_on_order_id"
  add_index "cart_entries", ["product_id"], name: "index_cart_entries_on_product_id"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",                      null: false
    t.integer  "sluggable_id",              null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope"
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"

  create_table "images", force: :cascade do |t|
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "file"
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.integer  "order",          default: 0
  end

  add_index "images", ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id"

  create_table "order_items", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "order_id"
    t.integer  "buy_amount",    default: 0
    t.integer  "repeat_amount", default: 0
    t.text     "comment"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "order_items", ["order_id"], name: "index_order_items_on_order_id"
  add_index "order_items", ["product_id"], name: "index_order_items_on_product_id"

  create_table "orders", force: :cascade do |t|
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "name"
    t.string   "surname"
    t.string   "phone"
    t.string   "email"
    t.string   "country"
    t.string   "city"
    t.string   "address"
    t.string   "post_code"
    t.integer  "user_data_id"
    t.text     "comment"
  end

  create_table "orders_products", force: :cascade do |t|
    t.integer "product_id"
    t.integer "order_id"
  end

  create_table "personal_orders", force: :cascade do |t|
    t.text     "comment"
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.integer  "order_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "personal_orders", ["imageable_type", "imageable_id"], name: "index_personal_orders_on_imageable_type_and_imageable_id"

  create_table "products", force: :cascade do |t|
    t.decimal  "price",       precision: 9, scale: 2
    t.string   "name",                                default: ""
    t.text     "description",                         default: ""
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
    t.integer  "category_id"
    t.integer  "stock"
  end

  create_table "products_tags", force: :cascade do |t|
    t.integer "product_id"
    t.integer "tag_id"
  end

  add_index "products_tags", ["product_id"], name: "index_products_tags_on_product_id"
  add_index "products_tags", ["tag_id"], name: "index_products_tags_on_tag_id"

  create_table "reviews", force: :cascade do |t|
    t.string   "author"
    t.text     "review"
    t.integer  "imageable_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "specials", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.integer  "tag_id"
  end

  add_index "specials", ["imageable_type", "imageable_id"], name: "index_specials_on_imageable_type_and_imageable_id"

  create_table "subscriptions", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "special_id"
  end

  create_table "user_data", force: :cascade do |t|
    t.string   "name"
    t.string   "surname"
    t.string   "fname"
    t.string   "phone"
    t.string   "vk"
    t.string   "skype"
    t.string   "country"
    t.string   "city"
    t.string   "address"
    t.string   "index"
    t.text     "about"
    t.string   "group"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "user_data_id"
    t.string   "group"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
