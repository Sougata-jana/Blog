import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input, RTE, Select, Button } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../../appwrite/confi";
import { ID } from "appwrite";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;

                if (file) {
                    await service.deletePost(post.featuredImage);
                }

                const dbPost = await service.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                    postId: post.postId,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                if (!data.image || !data.image[0]) {
                    return;
                }

                const file = await service.uploadFile(data.image[0]);
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await service.createPost({
                        ...data,
                        postId: ID.unique(),
                        userid: userData.$id,
                    });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            // Optionally show error to user
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="w-full min-h-screen flex items-center justify-center" style={{ background: '#f5f5f5' }}>
            <form onSubmit={handleSubmit(submit)} className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-8 border border-gray-100">
                <div>
                    <label className="block font-bold mb-2 text-gray-800 text-lg">Title</label>
                    <Input
                        placeholder="Enter a title..."
                        className="mb-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
                        {...register("title", { required: true, name: "title" })}
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2 text-gray-800 text-lg">Slug</label>
                    <Input
                        placeholder="Auto-generated from title"
                        className="mb-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
                        {...register("slug", { required: true, name: "slug" })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2 text-gray-800 text-lg">Content</label>
                    <RTE name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div>
                    <label className="block font-bold mb-2 text-gray-800 text-lg">Featured Image</label>
                    <Input
                        type="file"
                        className="mb-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post, name: "image" })}
                    />
                    {post && post.featuredImage && (
                        <div className="w-full mb-2 flex flex-col items-center">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-xl border border-gray-200 w-32 h-32 object-cover object-center mt-2"
                                onError={(e) => {
                                    e.currentTarget.src = "/fallback-image.jpg";
                                }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label className="block font-bold mb-2 text-gray-800 text-lg">Status</label>
                    <Select
                        options={["active", "inactive"]}
                        className="mb-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white text-black px-4 py-2 text-base"
                        {...register("status", { required: true, name: "status" })}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow hover:bg-blue-700 transition-all duration-200 border-none outline-none text-lg"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </form>
        </div>
    );
}
