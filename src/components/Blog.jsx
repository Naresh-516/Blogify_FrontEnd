import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById, addComment, editComment, deleteComment, toggleLike } from '../service/blogService';
import { toast } from 'react-toastify';
import likeIcon from '../assets/like.png';
import likedIcon from '../assets/liked.png';

function Blog() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState({ content: '', blogId: blogId });
    const [likeLoading, setLikeLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    useEffect(() => {   
        const fetchBlog = async () => {
            setLoading(true);
            try {
                const response = await getBlogById(blogId);
                setBlog(response.data);
            } catch (error) {
                console.error("Failed to fetch blog:", error);
                toast.error("Failed to load blog");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [blogId]);

    const handleLikeToggle = async () => {
        if (likeLoading) return;
        setLikeLoading(true);
        try {
            const response = await toggleLike(blogId);
            setBlog(response.data);
            toast.success("Like status updated!");
        } catch (error) {
            console.error("Error toggling like:", error);
            toast.error("Failed to update like");
        } finally {
            setLikeLoading(false);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.content.trim() || commentLoading) return;
        setCommentLoading(true);
        try {
            const response = await addComment({ content: newComment.content, blogId: newComment.blogId });
            setBlog(prev => ({
                ...prev,
                comments: response.data.comments,
                commentCount: response.data.comments.length
            }));
            setNewComment({ content: '', blogId: blogId });
            toast.success("Comment added!");
        } catch (error) {
            console.error("Failed to add comment:", error);
            toast.error("Failed to add comment");
        } finally {
            setCommentLoading(false);
        }
    };

    const handleEditComment = async (commentId) => {
        if (!editedContent.trim()) return;
        try {
            const response = await editComment(commentId, blogId, editedContent);
            setBlog(prev => ({
                ...prev,
                comments: response.data.comments
            }));
            setEditingCommentId(null);
            setEditedContent('');
            toast.success("Comment updated!");
        } catch (error) {
            console.error("Failed to edit comment:", error);
            toast.error("Failed to edit comment");
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await deleteComment(blogId, commentId);
            setBlog(prev => ({
                ...prev,
                comments: response.data.comments,
                commentCount: response.data.comments.length
            }));
            toast.success("Comment deleted!");
        } catch (error) {
            console.error("Failed to delete comment:", error);
            toast.error("Failed to delete comment");
        }
    };

    if (loading) return <h3 className="text-center text-xl mt-10">Loading blog...</h3>;
    if (!blog) return <h3 className="text-center text-xl mt-10">Blog not found</h3>;

    const likedByUser = blog.likedUsers?.includes(userId);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
                Posted by: {blog.userName}, {new Date(blog.postedAt).toLocaleString()}
            </p>
            <div className="text-gray-700 mb-4">{blog.content}</div>
            <div className="mb-4 text-blue-500">
                {blog.tags.split(",").map((tag, index) => (
                    <span key={index}>#{tag.trim()} </span>
                ))}
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLikeToggle}>
                    <img src={likedByUser ? likedIcon : likeIcon} alt="like" className="w-6 h-6" />
                    <span>{blog.likeCount || 0} Likes</span>
                </div>
                <div>
                    <span>{blog.comments.length || 0} Comments</span>
                </div>
            </div>

            {/* Comments */}
            <div className="mb-4">
                {blog.comments?.length > 0 ? (
                    blog.comments.map((comment, index) => (
                        <div key={index} className="border-b border-gray-200 py-2">
                            <p className="text-sm font-semibold">{comment.username}</p>
                            {editingCommentId === comment.commentId ? (
                                <>
                                    <textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className="w-full border rounded p-2"
                                    />
                                    <button
                                        onClick={() => handleEditComment(comment.commentId)}
                                        className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingCommentId(null);
                                            setEditedContent('');
                                        }}
                                        className="bg-gray-400 text-white px-3 py-1 rounded"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-700">{comment.content}</p>
                                    <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</p>
                                    {comment.userId === userId && (
                                        <div className="flex space-x-2 mt-1">
                                            <button
                                                onClick={() => {
                                                    setEditingCommentId(comment.commentId);
                                                    setEditedContent(comment.content);
                                                }}
                                                className="text-sm text-blue-500"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteComment(comment.commentId)}
                                                className="text-sm text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}
            </div>

            {/* Add Comment */}
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={newComment.content}
                    onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Add a comment..."
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                />
                <button
                    onClick={handleAddComment}
                    disabled={commentLoading}
                    className={`bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded ${commentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Post
                </button>
            </div>
        </div>
    );
}

export default Blog;
