import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import service from '../appwrite/confi';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts);
            }
        }).catch((error) => {
            console.error("Failed to fetch posts:", error);
        });
    }, []);

    return (
        <div className='w-full min-h-screen py-8 bg-gradient-to-br from-blue-50 to-blue-100'>
            <Container>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center font-sans'>All Posts</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.length === 0 ? (
                        <div className='col-span-full text-center text-lg text-gray-500'>No posts available.</div>
                    ) : (
                        posts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;