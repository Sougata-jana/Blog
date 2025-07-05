import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/confi";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deletefile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-full min-h-screen py-8" style={{ background: '#f5f5f5' }}>
            <Container>
                <div className="w-full flex justify-center mb-4 relative border border-gray-200 rounded-xl p-4 bg-white shadow-sm font-sans">
                    <img
                        src={service.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-64 h-64 object-cover object-center border border-gray-100"
                        onError={(e) => {
                            e.currentTarget.src = "/path/to/fallback-image.jpg";
                        }}
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md">Edit</Button>
                            </Link>
                            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 font-sans">{post.title}</h1>
                </div>
                <div className="browser-css text-left font-sans">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}