require 'rails_helper'

describe 'ItemsController', type: :request do
  let(:user) {User.create!({
    email: 'kyyafuso@gmail.com',
    password: 'password',
    confirmed_at: Time.now,
  }) }
  let(:user2) {User.create!({
    email: 'fakeemail@gmail.com',
    password: 'password',
    confirmed_at: Time.now,
  }) }
  let(:item1) { Item.create!({
    user_id: user.id,
    topic: 'Item1 Topic',
    contents: 'Item1 Contents',
  }) }
  let(:item2) { Item.create!({
    user_id: user.id,
    topic: 'Second Topic',
    contents: 'Second Contents',
  }) }
  let(:foreign_item) { Item.create!({
    user_id: user2.id,
    topic: 'do not show',
    contents: 'foreign contents',
  }) }

  before do
    foreign_item
    sign_in(user)
    item1
    item2
  end

  describe 'index' do
    let(:request) { get '/items' }
    let(:expected_items) {
      [{
        "id" => item1.id,
        "topic" => item1.topic,
        "contents" => item1.contents,
        "updated_at" => item1.updated_at.iso8601,
      }, {
        "id" => item2.id,
        "topic" => item2.topic,
        "contents" => item2.contents,
        "updated_at" => item2.updated_at.iso8601,
        }]
    }

    it 'returns a list of items in JSON' do
      request
      expect(JSON.parse(response.body)["items"]).to include(*expected_items)
    end
  end

  describe 'create' do
    let(:item_topic) { 'PostItem Topic' }
    let(:item_contents) { 'PostItem Contents' }
    let(:request) { post '/items', params: {
      item: {
        topic: item_topic,
        contents: item_contents,
        isBroken: 'stringy',
      }
    } }
    let(:expected_response) { {
        'topic' => item_topic,
        'contents' => item_contents,
    } }
    it 'creates an item in the database with valid values' do
      expect{ request }.to change{ Item.count }.by ( 1 )
      expect(JSON.parse(response.body)).to include expected_response
    end
    context 'params are empty' do
      let(:item_topic) { '' }
      let(:item_contents) { '' }
      it 'does not allow empty inputs' do
        expect{ request }.to change{ Item.count }.by ( 0 )
      end
    end
  end

  describe 'show' do
    let(:request) { get "/items/#{item2.id}" }
    let(:expected_response) { {
      id: item2.id,
      topic: item2.topic,
      contents: item2.contents,
      updated_at: item2.updated_at,
    }.to_json }
    it 'shows item2 in the database' do
      request
      expect(response.body).to eq expected_response
    end
    context 'item belongs to another user' do
      let(:request) { get "/items/#{foreign_item.id}" }
      let(:expected_response_status) { 404 }
      it 'returns 404 not found' do
        request
        expect(response.status).to eq expected_response_status
      end
    end
  end

  describe 'update' do
    let(:first_topic) { 'Unchanged Topic' }
    let(:first_contents) { 'Unchanged Contents' }
    let(:changed_topic) { 'New Topic' }
    let(:changed_contents) { 'New Contents' }
    let(:request) { patch "/items/#{item2.id}", params: {
      item: {
        topic: changed_topic,
        contents: changed_contents,
      }
    } }
    let(:request2) { get "/items/#{item2.id}" }
    let(:expected_response) { {
      "id" => item2.id,
      "topic" => changed_topic,
      "contents" => changed_contents,
    } }
    it 'edits the topic and contents of item2' do
      request
      expect(response.status).to eq 200
      request2
      expect(JSON.parse(response.body)).to include expected_response
      expect(item2.reload.topic).to eq changed_topic
    end
  end

  describe 'destroy' do
    let(:request) { delete "/items/#{item2.id}" }
    let(:expected_response) { {
      "items" => [{
        "id" => item1.id,
        "topic" => item1.topic,
        "contents" => item1.contents,
        "updated_at" => item1.updated_at.iso8601,
      }]
    } }
    it 'destroys item2 from the database' do
      expect{ request }.to change{ Item.count }.by ( -1 )
      expect(response.status).to eq 204
      get '/items'
      expect(JSON.parse(response.body)).to include expected_response
    end
  end
end
