class CreateXgrids < ActiveRecord::Migration[7.1]
  def change
    create_table :xgrids do |t|
      t.text :gridmodel
      t.integer :num_rows
      t.integer :num_cols
      t.boolean :is_connected
      t.datetime :created_on
      t.text :remarks

      t.timestamps
    end
  end
end
