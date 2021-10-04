require 'rails_helper'

describe BlogCommentsController, type: :request do
  let(:user) {User.create!({
    email: 'user@user.com',
    password: 'password',
    role: 'admin',
    confirmed_at: Time.now,
  }) }
  let(:blog1) {Blog.create!({
    user_id: user.id,
    title: 'Blog title',
    contents: 'Blog contents',
  }) }
  let(:comment1) {BlogComment.create!({
    comment: 'comment contents',
    blog_id: blog1.id,
    user_id: user.id,
  }) }
  let(:comment2) {BlogComment.create!({
    comment: 'comment2 contents',
    blog_id: blog1.id,
    user_id: user.id,
  }) }

  before do
    sign_in(user)
    blog1
    comment1
    comment2
  end

  describe 'index' do
    let(:request) { get "/blog_comments?blog_id=#{blog1.id}" }
    let(:expected_response) { {
      blogComments: [{
        id: comment1.id,
        comment: comment1.comment,
        timestamp: comment1.created_at,
        owner: user.username,
      }, {
        id: comment2.id,
        comment: comment2.comment,
        timestamp: comment2.created_at,
        owner: user.username,
        }]
    }.to_json }

    it 'returns the index of comments for blog1' do
      request
      expect(response.body).to eq (expected_response)
    end
  end

  describe 'show' do
    let(:request) { get "/blog_comments/#{comment2.id}" }
    let(:editable) {true}
    let(:expected_response) { {
      id: comment2.id,
      comment: comment2.comment,
      timestamp: comment2.created_at,
      owner: user.username,
      editable: editable,
    }.to_json }

    it 'shows only comment 2 loaded from db' do
      request
      expect(response.body).to eq expected_response
    end
  end

  describe 'create' do
    let(:request) { post '/blog_comments', params: blog_comment_params }
    let(:blog_comment_params) { {
      blog_comment: {
        comment: 'comment one',
        blog_id: blog1.id,
      }
    } }

    it 'creates a new comment' do
      expect{request}.to change{BlogComment.count}.by(1)
    end
  end

end
